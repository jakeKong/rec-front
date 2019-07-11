import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import { changeTypeItems } from '../../items';

import * as XLSX from 'xlsx';

class ChangePointHistoryGrid extends Component {

  componentDidMount() {
    const { changePointHistoryList } = this.props;
    if (!changePointHistoryList || changePointHistoryList === undefined || changePointHistoryList.isEmpty()) {
      return
    }
    
    let dateFormat = require('dateformat');
    let list =[];
    changePointHistoryList.forEach(e => {
      let changeType = '';
      changeTypeItems.forEach(function(row){
        if (e.get('changeType') === row.value) {
          changeType = row.textContent;
        };
      });
      // push Value type is JSON
      list.push({
        changePointSid: e.get("changeSid"),
        email: e.get("email"), 
        changeDt: dateFormat(new Date(e.get("changeDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        // changeType: e.get("changeType"),
        odrPaymentNo: e.get("odrNo") ? e.get("odrNo") : e.get("paymentNo"),
        odrNo: e.get("odrNo"),
        paymentNo: e.get("paymentNo"),
        paymentCash: e.get("paymentCash"),
        changeType: changeType,
        changePoint: e.get("changePoint"),
        currentBalPoint: e.get("currentBalPoint"),
        userNm: e.get("userNm"),
        activated: e.get("activated")
      })
    })
    
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = list;
    grid.pageSize = 10;

    const {role} = this.props;

    let hiddenCheck = true;
    if (role === 'ROLE_ADMIN') {
      hiddenCheck = false;
    }
    document.querySelector('#grdUserNm').hidden = hiddenCheck;
    document.querySelector('#grdEmail').hidden = hiddenCheck;
    document.querySelector('#grdBtnPaymentCancle').hidden = hiddenCheck;

    const btnExcel = document.querySelector('#btnExcel');
    if (role === 'ROLE_ADMIN') {
      btnExcel.hidden = true;

      const {changePointCancleCallback} = this.props;
      document.querySelector('#grdBtnPaymentCancle').renderer = function(root, column, rowData) {
        if (rowData.item.changeType === '결제' || rowData.item.changeType === '결제취소') {
          if (rowData.item.changeType === '결제취소') {
            root.innerHTML = '-';
          } 
          if (rowData.item.changeType === '결제') {
            if (rowData.item.activated === true) {
              root.innerHTML = '';
              const btnDownload = document.createElement('vaadin-button');
              // btnDownload.setAttribute('style', 'color: var(--lumo-contrast-text-color)');
              btnDownload.setAttribute('style', 'color: var(--lumo-error-text-color)');
              btnDownload.textContent = '결제취소';
              btnDownload.addEventListener('click', function() {
                const check = window.confirm('결제하신 포인트상품에 대한 포인트결제 취소를 진행하시겠습니까?');
                if (check === true) {
                  // 결제취소 버튼 클릭 시 동작 이벤트
                  changePointCancleCallback(rowData.item)
                }
              })
              root.appendChild(btnDownload);
            } else {
              root.innerHTML = '<font style="color: red">취소됨</font>';
            }
          }
        }
      }
    } else {
      btnExcel.hidden = false;
      btnExcel.textContent = 'EXCEL';
      btnExcel.addEventListener('click', function() {
        const check = window.confirm('조회된 정보를 엑셀로 저장 하시겠습니까?');
        if (check === true) {
          let excelList = [];
          let excelNumber = 1;
          changePointHistoryList.forEach(e => {
            let changeType = '';
            changeTypeItems.forEach(function(row){
              if (e.get('changeType') === row.value) {
                changeType = row.textContent;
              };
            });
            // push Value type is JSON
            excelList.push({
              번호: excelNumber++,
              변동일자: dateFormat(new Date(e.get("changeDt")), 'yyyy년mm월dd일 HH:MM:ss'),
              '결제(주문)번호': e.get("odrNo") ? e.get("odrNo") : e.get("paymentNo"),
              // 결제번호: e.get("paymentNo"),
              // 주문번호: e.get("odrNo"),
              결제금액: e.get("paymentCash"),
              변동유형: changeType,
              변동포인트: e.get("changePoint"),
              남은포인트: e.get("currentBalPoint"),
            })
          })
    
          /* make the worksheet */
          let worksheet = XLSX.utils.json_to_sheet(excelList);
    
          /* add to workbook */
          let workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "포인트_변동내역");
    
          /* generate an XLSX file */
          let writeName = dateFormat(new Date(), 'yyyymmdd')+"_SRD_포인트_변동내역.xlsx"
          XLSX.writeFile(workbook, writeName);
        }
      })
    }

    const pagesControl = document.querySelector('#pages');
    let pages;
    updateItemsFromPage(1);

    // 그리드 페이징
    // pageController
    function updateItemsFromPage(page) {
      if (page === undefined) {
        return;
      }
  
      if (!pages) {
        pages = Array.apply(null, {length: Math.ceil(list.length / grid.pageSize)}).map(function(item, index) {
          return index + 1;
        });
        const prevBtn = window.document.createElement('vaadin-button');
        prevBtn.className = 'vaadin-button-grid-page-prev';
        prevBtn.textContent = '<';
        prevBtn.addEventListener('click', function() {
          const selectedPage = parseInt(pagesControl.querySelector('[selected]').textContent);
          updateItemsFromPage(selectedPage - 1);
        });
        pagesControl.appendChild(prevBtn);

        pages.forEach(function(pageNumber) {
          const pageBtn = window.document.createElement('vaadin-button');
          pageBtn.textContent = pageNumber;
          pageBtn.className = 'vaadin-button-grid-page-number';
          pageBtn.addEventListener('click', function(e) {
            updateItemsFromPage(parseInt(e.target.textContent));
          });
          if (pageNumber === page) {
            pageBtn.setAttribute('selected', true);
          }
          pagesControl.appendChild(pageBtn);
        });

        const nextBtn = window.document.createElement('vaadin-button');
        nextBtn.textContent = '>';
        nextBtn.className = 'vaadin-button-grid-page-next';
        nextBtn.addEventListener('click', function() {
          const selectedPage = parseInt(pagesControl.querySelector('[selected]').textContent);
          updateItemsFromPage(selectedPage + 1);
        });
        pagesControl.appendChild(nextBtn);
      }
      const buttons = Array.from(pagesControl.children);
      buttons.forEach(function(btn, index) {
        if (parseInt(btn.textContent) === page) {
          btn.setAttribute('selected', true);
        } else {
          btn.removeAttribute('selected');
        }
        if (index === 0) {
          if (page === 1) {
            btn.setAttribute('disabled', '');
          } else {
            btn.removeAttribute('disabled');
          }
        }
        if (index === buttons.length - 1) {
          if (page === pages.length) {
            btn.setAttribute('disabled', '');
          } else {
            btn.removeAttribute('disabled');
          }
        }
      });

      var start = (page - 1) * grid.pageSize;
      var end = page * grid.pageSize;
      grid.items = list.slice(start, end);

    }
  }

  render() {
    return (
      <Fragment>
        <div>
          <div className="div-sub-top-right">
            <vaadin-button id="btnExcel" />
          </div>
          <vaadin-grid theme="column-borders row-stripes" height-by-rows column-reordering-allowed>
            <vaadin-grid-column path="changeDt" header="변동 일자" text-align="center" flex-grow="2" width="250px" resizable/>
            <vaadin-grid-column path="odrPaymentNo" header="결제(주문)번호" text-align="center" flex-grow="2" width="200px" resizable/>
            <vaadin-grid-column path="paymentCash" header="결제 금액" text-align="center" flex-grow="1" width="100px" resizable/>
            <vaadin-grid-column path="changeType" header="변동 유형" text-align="center" flex-grow="1" width="100px" resizable/>
            <vaadin-grid-column path="changePoint" header="변동 포인트" text-align="center" flex-grow="1.5" width="100px" resizable/>
            <vaadin-grid-column path="currentBalPoint" header="남은 포인트" text-align="center" flex-grow="1.5" width="100px" resizable/>
            <vaadin-grid-column id="grdUserNm" path="userNm" header="주문자" text-align="center" flex-grow="1" width="100px" resizable/>
            <vaadin-grid-column id="grdEmail" path="email" header="주문자 아이디" text-align="center" flex-grow="1" width="150px" resizable/>
            <vaadin-grid-column id="grdBtnPaymentCancle" header="결제취소" text-align="center" flex-grow="10" width="150px" resizable/>
            {/* <vaadin-grid-column path="purchaseNo" header="구매번호" text-align="center" flex-grow="2" /> */}
          </vaadin-grid>
          <div id="pages"/>
        </div>
      </Fragment>
    );
  }
}
export default ChangePointHistoryGrid;
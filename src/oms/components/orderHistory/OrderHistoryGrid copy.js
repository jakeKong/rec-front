import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
// import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-button';
// import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
// import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
// import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import { statusItems, realEstateTypeItems } from '../../items';
import { comma } from '../../../common/utils';
import config from '../../../config';

/* this line is only needed if you are not adding a script tag reference */
import * as XLSX from 'xlsx';
// if(typeof XLSX == 'undefined') XLSX = require('xlsx');

class OrderHistoryGrid extends Component {

  componentDidMount() {
    const { orderHistoryList } = this.props;
    if (!orderHistoryList || orderHistoryList === undefined || orderHistoryList.isEmpty()) {
      return
    }
    
    let dateFormat = require('dateformat');
    let list=[];
    let i=1;
    orderHistoryList.forEach(e => {

      let status = '';
      statusItems.forEach(function(row){
        if (e.get('status') === row.value) {
          status = row.textContent;
        };
      });

      let realEstateType = '';
      realEstateTypeItems.forEach(function(row){
        if (e.get('realEstateType') === row.value) {
          realEstateType = row.textContent;
        };
      });
      
      // push Value type is JSON
      list.push({
        odrSid: e.get("odrSid"), 
        index: i++,
        email: e.get("email"), 
        odrNo: e.get("odrNo"),
        odrDt: dateFormat(new Date(e.get("odrDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        odrDtOrigin: e.get("odrDt"),
        marketPrice: comma(e.get("marketPrice")),
        marketPriceOrigin: e.get("marketPrice"),
        realEstateType: realEstateType,
        realEstateTypeOrigin: e.get("realEstateType"),
        variationPoint: comma(e.get("variationPoint"))+' P',
        variationPointOrigin: e.get("variationPoint"),
        downloadEndDt: dateFormat(new Date(e.get("downloadEndDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        downloadEndDtOrigin: e.get("downloadEndDt"),
        downloadCnt: e.get("downloadCnt"),
        status: status,
        statusOrigin: e.get("status"),
        pnuNo: e.get("pnuNo"),
        pdfFileNm: e.get("pdfFileNm"),
        ordererNm: e.get("ordererNm"),
        activated: e.get("activated")
      })
    })
    
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = list;
    grid.pageSize = 10;
    grid.className = "agz-bbs";

    const {role} = this.props;

    // 권한 여부에 따른 그리드 컬럼 노출
    let hiddenCheck = true;
    if (role === 'ROLE_ADMIN') {
      hiddenCheck = false;
    }
    document.querySelector('#grdOrdererNm').hidden = hiddenCheck;
    document.querySelector('#grdEmail').hidden = hiddenCheck;
    document.querySelector('#grdBtnPurchaseCancle').hidden = !hiddenCheck;
    // document.querySelector('#grdBtnDownload').hidden = !hiddenCheck;

    document.querySelector('#grdBtnDownload').renderer = function(root, column, rowData) {
      if (rowData.item.status === '구매취소') {
        root.innerHTML = '-';
      } else {
        if (new Date(rowData.item.downloadEndDtOrigin) < new Date()) {
          root.innerHTML = '만료됨';
        } else {
          if (rowData.item.activated === true) {
            root.innerHTML = '';
            const btnDownload = document.createElement('vaadin-button');
            // btnDownload.setAttribute('style', 'color: var(--lumo-contrast-text-color)');
            // btnDownload.setAttribute('style', 'color: var(--lumo-primary-text-color)');
            btnDownload.className = 'btn btn-download';
            btnDownload.textContent = '다운로드';
            btnDownload.addEventListener('click', function() {
              const check = window.confirm('해당 PDF를 다운로드 하시겠습니까?');
              if (check === true) {
                // 다운로드 버튼 클릭 시 동작 이벤트
                window.open(config.pdfUrl + rowData.item.pdfFileNm);
              }
            })
            root.appendChild(btnDownload);
          } else {
            root.innerHTML = '<font style="color: red">취소됨</font>';
          }
        }
      }
    }

    const {orderCancleCallback} = this.props;
    document.querySelector('#grdBtnPurchaseCancle').renderer = function(root, column, rowData) {
      if (rowData.item.status === '구매취소') {
        root.innerHTML = '-';
      } else {
        if (new Date(rowData.item.downloadEndDtOrigin) < new Date()) {
          root.innerHTML = '만료됨';
        } else {
          if (rowData.item.activated === true) {
            root.innerHTML = '';
            const btnDownload = document.createElement('vaadin-button');
            // btnDownload.setAttribute('style', 'color: var(--lumo-contrast-text-color)');
            btnDownload.setAttribute('style', 'color: var(--lumo-error-text-color)');
            btnDownload.textContent = '구매취소';
            btnDownload.addEventListener('click', function() {
              const check = window.confirm('구매하신 상품에 대한 상품구매 취소를 진행하시겠습니까?');
              if (check === true) {
                // 구매취소 버튼 클릭 시 동작 이벤트
                orderCancleCallback(rowData.item)
              }
            })
            root.appendChild(btnDownload);
          } else {
            root.innerHTML = '<font style="color: red">취소됨</font>';
          }
        }
      }
    }
    
    // list.forEach(e => {
    //   if (e.downloadEndDt > new Date() === false) {

    //   }
    //   if (e.status === 'TRADE_COMPLETE') {
    //     console.log()
    //   }
    // })
    const btnExcel = document.querySelector('#btnExcel');
    if (role === 'ROLE_ADMIN') {
      btnExcel.hidden = true;
    } else {
      btnExcel.hidden = false;
      btnExcel.textContent = 'EXCEL';
      btnExcel.className="btn down-excel"
      btnExcel.addEventListener('click', function() {
        const check = window.confirm('조회된 정보를 엑셀로 저장 하시겠습니까?');
        if (check === true) {
          let excelList = [];
          let excelNumber = 1;
          orderHistoryList.forEach(e => {
            let status = '';
            statusItems.forEach(function(row){
              if (e.get('status') === row.value) {
                status = row.textContent;
              };
            });
      
            let realEstateType = '';
            realEstateTypeItems.forEach(function(row){
              if (e.get('realEstateType') === row.value) {
                realEstateType = row.textContent;
              };
            });
            // push Value type is JSON
            excelList.push({
              번호: excelNumber++,
              주문번호: e.get("odrNo"),
              주문일자: dateFormat(new Date(e.get("odrDt")), 'yyyy년mm월dd일 HH:MM:ss'),
              시세가: comma(e.get("marketPrice")),
              부동산유형: realEstateType,
              변동포인트: comma(e.get("variationPoint"))+' P',
              // 다운로드만료기간: e.get("downloadEndDt"),
              // 다운로드횟수: e.get("downloadCnt"),
              상태: status,
            })
          })
    
          /* make the worksheet */
          let worksheet = XLSX.utils.json_to_sheet(excelList);
    
          /* add to workbook */
          let workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "주문내역");
    
          /* generate an XLSX file */
          let writeName = dateFormat(new Date(), 'yyyymmdd')+"_SRD_주문내역.xlsx"
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
        prevBtn.className = 'btn prev';
        prevBtn.textContent = '<';
        prevBtn.addEventListener('click', function() {
          const selectedPage = parseInt(pagesControl.querySelector('[selected]').textContent);
          updateItemsFromPage(selectedPage - 1);
        });
        pagesControl.appendChild(prevBtn);

        pages.forEach(function(pageNumber) {
          const pageBtn = window.document.createElement('vaadin-button');
          pageBtn.textContent = pageNumber;
          pageBtn.className = 'btn number';
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
        nextBtn.className = 'btn next';
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

    // 스타일 적용 이후 우측정렬 미적용으로 인한 컬럼 렌더링 - 2019-07-12 @yieon
    const column = grid.querySelectorAll('vaadin-grid-column');
    column[3].renderer = function(root, column, rowData) {
      root.innerHTML = rowData.item.marketPrice
      root.style = 'text-align: right'
    }
    column[5].renderer = function(root, column, rowData) {
      root.innerHTML = rowData.item.variationPoint
      root.style = 'text-align: right'
    }
    column[8].renderer = function(root, column, rowData) {
      root.innerHTML = rowData.item.downloadCnt
      root.style = 'text-align: right'
    }
  }

  render() {
    return (
      <Fragment>
        <div className="align-right-text">
          <vaadin-button id="btnExcel"/>
        </div>
        <vaadin-grid theme="column-borders row-stripes" height-by-rows column-reordering-allowed>
          {/* <vaadin-grid-sort-column path="odrSid" header="주문 SID" text-align="end" width="10px" flex-grow="1"></vaadin-grid-sort-column> */}
          <vaadin-grid-column path="index" header="번호" text-align="center" flex-grow="1" width="70px"/>
          <vaadin-grid-column path="odrNo" header="주문 번호" text-align="center" flex-grow="10" width="200px" resizable/>
          <vaadin-grid-column path="odrDt" header="주문 일자" text-align="center" flex-grow="15" width="250px" resizable/>
          <vaadin-grid-column path="marketPrice" header="시세가" text-align="center" flex-grow="10" width="150px" resizable/>
          <vaadin-grid-column path="realEstateType" header="부동산 유형" text-align="center" flex-grow="10" width="120px" resizable/>
          <vaadin-grid-column path="variationPoint" header="증감 포인트" text-align="center" flex-grow="3" width="120px" resizable />
          <vaadin-grid-column path="downloadEndDt" header="다운로드 만료기간" text-align="center" flex-grow="15" width="250px" resizable/>
          <vaadin-grid-column id="grdBtnDownload" header="다운로드" text-align="center" flex-grow="10" width="150px" resizable/>
          <vaadin-grid-column path="downloadCnt" header="다운로드 횟수" text-align="center" flex-grow="1" width="120px" resizable/>
          <vaadin-grid-column path="status" header="상태" text-align="center" flex-grow="5" width="100px" resizable/>
          <vaadin-grid-column id="grdBtnPurchaseCancle" header="구매취소" text-align="center" flex-grow="10" width="150px" resizable/>
          <vaadin-grid-column id="grdOrdererNm" path="ordererNm" header="주문자" text-align="center" flex-grow="10" width="100px" resizable/>
          <vaadin-grid-column id="grdEmail" path="email" header="주문자 아이디" text-align="center" flex-grow="10" width="150px" resizable/>
        </vaadin-grid>
        <div id="pages" className="pagination"/>
      </Fragment>
    );
  }
}
export default OrderHistoryGrid;
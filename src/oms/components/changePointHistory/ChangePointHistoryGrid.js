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
        email: e.get("email"), 
        changeDt: dateFormat(new Date(e.get("changeDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        // changeType: e.get("changeType"),
        odrPaymentNo: e.get("odrNo") ? e.get("odrNo") : e.get("paymentNo"),
        paymentCash: e.get("paymentCash"),
        changeType: changeType,
        changePoint: e.get("changePoint"),
        currentBalPoint: e.get("currentBalPoint"),
        userNm: e.get("userNm")
      })
    })
    
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = list;

    const {role} = this.props;

    let hiddenCheck = true;
    if (role === 'ROLE_ADMIN') {
      hiddenCheck = false;
    }
    document.querySelector('#grdUserNm').hidden = hiddenCheck;
    document.querySelector('#grdEmail').hidden = hiddenCheck;

    const btnExcel = document.querySelector('#btnExcel');
    if (role === 'ROLE_ADMIN') {
      btnExcel.hidden = true;
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
  }

  render() {
    return (
      <Fragment>
        <div>
          <div className="div-sub-top-right">
            <vaadin-button id="btnExcel" />
          </div>
          <vaadin-grid theme="column-borders row-stripes" height-by-rows column-reordering-allowed>
            <vaadin-grid-column path="changeDt" header="변동 일자" text-align="center" flex-grow="2" />
            <vaadin-grid-column path="odrPaymentNo" header="결제(주문)번호" text-align="center" flex-grow="2" />
            <vaadin-grid-column path="paymentCash" header="결제 금액" text-align="center" flex-grow="1" />
            <vaadin-grid-column path="changeType" header="변동 유형" text-align="center" flex-grow="1" />
            <vaadin-grid-column path="changePoint" header="변동 포인트" text-align="center" flex-grow="1.5" />
            <vaadin-grid-column path="currentBalPoint" header="남은 포인트" text-align="center" flex-grow="1.5" />
            <vaadin-grid-column id="grdUserNm" path="userNm" header="주문자" text-align="center" flex-grow="1" />
            <vaadin-grid-column id="grdEmail" path="email" header="주문자 아이디" text-align="center" flex-grow="1" /> 
            {/* <vaadin-grid-column path="purchaseNo" header="구매번호" text-align="center" flex-grow="2" /> */}
          </vaadin-grid>
        </div>
      </Fragment>
    );
  }
}
export default ChangePointHistoryGrid;
import React, { Component } from 'react';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
// import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
// import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
// import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import { statusItems, realEstateTypeItems } from '../../items';
import { comma } from '../../../common/utils';

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
        // odrSid: e.get("odrSid"), 
        index: i++,
        email: e.get("email"), 
        odrNo: e.get("odrNo"),
        odrDt: dateFormat(new Date(e.get("odrDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        marketPrice: comma(e.get("marketPrice")),
        realEstateType: realEstateType,
        variationPoint: comma(e.get("variationPoint")),
        downloadEndDt: e.get("downloadEndDt"),
        downloadCnt: e.get("downloadCnt"),
        status: status,
        ordererNm: e.get("ordererNm")
      })
    })
    
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
      grid.items = list;

    const {role} = this.props;

    // 권한 여부에 따른 그리드 컬럼 노출
    let hiddenCheck = true;
    if (role === 'ROLE_ADMIN') {
      hiddenCheck = false;
    }
    document.querySelector('#grdOrdererNm').hidden = hiddenCheck;
    document.querySelector('#grdEmail').hidden = hiddenCheck;
    document.querySelector('#grdBtnDownload').hidden = !hiddenCheck;

    document.querySelector('#grdBtnDownload').renderer = function(root, column, rowData) {
      if (rowData.item.status === '구매취소') {
        root.innerHTML = '-';
      } else {
        root.innerHTML = '';
        const btnDownload = document.createElement('vaadin-button');
        // btnDownload.setAttribute('style', 'color: var(--lumo-contrast-text-color)');
        btnDownload.setAttribute('style', 'color: var(--lumo-primary-text-color)');
        btnDownload.textContent = '다운로드';
        btnDownload.addEventListener('click', function() {
          const check = window.confirm('해당 PDF를 다운로드 하시겠습니까?');
          if (check === true) {
            // 다운로드 버튼 클릭 시 동작 이벤트
          }
        })
        root.appendChild(btnDownload);
      }
    }
    // list.forEach(e => {
    //   if (e.downloadEndDt > new Date() === false) {

    //   }
    //   if (e.status === 'TRADE_COMPLETE') {
    //     console.log()
    //   }
    // })

    
  }

  render() {
    return (
      <vaadin-grid theme="column-borders row-stripes" height-by-rows column-reordering-allowed>
        {/* <vaadin-grid-sort-column path="odrSid" header="주문 SID" text-align="end" width="10px" flex-grow="1"></vaadin-grid-sort-column> */}
        <vaadin-grid-sort-column path="index" header="번호" text-align="end" flex-grow="0.2" />
        <vaadin-grid-column path="odrNo" header="주문 번호" text-align="center" flex-grow="2" />
        <vaadin-grid-column path="odrDt" header="주문 일자" text-align="center" flex-grow="2.5" />
        <vaadin-grid-column path="marketPrice" header="시세가" text-align="center" flex-grow="1" />
        <vaadin-grid-column path="realEstateType" header="부동산 유형" text-align="center" flex-grow="0.5" />
        <vaadin-grid-column path="variationPoint" header="증감 포인트" text-align="end" flex-grow="0.3" />
        <vaadin-grid-column path="downloadEndDt" header="다운로드 만료기간" text-align="center" flex-grow="1" />
        <vaadin-grid-column id="grdBtnDownload" header="다운로드" text-align="center" flex-grow="1" />
        <vaadin-grid-column path="downloadCnt" header="다운로드 횟수" text-align="center" flex-grow="1" />
        <vaadin-grid-column path="status" header="상태" text-align="center" flex-grow="0.5" />
        <vaadin-grid-column id="grdOrdererNm" path="ordererNm" header="주문자" text-align="center" flex-grow="1" />
        <vaadin-grid-column id="grdEmail" path="email" header="주문자 아이디" text-align="center" flex-grow="1" />
      </vaadin-grid>
    );
  }
}
export default OrderHistoryGrid;
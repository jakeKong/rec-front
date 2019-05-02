import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
// import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
// import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
// import '@vaadin/vaadin-grid/vaadin-grid-selection-column';

class OrderHistoryGrid extends Component {

  componentDidMount() {
    const { orderHistoryList } = this.props;
    if (!orderHistoryList || orderHistoryList === undefined || orderHistoryList.isEmpty()) {
      return
    }
    
    let dateFormat = require('dateformat');
    let list =[];
    // odrDt  dateType format 필요
    orderHistoryList.forEach(e => {
      // push Value type is JSON
      list.push({
        // odrSid: e.get("odrSid"), 
        email: e.get("email"), 
        pnu: e.get("pnu"),
        odrNo: e.get("odrNo"),
        odrDt: dateFormat(new Date(e.get("odrDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        variationPoint: e.get("variationPoint"),
        realEstateType: e.get("realEstateType"),
        status: e.get("status"),
      })
    })
    
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
      grid.items = list;

    // number set
    document.querySelector('#grdIndex').renderer = function(root, column, rowData) {
      root.textContent = rowData.index;
    }

  }

  render() {
    // email 컬럼 boolean값에 따른 hidden 체크를 위한
      const {email} = this.props;
      return (
        <Fragment>
          <vaadin-grid theme="column-borders row-stripes" height-by-rows column-reordering-allowed>
            {/* <vaadin-grid-sort-column path="odrSid" header="주문 SID" text-align="end" width="10px" flex-grow="1"></vaadin-grid-sort-column> */}
            <vaadin-grid-sort-column id="grdIndex" header="번호" text-align="end" flex-grow="0.2"></vaadin-grid-sort-column>
            <vaadin-grid-column path="email" header="이메일" text-align="center" hidden={email} flex-grow="1"></vaadin-grid-column>
            <vaadin-grid-column path="pnu" header="지번" text-align="center" flex-grow="1"></vaadin-grid-column>
            <vaadin-grid-column path="odrNo" header="주문 번호" text-align="center" flex-grow="2"></vaadin-grid-column>
            <vaadin-grid-column path="odrDt" header="주문 일자" text-align="center" flex-grow="2.5"></vaadin-grid-column>
            <vaadin-grid-column path="variationPoint" header="증감 포인트" text-align="end" flex-grow="0.3"></vaadin-grid-column>
            <vaadin-grid-column path="realEstateType" header="부동산 유형" text-align="center" flex-grow="0.5"></vaadin-grid-column>
            <vaadin-grid-column path="status" header="상태" text-align="center" flex-grow="0.5"></vaadin-grid-column>
          </vaadin-grid>
        </Fragment>
      );
  }
}
export default OrderHistoryGrid;
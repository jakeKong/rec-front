import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';

class PurchaseHistoryGrid extends Component {

  componentDidMount() {
    const { purchaseHistoryList } = this.props;
    if (!purchaseHistoryList || purchaseHistoryList === undefined || purchaseHistoryList.isEmpty()) {
        return
    }
    
    let dateFormat = require('dateformat');
    let list =[];
    // odrDt  dateType format 필요
    purchaseHistoryList.forEach(e => {
      // push Value type is JSON
      list.push({
        purchaseNo: e.get("purchaseNo"),
        purchaseDt: dateFormat(new Date(e.get("purchaseDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        purchasePoint: e.get("purchasePoint"),
        purchaseMoney: e.get("purchaseMoney"),
      })
    })
    
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
      grid.items = list;

    document.querySelector('#lbTitle').innerHTML = '포인트 구매내역';

  }

  render() {
      return (
        <Fragment>
            <label className="label-center" id="lbTitle"/>
            <vaadin-grid theme="column-borders row-stripes" height-by-rows column-reordering-allowed>
                <vaadin-grid-column path="purchaseNo" header="구매번호" text-align="center" flex-grow="3"></vaadin-grid-column>
                <vaadin-grid-column path="purchaseDt" header="구매일자" text-align="center" flex-grow="3"></vaadin-grid-column>
                <vaadin-grid-column path="purchasePoint" header="구매 포인트" text-align="center" flex-grow="2"></vaadin-grid-column>
                <vaadin-grid-column path="purchaseMoney" header="구매 금액" text-align="center" flex-grow="2"></vaadin-grid-column>
            </vaadin-grid>
        </Fragment>
      );
  }
}
export default PurchaseHistoryGrid;
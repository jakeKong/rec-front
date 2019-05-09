import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';

class ChangePointHistoryGrid extends Component {

  componentDidMount() {
    const { changePointHistoryList } = this.props;
    if (!changePointHistoryList || changePointHistoryList === undefined || changePointHistoryList.isEmpty()) {
      return
    }
    
    let dateFormat = require('dateformat');
    let list =[];
    // odrDt  dateType format 필요
    changePointHistoryList.forEach(e => {
      // push Value type is JSON
      list.push({
        changeDt: dateFormat(new Date(e.get("changeDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        changeType: e.get("changeType"),
        changePoint: e.get("changePoint"),
        currentBalPoint: e.get("currentBalPoint"),
        odrNo: e.get("odrNo"),
        purchaseNo: e.get("purchaseNo"),
      })
    })
    
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = list;

    document.querySelector('#lbTitle').innerHTML = '포인트 변동내역';
  }

  render() {
    return (
      <Fragment>
        <label className="label-center" id="lbTitle"/>
        <vaadin-grid theme="column-borders row-stripes" height-by-rows column-reordering-allowed>
          <vaadin-grid-column path="changeDt" header="변동 일자" text-align="center" flex-grow="2" />
          <vaadin-grid-column path="changeType" header="변동 유형" text-align="center" flex-grow="1" />
          <vaadin-grid-column path="changePoint" header="변동 포인트" text-align="center" flex-grow="1.5" />
          <vaadin-grid-column path="currentBalPoint" header="남은 포인트" text-align="center" flex-grow="1.5" />
          <vaadin-grid-column path="odrNo" header="주문번호" text-align="center" flex-grow="2" />
          <vaadin-grid-column path="purchaseNo" header="구매번호" text-align="center" flex-grow="2" />
        </vaadin-grid>
      </Fragment>
    );
  }
}
export default ChangePointHistoryGrid;
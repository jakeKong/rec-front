import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';

class ReportMakeHistoryGrid extends Component {

  componentDidMount() {
    const { reportMakeHistoryList } = this.props;
    if (!reportMakeHistoryList || reportMakeHistoryList === undefined || reportMakeHistoryList.isEmpty()) {
      return
    }
    
    let dateFormat = require('dateformat');
    let list =[];
    // odrDt  dateType format 필요
    reportMakeHistoryList.forEach(e => {
      // push Value type is JSON
      list.push({
        reportMakeNo: e.get("reportMakeNo"), 
        pnu: e.get("pnu"),
        marketPrice: e.get("marketPrice"),
        reportMakeDt: dateFormat(new Date(e.get("reportMakeDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        reportEndDt: dateFormat(new Date(e.get("reportEndDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        reportMakeCnt: e.get("reportMakeCnt"),
        reportType: e.get("reportType"),
        orderBy: e.get("orderBy"),
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
      return (
        <Fragment>
          <vaadin-grid theme="column-borders row-stripes" height-by-rows column-reordering-allowed>
            <vaadin-grid-sort-column id="grdIndex" header="번호" text-align="end" flex-grow="0.25" />
            <vaadin-grid-column path="reportMakeNo" header="보고서 생성번호" text-align="center" flex-grow="2" />
            <vaadin-grid-column path="pnu" header="지번" text-align="center" flex-grow="1" />
            <vaadin-grid-column path="marketPrice" header="시세가" text-align="center" flex-grow="0.5" />
            <vaadin-grid-column path="reportMakeDt" header="생성일자" text-align="center" flex-grow="2" />
            <vaadin-grid-column path="reportEndDt" header="생성 만료기간" text-align="center" flex-grow="2" />
            <vaadin-grid-column path="reportMakeCnt" header="생성 횟수" text-align="center" flex-grow="0.25" />
            <vaadin-grid-column path="reportType" header="보고서 종류" text-align="center" flex-grow="0.5" />
            <vaadin-grid-column path="orderBy" header="주문자" text-align="center" flex-grow="0.5" />
          </vaadin-grid>
        </Fragment>
      );
  }
}
export default ReportMakeHistoryGrid;
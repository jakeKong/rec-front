import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import { changeTypeItems } from '../../items';

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

    document.querySelector('#lbTitle').innerHTML = '포인트 변동내역';

    const {role} = this.props;

    let hiddenCheck = true;
    if (role === 'ROLE_ADMIN') {
      hiddenCheck = false;
    }
    document.querySelector('#grdUserNm').hidden = hiddenCheck;
    document.querySelector('#grdEmail').hidden = hiddenCheck;
  }

  render() {
    return (
      <Fragment>
        <div>
          <label className="label-center" id="lbTitle"/>
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
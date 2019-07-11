import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';

class PaymentHistoryGrid extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  componentDidMount() {
    const { paymentHistoryList } = this.props;
    if (!paymentHistoryList || paymentHistoryList === undefined || paymentHistoryList === null) {
      return
    }
    console.log(paymentHistoryList);
  
    let dateFormat = require('dateformat');

    let list = [];
    paymentHistoryList.body.list.forEach(e => {
      let dateStringValue = e.tradeConfirmYmdt.substring(0,4)+'-'+e.tradeConfirmYmdt.substring(4,6)+'-'+e.tradeConfirmYmdt.substring(6,8)+'T'+e.tradeConfirmYmdt.substring(8,10)+':'+e.tradeConfirmYmdt.substring(10,12)+':'+e.tradeConfirmYmdt.substring(12,14);
      list.push({
        paymentId: e.paymentId,
        productName: e.productName,
        totalPayAmount: e.totalPayAmount,
        tradeConfirmYmdt: dateFormat(new Date(dateStringValue), 'yyyy년mm월dd일 HH:MM:ss'),
        primaryPayMeans: e.primaryPayMeans
      })
    })
    // paymentHistoryList.list.forEach(e=> {
    //   let dateStringValue = e.tradeConfirmYmdt.substring(0,4)+'-'+e.tradeConfirmYmdt.substring(4,6)+'-'+e.tradeConfirmYmdt.substring(6,8)+'T'+e.tradeConfirmYmdt.substring(8,10)+':'+e.tradeConfirmYmdt.substring(10,12)+':'+e.tradeConfirmYmdt.substring(12,14);
    //   e.tradeConfirmYmdt = dateFormat(new Date(dateStringValue), 'yyyy년mm월dd일 HH:MM:ss');
    // })

    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = list;
    grid.className = "agz-bbs";

  }

  render() {
    return (
      <Fragment>
        <div>
          <vaadin-grid theme="row-stripes" height-by-rows column-reordering-allowed>
            <vaadin-grid-column path="paymentId" header="결제번호" text-align="center" flex-grow="4" />
            <vaadin-grid-column path="productName" header="상품명" text-align="center" flex-grow="1" />
            <vaadin-grid-column path="totalPayAmount" header="결제금액" text-align="center" flex-grow="1" />
            <vaadin-grid-column path="tradeConfirmYmdt" header="결제완료일자" text-align="center" flex-grow="2" />
            <vaadin-grid-column path="primaryPayMeans" header="결제방식" text-align="center" flex-grow="1" />
          </vaadin-grid>
        </div>
      </Fragment>
    );
  }
}
export default PaymentHistoryGrid;
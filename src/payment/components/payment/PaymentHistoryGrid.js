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
  
    let dateFormat = require('dateformat');
    console.log(new Date("20190531163956"));
    console.log(parseInt("20190531163956"));
    console.log(new Date(parseInt("20190531163956")));
    paymentHistoryList.list.forEach(e=> {
      e.tradeConfirmYmdt = dateFormat(new Date(parseInt(e.tradeConfirmYmdt)), 'yyyy년mm월dd일 HH:MM:ss');
    })

    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = paymentHistoryList.list;

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
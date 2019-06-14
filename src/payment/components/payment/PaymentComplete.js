import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-icons'

class PaymentComplete extends Component {

  componentDidMount() {
    const { paymentRequest } = this.props;
    if (!paymentRequest || paymentRequest === undefined || paymentRequest === null) {
      return
    } else {
  
      document.querySelector('#lbPaymentCompleteNotification').innerHTML = "포인트 구매가 정상적으로 처리되었습니다."

      document.querySelector('#lbPaymentId').innerHTML = "구매번호 : ";
      document.querySelector('#lbPaymentIdResult').innerHTML = paymentRequest.body.detail.paymentId;
      document.querySelector('#lbTotalPayAmount').innerHTML = "총 결제금액 : ";
      document.querySelector('#lbTotalPayAmountResult').innerHTML = paymentRequest.body.detail.totalPayAmount;
      document.querySelector('#lbTradeConfirmYmdt').innerHTML = "구매일자 : ";
      document.querySelector('#lbTradeConfirmYmdtResult').innerHTML = paymentRequest.body.detail.tradeConfirmYmdt;
      document.querySelector('#lbPurchasePoint').innerHTML = "구매포인트 : ";
      document.querySelector('#lbPurchasePointResult').innerHTML = paymentRequest.totalPoint;

      const btnGoProduct = document.querySelector('#btnGoProduct');
      btnGoProduct.className = "vaadin-button-large";
      btnGoProduct.addEventListener('click', function() {
        window.location.href = "/#/payment/product/";
        window.location.reload();
      })

      const btnGoHome = document.querySelector('#btnGoHome');
      btnGoHome.className = "vaadin-button-large";
      btnGoHome.addEventListener('click', function() {
        window.location.href = "/#/";
        window.location.reload();
      });

      const btnGoPaymentHistory = document.querySelector('#btnGoPaymentHistory');
      btnGoPaymentHistory.className = "vaadin-button-large";
      btnGoPaymentHistory.addEventListener('click', function() {
        window.location.href = "/#/payment/history/";
        window.location.reload();
      });

    }

  }

  render() {
    return (
      <Fragment>
        <div>
          <div className="div-center">
            <label id="lbPaymentCompleteNotification" className="label-title"/>
          </div>
          <div className="div-layout-card">
            <div className="div-layout-card-column">
              <label id="lbPaymentId" className="label-flex-30-right"/>
              <label id="lbPaymentIdResult" className="label-flex-70-center"/>
            </div>
            <div className="div-layout-card-column">
              <label id="lbTotalPayAmount" className="label-flex-30-right"/>
              <label id="lbTotalPayAmountResult" className="label-flex-70-center"/>
            </div>
            <div className="div-layout-card-column">
              <label id="lbTradeConfirmYmdt" className="label-flex-30-right"/>
              <label id="lbTradeConfirmYmdtResult" className="label-flex-70-center"/>
            </div>
            <div className="div-layout-card-column">
              <label id="lbPurchasePoint" className="label-flex-30-right"/>
              <label id="lbPurchasePointResult" className="label-flex-70-center"/>
            </div>
          </div>
          <div>
            <vaadin-button id="btnGoProduct">
              <iron-icon icon="vaadin:angle-left" slot="prefix" />
              상품구매
            </vaadin-button>
            <vaadin-button id="btnGoHome">
              <iron-icon icon="vaadin:home" slot="prefix" />
              홈
            </vaadin-button>
            <vaadin-button id="btnGoPaymentHistory">
              <iron-icon icon="vaadin:angle-right" slot="suffix" />
              구매내역
            </vaadin-button>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default PaymentComplete;
import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-icons'

import { comma } from '../../../common/utils';

class PaymentComplete extends Component {

  componentDidMount() {
    const { purchaseResult } = this.props;
    if (!purchaseResult || purchaseResult === undefined || purchaseResult === null) {
      return
    } else {

      let dateFormat = require('dateformat');

      document.querySelector('#lbPaymentCompleteNotification').innerHTML = "포인트 구매가 정상적으로 처리되었습니다."

      document.querySelector('#lbPaymentId').innerHTML = "구매번호 : ";
      document.querySelector('#lbPaymentIdResult').innerHTML = purchaseResult.merchant_uid;
      document.querySelector('#lbTotalPayAmount').innerHTML = "총 결제금액 : ";
      document.querySelector('#lbTotalPayAmountResult').innerHTML = comma(purchaseResult.paid_amount)+' 원';
      document.querySelector('#lbTradeConfirmYmdt').innerHTML = "구매일자 : ";
      document.querySelector('#lbTradeConfirmYmdtResult').innerHTML = dateFormat(new Date(purchaseResult.paid_at*1000), 'yyyy년 mm월 dd일 HH:MM:ss');
      document.querySelector('#lbPurchasePoint').innerHTML = "구매포인트 : ";
      document.querySelector('#lbPurchasePointResult').innerHTML = purchaseResult.custom_data.point+' P';

      const btnGoProduct = document.querySelector('#btnGoProduct');
      btnGoProduct.className = "vaadin-button-large";
      btnGoProduct.addEventListener('click', function() {
        window.location.href = "/payment/product/";
      })

      const btnGoHome = document.querySelector('#btnGoHome');
      btnGoHome.className = "vaadin-button-large";
      btnGoHome.addEventListener('click', function() {
        window.location.href = "/";
      });

      const btnGoPaymentHistory = document.querySelector('#btnGoPaymentHistory');
      btnGoPaymentHistory.className = "vaadin-button-large";
      btnGoPaymentHistory.addEventListener('click', function() {
        window.location.href = "/oms/changepoint/history/email";
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
              포인트 변동내역
            </vaadin-button>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default PaymentComplete;
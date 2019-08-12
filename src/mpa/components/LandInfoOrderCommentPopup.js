import React, { Component, Fragment } from 'react';

import axios from 'axios';
import config from '../../config';

// layout
import '@vaadin/vaadin-ordered-layout';

// component
import '@vaadin/vaadin-overlay';
import '@vaadin/vaadin-dialog';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-number-field';

let comment = '';
class LandInfoOrderCommentPopup extends Component {

  constructor(props) {
    super(props);
    this.state ={
      clicked: {
        type: Boolean,
        value: false
      },
      noCloseOnOutsideClick: {
        type: Boolean,
        value: false
      },
      noCloseOnEsc: {
        type: Boolean,
        value: false
      },
    }
  }

  /**
   * Close the dialog if `noCloseOnOutsideClick` isn't set to true
   */
  _handleOutsideClick(e) {
    if (this.state.noCloseOnOutsideClick) {
      e.preventDefault();
    }
  }

  /**
   * Close the dialog if `noCloseOnEsc` isn't set to true
   */
  _handleEscPress(e) {
    if (this.state.noCloseOnEsc) {
      e.preventDefault();
    }
  }
  componentDidMount() {
    // search parameter default setting
    const { clicked } = this.state;
    const { popupOpened } = this.props;
    if (popupOpened  === undefined) {
      return;
    } else {
      document.querySelector('#doRegister').opened = false;
      document.querySelector('#doRegister').withBackdrop = true;
      document.querySelector('#doRegister').focusTrap = true;
      document.querySelector('#doRegister').addEventListener('vaadin-overlay-outside-click', this._handleOutsideClick.bind(this));
      document.querySelector('#doRegister').addEventListener('vaadin-overlay-escape-press', this._handleEscPress.bind(this));

      document.querySelector('#lbLink').innerHTML = "구매 코멘트";
      const tfLink = document.querySelector('#tfLink');
      tfLink.placeholder = "구매하신 제품에 대하여 기록할 내용을 자유롭게 입력하세요.";
      tfLink.className = 'vaadin-text-field-width-200-flex-80';
      tfLink.addEventListener('input', function() {
        comment = tfLink.value;
        // console.log("---"+tfLink.value);
        // console.log("===="+comment);
      });

      // eslint-disable-next-line
      const { addCallback } = this.props;
      const btnOk = document.querySelector('#btnOk');
      btnOk.innerHTML = "확인";
      btnOk.addEventListener('click', function() {
        window.setTimeout(function() {
          // console.log("//////"+comment);
          addCallback(comment);          
        }, 3000);

        popupClose(clicked);
        document.querySelector('#doRegister').opened = false;
        
      });

      const { popupClose } = this.props;
      const btnCancle = document.querySelector('#btnCancle');
      btnCancle.innerHTML = "취소";
      btnCancle.addEventListener('click', function() {
        popupClose(clicked);
        document.querySelector('#doRegister').opened = false;
        comment='';
      });

      if (popupOpened === false) {
        document.querySelector('#doRegister').opened = false;
      } else if (popupOpened === true) {
        document.querySelector('#doRegister').opened = true;
      }
    }
  }

  render() {
    return (
      <Fragment>
        <vaadin-dialog-overlay id="doRegister">
          <div className="div-register-popup-board">
            <div>
              <label className="label-flex-20-left">
                확인 버튼을 클릭하면 보유하신 포인트가 차감됩니다.
              </label>
            <div>
            </div>    
              <label className="label-flex-20-left">
                주문하시는 부동산 정보의 메모를 남기려면 아래에 입력하십시오.
              </label>
            </div>    
            <div className="default-column">
              <label id="lbLink" className="label-flex-20-left"/>
              <vaadin-text-field id="tfLink" required prevent-invalid-input/>
            </div>      
          </div>
          <div className="div-register-popup-bottom">
            <vaadin-button id="btnOk"/>
            <vaadin-button id="btnCancle" theme="error"/>
          </div>
        </vaadin-dialog-overlay>
      </Fragment>
    );
  }
}

export default LandInfoOrderCommentPopup;
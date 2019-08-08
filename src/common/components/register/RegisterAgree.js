import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-checkbox'
import '@vaadin/vaadin-button';

class RegisterAgree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTermsOfService: false,
      isPersonalInformationCollectionAgreement: false
    }
    this.isTotalAgreeCheckEvent = this.isTotalAgreeCheckEvent.bind(this);
  }

  isTotalAgreeCheckEvent(boolean) {
    this.setState({isTermsOfService : boolean});
    this.setState({isPersonalInformationCollectionAgreement : boolean});
  }

  componentDidMount() {
    // 이용약관 동의
    document.querySelector('#lbTermsOfService').innerHTML = '이용약관';
    const taTermsOfService = document.querySelector('#taTermsOfService');
    taTermsOfService.className = 'vaadin-text-area-register-agree';
    document.querySelector('#lbTermsOfServiceAgree').innerHTML = '이용악관을 확인하였으며 동의합니다. <span style="color:blue">(필수)</span> ';
    const cbxTermsOfServiceAgree = document.querySelector('#cbxTermsOfServiceAgree');
    cbxTermsOfServiceAgree.innerHTML = '동의함';

    // 개인정보 수집 이용동의
    document.querySelector('#lbPersonalInformationCollectionAgreement').innerHTML = '개인정보 취급방침';
    const taPersonalInformationCollectionAgreement = document.querySelector('#taPersonalInformationCollectionAgreement');
    taPersonalInformationCollectionAgreement.className = 'vaadin-text-area-register-agree';
    document.querySelector('#lbPersonalInformationCollectionAgreementAgree').innerHTML = '개인정보 수집에 대한 약관을 확인하였으며 동의합니다. <span style="color:blue">(필수)</span>';
    const cbxPersonalInformationCollectionAgreement = document.querySelector('#cbxPersonalInformationCollectionAgreement');
    cbxPersonalInformationCollectionAgreement.innerHTML = '동의함';

    const isTotalAgreeCheckEvent = this.isTotalAgreeCheckEvent;
    // 하단 전체동의 및 확인
    document.querySelector('#lbTotalAgree').innerHTML = '위 내용을 모두 확인하였으며 전체 동의합니다.'
    const cbxTotalAgree = document.querySelector('#cbxTotalAgree');
    customElements.whenDefined('vaadin-checkbox').then(function() {
      const options = Array.from(document.querySelectorAll('vaadin-checkbox[value]'));
      cbxTotalAgree.innerHTML = '모두 동의함';
      cbxTotalAgree.addEventListener('change', function() {
        options.forEach(e => {
          e.checked = cbxTotalAgree.checked;
        })
        isTotalAgreeCheckEvent(cbxTotalAgree.checked);
      })
      const syncState = function() {
        const isChecked = function(cb) {
          return cb.checked;
        };
        cbxTotalAgree.checked = options.every(isChecked);
        cbxTotalAgree.indeterminate = options.some(isChecked) && !options.every(isChecked);
        isTotalAgreeCheckEvent(cbxTotalAgree.checked);
      };
  
      options.forEach(function(option) {
        option.addEventListener('change', syncState);
      });
      syncState();
    })

    const { goCommonRegisterCallback } = this.props;

    const btnCommonRegister = document.querySelector('#btnCommonRegister');
    btnCommonRegister.textContent = '일반 회원가입';
    btnCommonRegister.className = 'vaadin-button-register-agree-common'
    btnCommonRegister.addEventListener('click', function() {
      if (cbxTotalAgree.checked) {
        // 일반 회원가입 요청 이벤트
        goCommonRegisterCallback();
      } else {
        window.alert('동의하지 않은 항목이 있습니다.\n동의 후 다시 시도해주세요')
      }
    })

    let naverLoginRegister = new window.naver.LoginWithNaverId({
      clientId: "nwXOVGpHJOzfV1oBeUqn",
      // clientSecret = 'hr1p7IcsN7';
      callbackUrl: "http://localhost:3000/naver/reg/pop",
      isPopup: true, /* 팝업을 통한 연동처리 여부 */
      loginButton: {color: "white", type: 3, height: 60} /* 로그인 버튼의 타입을 지정 */
    })
    naverLoginRegister.init();

    let termsOfService = require('../../file/termsOfService.txt')
    let personalInformationCollectionAgreement = require('../../file/personalInformationCollectionAgreement.txt')
    fetch(termsOfService).then(r => r.text()).then(text => {
      taTermsOfService.value = text;
    })
    fetch(personalInformationCollectionAgreement).then(r => r.text()).then(text => {
      taPersonalInformationCollectionAgreement.value = text;
    })
  }

  render() {
    return (
      <Fragment>
        <div className="div-register-agree">
          <div className="div-register-agree-box">
            <label id="lbTermsOfService" className="label-register-agree-sub-title"/>
            <vaadin-text-area id="taTermsOfService" readonly/>
            {/* <textarea id="taTermsOfService" rows="10" cols="100" readOnly /> */}
            {/* <iframe id="frameTermsOfService" src={termsOfService} width='0' height='0'></iframe> */}
            <div className="div-register-agree-box-check">
              <label id="lbTermsOfServiceAgree" className="label-register-agree-column"/>
              <vaadin-checkbox id="cbxTermsOfServiceAgree" value="cbxTermsOfServiceAgree"/>
            </div>
          </div>

          <div className="div-register-agree-box">
            <label id="lbPersonalInformationCollectionAgreement" className="label-register-agree-sub-title"/>
            <vaadin-text-area id="taPersonalInformationCollectionAgreement" readonly/>
            {/* <textarea id="taPersonalInformationCollectionAgreement" rows="10" cols="100" readOnly /> */}
            <div className="div-register-agree-box-check">
              <label id="lbPersonalInformationCollectionAgreementAgree" className="label-register-agree-column"/>
              <vaadin-checkbox id="cbxPersonalInformationCollectionAgreement" value="cbxPersonalInformationCollectionAgreement"/>
            </div>
          </div>

          <div className="div-register-agree-total">
            <label id="lbTotalAgree" className="label-register-agree-total"/>
            <vaadin-checkbox id="cbxTotalAgree"/>
          </div>
          <div className="div-register-agree-button">
            <vaadin-button id="btnCommonRegister"/>
            {/* <vaadin-button id="btnNaverRegister"/> */}
            <div id="naverIdLogin"></div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default RegisterAgree;
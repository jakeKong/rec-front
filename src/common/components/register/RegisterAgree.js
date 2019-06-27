import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-text-field/vaadin-text-area';
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
    taTermsOfService.value = '이용약관 내용 ---- 테스트'
    taTermsOfService.className = 'vaadin-text-area-register-agree';
    document.querySelector('#lbTermsOfServiceAgree').innerHTML = '이용악관을 확인하였으며 동의합니다. <span style="color:blue">(필수)</span> ';
    const cbxTermsOfServiceAgree = document.querySelector('#cbxTermsOfServiceAgree');
    cbxTermsOfServiceAgree.innerHTML = '동의함';

    // 개인정보 수집 이용동의
    document.querySelector('#lbPersonalInformationCollectionAgreement').innerHTML = '개인정보수집에 대한 이용 안내';
    const taPersonalInformationCollectionAgreement = document.querySelector('#taPersonalInformationCollectionAgreement');
    taPersonalInformationCollectionAgreement.value = '테스트';
    taPersonalInformationCollectionAgreement.className = 'vaadin-text-area-register-agree';
    document.querySelector('#lbPersonalInformationCollectionAgreementAgree').innerHTML = '개인정보 수집에 대한 약관을 확인하였으며 동의합니다. <span style="color:blue">(필수)</span>';
    const cbxPersonalInformationCollectionAgreement = document.querySelector('#cbxPersonalInformationCollectionAgreement');
    cbxPersonalInformationCollectionAgreement.innerHTML = '동의함';

    const isTotalAgreeCheckEvent = this.isTotalAgreeCheckEvent;
    // 하단 전체동의 및 확인
    document.querySelector('#lbTotalAgree').innerHTML = '위 내용을 모두 확인하였으며 전체 동의합니다.'
    customElements.whenDefined('vaadin-checkbox').then(function() {
      const options = Array.from(document.querySelectorAll('vaadin-checkbox[value]'));
      const cbxTotalAgree = document.querySelector('#cbxTotalAgree');
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

    const { goCommonRegisterCallback, goNaverRegisterCallback } = this.props;

    const btnCommonRegister = document.querySelector('#btnCommonRegister');
    btnCommonRegister.textContent = '일반 회원가입';
    btnCommonRegister.className = 'vaadin-button-register-agree-common'
    btnCommonRegister.addEventListener('click', function() {
      // 일반 회원가입 요청 이벤트
      goCommonRegisterCallback();
    })

    const btnNaverRegister = document.querySelector('#btnNaverRegister')
    btnNaverRegister.textContent = '네이버로 회원가입';
    btnNaverRegister.className = 'vaadin-button-register-agree-naver'
    btnNaverRegister.addEventListener('click', function() {
      // 네이버 회원가입 요청 이벤트
      goNaverRegisterCallback();
    })
  }

  render() {
    console.log(this.state.isTermsOfService)
    console.log(this.state.isPersonalInformationCollectionAgreement)
    return (
      <Fragment>
        <div className="div-register-agree">
          <div className="div-register-agree-box">
            <label id="lbTermsOfService" className="label-register-agree-sub-title"/>
            <vaadin-text-area id="taTermsOfService" readonly/>
            <div className="div-register-agree-box-check">
              <label id="lbTermsOfServiceAgree"/>
              <vaadin-checkbox id="cbxTermsOfServiceAgree" value="cbxTermsOfServiceAgree"/>
            </div>
          </div>

          <div className="div-register-agree-box">
            <label id="lbPersonalInformationCollectionAgreement" className="label-register-agree-sub-title"/>
            <vaadin-text-area id="taPersonalInformationCollectionAgreement" readonly/>
            <div className="div-register-agree-box-check">
              <label id="lbPersonalInformationCollectionAgreementAgree"/>
              <vaadin-checkbox id="cbxPersonalInformationCollectionAgreement" value="cbxPersonalInformationCollectionAgreement"/>
            </div>
          </div>

          <div className="div-register-agree-total">
            <label id="lbTotalAgree" className="label-register-agree-total"/>
            <vaadin-checkbox id="cbxTotalAgree"/>
          </div>
          <div className="div-register-agree-button">
            <vaadin-button id="btnCommonRegister"/>
            <vaadin-button id="btnNaverRegister"/>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default RegisterAgree;
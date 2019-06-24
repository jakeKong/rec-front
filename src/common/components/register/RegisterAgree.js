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
    this.isTermsOfServiceCheckEvent = this.isTermsOfServiceCheckEvent.bind(this);
    this.isPersonalInformationCollectionAgreementCheckEvent = this.isPersonalInformationCollectionAgreementCheckEvent.bind(this);
    this.isTotalAgreeCheckEvent = this.isTotalAgreeCheckEvent.bind(this);
  }

  isTermsOfServiceCheckEvent(boolean) {
    this.setState({isTermsOfService : boolean});
    console.log(this.state.isTermsOfService);
  }

  isPersonalInformationCollectionAgreementCheckEvent(boolean) {
    this.setState({isPersonalInformationCollectionAgreement : boolean});
    console.log(this.state.isPersonalInformationCollectionAgreement);
  }
  isTotalAgreeCheckEvent(boolean) {
    this.setState({isTermsOfService : boolean});
    this.setState({isPersonalInformationCollectionAgreement : boolean});
    console.log(this.state.isTermsOfService);
    console.log(this.state.isPersonalInformationCollectionAgreement);
  }

  componentDidMount() {

    const isTermsOfServiceCheckEvent = this.isTermsOfServiceCheckEvent;
    // 이용약관 동의
    document.querySelector('#lbTermsOfService').innerHTML = '이용약관';
    const taTermsOfService = document.querySelector('#taTermsOfService');
    taTermsOfService.value = '이용약관 내용 ---- 테스트'
    taTermsOfService.className = 'vaadin-text-area-register-agree';
    document.querySelector('#lbTermsOfServiceAgree').innerHTML = '이용악관을 확인하였으며 동의합니다.(필수) ';
    const cbxTermsOfServiceAgree = document.querySelector('#cbxTermsOfServiceAgree');
    cbxTermsOfServiceAgree.innerHTML = '동의함';
    let termsOfServiceCheck = false;
    cbxTermsOfServiceAgree.addEventListener('change', function() {
      termsOfServiceCheck = !termsOfServiceCheck;
      isTermsOfServiceCheckEvent(termsOfServiceCheck);
    })

    const isPersonalInformationCollectionAgreementCheckEvent = this.isPersonalInformationCollectionAgreementCheckEvent;
    // 개인정보 수집 이용동의
    document.querySelector('#lbPersonalInformationCollectionAgreement').innerHTML = '개인정보수집에 대한 이용 안내';
    const taPersonalInformationCollectionAgreement = document.querySelector('#taPersonalInformationCollectionAgreement');
    taPersonalInformationCollectionAgreement.value = '테스트';
    taPersonalInformationCollectionAgreement.className = 'vaadin-text-area-register-agree';
    document.querySelector('#lbPersonalInformationCollectionAgreementAgree').innerHTML = '개인정보 수집에 대한 약관을 확인하였으며 동의합니다(필수) ';
    const cbxPersonalInformationCollectionAgreement = document.querySelector('#cbxPersonalInformationCollectionAgreement');
    cbxPersonalInformationCollectionAgreement.innerHTML = '동의함';
    let personalInformationCollectionAgreementCheck = false;
    cbxPersonalInformationCollectionAgreement.addEventListener('change', function() {
      personalInformationCollectionAgreementCheck = !personalInformationCollectionAgreementCheck;
      isPersonalInformationCollectionAgreementCheckEvent(personalInformationCollectionAgreementCheck);
    })

    const isTotalAgreeCheckEvent = this.isTotalAgreeCheckEvent;
    // 하단 전체동의 및 확인
    document.querySelector('#lbTotalAgree').innerHTML = '위 내용을 모두 확인하였으며 전체 동의합니다.'
    const cbxTotalAgree = document.querySelector('#cbxTotalAgree');
    cbxTotalAgree.innerHTML = '모두 동의함';
    let totalAgreeCheck = false;
    cbxTotalAgree.addEventListener('change', function() {
      totalAgreeCheck = !totalAgreeCheck;
      isTotalAgreeCheckEvent(totalAgreeCheck);
    })

    const { goCommonRegisterCallback, goNaverRegisterCallback } = this.props;

    const btnCommonRegister = document.querySelector('#btnCommonRegister');
    btnCommonRegister.textContent = '일반 회원가입';
    btnCommonRegister.className = 'vaadin-button-register-agree-common'
    btnCommonRegister.addEventListener('click', function() {
      // 일반 회원가입 요청 이벤트
      console.log('test')
      goCommonRegisterCallback();
    })

    const btnNaverRegister = document.querySelector('#btnNaverRegister')
    btnNaverRegister.textContent = '네이버로 회원가입';
    btnNaverRegister.className = 'vaadin-button-register-agree-naver'
    btnNaverRegister.addEventListener('click', function() {
      // 네이버 회원가입 요청 이벤트
      console.log('test')
      goNaverRegisterCallback();
    })


  }

  render() {
    return (
      <Fragment>
        <div className="div-register-agree">
          <div className="div-register-agree-box">
            <label id="lbTermsOfService" className="label-register-agree-sub-title"/>
            <vaadin-text-area id="taTermsOfService"/>
            <div className="div-register-agree-box-check">
              <label id="lbTermsOfServiceAgree"/>
              <vaadin-checkbox id="cbxTermsOfServiceAgree"/>
            </div>
          </div>

          <div className="div-register-agree-box">
            <label id="lbPersonalInformationCollectionAgreement" className="label-register-agree-sub-title"/>
            <vaadin-text-area id="taPersonalInformationCollectionAgreement"/>
            <div className="div-register-agree-box-check">
              <label id="lbPersonalInformationCollectionAgreementAgree"/>
              <vaadin-checkbox id="cbxPersonalInformationCollectionAgreement"/>
            </div>
          </div>

          <div className="div-register-agree-total">
            <label id="lbTotalAgree"/>
            <vaadin-checkbox id="cbxTotalAgree"/>
          </div>
          <div>
            <vaadin-button id="btnCommonRegister"/>
            <vaadin-button id="btnNaverRegister"/>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default RegisterAgree;
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


    // 참고 url : https://developers.naver.com/docs/login/web/#2--javascript%EB%A1%9C-%EB%84%A4%EC%9D%B4%EB%B2%84-%EC%95%84%EC%9D%B4%EB%94%94%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
    /* 네이버 회원가입 설정 */
    // LoginWithNaverId Javascript 설정 정보 및 초기화
    let naverLoginRegister = new window.naver.LoginWithNaverId({
      // algozip 등록 clientID
      clientId: "1iW5r3Qytlk4tte3X_UX",
      // clientSecret = 'jdC9xJas1b';
      // 회원가입에 사용할 callback url
      callbackUrl: "http://algozip.co.kr/naver/reg/pop",
      isPopup: true, /* 팝업을 통한 연동처리 여부 */
      loginButton: {color: "white", type: 3, height: 60} /* 로그인 버튼의 타입을 지정 */
    })
    // // 설정 정보를 초기화하고 연동을 준비 (클릭 시 동작) - 약관동의 생략
    naverLoginRegister.init();

    // 이용약관
    // 개인정보 처리방침
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
            {/* 네이버 로그인 버튼이 들어갈 위치 선언, ID는 반드시 지정된 값으로 설정하여야 함. */}
            <div id="naverIdLogin"></div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default RegisterAgree;
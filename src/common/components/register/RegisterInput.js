import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-button';

class RegisterInput extends Component {
  constructor(props) {
    super(props);
    this.state ={
      dto: {
        email: null,
        name: null,
        password: null,
        tellNo: null,
        address: null,
        addressNo: null,
        birthDt: null,
        createdUser: null,
        assignedRoles: [],
      },
    }
  }

  componentDidMount() {
    const { dto } = this.state;
    // const resetDto = () => {
    //   tfEmailName.value = null;
    //   tfEmailDomain.value = null;
    //   tfEmailCom.value = null;
    //   tfNm.value = null;
    //   tfPw.value = null;
    //   tfRepw.value = null;
    //   tfTellStation.value = null;
    //   tfTellByNumber.value = null;
    //   tfTellNumberByNumber.value = null;
    //   tfAddress.value = null;
    //   tfAddressNo.value = null;
    //   dpBirthDt.value = null;
    //   dto.email = null;
    //   dto.password = null;
    //   dto.name = null;
    //   dto.tellNo = null;
    //   dto.address = null;
    //   dto.addressNo = null;
    //   dto.birthDt = null;
    //   dto.createdUser = null;
    //   dto.assignedRoles = [];
    // }

    document.querySelector('#lbEmail').innerHTML = "이메일";
    document.querySelector('#lbEmailCommercial').innerHTML = " @ ";
    document.querySelector('#lbEmailPeriod').innerHTML = " . ";
    
    document.querySelector('#lbPw').innerHTML = '비밀번호';
    document.querySelector('#lbRepw').innerHTML = '비밀번호 확인';

    document.querySelector('#lbNm').innerHTML = "이름";

    document.querySelector('#lbTellNo').innerHTML = "전화번호";
    document.querySelector('#lbTellNoHyphen').innerHTML = " - ";
    document.querySelector('#lbTellNoHyphenTo').innerHTML = " - ";

    document.querySelector('#lbAddress').innerHTML = "주소";
    document.querySelector('#lbAddressNo').innerHTML = "&nbsp&nbsp우편번호";
    document.querySelector('#lbBirthDt').innerHTML = "생년월일";

    // 이메일 입력필드
    const tfEmailName = document.querySelector('#tfEmailName');
    tfEmailName.className = 'vaadin-text-field-width-200';
    // tfEmailName.placeholder = '이메일을 입력해주세요.';
    const tfEmailDomain = document.querySelector('#tfEmailDomain');
    tfEmailDomain.className = 'vaadin-text-field-width-100';
    const tfEmailCom = document.querySelector('#tfEmailCom');
    tfEmailCom.className = 'vaadin-text-field-width-70';

    // 비밀번호 입력필드
    const tfPw = document.querySelector('#tfPw');
    tfPw.className = 'vaadin-text-field-width-200-flex-80';
    tfPw.placeholder = 'password';
    tfPw.addEventListener('input', function() {
      // dto.password = tfPw.value;
    })

    // 비밀번호 확인 입력필드
    const tfRepw = document.querySelector('#tfRepw');
    tfRepw.className = 'vaadin-text-field-width-200-flex-80';
    tfRepw.placeholder = 'RePassword';
    tfRepw.addEventListener('input', function() {
      // need add event
    })

    // 이름 입력필드
    const tfNm = document.querySelector('#tfNm');
    tfNm.className = 'vaadin-text-field-width-200-flex-80';
    tfNm.placeholder = '이름을 입력해주세요';
    tfNm.addEventListener('input', function() {
      dto.name = tfNm.value;
    })

    // 생년월일 입력필드
    const dpBirthDt = document.querySelector('#dpBirthDt');
    dpBirthDt.className = "vaadin-date-picker-width-150-flex-80";
    dpBirthDt.addEventListener('value-changed', function() {
      dto.birthDt = dpBirthDt.value;
    })   

    // 전화번호 입력필드
    const tfTellStation = document.querySelector('#tfTellStation');
    tfTellStation.className = 'vaadin-text-field-width-100'
    const tfTellByNumber = document.querySelector('#tfTellByNumber');
    tfTellByNumber.className = 'vaadin-text-field-width-100';
    const tfTellNumberByNumber = document.querySelector('#tfTellNumberByNumber');
    tfTellNumberByNumber.className = 'vaadin-text-field-width-100';

    // 주소 입력필드 (비활성)
    const tfAddress = document.querySelector('#tfAddress');
    tfAddress.className = 'vaadin-text-field-width-100-flex-30';
    tfAddress.disabled = true;
    const tfAddressNo = document.querySelector('#tfAddressNo');
    tfAddressNo.className = 'vaadin-text-field-width-100-flex-30';
    tfAddressNo.disabled = true;

    const { addCallback } = this.props;
    const btnOk = document.querySelector('#btnOk');
    btnOk.innerHTML = "확인";
    btnOk.addEventListener('click', function() {
      if (tfEmailName.value !== '' && tfEmailDomain.value !== '' && tfEmailCom.value !== '') {
        dto.email = tfEmailName.value+'@'+tfEmailDomain.value+'.'+tfEmailCom.value;
      }
      if (tfTellStation.value !== '' && tfTellByNumber.value !== '' && tfTellNumberByNumber.value !== '') {
        dto.tellNo = tfTellStation.value+'-'+tfTellByNumber.value+'-'+tfTellNumberByNumber.value;
      }
      if (dto.email === null || dto.email === undefined || dto.email === '') {
        window.alert('입력되지 않은 항목이 있습니다. 입력 후 다시 시도해주세요.');
        return;
      }
      // if (dto.password === null || dto.password === undefined || dto.password === '') {
      //   window.alert('입력되지 않은 항목이 있습니다. 입력 후 다시 시도해주세요.');
      //   return;
      // }
      if (dto.name === null || dto.name === undefined || dto.name === '') {
        window.alert('입력되지 않은 항목이 있습니다. 입력 후 다시 시도해주세요.');
        return;
      }
      if (dto.tellNo === null || dto.tellNo === undefined || dto.tellNo === '') {
        window.alert('입력되지 않은 항목이 있습니다. 입력 후 다시 시도해주세요.');
        return;
      }
      // if (dto.address === null || dto.address === undefined || dto.address === '') {
      //   window.alert('입력되지 않은 항목이 있습니다. 입력 후 다시 시도해주세요.');
      //   return;
      // }
      // if (dto.addressNo === null || dto.addressNo === undefined || dto.addressNo === '') {
      //   window.alert('입력되지 않은 항목이 있습니다. 입력 후 다시 시도해주세요.');
      //   return;
      // }
      if (dto.birthDt === null || dto.birthDt === undefined || dto.birthDt === '') {
        window.alert('입력되지 않은 항목이 있습니다. 입력 후 다시 시도해주세요.');
        return;
      }
      dto.assignedRoles.push('ROLE_USER');
      // 임시 설정
      dto.createdUser = '관리자';
      addCallback(dto);
      // resetDto();
    });

    const btnCancle = document.querySelector('#btnCancle');
    btnCancle.innerHTML = "취소";
    btnCancle.addEventListener('click', function() {
      // 취소 이벤트 추가 필요
      // resetDto();
    });

  }

  render() {
    return (
      <Fragment>
        <div className="div-register-input">
          <div className="email-column">
            <label id="lbEmail" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <vaadin-text-field id="tfEmailName" required prevent-invalid-input pattern="([a-zA-Zㄱ-ㅎ가-힣0-9]+?)"/>
              <label id="lbEmailCommercial"/>
              <vaadin-text-field id="tfEmailDomain" required prevent-invalid-input pattern="([a-zA-Zㄱ-ㅎ가-힣0-9]+?)"/>
              <label id="lbEmailPeriod"/>
              <vaadin-text-field id="tfEmailCom" required prevent-invalid-input pattern="([a-zA-Zㄱ-ㅎ가-힣0-9]+?)"/>
            </div>
          </div>
          <div className="default-column">
            <label id="lbPw" className="label-flex-20-left"/>
            <vaadin-text-field id="tfPw" required prevent-invalid-input pattern="^([a-zA-Zㄱ-ㅎ가-힣0-9\s]+$)"/>
          </div>
          <div className="default-column">
            <label id="lbRepw" className="label-flex-20-left"/>
            <vaadin-text-field id="tfRepw" required prevent-invalid-input pattern="^([a-zA-Zㄱ-ㅎ가-힣0-9\s]+$)"/>
          </div>
          <div className="default-column">
            <label id="lbNm" className="label-flex-20-left"/>
            <vaadin-text-field id="tfNm" required prevent-invalid-input pattern="^([a-zA-Zㄱ-ㅎ가-힣0-9\s]+$)"/>
          </div>
          <div className="default-column">
            <label id="lbBirthDt" className="label-flex-20-left"/>
            <vaadin-date-picker id="dpBirthDt"/>
          </div>
          <div className="default-column">
            <label id="lbTellNo" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <vaadin-text-field id="tfTellStation" required prevent-invalid-input pattern="^(\d{0,3}?)?$"/>
              <label id="lbTellNoHyphen"/>
              <vaadin-text-field id="tfTellByNumber" required prevent-invalid-input pattern="^(\d{0,4}?)?$"/>
              <label id="lbTellNoHyphenTo"/>
              <vaadin-text-field id="tfTellNumberByNumber" required prevent-invalid-input pattern="^(\d{0,4}?)?$"/>
            </div>
          </div>
          <div className="address-column">
            <label id="lbAddress" className="label-flex-20-left"/>
            <vaadin-text-field id="tfAddress" required prevent-invalid-input pattern="([a-zA-Zㄱ-ㅎ가-힣0-9]+?)"/>
            <label id="lbAddressNo" className="label-flex-20-left"/>
            <vaadin-text-field id="tfAddressNo" required prevent-invalid-input pattern="^(\d{0,7}?)?$"/>
          </div>
        </div>
        <div className="div-register-popup-bottom">
            <vaadin-button id="btnOk"/>
            <vaadin-button id="btnCancle" theme="error"/>
        </div>
      </Fragment>
    );
  }
}
export default RegisterInput;
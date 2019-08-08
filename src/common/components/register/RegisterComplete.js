import React, { Component, Fragment } from 'react';

class RegisterComplete extends Component {
  constructor(props) {
    super(props);
    this.state ={
      
    }
  }

  componentDidMount() {
    const {dto} = this.props;

    if (dto !== undefined || dto !== null) {
      if (dto.email !== null) {
        document.querySelector('#pRegisterCompleteEmailTitle').innerHTML = '이메일';
        document.querySelector('#pRegisterCompleteEmailBody').innerHTML = dto.email;
      }
      if (dto.name !== null) {
        document.querySelector('#pRegisterCompleteTitle').innerHTML = dto.name + ' 회원님 부동산 커뮤니티 회원이 되신 것을 진심으로 환영합니다.';
        document.querySelector('#pRegisterCompleteSubTitle').innerHTML = '다양하고 편리한 서비스와 풍성한 혜택으로 정성껏 모시겠습니다! 감사합니다.';
        document.querySelector('#pRegisterCompleteNameTitle').innerHTML = '이름';
        document.querySelector('#pRegisterCompleteNameBody').innerHTML = dto.name;
      }
      if (dto.tellNo !== null) {
        document.querySelector('#pRegisterCompleteTellNoTitle').innerHTML = '전화번호';
        document.querySelector('#pRegisterCompleteTellNoBody').innerHTML = dto.tellNo;
      }
      if (dto.birthDt !== null) {
        document.querySelector('#pRegisterCompleteBirthDtTitle').innerHTML = '생년월일';
        document.querySelector('#pRegisterCompleteBirthDtBody').innerHTML = dto.birthDt;
      }
      // if (dto.addressNo !== null) {

      // } 
      // if (dto.address !== null) {

      // }
      const btnGoLogin = document.querySelector('#btnGoLogin');
      btnGoLogin.textContent = '로그인';
      // btnGoLogin.className = 'vaadin-button-register-complete';
      btnGoLogin.addEventListener('click', function() {
        window.location.href = '/#/login';
      });
      const btnGoHome = document.querySelector('#btnGoHome');
      btnGoHome.textContent = '홈으로'
      // btnGoHome.className = 'vaadin-button-register-complete';
      btnGoHome.addEventListener('click', function() {
        window.location.href = '/#/';
      });
    } else {
      return null;
    }

  }

  render() {
    return (
      <Fragment>
        <div className="div-register-complete">
          <p id="pRegisterCompleteTitle" className="p-register-complete-title"/>
          <p id="pRegisterCompleteSubTitle" className="p-register-complete-sub-title"/>
          <div className="div-register-complete-field">
            <div className="div-register-complete-field-title">
              <p id="pRegisterCompleteEmailTitle"/>
              <p id="pRegisterCompleteNameTitle"/>
              <p id="pRegisterCompleteTellNoTitle"/>
              <p id="pRegisterCompleteBirthDtTitle"/>
              {/* <label />
              <label /> */}
            </div>
            <div className="div-register-complete-field-value">
              <p id="pRegisterCompleteEmailBody"/>
              <p id="pRegisterCompleteNameBody"/>
              <p id="pRegisterCompleteTellNoBody"/>
              <p id="pRegisterCompleteBirthDtBody"/>
              {/* <label />
              <label /> */}
            </div>
          </div>
        </div>
        <div className="div-register-complete-button">
          <button id="btnGoLogin"/>
          <button id="btnGoHome"/>
        </div>
      </Fragment>
    );
  }
}
export default RegisterComplete;
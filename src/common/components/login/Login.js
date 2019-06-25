import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  componentDidMount() {

    document.querySelector('#lbLoginTitle').innerHTML = '로그인';
    document.querySelector('#lbLoginId').innerHTML = '아이디';
    document.querySelector('#lbLoginPw').innerHTML = '비밀번호';
    document.querySelector('#lbRegister').innerHTML = '회원가입';
    document.querySelector('#lbPunct').innerHTML = ' | ';
    document.querySelector('#lbFindByIdPw').innerHTML = '아이디/비밀번호 찾기';

    const tfLoginId = document.querySelector('#tfLoginId');
    tfLoginId.placeholder = 'ID';
    tfLoginId.className = 'vaadin-text-field-id';
    tfLoginId.addEventListener('input', function() {
      // 아이디 입력 이벤트
    })

    const pfLoginPw = document.querySelector('#pfLoginPw');
    pfLoginPw.placeholder = 'password';
    pfLoginPw.className = 'vaadin-text-field-pw';
    pfLoginPw.addEventListener('input', function() {
      // 비밀번호 입력 이벤트
    });

    const btnLogin = document.querySelector('#btnLogin');
    btnLogin.textContent = '로그인'
    btnLogin.className = 'vaadin-button-login';
    btnLogin.addEventListener('click', function() {
      // 로그인 버튼 클릭 이벤트
    })

    // -- 네이버 로그인 버튼 적용 필요
    const btnNaverLogin = document.querySelector('#btnNaverLogin');
    btnNaverLogin.textContent = '네이버 로그인'
    btnNaverLogin.className = 'vaadin-button-login-naver';
    btnNaverLogin.addEventListener('click', function() {
      // 네이버로그인 버튼 클릭 이벤트
    })

  }

  render() {
    return (
      <Fragment>
        <div className="div-login-card">
          <label id="lbLoginTitle" className="label-login-title"/>
          <div className="div-login-field">
            <div className="div-login-input-field">
              <div className="div-login-form-id">
                <label id="lbLoginId" className="label-login-id"/>
                <vaadin-text-field id="tfLoginId"/>
              </div>
              <div className="div-login-form-pw">
                <label id="lbLoginPw" className="label-login-pw"/>
                <vaadin-password-field id="pfLoginPw"/>
              </div>
            </div>
            <div className="div-login-button-field">
              <vaadin-button id="btnLogin"/>
              {/* 네이버 로그인 버튼으로 변경 필요 */}
              <vaadin-button id="btnNaverLogin"/>
            </div>
          </div>
          <div className="div-sub-field">
            <label id="lbRegister" className="label-register"/>
            <label id="lbPunct"/>
            <label id="lbFindByIdPw" className="label-findby-idpw"/>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Login;
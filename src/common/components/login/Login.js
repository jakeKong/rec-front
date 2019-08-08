import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state ={
      // email: null,
      // password: null,
      user: {
        email: undefined,
        name: undefined
      }
    }
  }

  componentDidMount() {
    const { RealEstateCommunityLoginAttempt } = this.props;

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
      if (tfLoginId.value === null || tfLoginId.value === '' || tfLoginId.value === undefined) {
        window.confirm('아이디를 입력해주세요');
        return;
      }
      if (pfLoginPw.value === null || pfLoginPw.value === '' || pfLoginPw.value === undefined) {
        window.confirm('비밀번호를 입력해주세요');
        return;
      }

      RealEstateCommunityLoginAttempt(tfLoginId.value, pfLoginPw.value)
    })

    let naverLogin = new window.naver.LoginWithNaverId({
      clientId: "nwXOVGpHJOzfV1oBeUqn",
      // clientSecret = 'hr1p7IcsN7';
      callbackUrl: "http://localhost:3000/naver/log/pop",
      // callbackUrl: "http://localhost:3000/login",
      isPopup: true, /* 팝업을 통한 연동처리 여부 */
      loginButton: {color: "white", type: 3, height: 60} /* 로그인 버튼의 타입을 지정 */
    })
    naverLogin.init();

    const lbRegister = document.querySelector('#lbRegister');
    lbRegister.addEventListener('click', function() {
      window.location.href = '/register';
    })

    const lbFindByIdPw = document.querySelector('#lbFindByIdPw');
    lbFindByIdPw.addEventListener('click', function() {
      window.location.href = '/user/findhelp';
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
              {/* <vaadin-button id="btnNaverLogin"/> */}
              {/* <div id="naver_id_login"></div> */}
              <div id="naverIdLogin"></div>
              {/* <a id="naverLogin"><img src='http://static.nid.naver.com/oauth/small_g_in.PNG' height='50'/></a> */}
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
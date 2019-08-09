import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-button';
// import { Checkbox } from 'primereact/checkbox';
import { ToggleButton } from 'primereact/togglebutton';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state ={
      // id: '',
      // password: null,
      user: {
        email: undefined,
        name: undefined
      },
      checked: false,
    }
    this.idTextSavedCheckEvent = this.idTextSavedCheckEvent.bind(this);
    this.idSavedCheck = this.idSavedCheck.bind(this);
    this.setCookieById = this.setCookieById.bind(this);
    this.getCookieById = this.getCookieById.bind(this);
  }

  componentDidMount() {
    const getCookieById = this.getCookieById;
    getCookieById();

    document.querySelector('#lbLoginTitle').innerHTML = '로그인';
    document.querySelector('#lbLoginId').innerHTML = '아이디';
    document.querySelector('#lbLoginPw').innerHTML = '비밀번호';
    document.querySelector('#lbRegister').innerHTML = '회원가입';
    document.querySelector('#lbPunct').innerHTML = ' | ';
    document.querySelector('#lbFindByIdPw').innerHTML = '아이디/비밀번호 찾기';

    const tfLoginId = document.querySelector('#tfLoginId');
    tfLoginId.placeholder = 'ID';
    tfLoginId.className = 'vaadin-text-field-id';
    // tfLoginId.addEventListener('input', function() {
      // 아이디 입력 이벤트
    // })

    const pfLoginPw = document.querySelector('#pfLoginPw');
    pfLoginPw.placeholder = 'password';
    pfLoginPw.className = 'vaadin-text-field-pw';
    // pfLoginPw.addEventListener('input', function() {
      // 비밀번호 입력 이벤트
    // });

    const idSavedCheck = this.idSavedCheck;
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
      idSavedCheck(tfLoginId.value, pfLoginPw.value)
      // RealEstateCommunityLoginAttempt(tfLoginId.value, pfLoginPw.value)
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

  setCookieById(name, value, expiredays) {
    let today = new Date();
    today.setDate(today.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires="+ today.toGMTString() + ";";
  }

  getCookieById() {
    var cook = document.cookie + ';';
    var idx = cook.indexOf("userid", 0);
    var val = '';
    if (idx !== -1) {
      cook = cook.substring(idx, cook.length);
      let begin = cook.indexOf("=", 0) + 1;
      let end = cook.indexOf(";", begin);
      val = unescape(cook.substring(begin, end));
    }
    if (val !== '') {
      this.setState({checked: true})
      document.querySelector('#tfLoginId').value = val;
    }
  }

  idSavedCheck(id, pw) {
    const { checked } = this.state;
    const { RealEstateCommunityLoginAttempt } = this.props;
    const setCookieById = this.setCookieById;
    if (checked) {
      // 아이디 쿠키 저장 추가
      setCookieById('userid', id, 7);
      RealEstateCommunityLoginAttempt(id, pw)
    } else {
      // 쿠키 삭제
      setCookieById('userid', id, -1);
      RealEstateCommunityLoginAttempt(id, pw)
    }
  }

  idTextSavedCheckEvent(e) {
    this.setState({checked: e.value})
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
              {/* <Checkbox checked={this.state.checked} onChange={e => this.idTextSavedCheckEvent(e)} /> */}
              <ToggleButton checked={this.state.checked} onChange={e => this.idTextSavedCheckEvent(e)} onLabel="아이디 저장" offLabel="아이디 저장" onIcon="pi pi-check" offIcon="pi pi-times" style={{width: '120px'}}></ToggleButton>
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
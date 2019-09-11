import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-button';
// import { Checkbox } from 'primereact/checkbox';
import { ToggleButton } from 'primereact/togglebutton';
// import {InputText} from 'primereact/inputtext';
// import {Password} from 'primereact/password';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state ={
      id: '',
      password: '',
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
    document.querySelector('#lbLoginIdExample').innerHTML = 'ex) honggildong@naver.com';
    document.querySelector('#lbLoginPw').innerHTML = '비밀번호';
    document.querySelector('#lbRegister').innerHTML = '회원가입';
    document.querySelector('#lbPunct').innerHTML = ' | ';
    document.querySelector('#lbFindByIdPw').innerHTML = '아이디/비밀번호 찾기';

    const tfLoginId = document.querySelector('#tfLoginId');
    tfLoginId.placeholder = 'EMAIL';
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
    // 텍스트필드에서 Enter Key 입력 시 Validation 체크 후 동작 이벤트
    tfLoginId.addEventListener('keypress', function(e) {
      if (e.keyCode === 13) {
        if (tfLoginId.value === null || tfLoginId.value === '' || tfLoginId.value === undefined) {
          tfLoginId.focus();
          window.confirm('아이디를 입력해주세요');
          return;
        }
        if (pfLoginPw.value === null || pfLoginPw.value === '' || pfLoginPw.value === undefined) {
          pfLoginPw.focus();
          window.confirm('비밀번호를 입력해주세요');
          return;
        }
        idSavedCheck(tfLoginId.value, pfLoginPw.value)
      }
    })
    pfLoginPw.addEventListener('keypress', function(e) {
      if (e.keyCode === 13) {
        if (tfLoginId.value === null || tfLoginId.value === '' || tfLoginId.value === undefined) {
          tfLoginId.focus();
          window.confirm('아이디를 입력해주세요');
          return;
        }
        if (pfLoginPw.value === null || pfLoginPw.value === '' || pfLoginPw.value === undefined) {
          pfLoginPw.focus();
          window.confirm('비밀번호를 입력해주세요');
          return;
        }
        idSavedCheck(tfLoginId.value, pfLoginPw.value)
      }
    })

    /* 네이버 로그인 sdk 설정 */
    // 참고 url : https://developers.naver.com/docs/login/web/#2--javascript%EB%A1%9C-%EB%84%A4%EC%9D%B4%EB%B2%84-%EC%95%84%EC%9D%B4%EB%94%94%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
    // LoginWithNaverId Javascript 설정 정보 및 초기화
    let naverLogin = new window.naver.LoginWithNaverId({
      // algozip 등록 clientID
      clientId: "1iW5r3Qytlk4tte3X_UX",
      // clientSecret = 'jdC9xJas1b';
      // 로그인에 사용할 callback url
      callbackUrl: "http://algozip.co.kr/naver/log/pop",
      isPopup: true, /* 팝업을 통한 연동처리 여부 */
      loginButton: {color: "white", type: 3, height: 60} /* 로그인 버튼의 타입을 지정 */
    })
    // 설정 정보를 초기화하고 연동을 준비
    naverLogin.init();

    // 회원가입 버튼
    const lbRegister = document.querySelector('#lbRegister');
    lbRegister.addEventListener('click', function() {
      window.location.href = '/register';
    })

    // 아이디/비밀번호찾기 버튼
    const lbFindByIdPw = document.querySelector('#lbFindByIdPw');
    lbFindByIdPw.addEventListener('click', function() {
      window.location.href = '/user/findhelp';
    })
  }

  // 쿠키 설정
  setCookieById(name, value, expiredays) {
    let today = new Date();
    today.setDate(today.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires="+ today.toGMTString() + ";";
  }

  // 쿠키 가져오기
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

  // 아이디 저장 이벤트
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

  // 아이디 저장 체크여부
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
                <label id="lbLoginIdExample" style={{size: '9px', textAlign: 'left', color: 'lightgray'}} />
              </div>
              <div className="div-login-form-pw">
                <label id="lbLoginPw" className="label-login-pw"/>
                <vaadin-password-field id="pfLoginPw"/>
              </div>
              <ToggleButton checked={this.state.checked} onChange={e => this.idTextSavedCheckEvent(e)} onLabel="아이디 저장" offLabel="아이디 저장" onIcon="pi pi-check" offIcon="pi pi-times" style={{width: '120px'}}></ToggleButton>
            </div>
            <div className="div-login-button-field">
              <vaadin-button id="btnLogin"/>
              {/* 네이버 로그인 버튼이 들어갈 위치 선언, ID는 반드시 지정된 값으로 설정하여야 함. */}
              <div id="naverIdLogin"></div>
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
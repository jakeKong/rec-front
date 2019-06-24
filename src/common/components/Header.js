import React, { Component } from 'react';
import Menu from './Menu';

import srd_logo from '../../styles/images/srd_logo.png';

// vaadin component 변경 필요
class Header extends Component {
  
  constructor(props) {
    super(props);
    this.state ={
      loginSession: false
    }
  }

  sessionTest = (trueable) => {
    this.setState({loginSession : !trueable});
  }

  componentDidMount() {
    const test = document.querySelector('#test');
    let trueable = true;
    const sessionTest = this.sessionTest;
    test.addEventListener('click', function() {
      trueable = !trueable;
      sessionTest(trueable);
    });
    //
    document.querySelector('#name').innerHTML = '홍길동';
    document.querySelector('#nameTo').innerHTML = '님';
    document.querySelector('#MyPage').innerHTML = '마이페이지';

    const logout = document.querySelector('#logout');
    logout.innerHTML = '로그아웃';
    logout.addEventListener('click', function() {
      console.log('로그아웃')
    })
    const login = document.querySelector('#login');
    login.innerHTML = '로그인'
    login.addEventListener('click', function() {
      window.location.href = '/#/login';
    })
    const register = document.querySelector('#register');
    register.innerHTML = '회원가입'
    register.addEventListener('click', function() {
      window.location.href = '/#/register';
    })
  }

  render() {
    // 임시 로그인 세션 설정
    const { loginSession } = this.state;
    return (
      <div className="header">
        <div className="div-flex">
          <img src={srd_logo} alt=""/>
          <button id="test" style={{marginLeft: 500, height: 40}}> 로그인세션상태테스트 </button>
          { loginSession ? 
          <div className="div-header-sub-menu">
            <label id="name" className="label-color-focus" hidden={!loginSession}/>
            <label id="nameTo" hidden={!loginSession}/>
            <button id="logout" hidden={!loginSession}/>
            <label id="MyPage" className="label-focus" hidden={!loginSession}/>
            <button id="login" hidden={loginSession}/>
            <button id="register" hidden={loginSession}/>
          </div> : 
          <div className="div-header-sub-menu">
            <label id="name" className="label-color-focus" hidden={!loginSession}/>
            <label id="nameTo" hidden={!loginSession}/>
            <button id="logout" hidden={!loginSession}/>
            <label id="MyPage" className="label-focus" hidden={!loginSession}/>
            <button id="login" hidden={loginSession}/>
            <button id="register" hidden={loginSession}/>
          </div>
          }
        </div>
        <Menu />
      </div>
    );
  }
}

export default Header;
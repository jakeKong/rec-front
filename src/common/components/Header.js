import React, { Component } from 'react';
import Menu from './Menu';

import algozip_w from '../../styles/agz/algozip_w.png';

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
    document.querySelector('#name').textContent = '홍길동';
    document.querySelector('#MyPage').textContent = '마이페이지';

    const btnHeadLogout = document.querySelector('#btnHeadLogout');
    btnHeadLogout.className = "agz-fc"
    btnHeadLogout.textContent = '로그아웃';
    btnHeadLogout.addEventListener('click', function() {
      console.log('로그아웃')
    })
    const btnHeadLogin = document.querySelector('#btnHeadLogin');
    btnHeadLogin.className = "agz-fc"
    btnHeadLogin.textContent = '로그인'
    btnHeadLogin.addEventListener('click', function() {
      window.location.href = '/#/login';
    })
    const btnHeadRegister = document.querySelector('#btnHeadRegister');
    btnHeadRegister.className = "agz-fc"
    btnHeadRegister.textContent = '회원가입'
    btnHeadRegister.addEventListener('click', function() {
      window.location.href = '/#/register';
    })

    // document.querySelector('#liName').textContent = '홍길동';
    // document.querySelector('#liMyPage').textContent = '마이페이지';

    // const liHeadLogout = document.querySelector('#liHeadLogout');
    // liHeadLogout.textContent = '로그아웃';
    // liHeadLogout.addEventListener('click', function() {
    //   console.log('로그아웃')
    // })
    // const liHeadLogin = document.querySelector('#liHeadLogin');
    // liHeadLogin.textContent = '로그인'
    // liHeadLogin.addEventListener('click', function() {
    //   window.location.href = '/#/login';
    // })
    // const liHeadRegister = document.querySelector('#liHeadRegister');
    // liHeadRegister.textContent = '회원가입'
    // liHeadRegister.addEventListener('click', function() {
    //   window.location.href = '/#/register';
    // })
  }

  render() {
    // 임시 로그인 세션 설정
    const { loginSession } = this.state;
    return (
      <div className="header agz-bg p-rel">
        <div className="width-full align-center p-rel">
          <img src={algozip_w} alt="" className="logo"/>
            <button id="test" style={{height: 40}}> 세션테스트 </button>
            { loginSession ? 
            <div className="div-header-sub-menu wrap-btn-client">
              <label id="name" className="label-color-focus" hidden={!loginSession}/>
              <label id="nameTo" hidden={!loginSession}/>
              <button id="btnHeadLogout" hidden={!loginSession}/>
              <label id="MyPage" className="label-focus" hidden={!loginSession}/>
              <button id="btnHeadLogin" hidden={loginSession}/>
              <button id="btnHeadRegister" hidden={loginSession}/>
            </div> : 
            <div className="div-header-sub-menu wrap-btn-client">
              <label id="name" className="label-color-focus" hidden={!loginSession}/>
              <label id="nameTo" hidden={!loginSession}/>
              <button id="btnHeadLogout" hidden={!loginSession}/>
              <label id="MyPage" className="label-focus" hidden={!loginSession}/>
              <button id="btnHeadLogin" hidden={loginSession}/>
              <button id="btnHeadRegister" hidden={loginSession}/>
            </div>
            }
        </div>
        <Menu />
      </div>
    );
    /* 
    return (
      <div className="header">
        <div className="width-full">
          <img src={srd_logo} alt="" className="header-logo"/>
          <Menu />
        </div>
        <div className="div-flex-header">
          <button id="test" style={{height: 40}}> 세션테스트 </button>
          { loginSession ? 
          <ul className="ul-header-sub-menu">
            <li id="liName" className="li-header-name" hidden={!loginSession}/>
            <li id="liHeadLogout" className="li-header-logout" hidden={!loginSession}/>
            <li id="liMyPage" className="li-header-mypage" hidden={!loginSession}/>
            <li id="liHeadLogin" className="li-header-login" hidden={loginSession}/>
            <li id="liHeadRegister" className="li-header-register" hidden={loginSession}/>
          </ul> : 
          <ul className="ul-header-sub-menu">
            <li id="liName" className="li-header-name" hidden={!loginSession}/>
            <li id="liHeadLogout" className="li-header-logout" hidden={!loginSession}/>
            <li id="liMyPage" className="li-header-mypage" hidden={!loginSession}/>
            <li id="liHeadLogin" className="li-header-login" hidden={loginSession}/>
            <li id="liHeadRegister" className="li-header-register" hidden={loginSession}/>
          </ul>
          }
        </div>
      </div>
    );
    */
  }
}

export default Header;
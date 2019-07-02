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
    document.querySelector('#liName').textContent = '홍길동';
    document.querySelector('#liMyPage').textContent = '마이페이지';

    const liHeadLogout = document.querySelector('#liHeadLogout');
    liHeadLogout.textContent = '로그아웃';
    liHeadLogout.addEventListener('click', function() {
      console.log('로그아웃')
    })
    const liHeadLogin = document.querySelector('#liHeadLogin');
    liHeadLogin.textContent = '로그인'
    liHeadLogin.addEventListener('click', function() {
      window.location.href = '/#/login';
    })
    const liHeadRegister = document.querySelector('#liHeadRegister');
    liHeadRegister.textContent = '회원가입'
    liHeadRegister.addEventListener('click', function() {
      window.location.href = '/#/register';
    })
  }

  render() {
    // 임시 로그인 세션 설정
    const { loginSession } = this.state;
    return (
      <div className="header">
        <div className="div-flex-header">
          <img src={srd_logo} alt="" className="header-logo"/>
          <button id="test" style={{marginLeft: 500, height: 40}}> 로그인세션상태테스트 </button>
          <Menu />
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
  }
}

export default Header;
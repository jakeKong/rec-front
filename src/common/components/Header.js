import React, { Component } from 'react';
import Menu from './Menu';

import srd_logo from '../../styles/images/srd_logo.png';

// vaadin component 변경 필요
class Header extends Component {
  
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  componentDidMount() {
    document.querySelector('#name').innerHTML = '홍길동';
    document.querySelector('#nameTo').innerHTML = '님';
    document.querySelector('#MyPage').innerHTML = '마이페이지';
  }

  render() {
    // 임시 로그인 세션 설정
    let loginSession = true;
    return (
      <div className="header">
        <div className="div-flex">
          <img src={srd_logo} />
          
          { loginSession ? <div className="div-header-sub-menu">
            <label id="name" className="label-color-focus"/>
            <label id="nameTo"/>
            <button id="log_in_out">로그아웃</button>
            <label id="MyPage" className="label-focus"/>
          </div> :
          <div className="div-header-sub-menu">
            <button>로그인</button>
            <button>회원가입</button>
          </div>
          }
        </div>
        <Menu />
      </div>
    );
  }
}

export default Header;
import React, { Component } from 'react';
import Menu from './Menu';

import algozip_w from '../../styles/agz/algozip_w.png';
import storage from '../storage';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  componentDidMount() {
    if (storage.get('loggedInfo') !== undefined && storage.get('loggedInfo') !== null) {
      document.querySelector('#name').textContent = storage.get('loggedInfo').name;
      // document.querySelector('#balancePoint').textContent = storage.get('loggedInfo').balancePoint+'P';
    }
    // document.querySelector('#MyPage').textContent = '마이페이지';

    const btnHeadLogout = document.querySelector('#btnHeadLogout');
    btnHeadLogout.className = "agz-fc"
    btnHeadLogout.textContent = '로그아웃';
    btnHeadLogout.addEventListener('click', function() {
      storage.remove('loggedInfo');
      storage.remove('token');
      window.location.reload();
    })
    const btnHeadLogin = document.querySelector('#btnHeadLogin');
    btnHeadLogin.className = "agz-fc"
    btnHeadLogin.textContent = '로그인'
    btnHeadLogin.addEventListener('click', function() {
      window.location.href = '/login';
    })
    const btnHeadRegister = document.querySelector('#btnHeadRegister');
    btnHeadRegister.className = "agz-fc"
    btnHeadRegister.textContent = '회원가입'
    btnHeadRegister.addEventListener('click', function() {
      window.location.href = '/register';
    })
  }

  render() {
    const loggedInfo = storage.get('loggedInfo');
    return (
      <div className="header agz-bg p-rel">
        <div className="width-full align-center p-rel">
          <img src={algozip_w} alt="" className="logo"/>
            { loggedInfo ? 
            <div className="div-header-sub-menu wrap-btn-client">
              <label id="name" className="label-color-focus" hidden={!loggedInfo}/>
              {/* <label id="balancePoint" hidden={!loggedInfo}/> */}
              <label id="nameTo" hidden={!loggedInfo}/>
              <button id="btnHeadLogout" hidden={!loggedInfo}/>
              {/* <label id="MyPage" className="label-focus" hidden={!loggedInfo}/> */}
              <button id="btnHeadLogin" hidden={loggedInfo}/>
              <button id="btnHeadRegister" hidden={loggedInfo}/>
            </div> : 
            <div className="div-header-sub-menu wrap-btn-client">
              <label id="name" className="label-color-focus" hidden={!loggedInfo}/>
              {/* <label id="balancePoint" hidden={!loggedInfo}/> */}
              <label id="nameTo" hidden={!loggedInfo}/>
              <button id="btnHeadLogout" hidden={!loggedInfo}/>
              {/* <label id="MyPage" className="label-focus" hidden={!loggedInfo}/> */}
              <button id="btnHeadLogin" hidden={loggedInfo}/>
              <button id="btnHeadRegister" hidden={loggedInfo}/>
            </div>
            }
        </div>
        <Menu/>
      </div>
    );
  }
}

export default Header;
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import { Redirect } from 'react-router';
import { bindActionCreators } from "redux";
import * as userActions from "../../scm/modules/UserModule";
import { IdFindByAuth, IdFindByResult, PwFindById, PwFindByAuth, PwFindByReset, PwFindByResult } from "../index";

import { oauth_web } from '../../OAuth2Config'
import { getUser, getUserByNameAndTell, resetUserPwByEmailAndPassword, checkUserByTellNo } from '../../scm/api/userAxios';

class IdPwFindContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      userInfo: undefined,

      token: undefined,
      focusId: true,
      focusPw: false,

      idAuthStatus: true,
      idResultStatus: false,

      pwIdStatus: true,
      pwAuthStatus: false,
      pwResetStatus: false,
      pwResultStatus: false,

      resultCode: undefined,
    }
    this.findComponentRenderEvent = this.findComponentRenderEvent.bind(this);
    this.resetStateToIdCall = this.resetStateToIdCall.bind(this);
    this.resetStateToPwCall = this.resetStateToPwCall.bind(this);

    this.focusIdAuthStatusToChangeEvent = this.focusIdAuthStatusToChangeEvent.bind(this);

    this.focusPwIdStatusToChangeEvent = this.focusPwIdStatusToChangeEvent.bind(this);
    this.focusPwAuthStatusToChangeEvent = this.focusPwAuthStatusToChangeEvent.bind(this);
    this.PwResetCallbackEvent = this.PwResetCallbackEvent.bind(this);
  }

  // 마운트 직후 한번 (rendering 이전 마운트 이후의 작업)
  componentDidMount() {
    this.RealEstateCommunityAccessToken('guest@test.com','test123');

    const resetStateToIdCall = this.resetStateToIdCall;
    const resetStateToPwCall = this.resetStateToPwCall;
    const btnFindIdGo = document.querySelector('#btnFindIdGo')
    btnFindIdGo.innerHTML = '아이디 찾기'
    btnFindIdGo.addEventListener('click', function() {
      resetStateToIdCall();
    });

    const btnFindPwGo = document.querySelector('#btnFindPwGo')
    btnFindPwGo.innerHTML = '비밀번호 찾기'
    btnFindPwGo.addEventListener('click', function() {
      resetStateToPwCall();
    });
  }

  resetStateToIdCall() {
    this.setState({focusId: true, 
                   idAuthStatus: true,
                   idResultStatus: false,

                   focusPw: false,
                   pwIdStatus: true,
                   pwAuthStatus: false,
                   pwResetStatus: false,
                   pwResultStatus: false,

                   userInfo: undefined,
                   resultCode: undefined
                  });
  }

  resetStateToPwCall() {
    this.setState({focusId: false, 
                   idAuthStatus: true,
                   idResultStatus: false,

                   focusPw: true,
                   pwIdStatus: true,
                   pwAuthStatus: false,
                   pwResetStatus: false,
                   pwResultStatus: false,

                   userInfo: undefined,
                   resultCode: undefined
                  });
  }

  // 특정 조건(이름, 전화번호) 사용자 목록 조회 호출
  getUserByNameAndTellEvent = (name, phone, token) => {
    
  }

  RealEstateCommunityAccessToken = async(email, password) => {
    try {
      await oauth_web.owner.getToken(email, password).then((result) => {
        this.setState({token: result.accessToken});
        // storage.set('token', result.accessToken)
        // this.getUser(email, result.accessToken)
      })
    } catch(error) {
      console.log(error);
      window.confirm('토큰 발급에 실패하였습니다.\n새로고침 혹은 브라우저 재실행 후 다시 시도해주세요.');
    }
  }

  // 아이디 찾기 - 1. 인증 후 status 전환 이벤트
  focusIdAuthStatusToChangeEvent(name, phone) {
    const { token } = this.state;
    checkUserByTellNo(phone, token).then(res => {
      if (res.data !== '' && res.data === true) {
        getUserByNameAndTell(name, phone, token).then(res => {
          this.setState({userInfo: res.data});
          this.setState({idAuthStatus: false, idResultStatus: true});
        }).catch(err => {
          console.log(err)
          window.confirm('요청 실패');
        })
      } else {
        console.log(res.data)
        window.confirm('회원정보가 존재하지 않습니다.');
        window.location.href="/user/findhelp";
      }
    }).catch(err => {
      console.log(err);
      window.confirm('요청 실패');
    })
  }

  // 아이디 찾기 - 2. 아이디 찾기 결과 Callback
  // idResultCallbackEvent(id) {

  // }

  // 비밀번호 찾기 - 1. 아이디 입력 후 status 전환 이벤트
  focusPwIdStatusToChangeEvent(id) {
    getUser(id, this.state.token).then(e => {
      if (e.data !== '' && e.data !== null && e.data !== undefined) {
        this.setState({userInfo: e.data});
        this.setState({pwIdStatus: false,
                       pwAuthStatus: true})
      } else {
        window.alert('가입된 회원이 존재하지 않습니다.')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  // 비밀번호 찾기 - 2. 인증 후 status 전환 이벤트
  // 인증 후 입력된 전화번호로 사용자정보 존재여부 확인 -- 비밀번호를 조회하고자 하는 아이디와 전화번호 인증으로 확인한 사용자 정보가 일치하는지 확인
  focusPwAuthStatusToChangeEvent(name, phone) {
    const { token } = this.state;
    checkUserByTellNo(phone, token).then(res => {
      if (res.data !== '' && res.data === true) {
        getUserByNameAndTell(name, phone, token).then(res => {
          this.setState({userInfo: res.data});
          this.setState({pwAuthStatus: false, 
                         pwResetStatus: true});
        }).catch(err => {
          console.log(err)
          window.confirm('요청 실패');
        })
      } else {
        console.log(res.data)
        window.confirm('회원정보가 존재하지 않습니다.');
        window.location.href="/user/findhelp";
      }
    }).catch(err => {
      console.log(err);
      window.confirm('요청 실패');
    })
  }

  // 비밀번호 찾기 - 3. 비밀번호 리셋 요청 Callback
  PwResetCallbackEvent(email, afterpw) {
    resetUserPwByEmailAndPassword(email, afterpw, this.state.token).then(res => {
      this.setState({pwResetStatus: false, 
                      pwResultStatus: true});
      this.setState({resultCode: 'complete'})
    }).catch(error => {
      console.log(error)
      window.alert('비밀번호를 다시 확인해주세요.');
    })
  }

  findComponentRenderEvent(focusId, focusPw, userInfo, resultCode) {
    if (focusId === true) {
      const { idAuthStatus, idResultStatus } = this.state;
      if (idAuthStatus === true) {
        return (<IdFindByAuth focusIdAuthStatusToChangeEvent={this.focusIdAuthStatusToChangeEvent}/>);
      } else if (idResultStatus === true) {
        if (userInfo !== undefined) {
          return (<IdFindByResult email={userInfo.email}/>);
        } else {
          return null;
        }
      } else {

      }
    } else {
      
    }
    if (focusPw === true) {
      const { pwIdStatus, pwAuthStatus, pwResetStatus, pwResultStatus } = this.state;
      if (pwIdStatus === true) {
        return (<PwFindById focusPwIdStatusToChangeEvent={this.focusPwIdStatusToChangeEvent}/>);
      } else if (pwAuthStatus === true) {
        if (userInfo !== undefined) {
          return (<PwFindByAuth focusPwAuthStatusToChangeEvent={this.focusPwAuthStatusToChangeEvent}/>);
        } else {
          return null;
        }
      } else if (pwResetStatus === true) {
        if (userInfo !== undefined) {
          return (<PwFindByReset email={userInfo.email} PwResetCallbackEvent={this.PwResetCallbackEvent}/>);
        } else {
          return null;
        }
      } else if (pwResultStatus === true) {
        if (resultCode !== undefined) {
          return (<PwFindByResult />);
        } else {
          return null;
        }
      } else {

      }
    } else {

    }
  }

  render() {
    const {userInfo, focusId, focusPw, resultCode} = this.state;
    
    return (
      <Fragment>
        <div>
          <ul>
            <li>
              <button id="btnFindIdGo"/>
              <button id="btnFindPwGo"/>
            </li>
          </ul>
        </div>
        <div className="div-main">
          {this.findComponentRenderEvent(focusId, focusPw, userInfo, resultCode)}
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    userCheck: state.user.userCheck,
    searchuser: state.user.searchuser
  }),
  dispatch => ({
    UserModule: bindActionCreators(userActions, dispatch)
  })
)(IdPwFindContainer);
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
// eslint-disable-next-line
import { bindActionCreators } from "redux";
// import * as loginActions from "../modules/LoginModule";
import * as userActions from "../../scm/modules/UserModule";
import { Login } from "../index";

import storage from '../storage';
import { oauth_web } from '../../OAuth2Config'

import { getUser } from '../../scm/api/userAxios';

class LoginContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      token: undefined,
      loggedInfo: undefined
    }
    // this.RealEstateCommunityLoginAttempt = this.RealEstateCommunityLoginAttempt.bind(this);
    this.NaverLoginAttempt = this.NaverLoginAttempt.bind(this);
  }

  // 사용자 목록 조회 호출
  getUser = async (email, token) => {
    const { UserModule } = this.props;
    try {
      await UserModule.getUser(email, token);
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 로그인 요청
  RealEstateCommunityLoginAttempt = async(email, password) => {
    try {
      // 입력받은 아이디와 비밀번호로 토큰발급 요청
      await oauth_web.owner.getToken(email, password).then((result) => {
        // console.log(result)
        // email, password로 발급받은 토큰값으로 api 호출 가능여부 테스트 - 2019-07-30 - yieon - SUCCESS
        // 요청 성공 시 토큰값 저장
        this.setState({token: result.accessToken});
        storage.set('token', result.accessToken)
        // Token 요청 성공 이후 email 사용자 정보 조회
        // this.getUser(email)
        // 요청 성공 후 해당 이메일로 가입된 사용자 정보 조회 (발급받은 토큰 필요)
        this.getUser(email, result.accessToken)
      })
    } catch(error) {
      console.log(error);
      window.confirm('로그인에 실패했습니다.\n아이디 혹은 비밀번호를 확인 후 다시 시도해주세요.');
    }
  }

  // 네이버 로그인 요청
  // componentDidMount()에 있음
  NaverLoginAttempt = async(email) => {
    try {
      // 기본 설정된 (root)guest@test.com으로 default 토큰 접근
      // 기본 guest@test.com으로 설정된 유저정보가 존재하지 않을 경우 내용수정 혹은 유저정보 생성 필요
      await oauth_web.owner.getToken('guest@test.com', 'test123').then((result) => {
        this.setState({token: result.accessToken});
        storage.set('token', result.accessToken)

        // 가입된 사용자 존재여부 체크
        getUser(email, result.accessToken).then(e => {
          if (e.data === '') {
            window.confirm('계정이 존재하지 않습니다.\n회원가입 후 다시 시도해주세요.');
            storage.remove('loggedInfo');
            storage.remove('token');
            window.location.href="/register";
          } else {
            // 네이버로부터 인증받아 로그인된 이메일로 가입된 사용자 정보가 존재할 경우 userInfo에 결과값 저장
            this.setState({userInfo: e.data});
          }
        }).catch(err => {
          console.log(err);
          window.confirm('계정이 존재하지 않습니다.\n회원가입 후 다시 시도해주세요.');
          storage.remove('loggedInfo');
          storage.remove('token');
          // 회원가입 실패 시 회원가입 초기화면으로
          window.location.href="/register";
        })

      })
    } catch(error) {
      console.log(error);
      window.confirm('토큰 발급에 실패하였습니다.\n새로고침 혹은 브라우저 재실행 후 다시 시도해주세요.');
    }
  }

  // 마운트 직후 한번 (rendering 이전 마운트 이후의 작업)
  componentDidMount() {
    const { email } = this.props;
    if (email !== undefined && email !== null && email !== '') {
      // props.email값이 존재할 경우 네이버 로그인 이벤트 발생
      this.NaverLoginAttempt(email);
    }
  }

  render() {
    const { token, userInfo } = this.state;
    const { loggedInfo } = this.props;
    // token redirect
    if (token !== null && token !== undefined && token !== '') {
      if (loggedInfo !== undefined && loggedInfo !== null && loggedInfo !== '') {
        if (loggedInfo.activated === false) {
          window.alert('이용이 중지된 회원입니다.')
          // storage.remove('loggedInfo');
          return window.location.href = '/login';
        }
        if (loggedInfo.disabled === false) {
          window.alert('탈퇴한 회원입니다.')
          // storage.remove('loggedInfo');
          return window.location.href = '/login';
        }
        // 회원유형이 일반가입이 아닐경우
        if (loggedInfo.division !== 'NORMAL') {
          window.alert('일반 가입 회원이 아닙니다.\n네이버 로그인을 이용해주세요.')
          // storage.remove('loggedInfo');
          return window.location.href = '/login';
        }
        storage.set('loggedInfo', loggedInfo)
        return <Redirect to={{
          pathname: "/",
        }} push={true}/>;
      } else if (userInfo !== undefined && userInfo !== null && userInfo !== '') {
        if (userInfo.activated === false) {
          window.alert('이용이 중지된 회원입니다.')
          // storage.remove('loggedInfo');
          return window.location.href = '/login';
        }
        if (userInfo.disabled === false) {
          window.alert('탈퇴한 회원입니다.')
          // storage.remove('loggedInfo');
          return window.location.href = '/login';
        }
        // 회원유형이 네이버가 아닐경우
        if (userInfo.division !== 'NAVER') {
          window.alert('네이버 회원이 아닙니다.\n일반 로그인을 이용해주세요.')
          // storage.remove('loggedInfo');
          return window.location.href = '/login';
        }
        storage.set('loggedInfo', userInfo)
        return <Redirect to={{
          pathname: "/",
        }} push={true}/>;
      } else return (
        <div className="div-login">
          <Login RealEstateCommunityLoginAttempt={this.RealEstateCommunityLoginAttempt}/>
        </div>
      );
    } else {
      return (
        <div className="div-login">
          <Login RealEstateCommunityLoginAttempt={this.RealEstateCommunityLoginAttempt}/>
        </div>
      );
    }
  }
}

export default connect(
  state => ({
    // loggedInfo: state.login.loggedInfo
    loggedInfo: state.user.user
  }),
  dispatch => ({
    UserModule: bindActionCreators(userActions, dispatch)
    // LoginModule: bindActionCreators(loginActions, dispatch)
  })
)(LoginContainer);
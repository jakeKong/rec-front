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

class LoginContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      token: undefined
    }
    // this.RealEstateCommunityLoginAttempt = this.RealEstateCommunityLoginAttempt.bind(this);
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

  RealEstateCommunityLoginAttempt = async(email, password) => {
    try {
      await oauth_web.owner.getToken(email, password).then((result) => {
        // console.log(result)
        // email, password로 발급받은 토큰값으로 api 호출 가능여부 테스트 - 2019-07-30 - yieon - SUCCESS
        this.setState({token: result.accessToken});
        storage.set('token', result.accessToken)
        // Token 요청 성공 이후 email 사용자 정보 조회
        // this.getUser(email)
        this.getUser(email, result.accessToken)
      })
    } catch(error) {
      console.log(error);
      window.confirm('로그인에 실패했습니다.\n아이디 혹은 비밀번호를 확인 후 다시 시도해주세요.');
    }
  }

  // 마운트 직후 한번 (rendering 이전 마운트 이후의 작업)
  componentDidMount() {

  }

  render() {
    const { token } = this.state;
    const { loggedInfo } = this.props;
    // token redirect
    if (token !== null && token !== undefined && token !== '') {
      if (loggedInfo !== undefined && loggedInfo !== null) {
        storage.set('loggedInfo', loggedInfo)
        return <Redirect to={{
          pathname: "/",
          // state: { session : session }
        }} push={true}/>;
      } else return null;
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
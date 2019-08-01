import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "./scm/modules/UserModule";

import storage from './common/storage';

import { MainPage, NotFoundPage, LoginPage, RegisterPage } from './common';
import { BlogTyleNewsPage, BlogTyleNewsManagePage } from './blog';
import { UserManagePage } from './scm';
import { OrderHistoryPage, OrderHistoryByEmailPage, /*ReportMakeHistoryPage,*/ ChangePointHistoryPage, ChangePointHistoryByEmailPage, ProductManagePage } from './oms';
import { NoticePage, NoticeManagePage, QuestionPage, QuestionManagePage } from './bms';
import { PaymentPage } from './payment';
import { BrRecapTitleInfoPage, LandInfoViewPage } from './mpa';

class App extends Component {
  
  // 사용자 목록 조회 호출
  getUser = (email, token) => {
    const { UserModule } = this.props;
    try {
      UserModule.getUser(email, token);
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  initializeUserInfo = async () => {
    const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if(!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.
    const token = storage.get('token');
    this.getUser(loggedInfo.email, token)
  }

  componentDidMount() {
    this.initializeUserInfo();
  }

  // 해당 토큰으로 유저정보 조회에 실패 세션 종료 이벤트
  sessionFailedEvent(err) {
    if (err === true) {
      storage.remove('loggedInfo');
      storage.remove('token');
      window.alert('로그인 세션이 만료되었습니다.\n다시 로그인 해주세요.')
      return window.location.reload();
    }
  }

  render() {
    const { error } = this.props;
    if (error === true) {
      this.sessionFailedEvent(error)
    }
    return (
      <Switch>
        {/* 홈 */}
        <Route exact path="/" component={MainPage} />
  
        {/* 로그인 */}
        <Route exact path="/login" component={LoginPage} />
        {/* 회원가입 */}
        <Route exact path="/register" component={RegisterPage} />
  
        {/* 블로그 */}
        <Route exact path="/blog/tyle" component={BlogTyleNewsPage} />
        {/* 블로그 관리 */}
        <Route exact path="/blog/tyle/manage" component={BlogTyleNewsManagePage} />
  
        {/* 주택정보 조회 */}
        <Route exact path="/mpa" component={LandInfoViewPage} />
  
        {/* 사용자 관리 */}
        <Route exact path="/scm/user/manage" component={ UserManagePage }/>
  
        {/* 주문내역 조회(고객) */}
        <Route exact path="/oms/order/history/email" component={ OrderHistoryByEmailPage }/>
        {/* 주문내역 관리(관리자) */}
        <Route exact path="/oms/order/history" component={ OrderHistoryPage }/>
        {/* 보고서 생성이력 조회(관리자) */}
        {/* <Route exact path="/oms/reportmake/history" component={ ReportMakeHistoryPage }/> */}
        {/* 포인트 변동내역 조회(고객) */}
        <Route exact path="/oms/changepoint/history/email" component={ ChangePointHistoryByEmailPage }/>
        {/* 포인트 변동내역 관리(관리자) */}
        <Route exact path="/oms/changepoint/history" component={ ChangePointHistoryPage }/>
  
        {/* 상품 관리 */}
        <Route exact path="/oms/product" component={ ProductManagePage }/>
  
        {/* 공지사항 */}
        <Route exact path="/bms/notice" component={ NoticePage }/>
        {/* 공지사항 관리 */}
        <Route exact path="/bms/notice/manage" component={ NoticeManagePage }/>
        {/* 문의사항 */}
        <Route exact path="/bms/question" component={ QuestionPage }/>
        {/* 문의사항 관리 */}
        <Route exact path="/bms/question/manage" component={ QuestionManagePage }/>
  
        <Route exact path="/bms/notice/list" component={ NoticePage }/>
        <Route exact path="/bms/notice/manage/list" component={ NoticeManagePage }/>
        
        <Route exact path="/mpa/recaptitle/list" component={ BrRecapTitleInfoPage }/>
        {/* 상품 구매 */}
        <Route exact path="/payment/product" component={ PaymentPage }/>
  
        <Route component={NotFoundPage}/>
      </Switch>
    );
  };
}

export default connect(
  state => ({
    error: state.user.error,
    success: state.user.success,
    loggedInfo: state.user.user
  }),
  dispatch => ({
    UserModule: bindActionCreators(userActions, dispatch)
  })
)(App);
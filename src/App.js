import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { MainPage, NotFoundPage, LoginPage, RegisterPage, IdPwFindPage, NaverCallbackLogPage, NaverCallbackRegPage, 
         Popup_BetaTestNotificationPage } from './common';
import { BlogTyleNewsPage } from './blog';
import { UserDetailPage } from './scm';
import { OrderHistoryByEmailPage, ChangePointHistoryByEmailPage } from './oms';
import { NoticePage, NoticeDetailPage,
         QuestionPage, QuestionDetailPage, QuestionRegisterPage, QuestionUpdatePage } from './bms';
import { PaymentPage } from './payment';
import { BrRecapTitleInfoPage, RealestateInfoViewPage, SHouseInfoViewPage, SBuildingInfoViewPage, LandInfoViewPage, RHouseInfoViewPage, RBuildingInfoViewPage } from './mpa';

import { checkInfo } from './common/loggedInfoCheck'
class App extends Component {

  componentDidMount() {
    // 사용자 세션 체크 (기본 APP.js 외 세션 체크가 반드시 필요한 컨테이너에 적용 (포인트구매, 회원정보, 부동산시세 ...))
    checkInfo();
  }

  render() {
    return (
      <Switch>
        {/* 홈 */}
        <Route exact path="/" component={MainPage} />
  
        {/* 로그인 */}
        <Route exact path="/login/" component={LoginPage} />
        {/* BY NAVER 로그인 */}
        <Route exact path="/login/:email" component={LoginPage} />
        {/* 회원가입 */}
        <Route exact path="/register" component={RegisterPage} />
        {/* BY NAVER 회원가입 */}
        <Route exact path="/register/:userinfo" component={RegisterPage} />
        {/* 아이디/비밀번호 찾기 */}
        <Route exact path="/user/findhelp" component={IdPwFindPage} />
        {/* NAVER LOG POPUP */}
        <Route exact path="/naver/log/pop" component={NaverCallbackLogPage} />
        {/* NAVER REG POPUP */}
        <Route exact path="/naver/reg/pop" component={NaverCallbackRegPage} />
        
        {/* 블로그 */}
        <Route exact path="/blog/tyle" component={BlogTyleNewsPage} />

        {/* 통합 부동산 정보 조회 */}
        <Route exact path="/mpa" component={RealestateInfoViewPage} />  
        {/* 단독/다가구 정보 조회 */}
        <Route exact path="/mpa/shouse" component={SHouseInfoViewPage} />
        {/* 상업/업무용빌딩 정보 조회 */}
        <Route exact path="/mpa/sbuilding" component={SBuildingInfoViewPage} />
        {/* 토지 정보 조회 */}
        <Route exact path="/mpa/land" component={LandInfoViewPage} />
        {/* 연립/빌라 정보 조회 */}
        <Route exact path="/mpa/rhouse" component={RHouseInfoViewPage} />
        {/* 구분상업/업무용 정보 조회 */}
        <Route exact path="/mpa/rbuilding" component={RBuildingInfoViewPage} />

        {/* 회원정보 */}
        <Route exact path="/user/details" component={ UserDetailPage }/>
  
        {/* 주문내역 조회(고객) */}
        <Route exact path="/oms/order/history/email" component={ OrderHistoryByEmailPage }/>
        {/* 포인트 변동내역 조회(고객) */}
        <Route exact path="/oms/changepoint/history/email" component={ ChangePointHistoryByEmailPage }/>
  
        {/* 공지사항 */}
        <Route exact path="/bms/notice" component={ NoticePage }/>
        {/* 공지사항 상세조회 */}
        <Route exact path="/bms/notice/details/:sid" component={ NoticeDetailPage }/>
        {/* 문의사항 */}
        <Route exact path="/bms/question" component={ QuestionPage }/>
        {/* 문의사항 상세조회*/}
        <Route exact path="/bms/question/details/:sid" component={ QuestionDetailPage }/>
        {/* 문의사항 등록*/}
        <Route exact path="/bms/question/register" component={ QuestionRegisterPage }/>
        {/* 문의사항 수정*/}
        <Route exact path="/bms/question/update/:sid" component={ QuestionUpdatePage }/>

        <Route exact path="/bms/notice/list" component={ NoticePage }/>
        
        <Route exact path="/mpa/recaptitle/list" component={ BrRecapTitleInfoPage }/>
        {/* 상품 구매 */}
        <Route exact path="/payment/product" component={ PaymentPage }/>

        {/* 베타테스트 안내 팝업 */}
        <Route exact path="/pop/betatest/notification" component={ Popup_BetaTestNotificationPage }/>
  
        <Route component={NotFoundPage}/>
      </Switch>
    );
  };
}

export default App;
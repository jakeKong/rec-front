import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { MainPage, NotFoundPage, LoginPage, RegisterPage } from './common';
import { BlogTyleNewsPage, BlogTyleNewsManagePage } from './blog';
import { UserManagePage } from './scm';
import { OrderHistoryPage, OrderHistoryByEmailPage, /*ReportMakeHistoryPage,*/ ChangePointHistoryPage, ChangePointHistoryByEmailPage, ProductManagePage } from './oms';
import { NoticePage, NoticeManagePage, QuestionPage, QuestionManagePage } from './bms';
import { PaymentPage, PaymentHistoryPage } from './payment';
import { BrRecapTitleInfoPage, LandInfoViewPage } from './mpa';

const App = () => {
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
      {/* 결제 내역 */}
      <Route exact path="/payment/history" component={ PaymentHistoryPage }/>

      <Route component={NotFoundPage}/>
    </Switch>
  );
};

export default App;
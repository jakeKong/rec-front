import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { MainPage, NotFoundPage, LoginPage, RegisterPage } from './common';
import { UserManagePage } from './scm';
import { OrderHistoryPage, OrderHistoryByEmailPage, /*ReportMakeHistoryPage,*/ ChangePointHistoryPage, ChangePointHistoryByEmailPage, ProductManagePage } from './oms';
import { NoticePage, NoticeManagePage, QuestionPage, QuestionManagePage } from './bms';
import { PaymentPage, PaymentHistoryPage } from './payment';

const App = () => {
  return (
    <div className="index">
      <Switch>
        {/* 홈 */}
        <Route exact path="/" component={MainPage} />

        {/* 로그인 */}
        <Route exact path="/login" component={LoginPage} />
        {/* 회원가입 */}
        <Route exact path="/register" component={RegisterPage} />

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

        {/* 상품 구매 */}
        <Route exact path="/payment/product" component={ PaymentPage }/>
        {/* 결제 내역 */}
        <Route exact path="/payment/history" component={ PaymentHistoryPage }/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  );
};

export default App;
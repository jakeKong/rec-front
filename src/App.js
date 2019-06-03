import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { MainPage, NotFoundPage } from './common';
import { UserManagePage } from './scm';
import { OrderHistoryPage, OrderHistoryByEmailPage, ReportMakeHistoryPage, ChangePointHistoryPage, ProductManagePage } from './oms';
import { NoticePage, NoticeManagePage, QuestionPage, QuestionManagePage } from './bms';
import { PaymentPage, RefundPage, PaymentHistoryPage } from './payment';

const App = () => {
  return (
    <div className="index">
      <Switch>
        <Route exact path="/" component={MainPage} />

        <Route exact path="/scm/user/manage/list" component={ UserManagePage }/>

        <Route exact path="/oms/order/history/list" component={ OrderHistoryPage }/>
        <Route exact path="/oms/order/history/list/email" component={ OrderHistoryByEmailPage }/>
        <Route exact path="/oms/reportmake/history/list" component={ ReportMakeHistoryPage }/>
        <Route exact path="/oms/changepoint/history/list" component={ ChangePointHistoryPage }/>
        <Route exact path="/oms/product/list" component={ ProductManagePage }/>

        <Route exact path="/bms/notice/list" component={ NoticePage }/>
        <Route exact path="/bms/notice/manage/list" component={ NoticeManagePage }/>
        <Route exact path="/bms/question/list" component={ QuestionPage }/>
        <Route exact path="/bms/question/manage/list" component={ QuestionManagePage }/>

        <Route exact path="/payment/product" component={ PaymentPage }/>
        <Route exact path="/refund/requests" component={ RefundPage }/>
        <Route exact path="/payment/history" component={ PaymentHistoryPage }/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  );
};

export default App;
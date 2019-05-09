import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { MainPage, NotFoundPage } from './common';
import { OrderHistoryPage, OrderHistoryByEmailPage, ReportMakeHistoryPage, ChangePointHistoryPage, ProductManagePage } from './oms';
import { NoticePage, NoticeManagePage } from './bms';
import { BrRecapTitleInfoPage } from './mpa';

const App = () => {
  return (
    <div className="index">
      <Switch>
        <Route exact path="/" component={MainPage} />

        <Route exact path="/oms/order/history/list" component={ OrderHistoryPage }/>
        <Route exact path="/oms/order/history/list/email" component={ OrderHistoryByEmailPage }/>
        <Route exact path="/oms/reportmake/history/list" component={ ReportMakeHistoryPage }/>
        <Route exact path="/oms/changepoint/history/list" component={ ChangePointHistoryPage }/>
        <Route exact path="/oms/product/list" component={ ProductManagePage }/>

        <Route exact path="/bms/notice/list" component={ NoticePage }/>
        <Route exact path="/bms/notice/manage/list" component={ NoticeManagePage }/>
        
        <Route exact path="/mpa/recaptitle/list" component={ BrRecapTitleInfoPage }/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  );
};

export default App;
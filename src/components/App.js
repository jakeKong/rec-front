import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MainPage, 
         NotFoundPage, 
         OrderHistoryPage, OrderHistoryByEmailPage, ReportMakeHistoryPage, ChangePointHistoryPage, ProductManagePage,
         NoticePage
        } from '../pages';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={MainPage} />

        <Route exact path="/oms/order/history/list" component={ OrderHistoryPage }/>
        <Route exact path="/oms/order/history/list/email" component={ OrderHistoryByEmailPage }/>
        <Route exact path="/oms/reportmake/history/list" component={ ReportMakeHistoryPage }/>
        <Route exact path="/oms/changepoint/history/list" component={ ChangePointHistoryPage }/>
        <Route exact path="/oms/product/list" component={ ProductManagePage }/>

        <Route exact path="/bms/notice/list" component={ NoticePage }/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  );
};

export default App;
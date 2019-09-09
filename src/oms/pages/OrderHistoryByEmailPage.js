import React from 'react';
import { PageTemplate } from '../../common';
import { OrderHistoryByEmailContainer } from '../index';

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const OrderHistoryByEmailPage = () => {
  // 로그인 정보 존재여부 체크
  if (!storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    <PageTemplate>
      <div className="page-description">마이페이지 > 주문내역</div>
      <OrderHistoryByEmailContainer />
    </PageTemplate>
  );
};

export default OrderHistoryByEmailPage;
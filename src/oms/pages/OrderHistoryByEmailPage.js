import React from 'react';
import { PageTemplate } from '../../common';
import { OrderHistoryByEmailContainer } from '../index';

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const OrderHistoryByEmailPage = () => {
  if (!storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    // <div>
      <PageTemplate>
        <div className="page-description">마이페이지 > 주문내역</div>
        <OrderHistoryByEmailContainer />
      </PageTemplate>
    // </div>
  );
};

export default OrderHistoryByEmailPage;
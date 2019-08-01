import React from 'react';
import { PageTemplate } from '../../common';
import { PaymentHistoryContainer } from '../index'

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const PaymentHistoryPage = () => {
  if (!storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    // <div>
      <PageTemplate>
        <div className="page-description">결제내역 조회</div>
        <PaymentHistoryContainer />
      </PageTemplate>
    // </div>
  );
};

export default PaymentHistoryPage;
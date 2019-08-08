import React from 'react';
import { PageTemplate } from '../../common';
import { PaymentContainer } from '../index'

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const PaymentPage = () => {
  if (!storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    // <div>
      <PageTemplate>
        <div className="page-description">포인트 구매</div>
        <PaymentContainer />
      </PageTemplate>
    // </div>
  );
};

export default PaymentPage;
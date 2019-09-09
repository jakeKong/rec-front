import React from 'react';
import { PageTemplate } from '../../common';
import { PaymentContainer } from '../index'

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const PaymentPage = () => {
  // 로그인 정보 존재여부 체크
  if (!storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    <PageTemplate>
      <div className="page-description">포인트 충전</div>
      <PaymentContainer />
    </PageTemplate>
  );
};

export default PaymentPage;
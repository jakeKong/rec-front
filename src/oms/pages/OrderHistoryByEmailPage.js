import React from 'react';
import { PageTemplate } from '../../common';
import { OrderHistoryByEmailContainer } from '../index';

const OrderHistoryByEmailPage = () => {
  return (
    // <div>
      <PageTemplate>
        <div className="page-description">마이페이지 > 구매내역 조회</div>
        <OrderHistoryByEmailContainer />
      </PageTemplate>
    // </div>
  );
};

export default OrderHistoryByEmailPage;
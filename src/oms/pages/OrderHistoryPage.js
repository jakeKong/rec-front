import React from 'react';
import { PageTemplate } from '../../common';
import { OrderHistoryContainer } from '../index';

const OrderHistoryPage = () => {
  return (
    // <div>
      <PageTemplate>
        <div className="page-description">운영관리 > (관리)구매내역 조회</div>
        <OrderHistoryContainer />
      </PageTemplate>
    // </div>
  );
};

export default OrderHistoryPage;
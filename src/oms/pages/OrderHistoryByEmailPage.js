import React from 'react';
import { PageTemplate } from '../../common';
import { OrderHistoryByEmailContainer } from '../index';

const OrderHistoryByEmailPage = () => {
  return (
    <div className="index">
      <PageTemplate>
        <div className="page-description">마이페이지 > 주문내역 조회</div>
        <OrderHistoryByEmailContainer />
      </PageTemplate>
    </div>
  );
};

export default OrderHistoryByEmailPage;
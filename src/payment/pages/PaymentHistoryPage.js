import React from 'react';
import { PageTemplate } from '../../common';
import { PaymentHistoryContainer } from '../index'

const PaymentHistoryPage = () => {
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
import React from 'react';
import { PageTemplate } from '../../common';
import { PaymentContainer } from '../index'

const PaymentPage = () => {
  return (
    <div>
      <PageTemplate>
        <div className="page-description">상품구매</div>
        <PaymentContainer />
      </PageTemplate>
    </div>
  );
};

export default PaymentPage;
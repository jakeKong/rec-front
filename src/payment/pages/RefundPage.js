import React from 'react';
import { PageTemplate } from '../../common';
import { RefundContainer } from '../index'

const RefundPage = () => {
  return (
    <div className="index">
      <PageTemplate>
        <div className="page-description">환불신청</div>
        <RefundContainer />
      </PageTemplate>
    </div>
  );
};

export default RefundPage;
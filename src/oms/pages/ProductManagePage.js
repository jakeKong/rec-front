import React from 'react';
import { PageTemplate } from '../../common';
import { ProductManageContainer } from '../index';

const ProductManagePage = () => {
  return (
    <div className="index">
      <PageTemplate>
        <div className="page-description">운영관리 > 상품관리</div>
        <ProductManageContainer />
      </PageTemplate>
    </div>
  );
};

export default ProductManagePage;
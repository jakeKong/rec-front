import React from 'react';
import PageTemplate from '../../components/common/PageTemplate'
import { ProductManageContainer } from '../../containers'
import styles from '../../styles/index.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ProductManagePage = () => {
  return (
    <div className={cx('index')}>
      <PageTemplate>
        <div className="page-description">운영관리 > 상품관리</div>
        <ProductManageContainer />
      </PageTemplate>
    </div>
  );
};

export default ProductManagePage;
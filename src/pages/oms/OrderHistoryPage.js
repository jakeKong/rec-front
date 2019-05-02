import React from 'react';
import PageTemplate from '../../components/common/PageTemplate'
import { OrderHistoryContainer } from '../../containers'
import styles from '../../styles/index.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const OrderHistoryPage = () => {
  return (
    <div className={cx('index')}>
      <PageTemplate>
        <div className="page-description">운영관리 > (관리)주문내역 조회</div>
        <OrderHistoryContainer />
      </PageTemplate>
    </div>
  );
};

export default OrderHistoryPage;
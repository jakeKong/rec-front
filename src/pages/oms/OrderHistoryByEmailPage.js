import React from 'react';
import PageTemplate from '../../components/common/PageTemplate'
import { OrderHistoryByEmailContainer } from '../../containers'
import styles from '../../styles/index.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const OrderHistoryByEmailPage = () => {
  return (
    <div className={cx('index')}>
      <PageTemplate>
        <div className="page-description">마이페이지 > 주문내역 조회</div>
        <OrderHistoryByEmailContainer />
      </PageTemplate>
    </div>
  );
};

export default OrderHistoryByEmailPage;
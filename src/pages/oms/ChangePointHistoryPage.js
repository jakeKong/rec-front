import React from 'react';
import PageTemplate from '../../components/common/PageTemplate'
import { ChangePointHistoryContainer } from '../../containers'
import styles from '../../styles/index.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ChangePointHistoryPage = () => {
  return (
    <div className={cx('index')}>
      <PageTemplate>
        <div className="page-description">마이페이지 > 포인트 변동내역 조회</div>
        <ChangePointHistoryContainer />
      </PageTemplate>
    </div>
  );
};

export default ChangePointHistoryPage;
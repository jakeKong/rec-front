import React from 'react';
import PageTemplate from '../../components/common/PageTemplate'
import { ReportMakeHistoryContainer } from '../../containers'
import styles from '../../styles/index.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ReportMakeHistoryPage = () => {
  return (
    <div className={cx('index')}>
      <PageTemplate>
        <div className="page-description">운영관리 > 보고서 생성이력 조회</div>
        <ReportMakeHistoryContainer />
      </PageTemplate>
    </div>
  );
};

export default ReportMakeHistoryPage;
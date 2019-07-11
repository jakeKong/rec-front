import React from 'react';
import { PageTemplate } from '../../common';
import { ChangePointHistoryContainer } from '../index';

const ChangePointHistoryPage = () => {
  return (
    // <div>
      <PageTemplate>
        <div className="page-description">운영관리 > 포인트 변동내역 조회(관리)</div>
        <ChangePointHistoryContainer />
      </PageTemplate>
    // </div>
  );
};

export default ChangePointHistoryPage;
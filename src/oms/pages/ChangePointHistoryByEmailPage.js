import React from 'react';
import { PageTemplate } from '../../common';
import { ChangePointHistoryContainer } from '../index';

const ChangePointHistoryPage = () => {
  return (
    <div>
      <PageTemplate>
        <div className="page-description">마이페이지 > 포인트 변동내역 조회</div>
        <ChangePointHistoryContainer />
      </PageTemplate>
    </div>
  );
};

export default ChangePointHistoryPage;
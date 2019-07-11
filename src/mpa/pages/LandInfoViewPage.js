
import React from 'react';
import { PageTemplate } from '../../common';
import { LandInfoViewContainer } from '../index'

const LandInfoViewPage = () => {
  return (
    <div className="index">
      <PageTemplate>
        <div className="page-description">부동산 정보 조회</div>
        <LandInfoViewContainer />
      </PageTemplate>
    </div>
  );
};

export default LandInfoViewPage;
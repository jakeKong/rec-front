import React from 'react';
import { PageTemplate } from '../../common';
import { LandUseContainer } from '../index'

const LandUsePage = () => {
  return (
    <div className="index">
      <PageTemplate>
        <div className="page-description">부동산 정보 조회</div>
        <LandUseContainer />
      </PageTemplate>
    </div>
  );
};

export default LandUsePage;
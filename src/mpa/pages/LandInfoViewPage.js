
import React from 'react';
import { PageTemplate } from '../../common';
import { LandInfoViewContainer } from '../index'

const LandInfoViewPage = () => {
  return (
    <div className="index">
      <PageTemplate>
        <div className="page-description">건축물대장 총괄표제부</div>
        <LandInfoViewContainer />
      </PageTemplate>
    </div>
  );
};

export default LandInfoViewPage;
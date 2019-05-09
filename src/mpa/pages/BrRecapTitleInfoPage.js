import React from 'react';
import { PageTemplate } from '../../common';
import { BrRecapTitleInfoContainer } from '../index'

const BrRecapTitleInfoPage = () => {
  return (
    <div className="index">
      <PageTemplate>
        <div className="page-description">건축물대장 총괄표제부</div>
        <BrRecapTitleInfoContainer />
      </PageTemplate>
    </div>
  );
};

export default BrRecapTitleInfoPage;
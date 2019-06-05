import React from 'react';
import { PageTemplate } from '../../common';
import { LandUseContainer } from '../index'

const LandUsePage = () => {
  return (
    <div className="index">
      <PageTemplate>
        <div className="page-description">건축물대장 총괄표제부</div>
        <LandUseContainer />
      </PageTemplate>
    </div>
  );
};

export default LandUsePage;

import React from 'react';
import { PageTemplate } from '../../common';
import { LandInfoViewContainer } from '../index'

const SBuildingInfoViewPage = (props) => {
  console.log(props.location.state);
  return (
    <div className="index">
      <PageTemplate>
        <div className="page-description">상업/업무용 빌딩 정보 조회</div>
        <LandInfoViewContainer postStat={props.location.state}/>
      </PageTemplate>
    </div>
  );
};

export default SBuildingInfoViewPage;

import React from 'react';
import { PageTemplate } from '../../common';
import { LandInfoViewContainer } from '../index'

const SHouseInfoViewPage = (props) => {
  console.log(props.location.state);
  return (
    <div className="index">
      <PageTemplate>
        <div className="page-description">단독/다가구 정보 조회</div>
        <LandInfoViewContainer postStat={props.location.state}/>
      </PageTemplate>
    </div>
  );
};

export default SHouseInfoViewPage;
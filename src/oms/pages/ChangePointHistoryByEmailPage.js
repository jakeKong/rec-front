import React from 'react';
import { PageTemplate } from '../../common';
import { ChangePointHistoryByEmailContainer } from '../index';

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const ChangePointHistoryByEmailPage = () => {
  if (!storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    // <div>
      <PageTemplate>
        <div className="page-description">마이페이지 > 포인트 변동내역 조회</div>
        <ChangePointHistoryByEmailContainer />
      </PageTemplate>
    // </div>
  );
};

export default ChangePointHistoryByEmailPage;
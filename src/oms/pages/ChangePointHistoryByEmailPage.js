import React from 'react';
import { PageTemplate } from '../../common';
import { ChangePointHistoryByEmailContainer } from '../index';

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const ChangePointHistoryByEmailPage = () => {
  // 로그인 정보 존재여부 체크
  if (!storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    <PageTemplate>
      <div className="page-description">마이페이지 > 포인트 변동내역</div>
      <ChangePointHistoryByEmailContainer />
    </PageTemplate>
  );
};

export default ChangePointHistoryByEmailPage;
import React from 'react';
import { PageTemplate } from '../../common';
import { UserDetailContainer } from '../index';

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const UserPage = () => {
  // 로그인 상태가 아닐 경우
  if (!storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    // <div>
      <PageTemplate>
        <div className="page-description">회원정보</div>
        <UserDetailContainer />
      </PageTemplate>
    // </div>
  );
};

export default UserPage;
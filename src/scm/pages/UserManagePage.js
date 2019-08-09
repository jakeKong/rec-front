import React from 'react';
import { PageTemplateToManage } from '../../common';
import { UserManageContainer } from '../index';

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const UserPage = () => {
  // 로그인 상태가 아닐 경우
  if (!storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  // 사용자 권한이 없을 경우
  if (storage.get('loggedInfo').assignedRoles.indexOf('ROLE_ADMIN') === -1) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    // <div>
      <PageTemplateToManage>
        <div className="page-description">사용자 관리</div>
        <UserManageContainer />
      </PageTemplateToManage>
    // </div>
  );
};

export default UserPage;
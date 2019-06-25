import React from 'react';
import { PageTemplate } from '../../common';
import { UserManageContainer } from '../index';

const UserPage = () => {
  return (
    <div>
      <PageTemplate>
        <div className="page-description">사용자 관리</div>
        <UserManageContainer />
      </PageTemplate>
    </div>
  );
};

export default UserPage;
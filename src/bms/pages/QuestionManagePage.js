import React from 'react';
import { PageTemplate } from '../../common';
import { QuestionManageContainer } from '../index'

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const QuestionManagePage = () => {
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
      <PageTemplate>
        <div className="page-description">문의사항(관리)</div>
        <QuestionManageContainer />
      </PageTemplate>
    // </div>
  );
};

export default QuestionManagePage;
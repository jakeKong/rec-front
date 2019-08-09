import React from 'react';
import { PageTemplateToManage } from '../../common';
import { NoticeRegisterContainer } from '../index'

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const NoticeRegisterPage = () => {
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
    <PageTemplateToManage>
      <div className="page-description">공지사항 등록</div>
      <NoticeRegisterContainer/>
    </PageTemplateToManage>
  );
};

export default NoticeRegisterPage;
import React from 'react';
import { PageTemplateToManage } from '../../common';
import { BlogTyleNewsManageContainer } from '../index';

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const BlogTyleNewsManagePage = () => {
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
        <div className="page-description">게시글관리 > 타일뉴스 관리</div>
        <BlogTyleNewsManageContainer />
      </PageTemplateToManage>
    // </div>
  );
};

export default BlogTyleNewsManagePage;
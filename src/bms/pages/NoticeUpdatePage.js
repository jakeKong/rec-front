import React from 'react';
import { PageTemplateToManage } from '../../common';
import { NoticeUpdateContainer } from '../index'

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const NoticeRegisterPage = (props) => {
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
  let sid = props.location.pathname.substring(props.location.pathname.indexOf('update/')+7, props.location.pathname.length);
  return (
    <PageTemplateToManage>
      <div className="page-description">공지사항 수정</div>
      <NoticeUpdateContainer noticeSid={sid}/>
    </PageTemplateToManage>
  );
};

export default NoticeRegisterPage;
import React from 'react';
import { PageTemplate } from '../../common';
import { NoticeDetailContainer } from '../index'

const NoticeDetailPage = (props) => {
  let sid = props.location.pathname.substring(props.location.pathname.indexOf('details/')+8, props.location.pathname.length);
  return (
    <PageTemplate>
      <div className="page-description">공지사항</div>
      <NoticeDetailContainer noticeSid={sid}/>
    </PageTemplate>
  );
};

export default NoticeDetailPage;
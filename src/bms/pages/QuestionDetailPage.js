import React from 'react';
import { PageTemplate } from '../../common';
import { QuestionDetailContainer } from '../index'

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const QuestionDetailPage = (props) => {
  // 로그인 상태가 아닐 경우
  if (!storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  let sid = props.location.pathname.substring(props.location.pathname.indexOf('details/')+8, props.location.pathname.length);
  return (
    <PageTemplate>
      <div className="page-description">문의사항</div>
      <QuestionDetailContainer questionSid={sid}/>
    </PageTemplate>
  );
};

export default QuestionDetailPage;
import React from 'react';
import { PageTemplate } from '../../common';
import { QuestionUpdateContainer } from '../index'

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const QuestionUpdatePage = (props) => {
  // 로그인 상태가 아닐 경우
  if (!storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  let sid = props.location.pathname.substring(props.location.pathname.indexOf('update/')+7, props.location.pathname.length);
  return (
    <PageTemplate>
      <div className="page-description">문의사항 수정</div>
      <QuestionUpdateContainer questionSid={sid}/>
    </PageTemplate>
  );
};

export default QuestionUpdatePage;
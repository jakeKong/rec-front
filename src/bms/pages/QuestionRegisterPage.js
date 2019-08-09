import React from 'react';
import { PageTemplate } from '../../common';
import { QuestionRegisterContainer } from '../index'

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const QuestionRegisterPage = () => {
  // 로그인 상태가 아닐 경우
  if (!storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    <PageTemplate>
      <div className="page-description">문의사항 등록</div>
      <QuestionRegisterContainer />
    </PageTemplate>
  );
};

export default QuestionRegisterPage;
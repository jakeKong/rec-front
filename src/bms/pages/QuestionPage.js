import React from 'react';
import { PageTemplate } from '../../common';
import { QuestionContainer } from '../index'

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const QuestionPage = () => {
  // 로그인 상태가 아닐 경우
  if (!storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    // <div>
      <PageTemplate>
        <div className="page-description">문의사항</div>
        <QuestionContainer />
      </PageTemplate>
    // </div>
  );
};

export default QuestionPage;
import React from 'react';
import { PageTemplate } from '../../common';
import { QuestionContainer } from '../index'

const QuestionPage = () => {
  return (
    <div className="index">
      <PageTemplate>
        <div className="page-description">문의사항</div>
        <QuestionContainer />
      </PageTemplate>
    </div>
  );
};

export default QuestionPage;
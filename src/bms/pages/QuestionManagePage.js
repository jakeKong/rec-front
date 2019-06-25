import React from 'react';
import { PageTemplate } from '../../common';
import { QuestionManageContainer } from '../index'

const QuestionManagePage = () => {
  return (
    <div>
      <PageTemplate>
        <div className="page-description">문의사항</div>
        <QuestionManageContainer />
      </PageTemplate>
    </div>
  );
};

export default QuestionManagePage;
import React from 'react';
import { PageTemplate } from '../../common';
import { NoticeContainer } from '../index'

const NoticePage = () => {
  return (
    <PageTemplate>
      <div className="page-description">공지사항</div>
      <NoticeContainer />
    </PageTemplate>
  );
};

export default NoticePage;
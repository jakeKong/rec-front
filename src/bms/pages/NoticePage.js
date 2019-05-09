import React from 'react';
import { PageTemplate } from '../../common';
import { NoticeContainer } from '../index'

const NoticePage = () => {
  return (
    <div className="index">
      <PageTemplate>
        <div className="page-description">공지사항</div>
        <NoticeContainer />
      </PageTemplate>
    </div>
  );
};

export default NoticePage;
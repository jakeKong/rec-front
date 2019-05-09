import React from 'react';
import { PageTemplate } from '../../common';
import { NoticeManageContainer } from '../index';

const NoticePage = () => {
  return (
    <div className="index">
      <PageTemplate>
        <div className="page-description">공지사항(관리)</div>
        <NoticeManageContainer />
      </PageTemplate>
    </div>
  );
};

export default NoticePage;
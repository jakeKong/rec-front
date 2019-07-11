import React from 'react';
import { PageTemplate } from '../../common';
import { BlogTyleNewsManageContainer } from '../index';

const BlogTyleNewsManagePage = () => {
  return (
    // <div>
      <PageTemplate>
        <div className="page-description">게시글관리 > 타일뉴스 관리</div>
        <BlogTyleNewsManageContainer />
      </PageTemplate>
    // </div>
  );
};

export default BlogTyleNewsManagePage;
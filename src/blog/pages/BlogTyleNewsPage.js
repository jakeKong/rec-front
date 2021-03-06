import React from 'react';
import { PageTemplate } from '../../common';
import { BlogTyleNewsContainer } from '../index';

const BlogTyleNewsPage = () => {
  return (
    <PageTemplate>
      <div className="page-description">블로그 > 타일뉴스</div>
      <BlogTyleNewsContainer />
    </PageTemplate>
  );
};

export default BlogTyleNewsPage;
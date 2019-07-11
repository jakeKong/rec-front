import React from 'react';
import { PageTemplate } from '../../common';
import { LoginContainer } from '../index';

const LoginPage = () => {
  return (
    // <div>
      <PageTemplate>
        <div className="page-description">로그인</div>
        <LoginContainer />
      </PageTemplate>
    // </div>
  );
};

export default LoginPage;
import React from 'react';
import { PageTemplate } from '../../common';
import { LoginContainer } from '../index';

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const LoginPage = () => {
  if (storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
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
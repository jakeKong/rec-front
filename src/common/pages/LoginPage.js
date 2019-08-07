import React from 'react';
import { PageTemplate } from '../../common';
import { LoginContainer } from '../index';

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const LoginPage = (props) => {
  if (storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    // <div>
      <PageTemplate>
        <div className="page-description">로그인</div>
        <LoginContainer email={props.location.search.replace('?','')}/>
      </PageTemplate>
    // </div>
  );
};

export default LoginPage;
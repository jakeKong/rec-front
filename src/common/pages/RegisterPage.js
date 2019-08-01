import React from 'react';
import { PageTemplate } from '../../common';
import { RegisterContainer } from '../index';

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const RegisterPage = () => {
  if (storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    // <div>
      <PageTemplate>
        <div className="page-description">회원가입</div>
        <RegisterContainer />
      </PageTemplate>
    // </div>
  );
};

export default RegisterPage;
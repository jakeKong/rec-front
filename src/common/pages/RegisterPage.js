import React from 'react';
import { PageTemplate } from '../../common';
import { RegisterContainer } from '../index';

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const RegisterPage = (props) => {
  let params = decodeURIComponent(props.location.search);
  if (storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    // <div>
      <PageTemplate>
        <div className="page-description">회원가입</div>
        <RegisterContainer unrefined_userinfo={params}/>
      </PageTemplate>
    // </div>
  );
};

export default RegisterPage;
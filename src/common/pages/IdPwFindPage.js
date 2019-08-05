import React from 'react';
import { PageTemplate } from '../../common';
import { IdPwFindContainer } from '../index';

import { Redirect } from 'react-router';
import storage from '../../common/storage';

const IdPwFindPage = () => {
  if (storage.get('loggedInfo')) {
    return <Redirect to={{
      pathname: "/",
    }} push={true}/>;
  }
  return (
    <PageTemplate>
      <div className="page-description">ID/PW 찾기</div>
      <IdPwFindContainer />
    </PageTemplate>
  );
};

export default IdPwFindPage;
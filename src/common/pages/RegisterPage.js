import React from 'react';
import { PageTemplate } from '../../common';
import { RegisterContainer } from '../index';

const RegisterPage = () => {
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
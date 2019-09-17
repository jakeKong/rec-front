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
        {/* /register이 아닌 /register/:userinfo (naver회원가입)으로 호출될 경우 파라미터값 props를 하위 회원가입컨테이너에 전달 */}
        <RegisterContainer unrefined_userinfo={params}/>
      </PageTemplate>
    // </div>
  );
};

export default RegisterPage;
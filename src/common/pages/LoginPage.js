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
        {/* /login이 아닌 /login/:email (naver로그인)으로 호출될 경우 파라미터값 props를 하위 로그인컨테이너에 전달 */}
        <LoginContainer email={props.location.search.replace('?','')}/>
      </PageTemplate>
    // </div>
  );
};

export default LoginPage;
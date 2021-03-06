import React, { Fragment } from 'react';

import Header from './Header'
import Footer from './Footer'

// container 이전(컴포넌트), 이전까지의 header footer mainTemplate 설정부분
// react의 Fragment로 감싸야만 Vaadin Component를 사용 할 수 있다.
const PageTemplate = ({ children }) => (
  <Fragment>
      <Header />
      <section className="mc width-full align-center page-main">
        {children}
      </section>
      <Footer />
  </Fragment>
);

export default PageTemplate;
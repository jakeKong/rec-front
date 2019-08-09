import React, { Fragment } from 'react';

import Header from './Header'
import Footer from './Footer'

const PageTemplateToManage = ({ children }) => (
  <Fragment>
      <Header />
      <section className="mc align-center page-main" style={{width: '1280px'}}>
        {children}
      </section>
      <Footer />
  </Fragment>
);

export default PageTemplateToManage;
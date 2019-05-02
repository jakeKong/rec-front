import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
// import { MainContainer } from '../../containers'
import styles from '../../styles/index.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MainPage = () => {
  return (
    <div className={cx('index')}>
      <PageTemplate>
        <div className="page-description">홈</div>
        {/* <MainContainer /> */}
      </PageTemplate>
    </div>
  );
};

export default MainPage;
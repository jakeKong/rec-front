import React from 'react';
import PageTemplate from '../../components/common/PageTemplate'
import { NoticeContainer } from '../../containers'
import styles from '../../styles/index.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const NoticePage = () => {
  return (
    <div className={cx('index')}>
      <PageTemplate>
        <div className="page-description">공지사항</div>
        <NoticeContainer />
      </PageTemplate>
    </div>
  );
};

export default NoticePage;
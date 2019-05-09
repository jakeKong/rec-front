// BMS - api
export { getNoticeList, /*getNotice,*/ addNotice, updateNotice, /*deleteNotice,*/ deleteNoticeList } from './api/noticeAxios';

// BMS - component
export { default as NoticeGrid } from './components/notice/NoticeGrid';
export { default as NoticeDetail } from './components/notice/NoticeDetail';

// BMS - container
export { default as NoticeContainer } from './containers/NoticeContainer';
export { default as NoticeManageContainer } from './containers/NoticeManageContainer';

// BMS - page
export { default as NoticePage } from './pages/NoticePage';
export { default as NoticeManagePage } from './pages/NoticeManagePage';
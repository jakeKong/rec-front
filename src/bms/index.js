// BMS - api
export { getNoticeList, getNoticeListBySpec, getNotice, addNotice, updateNotice, deleteNotice, deleteNoticeList } from './api/noticeAxios';
export { getQuestionList, getQuestion, deleteQuestion, deleteQuestionByList,
         getQuestionListByEmail, getQuestionAnswerList, /*getQuestionAnswerCmtList,*/
         addQuestion, addQuestionAnswer, addQuestionAnswerCmt,
         updateQuestion, updateQuestionAnswer, updateQuestionAnswerCmt,
         deleteQuestionByEmail, deleteQuestionAnswerByEmail, deleteQuestionAnswerCmtByEmail } from './api/questionAxios';

// BMS - component
export { default as NoticeGrid } from './components/notice/NoticeGrid';
export { default as NoticeDetail } from './components/notice/NoticeDetail';

export { default as QuestionDetail } from './components/question/QuestionDetail';
export { default as QuestionGrid } from './components/question/QuestionGrid';
export { default as QuestionRegister } from './components/question/QuestionRegister';
export { default as QuestionSearch } from './components/question/QuestionSearch';
export { default as QuestionComment } from './components/question/QuestionComment';

// BMS - container
export { default as NoticeContainer } from './containers/NoticeContainer';
export { default as NoticeDetailContainer } from './containers/NoticeDetailContainer';

export { default as QuestionContainer } from './containers/QuestionContainer';
export { default as QuestionDetailContainer } from './containers/QuestionDetailContainer';
export { default as QuestionRegisterContainer } from './containers/QuestionRegisterContainer';
export { default as QuestionUpdateContainer } from './containers/QuestionUpdateContainer';

// BMS - page
export { default as NoticePage } from './pages/NoticePage';
export { default as NoticeDetailPage } from './pages/NoticeDetailPage';

export { default as QuestionPage } from './pages/QuestionPage';
export { default as QuestionDetailPage } from './pages/QuestionDetailPage';
export { default as QuestionRegisterPage } from './pages/QuestionRegisterPage';
export { default as QuestionUpdatePage } from './pages/QuestionUpdatePage';
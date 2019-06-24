import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { call, put, takeEvery } from 'redux-saga/effects';

// import * as api from '../index';

import * as sample from './responseSample';

// Action Types
const GET_BLOG_TYLE_NEWS_LIST = 'blog/GET_BLOG_TYLE_NEWS_LIST';
const GET_NOTICE_TYLE_NEWS_LIST_RECEIVED = 'blog/GET_NOTICE_TYLE_NEWS_LIST_RECEIVED';
const GET_BLOG_TYLE_NEWS_LIST_FAILURE = 'blog/GET_BLOG_TYLE_NEWS_LIST_FAILURE';

// Actions
export const getBlogTyleNewsList = createAction(GET_BLOG_TYLE_NEWS_LIST);

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  complete: false,
  blogTyleNewsList: List(),
});

// getBlogList Saga
function* getBlogTyleNewsListSaga() {
  try {
    // const response = yield call(api.getBlogList);
    const response = sample.blogData;
    yield put({type: GET_NOTICE_TYLE_NEWS_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_BLOG_TYLE_NEWS_LIST_FAILURE, payload: error});
  }
}
// Blog default root Saga
export function* blogSaga() {
  yield takeEvery(GET_BLOG_TYLE_NEWS_LIST, getBlogTyleNewsListSaga);
}

// 액션 핸들러 설정
export default handleActions({
  // Handler
  [GET_BLOG_TYLE_NEWS_LIST]: (state, action) => {
    console.log('GET_BLOG_TYLE_NEWS_LIST onPending')
    return {pending: true, error: false};
  },
  [GET_NOTICE_TYLE_NEWS_LIST_RECEIVED]: (state, action) => {
    console.log('GET_NOTICE_TYLE_NEWS_LIST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, blogTyleNewsList: fromJS(content)};
  },
  [GET_BLOG_TYLE_NEWS_LIST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_BLOG_TYLE_NEWS_LIST_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },
}, initialState);
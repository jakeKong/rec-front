import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
// eslint-disable-next-line
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as api from '../index';

// import * as sample from './responseSample';

// Action Types
const GET_BLOG_TYLE_NEWS_LIST = 'blog/GET_BLOG_TYLE_NEWS_LIST';
const GET_BLOG_TYLE_NEWS_LIST_RECEIVED = 'blog/GET_BLOG_TYLE_NEWS_LIST_RECEIVED';
const GET_BLOG_TYLE_NEWS_LIST_FAILURE = 'blog/GET_BLOG_TYLE_NEWS_LIST_FAILURE';

const GET_BLOG_TYLE_NEWS_LIST_BY_SPEC = 'blog/GET_BLOG_TYLE_NEWS_LIST_BY_SPEC';
const GET_BLOG_TYLE_NEWS_LIST_BY_SPEC_RECEIVED = 'blog/GET_BLOG_TYLE_NEWS_LIST_BY_SPEC_RECEIVED';
const GET_BLOG_TYLE_NEWS_LIST_BY_SPEC_FAILURE = 'blog/GET_BLOG_TYLE_NEWS_LIST_BY_SPEC_FAILURE';

const ADD_BLOG_TYLE_NEWS = 'blog/ADD_BLOG_TYLE_NEWS';
const ADD_BLOG_TYLE_NEWS_RECEIVED = 'blog/ADD_BLOG_TYLE_NEWS_RECEIVED';
const ADD_BLOG_TYLE_NEWS_FAILURE = 'blog/ADD_BLOG_TYLE_NEWS_FAILURE';

const UPDATE_BLOG_TYLE_NEWS = 'blog/UPDATE_BLOG_TYLE_NEWS';
const UPDATE_BLOG_TYLE_NEWS_RECEIVED = 'blog/UPDATE_BLOG_TYLE_NEWS_RECEIVED';
const UPDATE_BLOG_TYLE_NEWS_FAILURE = 'blog/UPDATE_BLOG_TYLE_NEWS_FAILURE';

const UPDATE_BLOG_TYLE_NEWS_VISIBILITY = 'blog/UPDATE_BLOG_TYLE_NEWS_VISIBILITY';
const UPDATE_BLOG_TYLE_NEWS_VISIBILITY_RECEIVED = 'blog/UPDATE_BLOG_TYLE_NEWS_VISIBILITY_RECEIVED';
const UPDATE_BLOG_TYLE_NEWS_VISIBILITY_FAILURE = 'blog/UPDATE_BLOG_TYLE_NEWS_VISIBILITY_FAILURE';

const DELETE_BLOG_TYLE_NEWS = 'blog/DELETE_BLOG_TYLE_NEWS';
const DELETE_BLOG_TYLE_NEWS_RECEIVED = 'blog/DELETE_BLOG_TYLE_NEWS_RECEIVED';
const DELETE_BLOG_TYLE_NEWS_FAILURE = 'blog/DELETE_BLOG_TYLE_NEWS_FAILURE';

// Actions
export const getBlogTylenewsList = createAction(GET_BLOG_TYLE_NEWS_LIST);
export const getBlogTylenewsListBySpec = createAction(GET_BLOG_TYLE_NEWS_LIST_BY_SPEC, search => search);
export const addBlogTylenews = createAction(ADD_BLOG_TYLE_NEWS, dto => dto);
export const updateBlogTylenews = createAction(UPDATE_BLOG_TYLE_NEWS, (tylenewsSid, dto) => ({tylenewsSid, dto}));
export const updateBlogTylenewsVisibility = createAction(UPDATE_BLOG_TYLE_NEWS_VISIBILITY, (tylenewsSid, tylenewsVisibility) => ({tylenewsSid, tylenewsVisibility}));
export const deleteBlogTylenews = createAction(DELETE_BLOG_TYLE_NEWS, tylenewsSid => tylenewsSid);

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  complete: false,
  blogTyleNewsList: List(),
});

function* getBlogTyleNewsListSaga() {
  try {
    const response = yield call(api.getBlogTylenewsList);
    // const response = sample.blogData;
    yield put({type: GET_BLOG_TYLE_NEWS_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_BLOG_TYLE_NEWS_LIST_FAILURE, payload: error});
  }
}

function* getBlogTyleNewsListBySpecSaga(action) {
  try {
    const response = yield call(api.getBlogTylenewsListBySpec, action.payload);
    yield put({type: GET_BLOG_TYLE_NEWS_LIST_BY_SPEC_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_BLOG_TYLE_NEWS_LIST_BY_SPEC_FAILURE, payload: error});
  }
}


function* addBlogTyleNewsSaga(action) {
  try {
    const response = yield call(api.addBlogTylenews, action.payload);
    yield put({type: ADD_BLOG_TYLE_NEWS_RECEIVED, payload: response});
    // 목록 갱신
    yield call(getBlogTyleNewsListSaga);
  } catch (error) {
    yield put({type: ADD_BLOG_TYLE_NEWS_FAILURE, payload: error});
  }
}

function* updateBlogTyleNewsSaga(action) {
  try {
    const response = yield call(api.updateBlogTylenews, action.payload.tylenewsSid, action.payload.dto);
    yield put({type: UPDATE_BLOG_TYLE_NEWS_RECEIVED, payload: response});
    // 목록 갱신
    yield call(getBlogTyleNewsListSaga);
  } catch (error) {
    yield put({type: UPDATE_BLOG_TYLE_NEWS_FAILURE, payload: error});
  }
}

function* updateBlogTyleNewsVisibilitySaga(action) {
  try {
    const response = yield call(api.updateBlogTylenewsVisibility, action.payload.tylenewsSid, action.payload.tylenewsVisibility);
    yield put({type: UPDATE_BLOG_TYLE_NEWS_VISIBILITY_RECEIVED, payload: response});
    // 목록 갱신
    yield call(getBlogTyleNewsListSaga);
  } catch (error) {
    yield put({type: UPDATE_BLOG_TYLE_NEWS_VISIBILITY_FAILURE, payload: error});
  }
}

function* deleteBlogTyleNewsSaga(action) {
  try {
    const response = yield call(api.deleteBlogTylenews, action.payload);
    yield put({type: DELETE_BLOG_TYLE_NEWS_RECEIVED, payload: response});
    // 목록 갱신
    yield call(getBlogTyleNewsListSaga);
  } catch (error) {
    yield put({type: DELETE_BLOG_TYLE_NEWS_FAILURE, payload: error});
  }
}

// Blog default root Saga
export function* blogSaga() {
  yield takeEvery(GET_BLOG_TYLE_NEWS_LIST, getBlogTyleNewsListSaga);
  yield takeEvery(GET_BLOG_TYLE_NEWS_LIST_BY_SPEC, getBlogTyleNewsListBySpecSaga);
  yield takeLatest(ADD_BLOG_TYLE_NEWS, addBlogTyleNewsSaga);
  yield takeLatest(UPDATE_BLOG_TYLE_NEWS, updateBlogTyleNewsSaga);
  yield takeLatest(UPDATE_BLOG_TYLE_NEWS_VISIBILITY, updateBlogTyleNewsVisibilitySaga);
  yield takeLatest(DELETE_BLOG_TYLE_NEWS, deleteBlogTyleNewsSaga);
}

// 액션 핸들러 설정
export default handleActions({
  // Handler
  [GET_BLOG_TYLE_NEWS_LIST]: (state, action) => {
    console.log('GET_BLOG_TYLE_NEWS_LIST onPending')
    return {pending: true, error: false};
  },
  [GET_BLOG_TYLE_NEWS_LIST_RECEIVED]: (state, action) => {
    console.log('GET_BLOG_TYLE_NEWS_LIST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, blogTyleNewsList: fromJS(content)};
  },
  [GET_BLOG_TYLE_NEWS_LIST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_BLOG_TYLE_NEWS_LIST_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },

  [GET_BLOG_TYLE_NEWS_LIST_BY_SPEC]: (state, action) => {
    console.log('GET_BLOG_TYLE_NEWS_LIST_BY_SPEC onPending')
    return {pending: true, error: false};
  },
  [GET_BLOG_TYLE_NEWS_LIST_BY_SPEC_RECEIVED]: (state, action) => {
    console.log('GET_BLOG_TYLE_NEWS_LIST_BY_SPEC_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, blogTyleNewsList: fromJS(content)};
  },
  [GET_BLOG_TYLE_NEWS_LIST_BY_SPEC_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_BLOG_TYLE_NEWS_LIST_BY_SPEC_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },  

  [ADD_BLOG_TYLE_NEWS]: (state, action) => {
    console.log('ADD_BLOG_TYLE_NEWS onPending')
  },
  [ADD_BLOG_TYLE_NEWS_RECEIVED]: (state, action) => {
    console.log('ADD_BLOG_TYLE_NEWS_RECEIVED onReceived')
  },
  [ADD_BLOG_TYLE_NEWS_FAILURE]: (state, action) => {
    console.log('ADD_BLOG_TYLE_NEWS_FAILURE onFailure')
  },

  [UPDATE_BLOG_TYLE_NEWS]: (state, action) => {
    console.log('UPDATE_BLOG_TYLE_NEWS onPending')
  },
  [UPDATE_BLOG_TYLE_NEWS_RECEIVED]: (state, action) => {
    console.log('UPDATE_BLOG_TYLE_NEWS_RECEIVED onReceived')
  },
  [UPDATE_BLOG_TYLE_NEWS_FAILURE]: (state, action) => {
    console.log('UPDATE_BLOG_TYLE_NEWS_FAILURE onFailure')
  },

  [UPDATE_BLOG_TYLE_NEWS_VISIBILITY]: (state, action) => {
    console.log('UPDATE_BLOG_TYLE_NEWS_VISIBILITY onPending')
  },
  [UPDATE_BLOG_TYLE_NEWS_VISIBILITY_RECEIVED]: (state, action) => {
    console.log('UPDATE_BLOG_TYLE_NEWS_VISIBILITY_RECEIVED onReceived')
  },
  [UPDATE_BLOG_TYLE_NEWS_VISIBILITY_FAILURE]: (state, action) => {
    console.log('UPDATE_BLOG_TYLE_NEWS_VISIBILITY_FAILURE onFailure')
  },

  [DELETE_BLOG_TYLE_NEWS]: (state, action) => {
    console.log('DELETE_BLOG_TYLE_NEWS onPending')
  },
  [DELETE_BLOG_TYLE_NEWS_RECEIVED]: (state, action) => {
    console.log('DELETE_BLOG_TYLE_NEWS_RECEIVED onReceived')
  },
  [DELETE_BLOG_TYLE_NEWS_FAILURE]: (state, action) => {
    console.log('DELETE_BLOG_TYLE_NEWS_FAILURE onFailure')
  },
}, initialState);
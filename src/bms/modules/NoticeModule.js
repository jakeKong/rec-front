import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as api from '../index';

// getNoticeList Action Types
const GET_NOTICE_LIST = 'notice/GET_NOTICE_LIST';
const GET_NOTICE_LIST_RECEIVED = 'notice/GET_NOTICE_LIST_RECEIVED';
const GET_NOTICE_LIST_FAILURE = 'notice/GET_NOTICE_LIST_FAILURE';

// getNoticeListBySpec Action Types
const GET_NOTICE_LIST_BY_SPEC = 'notice/GET_NOTICE_LIST_BY_SPEC';
const GET_NOTICE_LIST_BY_SPEC_RECEIVED = 'notice/GET_NOTICE_LIST_BY_SPEC_RECEIVED';
const GET_NOTICE_LIST_BY_SPEC_FAILURE = 'notice/GET_NOTICE_LIST_BY_SPEC_FAILURE';

// getNotice Action Types
const GET_NOTICE = 'notice/GET_NOTICE';
const GET_NOTICE_RECEIVED = 'notice/GET_NOTICE_RECEIVED';
const GET_NOTICE_FAILURE = 'notice/GET_NOTICE_FAILURE';

// addNotice Action Types
const ADD_NOTICE = 'notice/ADD_NOTICE';
const ADD_NOTICE_RECEIVED = 'notice/ADD_NOTICE_RECEIVED';
const ADD_NOTICE_FAILURE = 'notice/ADD_NOTICE_FAILURE';

// updateNotice Action Types
const UPDATE_NOTICE = 'notice/UPDATE_NOTICE';
const UPDATE_NOTICE_RECEIVED = 'notice/UPDATE_NOTICE_RECEIVED';
const UPDATE_NOTICE_FAILURE = 'notice/UPDATE_NOTICE_FAILURE';

// deleteNotice Action Types
const DELETE_NOTICE = 'notice/DELETE_NOTICE';
const DELETE_NOTICE_RECEIVED = 'notice/DELETE_NOTICE_RECEIVED';
const DELETE_NOTICE_FAILURE = 'notice/DELETE_NOTICE_FAILURE';

// deleteNoticeList Action Types
const DELETE_NOTICE_LIST = 'notice/DELETE_NOTICE_LIST';
const DELETE_NOTICE_LIST_RECEIVED = 'notice/DELETE_NOTICE_LIST_RECEIVED';
const DELETE_NOTICE_LIST_FAILURE = 'notice/DELETE_NOTICE_LIST_FAILURE';

// Actions
// 외부에서 호출하여 입력받아줄 값 ( ex) this.getProductList(search) )
export const getNoticeList = createAction(GET_NOTICE_LIST);
export const getNoticeListBySpec = createAction(GET_NOTICE_LIST_BY_SPEC, search => search);
export const getNotice = createAction(GET_NOTICE, noticeSid => noticeSid);
export const addNotice = createAction(ADD_NOTICE, (email, dto) => ({email, dto}));
export const updateNotice = createAction(UPDATE_NOTICE, (noticeSid, email, dto) => ({noticeSid, email, dto}));
export const deleteNotice = createAction(DELETE_NOTICE, noticeSid => noticeSid);
export const deleteNoticeList = createAction(DELETE_NOTICE_LIST, (selectList, search) => ({selectList, search}));

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  complete: false,
  noticeList: List(),
  notice: Map({})
});

// getNoticeList Saga
function* getNoticeListSaga() {
  try {
    const response = yield call(api.getNoticeList);
    yield put({type: GET_NOTICE_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_NOTICE_LIST_FAILURE, payload: error});
  }
}

// getNoticeListBySpec Saga
function* getNoticeListBySpecSaga(action) {
  if (action.payload.search !== undefined) {
    try {
      const response = yield call(api.getNoticeListBySpec, action.payload.search);
      yield put({type: GET_NOTICE_LIST_BY_SPEC_RECEIVED, payload: response});
    } catch (error) {
      yield put({type: GET_NOTICE_LIST_BY_SPEC_FAILURE, payload: error});
    }
  } else {
    try {
      const response = yield call(api.getNoticeListBySpec, action.payload);
      yield put({type: GET_NOTICE_LIST_BY_SPEC_RECEIVED, payload: response});
    } catch (error) {
      yield put({type: GET_NOTICE_LIST_BY_SPEC_FAILURE, payload: error});
    }
  }
}

// getNotice Saga
function* getNoticeSaga(action) {
  try {
    const response = yield call(api.getNotice, action.payload);
    yield put({type: GET_NOTICE_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_NOTICE_FAILURE, payload: error});
  }
}

// addNotice Saga
function* addNoticeSaga(action) {
  try {
    const response = yield call(api.addNotice, action.payload.email, action.payload.dto);
    yield put({type: ADD_NOTICE_RECEIVED, payload: response})
    // 추가완료 이후 목록 갱신 호출
    yield call(getNoticeListSaga);
  } catch (error) {
    yield put({type: ADD_NOTICE_FAILURE, payload: error});
  }
}

// updateNotice Saga
function* updateNoticeSaga(action) {
  try {
    const response = yield call(api.updateNotice, action.payload.noticeSid, action.payload.email, action.payload.dto);
    yield put({type: UPDATE_NOTICE_RECEIVED, payload: response})
    // 수정완료 이후 목록 갱신 호출
    yield call(getNoticeListSaga);
  } catch (error) {
    yield put({type: UPDATE_NOTICE_FAILURE, payload: error});
  }
}

// deleteNotice Saga
function* deleteNoticeSaga(action) {
  try {
    const response = yield call(api.deleteNotice, action.payload);
    yield put({type: DELETE_NOTICE_RECEIVED, payload: response})
    // 삭제완료 이후 목록 갱신 호출
    yield call(getNoticeListSaga);
  } catch (error) {
    yield put({type: DELETE_NOTICE_FAILURE, payload: error});
  }
}

// deleteNoticeList Saga
function* deleteNoticeListSaga(action) {
  try {
    const response = yield call(api.deleteNoticeList, action.payload.selectList);
    yield put({type: DELETE_NOTICE_LIST_RECEIVED, payload: response})
    // 삭제완료 이후 목록 갱신 호출
    // yield call(getNoticeListSaga);
    yield call(getNoticeListBySpecSaga, action);
  } catch (error) {
    yield put({type: DELETE_NOTICE_LIST_FAILURE, payload: error});
  }
}

// Notice default root Saga
export function* noticeSaga() {
  yield takeLatest(ADD_NOTICE, addNoticeSaga);
  yield takeLatest(UPDATE_NOTICE, updateNoticeSaga);
  yield takeLatest(DELETE_NOTICE, deleteNoticeSaga);
  yield takeLatest(DELETE_NOTICE_LIST, deleteNoticeListSaga);
  yield takeEvery(GET_NOTICE_LIST, getNoticeListSaga);
  yield takeEvery(GET_NOTICE, getNoticeSaga);
  yield takeEvery(GET_NOTICE_LIST_BY_SPEC, getNoticeListBySpecSaga);
}

// 액션 핸들러 설정
export default handleActions({
  // getNoticeList Handler
  [GET_NOTICE_LIST]: (state, action) => {
    console.log('GET_NOTICE_LIST onPending')
    return {pending: true, error: false};
  },
  [GET_NOTICE_LIST_RECEIVED]: (state, action) => {
    console.log('GET_NOTICE_LIST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, noticeList: fromJS(content)};
  },
  [GET_NOTICE_LIST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_NOTICE_LIST_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },

  [GET_NOTICE_LIST_BY_SPEC]: (state, action) => {
    console.log('GET_NOTICE_LIST_BY_SPEC onPending')
    return {pending: true, error: false};
  },
  [GET_NOTICE_LIST_BY_SPEC_RECEIVED]: (state, action) => {
    console.log('GET_NOTICE_LIST_BY_SPEC_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, noticeList: fromJS(content)};
  },
  [GET_NOTICE_LIST_BY_SPEC_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_NOTICE_LIST_BY_SPEC_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },

  // getNotice Handler
  [GET_NOTICE]: (state, action) => {
    console.log('GET_NOTICE onPending')
    return {pending: true, error: false};
  },
  [GET_NOTICE_RECEIVED]: (state, action) => {
    console.log('GET_NOTICE_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, notice: content};
  },
  [GET_NOTICE_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_NOTICE_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },

  // addNotice Handler
  [ADD_NOTICE]: (state, action) => {
    console.log('ADD_NOTICE onPending')
  },
  [ADD_NOTICE_RECEIVED]: (state, action) => {
    console.log('ADD_NOTICE_RECEIVED onReceived')
    return {complete: true};

  },
  [ADD_NOTICE_FAILURE]: (state, action) => {
    console.log('ADD_NOTICE_FAILURE onFailure')
    return {complete: false};
  },

  // updateNotice Handler
  [UPDATE_NOTICE]: (state, action) => {
    console.log('UPDATE_NOTICE onPending')
  },
  [UPDATE_NOTICE_RECEIVED]: (state, action) => {
    console.log('UPDATE_NOTICE_RECEIVED onReceived')
    return {complete: true};
  },
  [UPDATE_NOTICE_FAILURE]: (state, action) => {
    console.log('UPDATE_NOTICE_FAILURE onFailure')
    return {complete: false};
  },

  // deleteNotice Handler
  [DELETE_NOTICE]: (state, action) => {
    console.log('DELETE_NOTICE onPending')
  },
  [DELETE_NOTICE_RECEIVED]: (state, action) => {
    console.log('DELETE_NOTICE_RECEIVED onReceived')
    return {complete: true};
  },
  [DELETE_NOTICE_FAILURE]: (state, action) => {
    console.log('DELETE_NOTICE_FAILURE onFailure')
    return {complete: false};
  },  


  [DELETE_NOTICE_LIST]: (state, action) => {
    console.log('DELETE_NOTICE_LIST onPending')
  },
  [DELETE_NOTICE_LIST_RECEIVED]: (state, action) => {
    console.log('DELETE_NOTICE_LIST_RECEIVED onReceived')
    return {complete: true};
  },
  [DELETE_NOTICE_LIST_FAILURE]: (state, action) => {
    console.log('DELETE_NOTICE_LIST_FAILURE onFailure')
    return {complete: false};
  },  
}, initialState);
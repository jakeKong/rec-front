import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as api from '../index';

// getChangePointHistoryList Action Types
// 포인트 변동내역 전체 조회 액션타입
const GET_CHANGE_POINT_HISTORY_LIST = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST';
const GET_CHANGE_POINT_HISTORY_LIST_RECEIVED = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST_RECEIVED';
const GET_CHANGE_POINT_HISTORY_LIST_FAILURE = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST_FAILURE';

// 사용자별 포인트 변동내역 조회 액션타입
const GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL';
const GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_RECEIVED = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_RECEIVED';
const GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_FAILURE = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_FAILURE';

// 포인트 변동내역 추가 액션타입
const ADD_CHANGE_POINT_HISTORY = 'changePointHistory/ADD_CHANGE_POINT_HISTORY';
const ADD_CHANGE_POINT_HISTORY_RECEIVED = 'changePointHistory/ADD_CHANGE_POINT_HISTORY_RECEIVED';
const ADD_CHANGE_POINT_HISTORY_FAILURE = 'changePointHistory/ADD_CHANGE_POINT_HISTORY_FAILURE';

// 포인트 변동내역 취소여부 수정 액션타입
const UPDATE_CHANGE_POINT_HISTORY_ACTIVATED = 'changePointHistory/UPDATE_CHANGE_POINT_HISTORY_ACTIVATED';
const UPDATE_CHANGE_POINT_HISTORY_ACTIVATED_RECEIVED = 'changePointHistory/UPDATE_CHANGE_POINT_HISTORY_ACTIVATED_RECEIVED';
const UPDATE_CHANGE_POINT_HISTORY_ACTIVATED_FAILURE = 'changePointHistory/UPDATE_CHANGE_POINT_HISTORY_ACTIVATED_FAILURE';

// 포인트 변동내역 변동타입 수정 액션타입
const UPDATE_CHANGE_POINT_HISTORY_TYPE = 'changePointHistory/UPDATE_CHANGE_POINT_HISTORY_TYPE';
const UPDATE_CHANGE_POINT_HISTORY_TYPE_RECEIVED = 'changePointHistory/UPDATE_CHANGE_POINT_HISTORY_TYPE_RECEIVED';
const UPDATE_CHANGE_POINT_HISTORY_TYPE_FAILURE = 'changePointHistory/UPDATE_CHANGE_POINT_HISTORY_TYPE_FAILURE';

// Actions
// 외부에서 호출하여 입력받아줄 값 ( ex) this.getChangePointHistoryListByEmail(search) )
// 포인트 변동내역 전체조회 액션
export const getChangePointHistoryList = createAction(GET_CHANGE_POINT_HISTORY_LIST, search => search);
// 사용자별 포인트 변동내역 액션
export const getChangePointHistoryListByEmail = createAction(GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL, (email, search) => ({email, search}));
// 포인트 변동내역 추가 액션
export const addChangePointHistory = createAction(ADD_CHANGE_POINT_HISTORY, (email, dto, search) => ({email, dto, search}));
// 포인트 변동내역 취소여부 수정 액션
export const updateChangePointHistoryActivated = createAction(UPDATE_CHANGE_POINT_HISTORY_ACTIVATED, (changePointSid, email, changePointActivated) => ({changePointSid, email, changePointActivated}))
// 포인트 변동내역 변동타입 수정 액선
export const updateChangePointHistoryChangeType = createAction(UPDATE_CHANGE_POINT_HISTORY_TYPE, (changePointSid, email, changePointActivated) => ({changePointSid, email, changePointActivated}))

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  changePointHistoryList: List(),
  changePointHistory: Map({})
});

// 포인트 변동내역 전체 조회 SAGA
// getChangePointHistoryList Saga
function* getChangePointHistoryListSaga(action) {
  if (action.payload.search !== undefined) {
    try {
      // saga call (api 호출)
      const response = yield call(api.getChangePointHistoryList, action.payload.search);
      // saga 호출 결과 전달
      yield put({type: GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_RECEIVED, payload: response});
    } catch (error) {
      yield put({type: GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_FAILURE, payload: error});
    }
  } else {
    try {
      const response = yield call(api.getChangePointHistoryList, action.payload);
      yield put({type: GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_RECEIVED, payload: response});
    } catch (error) {
      yield put({type: GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_FAILURE, payload: error});
    }
  }
}

// 사용자별 포인트 변동내역 조회 SAGA
// getChangePointHistoryListByEmail Saga
function* getChangePointHistoryListByEmailSaga(action) {
  try {
    const response = yield call(api.getChangePointHistoryListByEmail, action.payload.email, action.payload.search);
    yield put({type: GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_FAILURE, payload: error});
  }
}

// 포인트 변동내역 추가 SAGA
// addChangePointHistory Saga
function* addChangePointHistorySaga(action) {
  try {
    const response = yield call(api.addChangePointHistory, action.payload.email, action.payload.dto);
    yield put({type: ADD_CHANGE_POINT_HISTORY_RECEIVED, payload: response});
    // yield call(getChangePointHistoryListSaga, action)
    yield call(getChangePointHistoryListByEmailSaga, action)
  } catch (error) {
    yield put({type: ADD_CHANGE_POINT_HISTORY_FAILURE, payload: error});
  }
}

// 포인트 변동내역 취소여부 수정 SAGA
// updateChangePointHistoryActivated Saga
function* updateChangePointHistoryActivatedSaga(action) {
  try {
    const response = yield call(api.updateChangePointHistoryActivated, action.payload.changePointSid, action.payload.email, action.payload.changePointActivated);
    yield put({type: UPDATE_CHANGE_POINT_HISTORY_ACTIVATED_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: UPDATE_CHANGE_POINT_HISTORY_ACTIVATED_FAILURE, payload: error});
  }
}

// 포인트 변동내역 변동타입 수정 SAGA
// updateChangePointHistoryType Saga
function* updateChangePointHistoryTypeSaga(action) {
  try {
    const response = yield call(api.updateChangePointHistoryChangeType, action.payload.changePointSid, action.payload.email, action.payload.changePointActivated);
    yield put({type: UPDATE_CHANGE_POINT_HISTORY_TYPE_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: UPDATE_CHANGE_POINT_HISTORY_TYPE_FAILURE, payload: error});
  }
}

// 포인트 변동내역 ROOT SAGA
// ChagePointHistory default root Saga
export function* changePointHistorySaga() {
  // 개별 SAGA 등록 (takeEvery, tateLastest 등)
  // 액션에 등록된 액션타입과 saga 연결동작
  yield takeEvery(GET_CHANGE_POINT_HISTORY_LIST, getChangePointHistoryListSaga);
  yield takeEvery(GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL, getChangePointHistoryListByEmailSaga);
  yield takeLatest(ADD_CHANGE_POINT_HISTORY, addChangePointHistorySaga);
  yield takeLatest(UPDATE_CHANGE_POINT_HISTORY_ACTIVATED, updateChangePointHistoryActivatedSaga);
  yield takeLatest(UPDATE_CHANGE_POINT_HISTORY_TYPE, updateChangePointHistoryTypeSaga);
}

// 액션 핸들러 설정
export default handleActions({
  // changePointHistoryListAll Handler
    [GET_CHANGE_POINT_HISTORY_LIST]: (state, action) => {
      console.log('GET_CHANGE_POINT_HISTORY_LIST onPending')
      return {pending: true, error: false};
    },
    [GET_CHANGE_POINT_HISTORY_LIST_RECEIVED]: (state, action) => {
      console.log('GET_CHANGE_POINT_HISTORY_LIST_RECEIVED onReceived')
      const {data: content} = action.payload;
      // 요청성공 응답값 리턴
      return {pending: false, error: false, success: true, changePointHistoryList: fromJS(content)};
    },
    [GET_CHANGE_POINT_HISTORY_LIST_FAILURE]: (state, action) => {
      const {error} = action.payload;
      console.log('GET_CHANGE_POINT_HISTORY_LIST_FAILURE onFailure')
      console.log('ERROR: ' + error)
      return {error: true};
    },

    [GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL]: (state, action) => {
      console.log('GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL onPending')
      return {pending: true, error: false};
    },
    [GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_RECEIVED]: (state, action) => {
      console.log('GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_RECEIVED onReceived')
      const {data: content} = action.payload;
      return {pending: false, error: false, success: true, changePointHistoryList: fromJS(content)};
    },
    [GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_FAILURE]: (state, action) => {
      const {error} = action.payload;
      console.log('GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_FAILURE onFailure')
      console.log('ERROR: ' + error)
      return {error: true};
    },

    [ADD_CHANGE_POINT_HISTORY]: (state, action) => {
      console.log('ADD_CHANGE_POINT_HISTORY onPending')
    },
    [ADD_CHANGE_POINT_HISTORY_RECEIVED]: (state, action) => {
      console.log('ADD_CHANGE_POINT_HISTORY_RECEIVED onReceived')
    },
    [ADD_CHANGE_POINT_HISTORY_FAILURE]: (state, action) => {
      console.log('ADD_CHANGE_POINT_HISTORY_FAILURE onFailure')
    },

    [UPDATE_CHANGE_POINT_HISTORY_ACTIVATED]: (state, action) => {
      console.log('UPDATE_CHANGE_POINT_HISTORY_ACTIVATED onPending')
    },
    [UPDATE_CHANGE_POINT_HISTORY_ACTIVATED_RECEIVED]: (state, action) => {
      console.log('UPDATE_CHANGE_POINT_HISTORY_ACTIVATED_RECEIVED onReceived')
    },
    [UPDATE_CHANGE_POINT_HISTORY_ACTIVATED_FAILURE]: (state, action) => {
      console.log('UPDATE_CHANGE_POINT_HISTORY_ACTIVATED_FAILURE onFailure')
    },

    [UPDATE_CHANGE_POINT_HISTORY_TYPE]: (state, action) => {
      console.log('UPDATE_CHANGE_POINT_HISTORY_TYPE onPending')
    },
    [UPDATE_CHANGE_POINT_HISTORY_TYPE_RECEIVED]: (state, action) => {
      console.log('UPDATE_CHANGE_POINT_HISTORY_TYPE_RECEIVED onReceived')
    },
    [UPDATE_CHANGE_POINT_HISTORY_TYPE_FAILURE]: (state, action) => {
      console.log('UPDATE_CHANGE_POINT_HISTORY_TYPE_FAILURE onFailure')
    },
}, initialState);
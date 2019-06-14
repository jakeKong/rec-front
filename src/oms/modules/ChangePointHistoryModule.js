import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as api from '../index';

// getChangePointHistoryList Action Types
const GET_CHANGE_POINT_HISTORY_LIST = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST';
const GET_CHANGE_POINT_HISTORY_LIST_RECEIVED = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST_RECEIVED';
const GET_CHANGE_POINT_HISTORY_LIST_FAILURE = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST_FAILURE';

const GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL';
const GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_RECEIVED = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_RECEIVED';
const GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_FAILURE = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_FAILURE';

const ADD_CHANGE_POINT_HISTORY = 'changePointHistory/ADD_CHANGE_POINT_HISTORY';
const ADD_CHANGE_POINT_HISTORY_RECEIVED = 'changePointHistory/ADD_CHANGE_POINT_HISTORY_RECEIVED';
const ADD_CHANGE_POINT_HISTORY_FAILURE = 'changePointHistory/ADD_CHANGE_POINT_HISTORY_FAILURE';

// Actions
// 외부에서 호출하여 입력받아줄 값 ( ex) this.getChangePointHistoryListByEmail(search) )
export const getChangePointHistoryList = createAction(GET_CHANGE_POINT_HISTORY_LIST, search => search);
export const getChangePointHistoryListByEmail = createAction(GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL, (email, search) => ({email, search}));
export const addChangePointHistory = createAction(ADD_CHANGE_POINT_HISTORY, (email, dto) => ({email, dto}));

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  changePointHistoryList: List(),
  changePointHistory: Map({})
});

// getChangePointHistoryListByEmail Saga
function* getChangePointHistoryListSaga(action) {
  try {
    const response = yield call(api.getChangePointHistoryList, action.payload);
    yield put({type: GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_FAILURE, payload: error});
  }
}

// getChangePointHistoryListByEmail Saga
function* getChangePointHistoryListByEmailSaga(action) {
  try {
    const response = yield call(api.getChangePointHistoryListByEmail, action.payload.email, action.payload.search);
    yield put({type: GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL_FAILURE, payload: error});
  }
}

// addChangePointHistory Saga
function* addChangePointHistorySaga(action) {
  try {
    const response = yield call(api.addChangePointHistory, action.payload.email, action.payload.dto);
    yield put({type: ADD_CHANGE_POINT_HISTORY_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: ADD_CHANGE_POINT_HISTORY_FAILURE, payload: error});
  }
}

// ChagePointHistory default root Saga
export function* changePointHistorySaga() {
  yield takeEvery(GET_CHANGE_POINT_HISTORY_LIST, getChangePointHistoryListSaga);
  yield takeEvery(GET_CHANGE_POINT_HISTORY_LIST_BY_EMAIL, getChangePointHistoryListByEmailSaga);
  yield takeLatest(ADD_CHANGE_POINT_HISTORY, addChangePointHistorySaga);
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
}, initialState);
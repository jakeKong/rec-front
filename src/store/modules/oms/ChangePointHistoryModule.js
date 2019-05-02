import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';

import { call, put, takeEvery } from 'redux-saga/effects';

import * as api from '../../../api';

// getChangePointHistoryList Action Types
const GET_CHANGE_POINT_HISTORY_LIST = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST';
const GET_CHANGE_POINT_HISTORY_LIST_RECEIVED = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST_RECEIVED';
const GET_CHANGE_POINT_HISTORY_LIST_FAILURE = 'changePointHistory/GET_CHANGE_POINT_HISTORY_LIST_FAILURE';

// Actions
// 외부에서 호출하여 입력받아줄 값 ( ex) this.getChangePointHistoryList(search) )
export const getChangePointHistoryList = createAction(GET_CHANGE_POINT_HISTORY_LIST, (email, search) => ({email, search}));

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  changePointHistoryList: List(),
  changePointHistory: Map({})
});

// getChangePointHistoryList Saga
function* getChangePointHistoryListSaga(action) {
  try {
    const response = yield call(api.getChangePointHistoryList, action.payload.email, action.payload.search);
    yield put({type: GET_CHANGE_POINT_HISTORY_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_CHANGE_POINT_HISTORY_LIST_FAILURE, payload: error});
  }
}

// ChagePointHistory default root Saga
export function* changePointHistorySaga() {
  yield takeEvery(GET_CHANGE_POINT_HISTORY_LIST, getChangePointHistoryListSaga);
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
}, initialState);
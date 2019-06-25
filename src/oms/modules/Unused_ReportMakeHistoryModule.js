/*
import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as api from '../index';

// getReportMakeHistoryList Action Types
const GET_REPORT_MAKE_HISTORY_LIST = 'reportMakeHistory/GET_REPORT_MAKE_HISTORY_LIST';
const GET_REPORT_MAKE_HISTORY_LIST_RECEIVED = 'reportMakeHistory/GET_REPORT_MAKE_HISTORY_LIST_RECEIVED';
const GET_REPORT_MAKE_HISTORY_LIST_FAILURE = 'reportMakeHistory/GET_REPORT_MAKE_HISTORY_LIST_FAILURE';

// Actions
// 외부에서 호출하여 입력받아줄 값 ( ex) this.getReportMakeHistoryList(search) )
export const getReportMakeHistoryList = createAction(GET_REPORT_MAKE_HISTORY_LIST, search => search);

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  reportMakeHistoryList: List(),
  reportMakeHistory: Map({})
});

// getReportMakeHistoryList Saga
function* getReportMakeHistoryListSaga(action) {
  try {
    const response = yield call(api.getReportMakeHistoryList, action.payload);
    yield put({type: GET_REPORT_MAKE_HISTORY_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_REPORT_MAKE_HISTORY_LIST_FAILURE, payload: error});
  }
}

// ReportMakeHistory default root Saga
export function* reportMakeHistorySaga() {
  yield takeEvery(GET_REPORT_MAKE_HISTORY_LIST, getReportMakeHistoryListSaga);
}

// 액션 핸들러 설정
export default handleActions({
  // reportMakeHistoryListAll Handler
    [GET_REPORT_MAKE_HISTORY_LIST]: (state, action) => {
      console.log('GET_REPORT_MAKE_HISTORY_LIST onPending')
      return {pending: true, error: false};
    },
    [GET_REPORT_MAKE_HISTORY_LIST_RECEIVED]: (state, action) => {
      console.log('GET_REPORT_MAKE_HISTORY_LIST_RECEIVED onReceived')
      const {data: content} = action.payload;
      return {pending: false, error: false, success: true, reportMakeHistoryList: fromJS(content)};
    },
    [GET_REPORT_MAKE_HISTORY_LIST_FAILURE]: (state, action) => {
      const {error} = action.payload;
      console.log('GET_REPORT_MAKE_HISTORY_LIST_FAILURE onFailure')
      console.log('ERROR: ' + error)
      return {error: true};
    },
}, initialState);
*/
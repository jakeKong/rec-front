import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as api from '../index';

// getPurchaseHistoryList Action Types
const GET_PURCHASE_HISTORY_LIST = 'purchaseHistory/GET_PURCHASE_HISTORY_LIST';
const GET_PURCHASE_HISTORY_LIST_RECEIVED = 'purchaseHistory/GET_PURCHASE_HISTORY_LIST_RECEIVED';
const GET_PURCHASE_HISTORY_LIST_FAILURE = 'purchaseHistory/GET_PURCHASE_HISTORY_LIST_FAILURE';

// Actions
// 외부에서 호출하여 입력받아줄 값 ( ex) this.getPurchaseHistoryList(search) )
export const getPurchaseHistoryList = createAction(GET_PURCHASE_HISTORY_LIST, (email, search) => ({email, search}));

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  purchaseHistoryList: List(),
  purchaseHistory: Map({})
});

// getPurchaseHistoryList Saga
function* getPurchaseHistoryListSaga(action) {
  try {
    const response = yield call(api.getPurchaseHistoryList, action.payload.email, action.payload.search);
    yield put({type: GET_PURCHASE_HISTORY_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_PURCHASE_HISTORY_LIST_FAILURE, payload: error});
  }
}

// PurchaseHistory default root Saga
export function* purchaseHistorySaga() {
  yield takeEvery(GET_PURCHASE_HISTORY_LIST, getPurchaseHistoryListSaga);
}

// 액션 핸들러 설정
export default handleActions({
  // purchaseHistoryListAll Handler
    [GET_PURCHASE_HISTORY_LIST]: (state, action) => {
      console.log('GET_PURCHASE_HISTORY_LIST onPending')
      return {pending: true, error: false};
    },
    [GET_PURCHASE_HISTORY_LIST_RECEIVED]: (state, action) => {
      console.log('GET_PURCHASE_HISTORY_LIST_RECEIVED onReceived')
      const {data: content} = action.payload;
      return {pending: false, error: false, success: true, purchaseHistoryList: fromJS(content)};
    },
    [GET_PURCHASE_HISTORY_LIST_FAILURE]: (state, action) => {
      const {error} = action.payload;
      console.log('GET_PURCHASE_HISTORY_LIST_FAILURE onFailure')
      console.log('ERROR: ' + error)
      return {error: true};
    },
}, initialState);
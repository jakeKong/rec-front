import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as api from '../index';

// 주문내역 전체 조회 액션타입
// getOrderHistoryList Action Types
const GET_ORDER_HISTORY_LIST = 'orderHistory/GET_ORDER_HISTORY_LIST';
const GET_ORDER_HISTORY_LIST_RECEIVED = 'orderHistory/GET_ORDER_HISTORY_LIST_RECEIVED';
const GET_ORDER_HISTORY_LIST_FAILURE = 'orderHistory/GET_ORDER_HISTORY_LIST_FAILURE';

// 사용자별 주문내역 조회 액션타입
// getOrderHistoryListByEmail Action Types
const GET_ORDER_HISTORY_LIST_BY_EMAIL = 'orderHistory/GET_ORDER_HISTORY_LIST_BY_EMAIL';
const GET_ORDER_HISTORY_LIST_BY_EMAIL_RECEIVED = 'orderHistory/GET_ORDER_HISTORY_LIST_BY_EMAIL_RECEIVED';
const GET_ORDER_HISTORY_LIST_BY_EMAIL_FAILURE = 'orderHistory/GET_ORDER_HISTORY_LIST_BY_EMAIL_FAILURE';

// 주문내역 추가 액션타입
// addOrderHistory Action Types
const ADD_ORDER_HISTORY = 'orderHistory/ADD_ORDER_HISTORY';
const ADD_ORDER_HISTORY_RECEIVED = 'orderHistory/ADD_ORDER_HISTORY_RECEIVED';
const ADD_ORDER_HISTORY_FAILURE = 'orderHistory/ADD_ORDER_HISTORY_FAILURE';

// 주문내역 취소여부 수정 액션타입
const UPDATE_ORDER_HISTORY_ACTIVATED = 'orderHistory/UPDATE_ORDER_HISTORY_ACTIVATED';
const UPDATE_ORDER_HISTORY_ACTIVATED_RECEIVED = 'orderHistory/UPDATE_ORDER_HISTORY_ACTIVATED_RECEIVED';
const UPDATE_ORDER_HISTORY_ACTIVATED_FAILURE = 'orderHistory/UPDATE_ORDER_HISTORY_ACTIVATED_FAILURE';

// 주문내역 취소요청 액션타입
const UPDATE_ORDER_HISTORY_STATUS_ATTEMPT = 'orderHistory/UPDATE_ORDER_HISTORY_STATUS_ATTEMPT';
const UPDATE_ORDER_HISTORY_STATUS_ATTEMPT_RECEIVED = 'orderHistory/UPDATE_ORDER_HISTORY_STATUS_ATTEMPT_RECEIVED';
const UPDATE_ORDER_HISTORY_STATUS_ATTEMPT_FAILURE = 'orderHistory/UPDATE_ORDER_HISTORY_STATUS_ATTEMPT_FAILURE';

// updateOrderHistory Action Types
// const UPDATE_ORDER_HISTORY = 'orderHistory/UPDATE_ORDER_HISTORY';

// Actions
// 외부에서 호출하여 입력받아줄 값 ( ex) this.getOrderHistoryList(search) )
// 주문내역 전체조회 액션
export const getOrderHistoryList = createAction(GET_ORDER_HISTORY_LIST, search => search);
// 사용자별 주문내역 조회 액션
export const getOrderHistoryListByEmail = createAction(GET_ORDER_HISTORY_LIST_BY_EMAIL, (email, search) => ({email, search}));
// 주문내역 추가 액션
export const addOrderHistory = createAction(ADD_ORDER_HISTORY, (email, dto, search) => ({email, dto, search}));
// 주문내역 취소여부 수정 액션
export const updateOrderHistoryActivated = createAction(UPDATE_ORDER_HISTORY_ACTIVATED, (odrSid, email, orderActivated) => ({odrSid, email, orderActivated}))
// 주문내역 취소요청 액션
export const updateOrderHistoryCancleAttemptStatus = createAction(UPDATE_ORDER_HISTORY_STATUS_ATTEMPT, (odrSid, email, status, search) => ({odrSid, email, status, search}))
// export const updateOrderHistory = createAction(UPDATE_ORDER_HISTORY, api.updateOrderHistory);

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  orderHistoryList: List(),
  orderHistory: Map({})
});

// 주문내역 전체조회 SAGA
// getOrderHistoryList Saga
function* getOrderHistoryListSaga(action) {
  if (action.payload.search !== undefined) {
    try {
      // saga call (api 호출)
      const response = yield call(api.getOrderHistoryList, action.payload.search);
      // saga 호출 결과 전달
      yield put({type: GET_ORDER_HISTORY_LIST_RECEIVED, payload: response});
    } catch (error) {
      yield put({type: GET_ORDER_HISTORY_LIST_FAILURE, payload: error});
    }
  } else {
    try {
      const response = yield call(api.getOrderHistoryList, action.payload);
      yield put({type: GET_ORDER_HISTORY_LIST_RECEIVED, payload: response});
    } catch (error) {
      yield put({type: GET_ORDER_HISTORY_LIST_FAILURE, payload: error});
    }
  }
}

// 사용자별 주문내역 조회 SAGA
// getOrderHistoryListByEmail Saga
function* getOrderHistoryListByEmailSaga(action) {
  try {
    const response = yield call(api.getOrderHistoryListByEmail, action.payload.email, action.payload.search);
    yield put({type: GET_ORDER_HISTORY_LIST_BY_EMAIL_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_ORDER_HISTORY_LIST_BY_EMAIL_FAILURE, payload: error});
  }
}

// 주문내역 추가 SAGA
// addOrderHistory Saga
function* addOrderHistorySaga(action) {
  try {
    const response = yield call(api.addOrderHistory, action.payload.email, action.payload.dto);
    yield put({type: ADD_ORDER_HISTORY_RECEIVED, payload: response});
    yield call(getOrderHistoryListByEmailSaga, action);
  } catch (error) {
    yield put({type: ADD_ORDER_HISTORY_FAILURE, payload: error});
  }
}

// 주문내역 취소여부 수정 SAGA
// updateOrderHistoryActivated Saga
function* updateOrderHistoryActivatedSaga(action) {
  try {
    const response = yield call(api.updateOrderHistoryActivated, action.payload.odrSid, action.payload.email, action.payload.orderActivated);
    yield put({type: UPDATE_ORDER_HISTORY_ACTIVATED_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: UPDATE_ORDER_HISTORY_ACTIVATED_FAILURE, payload: error});
  }
}

// 주문내역 취소요청 SAGA
// updateOrderHistoryCancleAttemptStatus Saga
function* updateOrderHistoryCancleAttemptStatusSaga(action) {
  try {
    const response = yield call(api.updateOrderHistoryCancleAttemptStatus, action.payload.odrSid, action.payload.email, action.payload.status);
    yield put({type: UPDATE_ORDER_HISTORY_STATUS_ATTEMPT_RECEIVED, payload: response});
    if (action.payload.status === 'TRADE_CANCLE_ATTEMPT') {
      yield call(getOrderHistoryListByEmailSaga, action);
    } else if (action.payload.status === 'TRADE_COMPLETE') {
      yield call(getOrderHistoryListSaga, action);
    }
  } catch (error) {
    yield put({type: UPDATE_ORDER_HISTORY_STATUS_ATTEMPT_FAILURE, payload: error});
  }
}

// 주문내역 ROOT SAGA
// OrderHistory default root Saga
export function* orderHistorySaga() {
  // 개별 SAGA 등록 (takeEvery, tateLastest 등)
  // 액션에 등록된 액션타입과 saga 연결동작
  yield takeEvery(GET_ORDER_HISTORY_LIST, getOrderHistoryListSaga);
  yield takeEvery(GET_ORDER_HISTORY_LIST_BY_EMAIL, getOrderHistoryListByEmailSaga);
  yield takeLatest(ADD_ORDER_HISTORY, addOrderHistorySaga)
  yield takeLatest(UPDATE_ORDER_HISTORY_ACTIVATED, updateOrderHistoryActivatedSaga)
  yield takeLatest(UPDATE_ORDER_HISTORY_STATUS_ATTEMPT, updateOrderHistoryCancleAttemptStatusSaga)
}

// 액션 핸들러 설정
export default handleActions({
  // getOrderHistoryListAll Handler
    [GET_ORDER_HISTORY_LIST]: (state, action) => {
      console.log('GET_ORDER_HISTORY_LIST onPending')
      return {pending: true, error: false};
    },
    [GET_ORDER_HISTORY_LIST_RECEIVED]: (state, action) => {
      console.log('GET_ORDER_HISTORY_LIST_RECEIVED onReceived')
      const {data: content} = action.payload;
      // 요청성공 응답값 리턴
      return {pending: false, error: false, success: true, orderHistoryList: fromJS(content)};
    },
    [GET_ORDER_HISTORY_LIST_FAILURE]: (state, action) => {
      const {error} = action.payload;
      console.log('GET_ORDER_HISTORY_LIST_FAILURE onFailure')
      console.log('ERROR: ' + error)
      return {error: true};
    },
  // getOrderHistoryListByEmail Handler
    [GET_ORDER_HISTORY_LIST_BY_EMAIL]: (state, action) => {
      console.log('GET_ORDER_HISTORY_LIST_BY_EMAIL onPending')
      return {pending: true, error: false};
    },
    [GET_ORDER_HISTORY_LIST_BY_EMAIL_RECEIVED]: (state, action) => {
      console.log('GET_ORDER_HISTORY_LIST_BY_EMAIL_RECEIVED onReceived')
      const {data: content} = action.payload;
      return {pending: false, error: false, success: true, orderHistoryList: fromJS(content)};
    },
    [GET_ORDER_HISTORY_LIST_BY_EMAIL_FAILURE]: (state, action) => {
      const {error} = action.payload;
      console.log('GET_ORDER_HISTORY_LIST_BY_EMAIL_FAILURE onFailure')
      console.log('ERROR: ' + error)
      return {error: true};
    },
    // addOrderHistoryList Handler
    [ADD_ORDER_HISTORY]: (state, action) => {
      console.log('ADD_ORDER_HISTORY onPending')
    },
    [ADD_ORDER_HISTORY_RECEIVED]: (state, action) => {
      console.log('ADD_ORDER_HISTORY_RECEIVED onReceived')
    },
    [ADD_ORDER_HISTORY_FAILURE]: (state, action) => {
      console.log('ADD_ORDER_HISTORY_FAILURE onFailure')
    },
    // updateOrderHistoryActivated Handler
    [UPDATE_ORDER_HISTORY_ACTIVATED]: (state, action) => {
      console.log('UPDATE_ORDER_HISTORY_ACTIVATED onPending')
    },
    [UPDATE_ORDER_HISTORY_ACTIVATED_RECEIVED]: (state, action) => {
      console.log('UPDATE_ORDER_HISTORY_ACTIVATED_RECEIVED onReceived')
    },
    [UPDATE_ORDER_HISTORY_ACTIVATED_FAILURE]: (state, action) => {
      console.log('UPDATE_ORDER_HISTORY_ACTIVATED_FAILURE onFailure')
    },
    // updateOrderHistoryCancleAttemptStatus Handler
    [UPDATE_ORDER_HISTORY_STATUS_ATTEMPT]: (state, action) => {
      console.log('UPDATE_ORDER_HISTORY_STATUS_ATTEMPT onPending')
    },
    [UPDATE_ORDER_HISTORY_STATUS_ATTEMPT_RECEIVED]: (state, action) => {
      console.log('UPDATE_ORDER_HISTORY_STATUS_ATTEMPT_RECEIVED onReceived')
    },
    [UPDATE_ORDER_HISTORY_STATUS_ATTEMPT_FAILURE]: (state, action) => {
      console.log('UPDATE_ORDER_HISTORY_STATUS_ATTEMPT_FAILURE onFailure')
    },
}, initialState);
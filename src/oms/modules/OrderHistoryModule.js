import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as api from '../index';

// getOrderHistoryList Action Types
const GET_ORDER_HISTORY_LIST = 'orderHistory/GET_ORDER_HISTORY_LIST';
const GET_ORDER_HISTORY_LIST_RECEIVED = 'orderHistory/GET_ORDER_HISTORY_LIST_RECEIVED';
const GET_ORDER_HISTORY_LIST_FAILURE = 'orderHistory/GET_ORDER_HISTORY_LIST_FAILURE';

// getOrderHistoryListByEmail Action Types
const GET_ORDER_HISTORY_LIST_BY_EMAIL = 'orderHistory/GET_ORDER_HISTORY_LIST_BY_EMAIL';
const GET_ORDER_HISTORY_LIST_BY_EMAIL_RECEIVED = 'orderHistory/GET_ORDER_HISTORY_LIST_BY_EMAIL_RECEIVED';
const GET_ORDER_HISTORY_LIST_BY_EMAIL_FAILURE = 'orderHistory/GET_ORDER_HISTORY_LIST_BY_EMAIL_FAILURE';

// addOrderHistory Action Types
const ADD_ORDER_HISTORY = 'orderHistory/ADD_ORDER_HISTORY';
const ADD_ORDER_HISTORY_RECEIVED = 'orderHistory/ADD_ORDER_HISTORY_RECEIVED';
const ADD_ORDER_HISTORY_FAILURE = 'orderHistory/ADD_ORDER_HISTORY_FAILURE';

const UPDATE_ORDER_HISTORY_ACTIVATED = 'orderHistory/UPDATE_ORDER_HISTORY_ACTIVATED';
const UPDATE_ORDER_HISTORY_ACTIVATED_RECEIVED = 'orderHistory/UPDATE_ORDER_HISTORY_ACTIVATED_RECEIVED';
const UPDATE_ORDER_HISTORY_ACTIVATED_FAILURE = 'orderHistory/UPDATE_ORDER_HISTORY_ACTIVATED_FAILURE';

const UPDATE_ORDER_HISTORY_STATUS_ATTEMPT = 'orderHistory/UPDATE_ORDER_HISTORY_STATUS_ATTEMPT';
const UPDATE_ORDER_HISTORY_STATUS_ATTEMPT_RECEIVED = 'orderHistory/UPDATE_ORDER_HISTORY_STATUS_ATTEMPT_RECEIVED';
const UPDATE_ORDER_HISTORY_STATUS_ATTEMPT_FAILURE = 'orderHistory/UPDATE_ORDER_HISTORY_STATUS_ATTEMPT_FAILURE';

// updateOrderHistory Action Types
// const UPDATE_ORDER_HISTORY = 'orderHistory/UPDATE_ORDER_HISTORY';

// Actions
// 외부에서 호출하여 입력받아줄 값 ( ex) this.getOrderHistoryList(search) )
export const getOrderHistoryList = createAction(GET_ORDER_HISTORY_LIST, search => search);
export const getOrderHistoryListByEmail = createAction(GET_ORDER_HISTORY_LIST_BY_EMAIL, (email, search) => ({email, search}));
export const addOrderHistory = createAction(ADD_ORDER_HISTORY, (email, dto, search) => ({email, dto, search}));
export const updateOrderHistoryActivated = createAction(UPDATE_ORDER_HISTORY_ACTIVATED, (odrSid, email, orderActivated) => ({odrSid, email, orderActivated}))
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

// getOrderHistoryList Saga
function* getOrderHistoryListSaga(action) {
  if (action.payload.search !== undefined) {
    try {
      const response = yield call(api.getOrderHistoryList, action.payload.search);
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

// getOrderHistoryListByEmail Saga
function* getOrderHistoryListByEmailSaga(action) {
  try {
    const response = yield call(api.getOrderHistoryListByEmail, action.payload.email, action.payload.search);
    yield put({type: GET_ORDER_HISTORY_LIST_BY_EMAIL_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_ORDER_HISTORY_LIST_BY_EMAIL_FAILURE, payload: error});
  }
}

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

// updateOrderHistoryActivated Saga
function* updateOrderHistoryActivatedSaga(action) {
  try {
    const response = yield call(api.updateOrderHistoryActivated, action.payload.odrSid, action.payload.email, action.payload.orderActivated);
    yield put({type: UPDATE_ORDER_HISTORY_ACTIVATED_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: UPDATE_ORDER_HISTORY_ACTIVATED_FAILURE, payload: error});
  }
}

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

// OrderHistory default root Saga
export function* orderHistorySaga() {
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
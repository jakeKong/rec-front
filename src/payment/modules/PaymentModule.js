import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as api from '../index';

import * as sample from './responseSample';

const PAYMENT_APPROVAL_REQUEST = 'payment/PAYMENT_APPROVAL_REQUEST';
const PAYMENT_APPROVAL_REQUEST_RECEIVED = 'payment/PAYMENT_APPROVAL_REQUEST_RECEIVED';
const PAYMENT_APPROVAL_REQUEST_FAILURE = 'payment/PAYMENT_APPROVAL_REQUEST_FAILURE';

const GET_PAYMENT_HISTORY_LIST = 'payment/GET_PAYMENT_HISTORY_LIST';
const GET_PAYMENT_HISTORY_LIST_RECEIVED = 'payment/GET_PAYMENT_HISTORY_LIST_RECEIVED';
const GET_PAYMENT_HISTORY_LIST_FAILURE = 'payment/GET_PAYMENT_HISTORY_LIST_FAILURE';

// --- response값 임시 설정 (결제승인 결과값 가져오기)
const GET_SAMPLE_PAYMENT_REQUEST = 'payment/GET_SAMPLE_PAYMENT_REQUEST';
const GET_SAMPLE_PAYMENT_REQUEST_RECEIVED = 'payment/GET_SAMPLE_PAYMENT_REQUEST_RECEIVED';

// --- response값 임시 설정 (결제내역 결과값 가져오기)
const GET_SAMPLE_PAYMENT_HISTORY = 'payment/GET_SAMPLE_PAYMENT_HISTORY';
const GET_SAMPLE_PAYMENT_HISTORY_RECEIVED = 'payment/GET_SAMPLE_PAYMENT_HISTORY_RECEIVED';

// Actions
export const paymentApprovalRequest = createAction(PAYMENT_APPROVAL_REQUEST, paymentId => paymentId);
export const getPaymentHistoryList = createAction(GET_PAYMENT_HISTORY_LIST, search => search);
// --- response값 임시 설정 (결제승인 결과값 가져오기)
export const getSamplePaymentRequest = createAction(GET_SAMPLE_PAYMENT_REQUEST, (totalPay, totalPoint) => ({totalPay, totalPoint}));
// --- response값 임시 설정 (결제내역 결과값 가져오기)
export const getSamplePaymentHistoryList = createAction(GET_SAMPLE_PAYMENT_HISTORY);

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  paymentRequest: List(),
  paymentHistoryList: List(),
  payment: Map({})
});

// paymentApprovalRequestSaga
function* paymentApprovalRequestSaga(action) {
  try {
    const response = yield call(api.paymentApprovalRequest, action.payload);
    // 60초 대기
    window.setTimeout(60000)
    yield put({type: PAYMENT_APPROVAL_REQUEST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: PAYMENT_APPROVAL_REQUEST_FAILURE, payload: error});
  }
}

// getNaverPaymentHistoryListSaga
function* getPaymentHistoryListSaga(action) {
  try {
    const response = yield call(api.getPaymentHistoryList, action.payload);
    yield put({type: GET_PAYMENT_HISTORY_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_PAYMENT_HISTORY_LIST_FAILURE, payload: error});
  }
}

// --- response값 임시 설정 (결제승인 결과값 가져오기)
function* getSamplePaymentRequestSaga(action) {
  // 샘플값 가져오기
  const response = sample.paymentRequest;
  response.body.detail.totalPayAmount = action.payload.totalPay;
  response.totalPoint = action.payload.totalPoint;
  yield put({type: GET_SAMPLE_PAYMENT_REQUEST_RECEIVED, payload: response});
}

// --- response값 임시 설정 (결제내역 결과값 가져오기)
function* getSamplePaymentHistoryListSaga() {
  // 샘플값 가져오기
  const response = sample.paymentHistory;
  yield put({type: GET_SAMPLE_PAYMENT_HISTORY_RECEIVED, payload: response});
}

// Payment default root Saga
export function* paymentSaga() {
  yield takeEvery(PAYMENT_APPROVAL_REQUEST, paymentApprovalRequestSaga);
  yield takeEvery(GET_PAYMENT_HISTORY_LIST, getPaymentHistoryListSaga);
  
  // --- response값 임시 설정 (결제승인 결과값 가져오기)
  yield takeEvery(GET_SAMPLE_PAYMENT_REQUEST, getSamplePaymentRequestSaga)
  // --- response값 임시 설정 (결제내역 결과값 가져오기)
  yield takeEvery(GET_SAMPLE_PAYMENT_HISTORY, getSamplePaymentHistoryListSaga)
}

// 액션 핸들러 설정
export default handleActions({
  // 결제요청
  [PAYMENT_APPROVAL_REQUEST]: (state, action) => {
    console.log('PAYMENT_APPROVAL_REQUEST onPending')
    return {pending: true, error: false};
  },
  [PAYMENT_APPROVAL_REQUEST_RECEIVED]: (state, action) => {
    console.log('PAYMENT_APPROVAL_REQUEST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, paymentRequest: fromJS(content)};
  },
  [PAYMENT_APPROVAL_REQUEST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('PAYMENT_APPROVAL_REQUEST_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true, paymentRequest: sample.paymentRequestFailSample};
  },
  // 결제내역
  [GET_PAYMENT_HISTORY_LIST]: (state, action) => {
    console.log('GET_PAYMENT_HISTORY_LIST onPending')
    return {pending: true, error: false};
  },
  [GET_PAYMENT_HISTORY_LIST_RECEIVED]: (state, action) => {
    console.log('GET_PAYMENT_HISTORY_LIST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, paymentHistoryList: fromJS(content)};
  },
  [GET_PAYMENT_HISTORY_LIST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_PAYMENT_HISTORY_LIST_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },
  // --- response값 임시 설정 (결제승인 결과값 가져오기)
  [GET_SAMPLE_PAYMENT_REQUEST_RECEIVED]: (state, action) => {
    console.log('GET_SAMPLE_PAYMENT_REQUEST_RECEIVED onReceived')
    return {pending: false, error: false, success: true, paymentRequest: action.payload};
  },
  // --- response값 임시 설정 (결제내역 결과값 가져오기)
  [GET_SAMPLE_PAYMENT_HISTORY_RECEIVED]: (state, action) => {
    console.log('GET_SAMPLE_PAYMENT_HISTORY_RECEIVED onReceived')
    return {pending: false, error: false, success: true, paymentHistoryList: action.payload};
  },
}, initialState);
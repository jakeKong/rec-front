import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';

import { call, put, takeEvery } from 'redux-saga/effects';

import * as api from '../index';

const GET_ADDRESS_LIST = 'marketprice/ GET_ADDRESS_LIST';
const GET_ADDRESS_LIST_RECEIVED = 'marketprice/ GET_ADDRESSLIST_RECEIVED';
const GET_ADDRESS_LIST_FAILURE = 'marketprice/ GET_ADDRESSLIST_FAILURE';

// Actions
// 외부에서 호출하여 입력받아줄 값 ( ex) this.getProductList(search) )
export const getAddresss = createAction(GET_ADDRESS_LIST, search => search);

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  complete: false,
  adressList: List(),
  address: Map({})
});

// getProductList Saga
function* getAddressSaga(action) {
  try {
    const response = yield call(api.getAddress, action.payload);
    yield put({type: GET_ADDRESS_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_ADDRESS_LIST_FAILURE, payload: error});
  }
}

// Question default root Saga
export function* addressSaga() {
  yield takeEvery(GET_ADDRESS_LIST, getAddressSaga);
}

// 액션 핸들러 설정
export default handleActions({
  [GET_ADDRESS_LIST]: (state, action) => {
    console.log('GET_ADDRESS_LIST onPending')
    return {pending: true, error: false};
  },
  [GET_ADDRESS_LIST_RECEIVED]: (state, action) => {
    console.log('GET_ADDRESS_LIST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, titleList: fromJS(content)};
  },
  [GET_ADDRESS_LIST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_ADDRESS_LIST_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },
}, initialState);
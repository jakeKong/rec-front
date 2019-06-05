import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';

import { call, put, takeEvery } from 'redux-saga/effects';

import * as api from '../index';

//국가공간정보 토지소유정보	토지소유정보속성
//http://openapi.nsdi.go.kr/nsdi/eios/ServiceDetail.do?svcSe=S&svcId=S019
const GET_LAND_FRL_LIST = 'marketprice/GET_LAND_FRL_LIST';
const GET_LAND_FRL_LIST_RECEIVED = 'marketprice/GET_LAND_FRL_LIST_RECEIVED';
const GET_LAND_FRL_LIST_FAILURE = 'marketprice/GET_LAND_FRL_LIST_FAILURE';

// Actions
// 외부에서 호출하여 입력받아줄 값 ( ex) this.getProductList(search) )
export const getPossessionList = createAction(GET_LAND_FRL_LIST, search => search);

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  complete: false,
  titleList: List(),
  title: Map({})
});

// getProductList Saga
function* getBrRecapTitleInfoListSaga(action) {
  try {
    const response = yield call(api.getPossessionList, action.payload);
    yield put({type: GET_LAND_FRL_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_LAND_FRL_LIST_FAILURE, payload: error});
  }
}

// Product default root Saga
export function* brRecapTitleInfoSaga() {
  yield takeEvery(GET_LAND_FRL_LIST, getBrRecapTitleInfoListSaga);
}

// 액션 핸들러 설정
export default handleActions({
  [GET_LAND_FRL_LIST]: (state, action) => {
    console.log('GET_LAND_FRL_LIST onPending')
    return {pending: true, error: false};
  },
  [GET_LAND_FRL_LIST_RECEIVED]: (state, action) => {
    console.log('GET_LAND_FRL_LIST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, titleList: fromJS(content)};
  },
  [GET_LAND_FRL_LIST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_LAND_FRL_LIST_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },
}, initialState);
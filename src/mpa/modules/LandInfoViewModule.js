import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';

import { call, put, takeEvery } from 'redux-saga/effects';

import * as api from '../index';

//공공데이터 건축물대장 건축물 표제부
//https://www.data.go.kr/subMain.jsp?param=T1BFTkFQSUAxNTAwNDgyNQ==#/L3B1YnIvcG90L215cC9Jcm9zTXlQYWdlL29wZW5EZXZHdWlkZVBhZ2UkQF4wMTJtMSRAXnB1YmxpY0RhdGFQaz0xNTAwNDgyNSRAXnB1YmxpY0RhdGFEZXRhaWxQaz11ZGRpOjAzNmI1ODRlLTJlYTItNDQ4Ny1iOWE4LWMyZjUwMTdlNWZiOCRAXm9wcnRpblNlcU5vPTEwNDQzJEBebWFpbkZsYWc9dHJ1ZQ==
const GET_LAND_INFO_LIST = 'marketprice/GET_LAND_INFO_LIST';
const GET_LAND_INFO_LIST_RECEIVED = 'marketprice/GET_LAND_INFO_LIST_RECEIVED';
const GET_LAND_INFO_LIST_FAILURE = 'marketprice/GET_LAND_INFO_LIST_FAILURE';

const MAKE_LAND_INFO_LIST = 'marketprice/MAKE_LAND_INFO_LIST';
const MAKE_LAND_INFO_LIST_RECEIVED = 'marketprice/MAKE_LAND_INFO_LIST_RECEIVED';
const MAKE_LAND_INFO_LIST_FAILURE = 'marketprice/MAKE_LAND_INFO_LIST_FAILURE';
// Actions
// 외부에서 호출하여 입력받아줄 값 ( ex) this.getProductList(search) )
export const getLandInfo = createAction(GET_LAND_INFO_LIST, search => search);
export const makeLandInfo = createAction(MAKE_LAND_INFO_LIST, search => search);

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  complete: false,
  titleList: List(),
  title: Map({}),
  makeResult: ''
});

// getProductList Saga
function* getLandInfoViewSaga(action) {
  try {
    const response = yield call(api.getLandInfoView, action.payload);
    yield put({type: GET_LAND_INFO_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_LAND_INFO_LIST_FAILURE, payload: error});
  }
}
function* makeLandInfoViewSaga(action) {
  try {
    const response = yield call(api.makeLandInfoView, action.payload);
    yield put({type: MAKE_LAND_INFO_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: MAKE_LAND_INFO_LIST_FAILURE, payload: error});
  }
}
// Product default root Saga
export function* landInfoViewSaga() {
  yield takeEvery(GET_LAND_INFO_LIST, getLandInfoViewSaga);
}
// Product default root Saga
export function* makelandInfoViewSaga() {
  yield takeEvery(MAKE_LAND_INFO_LIST, makeLandInfoViewSaga);
}
// 액션 핸들러 설정
export default handleActions({
  [GET_LAND_INFO_LIST]: (state, action) => {
    console.log('GET_LAND_INFO_LIST onPending')
    return {pending: true, error: false};
  },
  [GET_LAND_INFO_LIST_RECEIVED]: (state, action) => {
    console.log('GET_LAND_INFO_LIST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, landInfoData: fromJS(content)};
  },
  [GET_LAND_INFO_LIST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_LAND_INFO_LIST_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },
  [MAKE_LAND_INFO_LIST]: (state, action) => {
    console.log('MAKE_LAND_INFO_LIST onPending')
    return {pending: true, error: false};
  },
  [MAKE_LAND_INFO_LIST_RECEIVED]: (state, action) => {
    console.log('MAKE_LAND_INFO_LIST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, makeResult: fromJS(content)};
  },
  [MAKE_LAND_INFO_LIST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('MAKE_LAND_INFO_LIST_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },
}, initialState);
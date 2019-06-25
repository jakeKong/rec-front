import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';

import { call, put, takeEvery } from 'redux-saga/effects';

import * as api from '../index';

//공공데이터 건축물대장 건축물 표제부
//https://www.data.go.kr/subMain.jsp?param=T1BFTkFQSUAxNTAwNDgyNQ==#/L3B1YnIvcG90L215cC9Jcm9zTXlQYWdlL29wZW5EZXZHdWlkZVBhZ2UkQF4wMTJtMSRAXnB1YmxpY0RhdGFQaz0xNTAwNDgyNSRAXnB1YmxpY0RhdGFEZXRhaWxQaz11ZGRpOjAzNmI1ODRlLTJlYTItNDQ4Ny1iOWE4LWMyZjUwMTdlNWZiOCRAXm9wcnRpblNlcU5vPTEwNDQzJEBebWFpbkZsYWc9dHJ1ZQ==
const GET_BLD_TITLE_INFO_LIST = 'marketprice/GET_BLD_TITLE_INFO_LIST';
const GET_BLD_TITLE_INFO_LIST_RECEIVED = 'marketprice/GET_BLD_TITLE_INFO_LIST_RECEIVED';
const GET_BLD_TITLE_INFO_LIST_FAILURE = 'marketprice/GET_BLD_TITLE_INFO_LIST_FAILURE';

//공공데이터 토지이용계획	토지이용계획WFS
//https://www.data.go.kr/subMain.jsp?param=T1BFTkFQSUAxNTAxMjYzMw==#/L3B1YnIvcG90L215cC9Jcm9zTXlQYWdlL29wZW5EZXZHdWlkZVBhZ2UkQF4wMTJtMSRAXnB1YmxpY0RhdGFQaz0xNTAxMjYzMyRAXnB1YmxpY0RhdGFEZXRhaWxQaz11ZGRpOjIzMDE5NTQ2LWQ3OGItNDE2Ny05N2E5LWI0MDg3YzczYTM5YyRAXm9wcnRpblNlcU5vPTE0NDYzJEBebWFpbkZsYWc9dHJ1ZQ==
const GET_LAND_USE_WFS_LIST = 'landuse/wfs/GET_LAND_USE_WFS_LIST';
const GET_LAND_USE_WFS_LIST_RECEIVED = 'landuse/wfs/GET_LAND_USE_WFS_LIST_RECEIVED';
const GET_LAND_USE_WFS_LIST_FAILURE = 'landuse/wfs/GET_LAND_USE_WFS_LIST_FAILURE';


//공공데이터 토지이용계획	토지이용계획WMS
//https://www.data.go.kr/subMain.jsp?param=T1BFTkFQSUAxNTAxMjYzMw==#/L3B1YnIvcG90L215cC9Jcm9zTXlQYWdlL29wZW5EZXZHdWlkZVBhZ2UkQF4wMTJtMSRAXnB1YmxpY0RhdGFQaz0xNTAxMjYzMyRAXnB1YmxpY0RhdGFEZXRhaWxQaz11ZGRpOjIzMDE5NTQ2LWQ3OGItNDE2Ny05N2E5LWI0MDg3YzczYTM5YyRAXm9wcnRpblNlcU5vPTE0NDYzJEBebWFpbkZsYWc9dHJ1ZQ==
const GET_LAND_USE_WMS_LIST = 'landuse/wfs/GET_LAND_USE_WMS_LIST';
const GET_LAND_USE_WMS_LIST_RECEIVED = 'landuse/wfs/GET_LAND_USE_WMS_LIST_RECEIVED';
const GET_LAND_USE_WMS_LIST_FAILURE = 'landuse/wfs/GET_LAND_USE_WMS_LIST_FAILURE';

// Actions
// 외부에서 호출하여 입력받아줄 값 ( ex) this.getProductList(search) )
export const getBrRecapTitleInfoList = createAction(GET_BLD_TITLE_INFO_LIST, search => search);

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
    const response = yield call(api.getBrRecapTitleInfoList, action.payload);
    yield put({type: GET_BLD_TITLE_INFO_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_BLD_TITLE_INFO_LIST_FAILURE, payload: error});
  }
}

// Product default root Saga
export function* brRecapTitleInfoSaga() {
  yield takeEvery(GET_BLD_TITLE_INFO_LIST, getBrRecapTitleInfoListSaga);
}

// 액션 핸들러 설정
export default handleActions({
  [GET_BLD_TITLE_INFO_LIST]: (state, action) => {
    console.log('GET_BLD_TITLE_INFO_LIST onPending')
    return {pending: true, error: false};
  },
  [GET_BLD_TITLE_INFO_LIST_RECEIVED]: (state, action) => {
    console.log('GET_BLD_TITLE_INFO_LIST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, titleList: fromJS(content)};
  },
  [GET_BLD_TITLE_INFO_LIST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_BLD_TITLE_INFO_LIST_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },
}, initialState);
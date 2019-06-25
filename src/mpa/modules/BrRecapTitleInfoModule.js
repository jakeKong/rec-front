import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';

import { call, put, takeEvery } from 'redux-saga/effects';

import * as api from '../index';

//공공데이터 건축물대장 건축물 표제부
//https://www.data.go.kr/subMain.jsp?param=T1BFTkFQSUAxNTAwNDgyNQ==#/L3B1YnIvcG90L215cC9Jcm9zTXlQYWdlL29wZW5EZXZHdWlkZVBhZ2UkQF4wMTJtMSRAXnB1YmxpY0RhdGFQaz0xNTAwNDgyNSRAXnB1YmxpY0RhdGFEZXRhaWxQaz11ZGRpOjAzNmI1ODRlLTJlYTItNDQ4Ny1iOWE4LWMyZjUwMTdlNWZiOCRAXm9wcnRpblNlcU5vPTEwNDQzJEBebWFpbkZsYWc9dHJ1ZQ==
const GET_BLD_TITLE_INFO_LIST = 'marketprice/GET_BLD_TITLE_INFO_LIST';
const GET_BLD_TITLE_INFO_LIST_RECEIVED = 'marketprice/GET_BLD_TITLE_INFO_LIST_RECEIVED';
const GET_BLD_TITLE_INFO_LIST_FAILURE = 'marketprice/GET_BLD_TITLE_INFO_LIST_FAILURE';

//공공데이터 건축물대장 건축물대장 층별 개요
//https://www.data.go.kr/subMain.jsp?param=T1BFTkFQSUAxNTAwNDgyNQ==#/L3B1YnIvcG90L215cC9Jcm9zTXlQYWdlL29wZW5EZXZHdWlkZVBhZ2UkQF4wMTJtMSRAXnB1YmxpY0RhdGFQaz0xNTAwNDgyNSRAXnB1YmxpY0RhdGFEZXRhaWxQaz11ZGRpOjAzNmI1ODRlLTJlYTItNDQ4Ny1iOWE4LWMyZjUwMTdlNWZiOCRAXm9wcnRpblNlcU5vPTEwNDQ0JEBebWFpbkZsYWc9dHJ1ZQ==
// const GET_BLD_FLR_OUT_IN_INFO = 'houseinfo/GET_BLD_FLR_OUT_IN_INFO';

//공공데이터 매매가격지수	매매가격지수
//https://www.data.go.kr/subMain.jsp?param=T1BFTkFQSUAxNTAwMjI2Ng==#/L3B1YnIvcG90L215cC9Jcm9zTXlQYWdlL29wZW5EZXZHdWlkZVBhZ2UkQF4wMTJtMSRAXnB1YmxpY0RhdGFQaz0xNTAwMjI2NiRAXnB1YmxpY0RhdGFEZXRhaWxQaz11ZGRpOjU1NDA3N2ZkLTkxMDEtNGQ3MS1hZmM1LTk2MjQ2MDBlOTQ5OCRAXm9wcnRpblNlcU5vPTE5Mjg4JEBebWFpbkZsYWc9dHJ1ZQ==
// const GET_TRADE_PRC_INDEX_INFO = 'houseinfo/GET_TRADE_PRC_INDEX_INFO';

//공공데이터 토지이용계획	토지이용계획WFS
//https://www.data.go.kr/subMain.jsp?param=T1BFTkFQSUAxNTAxMjYzMw==#/L3B1YnIvcG90L215cC9Jcm9zTXlQYWdlL29wZW5EZXZHdWlkZVBhZ2UkQF4wMTJtMSRAXnB1YmxpY0RhdGFQaz0xNTAxMjYzMyRAXnB1YmxpY0RhdGFEZXRhaWxQaz11ZGRpOjIzMDE5NTQ2LWQ3OGItNDE2Ny05N2E5LWI0MDg3YzczYTM5YyRAXm9wcnRpblNlcU5vPTE0NDYzJEBebWFpbkZsYWc9dHJ1ZQ==
// const GET_LAND_USE_WFS_LIST = 'houseinfo/GET_LAND_USE_WFS_LIST';

//공공데이터 토지이용계획	토지이용계획WMS
//https://www.data.go.kr/subMain.jsp?param=T1BFTkFQSUAxNTAxMjYzMw==#/L3B1YnIvcG90L215cC9Jcm9zTXlQYWdlL29wZW5EZXZHdWlkZVBhZ2UkQF4wMTJtMSRAXnB1YmxpY0RhdGFQaz0xNTAxMjYzMyRAXnB1YmxpY0RhdGFEZXRhaWxQaz11ZGRpOjIzMDE5NTQ2LWQ3OGItNDE2Ny05N2E5LWI0MDg3YzczYTM5YyRAXm9wcnRpblNlcU5vPTE0NDYzJEBebWFpbkZsYWc9dHJ1ZQ==
// const GET_LAND_USE_WMS_LIST = 'houseinfo/GET_LAND_USE_WMS_LIST';

//공공데이터 개별공시지가	개별공시지가 속성
//https://www.data.go.kr/subMain.jsp?param=T1BFTkFQSUAzMDUwNjUx#/L3B1YnIvcG90L215cC9Jcm9zTXlQYWdlL29wZW5EZXZHdWlkZVBhZ2UkQF4wMTJtMSRAXnB1YmxpY0RhdGFQaz0zMDUwNjUxJEBecHVibGljRGF0YURldGFpbFBrPXVkZGk6ZGFlZTI1ZDYtMTUxMC00MDRjLWFiOGEtZDFmNmM0NmQ0ZDBkJEBeb3BydGluU2VxTm89MTQ0ODMkQF5tYWluRmxhZz10cnVl
// const GET_INDVD_LAND_PRICE_ATTR_INFO = 'houseinfo/GET_INDVD_LAND_PRICE_ATTR_INFO';

//국가공간정보 토지소유정보	토지소유정보속성
//http://openapi.nsdi.go.kr/nsdi/eios/ServiceDetail.do?svcSe=S&svcId=S019
// const GET_POSSESSION_ATTR_INFO = 'houseinfo/GET_POSSESSION_ATTR_INFO';

//국가공간정보 토지특성정보	토지특성속성
//http://openapi.nsdi.go.kr/nsdi/eios/ServiceDetail.do?svcSe=S&svcId=S027
// const GET_LAND_CHARACTERISTICS_INFO = 'houseinfo/GET_LAND_CHARACTERISTICS_INFO';

//국가공간정보 개별주택가격정보	개별주택가격속성
//http://openapi.nsdi.go.kr/nsdi/eios/ServiceDetail.do?svcSe=S&svcId=S022#
// const GET_INDVD_HOUSING_PRICE_ATTR_INFO = 'houseinfo/GET_INDVD_HOUSING_PRICE_ATTR_INFO';

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
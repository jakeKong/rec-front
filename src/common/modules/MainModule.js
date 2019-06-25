import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { call, put, takeEvery } from 'redux-saga/effects';

// import * as api from '../index';
import { sampleHomeRequest } from './responseSample'

// Action Types
const GET_HOME_LIST = 'main/GET_HOME_LIST';
const GET_HOME_LIST_RECEIVED = 'main/GET_HOME_LIST_RECEIVED';
const GET_HOME_LIST_FAILURE = 'main/GET_HOME_LIST_FAILURE';

// Actions
export const getHomeList = createAction(GET_HOME_LIST);

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  homeList: List(),
});

// Saga
function* getHomeListSaga() {
  try {
    // const response = yield call(api.getHomeList);

    // 샘플값 설정
    const response = sampleHomeRequest;
    yield put({type: GET_HOME_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_HOME_LIST_FAILURE, payload: error});
  }
}

// default root Saga
export function* mainSaga() {
  yield takeEvery(GET_HOME_LIST, getHomeListSaga);
}

// 액션 핸들러 설정
export default handleActions({
  // Handler
    [GET_HOME_LIST]: (state, action) => {
      console.log('GET_HOME_LIST onPending')
      return {pending: true, error: false};
    },
    [GET_HOME_LIST_RECEIVED]: (state, action) => {
      console.log('GET_HOME_LIST_RECEIVED onReceived')
      const {data: content} = action.payload;
      // return {pending: false, error: false, success: true, homeList: fromJS(content)};
      return {pending: false, error: false, success: true, homeList: content};
    },
    [GET_HOME_LIST_FAILURE]: (state, action) => {
      const {error} = action.payload;
      console.log('GET_HOME_LIST_FAILURE onFailure')
      console.log('ERROR: ' + error)
      return {error: true};
    },
}, initialState);
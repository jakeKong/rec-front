import { createAction, handleActions } from 'redux-actions';
// eslint-disable-next-line
import { Map, List, fromJS } from 'immutable';
// eslint-disable-next-line
import { call, put, takeEvery } from 'redux-saga/effects';

import * as api from '../index';

// Action Types
const UPLOAD_FILE = 'files/UPLOAD_FILE';
const UPLOAD_FILE_RECEIVED = 'files/UPLOAD_FILE_RECEIVED';
const UPLOAD_FILE_FAILURE = 'files/UPLOAD_FILE_FAILURE';

// Actions
export const uploadFile = createAction(UPLOAD_FILE, file => file);

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  file: null
});

// Saga
function* uploadFileSaga(action) {
  try {
    const response = yield call(api.uploadFile, action.payload);
    yield put({type: UPLOAD_FILE_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: UPLOAD_FILE_FAILURE, payload: error});
  }
}

// default root Saga
export function* fileSaga() {
  yield takeEvery(UPLOAD_FILE, uploadFileSaga);
}

// 액션 핸들러 설정
export default handleActions({
  // Handler
    [UPLOAD_FILE]: (state, action) => {
      console.log('UPLOAD_FILE onPending')
      return {pending: true, error: false};
    },
    [UPLOAD_FILE_RECEIVED]: (state, action) => {
      console.log('UPLOAD_FILE_RECEIVED onReceived')
      const {data: content} = action.payload;
      return {pending: false, error: false, success: true, file: content};
    },
    [UPLOAD_FILE_FAILURE]: (state, action) => {
      const {error} = action.payload;
      console.log('UPLOAD_FILE_FAILURE onFailure')
      console.log('ERROR: ' + error)
      return {error: true};
    },
}, initialState);
import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as api from '../index';

// getUserList Action Types
const GET_USER_LIST = 'user/GET_USER_LIST';
const GET_USER_LIST_RECEIVED = 'user/GET_USER_LIST_RECEIVED';
const GET_USER_LIST_FAILURE = 'user/GET_USER_LIST_FAILURE';

// getUser Action Types
const GET_USER = 'user/GET_USER';
const GET_USER_RECEIVED = 'user/GET_USER_RECEIVED';
const GET_USER_FAILURE = 'user/GET_USER_FAILURE';

// addUser Action Types
const ADD_USER = 'user/ADD_USER';
const ADD_USER_RECEIVED = 'user/ADD_USER_RECEIVED';
const ADD_USER_FAILURE = 'user/ADD_USER_FAILURE';

// updateUser Action Types
const UPDATE_USER = 'user/UPDATE_USER';
const UPDATE_USER_RECEIVED = 'user/UPDATE_USER_RECEIVED';
const UPDATE_USER_FAILURE = 'user/UPDATE_USER_FAILURE';

// deleteUser Action Types
const DELETE_USER = 'user/DELETE_USER';
const DELETE_USER_RECEIVED = 'user/DELETE_USER_RECEIVED';
const DELETE_USER_FAILURE = 'user/DELETE_USER_FAILURE';

// deleteUsers Action Types
const DELETE_USERS = 'user/DELETE_USERS';
const DELETE_USERS_RECEIVED = 'user/DELETE_USERS_RECEIVED';
const DELETE_USERS_FAILURE = 'user/DELETE_USERS_FAILURE';

// updateUserByBalancePoint Action Types
const UPDATE_USER_BY_BALANCE_POINT = 'user/UPDATE_USER_BY_BALANCE_POINT';
const UPDATE_USER_BY_BALANCE_POINT_RECEIVED = 'user/UPDATE_USER_BY_BALANCE_POINT_RECEIVED';
const UPDATE_USER_BY_BALANCE_POINT_FAILURE = 'user/UPDATE_USER_BY_BALANCE_POINT_FAILURE';

// updateUserByBalancePointIncrease Action Types
const UPDATE_USER_BY_BALANCE_POINT_INCREASE = 'user/UPDATE_USER_BY_BALANCE_POINT_INCREASE';
const UPDATE_USER_BY_BALANCE_POINT_INCREASE_RECEIVED = 'user/UPDATE_USER_BY_BALANCE_POINT_INCREASE_RECEIVED';
const UPDATE_USER_BY_BALANCE_POINT_INCREASE_FAILURE = 'user/UPDATE_USER_BY_BALANCE_POINT_INCREASE_FAILURE';

// updateUserByBalancePointDifference Action Types
const UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE = 'user/UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE';
const UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE_RECEIVED = 'user/UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE_RECEIVED';
const UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE_FAILURE = 'user/UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE_FAILURE';

// Actions
export const getUserList = createAction(GET_USER_LIST, search => search);
export const getUser = createAction(GET_USER_LIST, email => email);
export const addUser = createAction(ADD_USER, (userDto, search) => ({userDto, search}));
export const updateUser = createAction(UPDATE_USER, (userDto, search) => ({userDto, search}));
export const deleteUser = createAction(DELETE_USER, (email, search) => ({email, search}));
export const deleteUsers = createAction(DELETE_USERS, (emails, search) => ({emails, search}));
export const updateUserByBalancePoint = createAction(UPDATE_USER_BY_BALANCE_POINT, (email, balancePoint) => ({email, balancePoint}));
export const updateUserByBalancePointIncrease = createAction(UPDATE_USER_BY_BALANCE_POINT_INCREASE, (email, increasePoint) => ({email, increasePoint}));
export const updateUserByBalancePointDifference = createAction(UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE, (email, differencePoint) => ({email, differencePoint}));

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  complete: false,
  userList: List(),
  user: Map({})
});

// getUserList Saga
function* getUserListSaga(action) {
  if (action.payload.search !== undefined) {
    try {
      const response = yield call(api.getUserList, action.payload.search);
      yield put({type: GET_USER_LIST_RECEIVED, payload: response});
    } catch (error) {
      yield put({type: GET_USER_LIST_FAILURE, payload: error});
    }
  } else {
    try {
      const response = yield call(api.getUserList, action.payload);
      yield put({type: GET_USER_LIST_RECEIVED, payload: response});
    } catch (error) {
      yield put({type: GET_USER_LIST_FAILURE, payload: error});
    }
  }
}

// getUser Saga
function* getUserSaga(action) {
  try {
    const response = yield call(api.getUser, action.payload);
    yield put({type: GET_USER_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_USER_LIST_FAILURE, payload: error});
  }
}

// addUser Saga
function* addUserSaga(action) {
  try {
    const response = yield call(api.addUser, action.payload.userDto);
    yield put({type: ADD_USER_RECEIVED, payload: response})
    // 추가완료 이후 목록 갱신 호출
    yield call(getUserListSaga, action);
  } catch (error) {
    yield put({type: ADD_USER_FAILURE, payload: error});
  }
}

// updateUser Saga
function* updateUserSaga(action) {
  try {
    const response = yield call(api.updateUser, action.payload.userDto);
    yield put({type: UPDATE_USER_RECEIVED, payload: response})
    // 수정완료 이후 목록 갱신 호출
    yield call(getUserListSaga, action);
  } catch (error) {
    yield put({type: UPDATE_USER_FAILURE, payload: error});
  }
}

// deleteUser Saga
function* deleteUserSaga(action) {
  try {
    const response = yield call(api.deleteUser, action.payload.email);
    yield put({type: DELETE_USER_RECEIVED, payload: response})
    // 삭제완료 이후 목록 갱신 호출
    yield call(getUserListSaga, action);
  } catch (error) {
    yield put({type: DELETE_USER_FAILURE, payload: error});
  }
}

// deleteUsers Saga
function* deleteUsersSaga(action) {
  try {
    const response = yield call(api.deleteUsers, action.payload.emails);
    yield put({type: DELETE_USERS_RECEIVED, payload: response})
    // 삭제완료 이후 목록 갱신 호출
    yield call(getUserListSaga, action);
  } catch (error) {
    yield put({type: DELETE_USERS_FAILURE, payload: error});
  }
}

// updateUserByBalancePoint Saga
function* updateUserByBalancePointSaga(action) {
  try {
    const response = yield call(api.updateUserByBalancePoint, action.payload.email, action.payload.balancePoint);
    yield put({type: UPDATE_USER_BY_BALANCE_POINT_RECEIVED, payload: response})
  } catch (error) {
    yield put({type: UPDATE_USER_BY_BALANCE_POINT_FAILURE, payload: error});
  }
}

// updateUserByBalancePointIncrease Saga
function* updateUserByBalancePointIncreaseSaga(action) {
  try {
    const response = yield call(api.updateUserByBalancePointIncrease, action.payload.email, action.payload.increasePoint);
    yield put({type: UPDATE_USER_BY_BALANCE_POINT_INCREASE_RECEIVED, payload: response})
  } catch (error) {
    yield put({type: UPDATE_USER_BY_BALANCE_POINT_INCREASE_FAILURE, payload: error});
  }
}

// updateUserByBalancePointDifference Saga
function* updateUserByBalancePointDifferenceSaga(action) {
  try {
    const response = yield call(api.updateUserByBalancePointDifference, action.payload.email, action.payload.differencePoint);
    yield put({type: UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE_RECEIVED, payload: response})
  } catch (error) {
    yield put({type: UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE_FAILURE, payload: error});
  }
}

// User default root Saga
export function* userSaga() {
  yield takeLatest(ADD_USER, addUserSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
  yield takeLatest(UPDATE_USER_BY_BALANCE_POINT, updateUserByBalancePointSaga);
  yield takeLatest(UPDATE_USER_BY_BALANCE_POINT_INCREASE, updateUserByBalancePointIncreaseSaga);
  yield takeLatest(UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE, updateUserByBalancePointDifferenceSaga);
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(DELETE_USERS, deleteUsersSaga);
  yield takeEvery(GET_USER_LIST, getUserListSaga);
  yield takeEvery(GET_USER, getUserSaga);
}

// 액션 핸들러 설정
export default handleActions({
  // getUserList Handler
  [GET_USER_LIST]: (state, action) => {
    console.log('GET_USER_LIST onPending')
    return {pending: true, error: false};
  },
  [GET_USER_LIST_RECEIVED]: (state, action) => {
    console.log('GET_USER_LIST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, userList: fromJS(content)};
  },
  [GET_USER_LIST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_USER_LIST_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },

  // getUser Handler
  [GET_USER]: (state, action) => {
    console.log('GET_USER onPending')
    return {pending: true, error: false};
  },
  [GET_USER_RECEIVED]: (state, action) => {
    console.log('GET_USER_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, user: fromJS(content)};
  },
  [GET_USER_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_USER_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },

  // addUser Handler
  [ADD_USER]: (state, action) => {
    console.log('ADD_USER onPending')
  },
  [ADD_USER_RECEIVED]: (state, action) => {
    console.log('ADD_USER_RECEIVED onReceived')
    return {complete: true};
  },
  [ADD_USER_FAILURE]: (state, action) => {
    console.log('ADD_USER_FAILURE onFailure')
    return {complete: false};
  },

  // updateUser Handler
  [UPDATE_USER]: (state, action) => {
    console.log('UPDATE_USER onPending')
  },
  [UPDATE_USER_RECEIVED]: (state, action) => {
    console.log('UPDATE_USER_RECEIVED onReceived')
    return {complete: true};
  },
  [UPDATE_USER_FAILURE]: (state, action) => {
    console.log('UPDATE_USER_FAILURE onFailure')
    return {complete: false};
  },

  // deleteUser Handler
  [DELETE_USER]: (state, action) => {
    console.log('DELETE_USER onPending')
  },
  [DELETE_USER_RECEIVED]: (state, action) => {
    console.log('DELETE_USER_RECEIVED onReceived')
    return {complete: true};
  },
  [DELETE_USER_FAILURE]: (state, action) => {
    console.log('DELETE_USER_FAILURE onFailure')
    return {complete: false};
  },  

  [DELETE_USERS]: (state, action) => {
    console.log('DELETE_USERS onPending')
  },
  [DELETE_USERS_RECEIVED]: (state, action) => {
    console.log('DELETE_USERS_RECEIVED onReceived')
    return {complete: true};
  },
  [DELETE_USERS_FAILURE]: (state, action) => {
    console.log('DELETE_USERS_FAILURE onFailure')
    return {complete: false};
  },  

  // updateUserByBalancePoint Handler
  [UPDATE_USER_BY_BALANCE_POINT]: (state, action) => {
    console.log('UPDATE_USER_BY_BALANCE_POINT onPending')
  },
  [UPDATE_USER_BY_BALANCE_POINT_RECEIVED]: (state, action) => {
    console.log('UPDATE_USER_BY_BALANCE_POINT_RECEIVED onReceived')
    // return {complete: true};
  },
  [UPDATE_USER_BY_BALANCE_POINT_FAILURE]: (state, action) => {
    console.log('UPDATE_USER_BY_BALANCE_POINT_FAILURE onFailure')
    // return {complete: false};
  },

  // updateUserByBalancePointIncrease Handler
  [UPDATE_USER_BY_BALANCE_POINT_INCREASE]: (state, action) => {
    console.log('UPDATE_USER_BY_BALANCE_POINT_INCREASE onPending')
  },
  [UPDATE_USER_BY_BALANCE_POINT_INCREASE_RECEIVED]: (state, action) => {
    console.log('UPDATE_USER_BY_BALANCE_POINT_INCREASE_RECEIVED onReceived')
    // return {complete: true};
  },
  [UPDATE_USER_BY_BALANCE_POINT_INCREASE_FAILURE]: (state, action) => {
    console.log('UPDATE_USER_BY_BALANCE_POINT_INCREASE_FAILURE onFailure')
    // return {complete: false};
  },

  // updateUserByBalancePointDifference Handler
  [UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE]: (state, action) => {
    console.log('UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE onPending')
  },
  [UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE_RECEIVED]: (state, action) => {
    console.log('UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE_RECEIVED onReceived')
    // return {complete: true};
  },
  [UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE_FAILURE]: (state, action) => {
    console.log('UPDATE_USER_BY_BALANCE_POINT_DIFFERENCE_FAILURE onFailure')
    // return {complete: false};
  },
}, initialState);
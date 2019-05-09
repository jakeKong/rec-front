import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as api from '../index';

// getProductList Action Types
const GET_PRODUCT_LIST = 'product/GET_PRODUCT_LIST';
const GET_PRODUCT_LIST_RECEIVED = 'product/GET_PRODUCT_LIST_RECEIVED';
const GET_PRODUCT_LIST_FAILURE = 'product/GET_PRODUCT_LIST_FAILURE';

// addProduct Action Types
const ADD_PRODUCT = 'product/ADD_PRODUCT';
const ADD_PRODUCT_RECEIVED = 'product/ADD_PRODUCT_RECEIVED';
const ADD_PRODUCT_FAILURE = 'product/ADD_PRODUCT_FAILURE';

// updateProduct Action Types
const UPDATE_PRODUCT = 'product/UPDATE_PRODUCT';
const UPDATE_PRODUCT_RECEIVED = 'product/UPDATE_PRODUCT_RECEIVED';
const UPDATE_PRODUCT_FAILURE = 'product/UPDATE_PRODUCT_FAILURE';

// deleteProduct Action Types
const DELETE_PRODUCT = 'product/DELETE_PRODUCT';
const DELETE_PRODUCT_RECEIVED = 'product/DELETE_PRODUCT_RECEIVED';
const DELETE_PRODUCT_FAILURE = 'product/DELETE_PRODUCT_FAILURE';

// Actions
// 외부에서 호출하여 입력받아줄 값 ( ex) this.getProductList(search) )
export const getProductList = createAction(GET_PRODUCT_LIST, search => search);
export const addProduct = createAction(ADD_PRODUCT, (dto, search) => ({dto, search}));
export const updateProduct = createAction(UPDATE_PRODUCT, (dto, search) => ({dto, search}));
export const deleteProduct = createAction(DELETE_PRODUCT, (productSid, search) => ({productSid, search}));

// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  complete: false,
  productList: List(),
  product: Map({})
});

// getProductList Saga
function* getProductListSaga(action) {
  try {
    const response = yield call(api.getProductList, action.payload);
    yield put({type: GET_PRODUCT_LIST_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_PRODUCT_LIST_FAILURE, payload: error});
  }
}

// addProduct Saga
function* addProductSaga(action) {
  try {
    const response = yield call(api.addProduct, action.payload.dto);
    yield put({type: ADD_PRODUCT_RECEIVED, payload: response})
    // 상품 추가완료 이후 상품목록 갱신을 위한 상품목록 호출
    yield call(getProductListSaga, action);
  } catch (error) {
    yield put({type: ADD_PRODUCT_FAILURE, payload: error});
  }
}

// updateProduct Saga
function* updateProductSaga(action) {
  try {
    const response = yield call(api.updateProduct, action.payload.dto);
    yield put({type: UPDATE_PRODUCT_RECEIVED, payload: response})
    // 상품 수정완료 이후 상품목록 갱신을 위한 상품목록 호출
    yield call(getProductListSaga, action);
  } catch (error) {
    yield put({type: UPDATE_PRODUCT_FAILURE, payload: error});
  }
}

// deleteProduct Saga
function* deleteProductSaga(action) {
  try {
    const response = yield call(api.deleteProduct, action.payload.productSid);
    yield put({type: DELETE_PRODUCT_RECEIVED, payload: response})
    // 상품 삭제완료 이후 상품목록 갱신을 위한 상품목록 호출
    yield call(getProductListSaga, action);
  } catch (error) {
    yield put({type: DELETE_PRODUCT_FAILURE, payload: error});
  }
}

// Product default root Saga
export function* productSaga() {
  yield takeLatest(ADD_PRODUCT, addProductSaga);
  yield takeLatest(UPDATE_PRODUCT, updateProductSaga);
  yield takeLatest(DELETE_PRODUCT, deleteProductSaga);
  yield takeEvery(GET_PRODUCT_LIST, getProductListSaga);
}

// 액션 핸들러 설정
export default handleActions({
  // getProductList Handler
  [GET_PRODUCT_LIST]: (state, action) => {
    console.log('GET_PRODUCT_LIST onPending')
    return {pending: true, error: false};
  },
  [GET_PRODUCT_LIST_RECEIVED]: (state, action) => {
    console.log('GET_PRODUCT_LIST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, productList: fromJS(content)};
  },
  [GET_PRODUCT_LIST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_PRODUCT_LIST_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },

  // addProduct Handler
  [ADD_PRODUCT]: (state, action) => {
    console.log('ADD_PRODUCT onPending')
  },
  [ADD_PRODUCT_RECEIVED]: (state, action) => {
    console.log('ADD_PRODUCT_RECEIVED onReceived')
    return {complete: true};

  },
  [ADD_PRODUCT_FAILURE]: (state, action) => {
    console.log('ADD_PRODUCT_FAILURE onFailure')
    return {complete: false};
  },

  // updateProduct Handler
  [UPDATE_PRODUCT]: (state, action) => {
    console.log('UPDATE_PRODUCT onPending')
  },
  [UPDATE_PRODUCT_RECEIVED]: (state, action) => {
    console.log('UPDATE_PRODUCT_RECEIVED onReceived')
    return {complete: true};
  },
  [UPDATE_PRODUCT_FAILURE]: (state, action) => {
    console.log('UPDATE_PRODUCT_FAILURE onFailure')
    return {complete: false};
  },

  // deleteProduct Handler
  [DELETE_PRODUCT]: (state, action) => {
    console.log('DELETE_PRODUCT onPending')
  },
  [DELETE_PRODUCT_RECEIVED]: (state, action) => {
    console.log('DELETE_PRODUCT_RECEIVED onReceived')
    return {complete: true};
  },
  [DELETE_PRODUCT_FAILURE]: (state, action) => {
    console.log('DELETE_PRODUCT_FAILURE onFailure')
    return {complete: false};
  },  
}, initialState);
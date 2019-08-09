import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as api from '../index';

// getQuestionList Action Types
const GET_QUESTION_LIST = 'question/GET_QUESTION_LIST';
const GET_QUESTION_LIST_RECEIVED = 'question/GET_QUESTION_LIST_RECEIVED';
const GET_QUESTION_LIST_FAILURE = 'question/GET_QUESTION_LIST_FAILURE';

// getQuestion Action Types
const GET_QUESTION = 'question/GET_QUESTION';
const GET_QUESTION_RECEIVED = 'question/GET_QUESTION_RECEIVED';
const GET_QUESTION_FAILURE = 'question/GET_QUESTION_FAILURE';

// deleteQuestion Action Types
const DELETE_QUESTION = 'question/DELETE_QUESTION';
const DELETE_QUESTION_RECEIVED = 'question/DELETE_QUESTION_RECEIVED';
const DELETE_QUESTION_FAILURE = 'question/DELETE_QUESTION_FAILURE';

// deleteQuestionByList Action Types
const DELETE_QUESTION_BY_LIST = 'question/DELETE_QUESTION_BY_LIST';
const DELETE_QUESTION_BY_LIST_RECEIVED = 'question/DELETE_QUESTION_BY_LIST_RECEIVED';
const DELETE_QUESTION_BY_LIST_FAILURE = 'question/DELETE_QUESTION_BY_LIST_FAILURE';

// getQuestionListByEmail Action Types
const GET_QUESTION_LIST_BY_EMAIL = 'question/GET_QUESTION_LIST_BY_EMAIL';
const GET_QUESTION_LIST_BY_EMAIL_RECEIVED = 'question/GET_QUESTION_LIST_BY_EMAIL_RECEIVED';
const GET_QUESTION_LIST_BY_EMAIL_FAILURE = 'question/GET_QUESTION_LIST_BY_EMAIL_FAILURE';

// getQuestionAnswerList Action Types
const GET_QUESTION_ANSWER_LIST = 'question/GET_QUESTION_ANSWER_LIST';
const GET_QUESTION_ANSWER_LIST_RECEIVED = 'question/GET_QUESTION_ANSWER_LIST_RECEIVED';
const GET_QUESTION_ANSWER_LIST_FAILURE = 'question/GET_QUESTION_ANSWER_LIST_FAILURE';

// getQuestionAnswerCmtList Action Types
/*
const GET_QUESTION_ANSWER_CMT_LIST = 'question/GET_QUESTION_ANSWER_CMT_LIST';
const GET_QUESTION_ANSWER_CMT_LIST_RECEIVED = 'question/GET_QUESTION_ANSWER_CMT_LIST_RECEIVED';
const GET_QUESTION_ANSWER_CMT_LIST_FAILURE = 'question/GET_QUESTION_ANSWER_CMT_LIST_FAILURE';
*/

// addQuestion Action Types
const ADD_QUESTION = 'question/ADD_QUESTION';
const ADD_QUESTION_RECEIVED = 'question/ADD_QUESTION_RECEIVED';
const ADD_QUESTION_FAILURE = 'question/ADD_QUESTION_FAILURE';

// addQuestionAnswer Action Types
const ADD_QUESTION_ANSWER = 'question/ADD_QUESTION_ANSWER';
const ADD_QUESTION_ANSWER_RECEIVED = 'question/ADD_QUESTION_ANSWER_RECEIVED';
const ADD_QUESTION_ANSWER_FAILURE = 'question/ADD_QUESTION_ANSWER_FAILURE';

// addQuestionAnswerCmt Action Types
const ADD_QUESTION_ANSWER_CMT = 'question/ADD_QUESTION_ANSWER_CMT';
const ADD_QUESTION_ANSWER_CMT_RECEIVED = 'question/ADD_QUESTION_ANSWER_CMT_RECEIVED';
const ADD_QUESTION_ANSWER_CMT_FAILURE = 'question/ADD_QUESTION_ANSWER_CMT_FAILURE';

// updateQuestion Action Types
const UPDATE_QUESTION = 'question/UPDATE_QUESTION';
const UPDATE_QUESTION_RECEIVED = 'question/UPDATE_QUESTION_RECEIVED';
const UPDATE_QUESTION_FAILURE = 'question/UPDATE_QUESTION_FAILURE';

// updateQuestionAnswer Action Types
const UPDATE_QUESTION_ANSWER = 'question/UPDATE_QUESTION_ANSWER';
const UPDATE_QUESTION_ANSWER_RECEIVED = 'question/UPDATE_QUESTION_ANSWER_RECEIVED';
const UPDATE_QUESTION_ANSWER_FAILURE = 'question/UPDATE_QUESTION_ANSWER_FAILURE';

// updateQuestionAnswerCmt Action Types
const UPDATE_QUESTION_ANSWER_CMT = 'question/UPDATE_QUESTION_ANSWER_CMT';
const UPDATE_QUESTION_ANSWER_CMT_RECEIVED = 'question/UPDATE_QUESTION_ANSWER_CMT_RECEIVED';
const UPDATE_QUESTION_ANSWER_CMT_FAILURE = 'question/UPDATE_QUESTION_ANSWER_CMT_FAILURE';

// deleteQuestionByEmail Action Types
const DELETE_QUESTION_BY_EMAIL = 'question/DELETE_QUESTION_BY_EMAIL';
const DELETE_QUESTION_BY_EMAIL_RECEIVED = 'question/DELETE_QUESTION_BY_EMAIL_RECEIVED';
const DELETE_QUESTION_BY_EMAIL_FAILURE = 'question/DELETE_QUESTION_BY_EMAIL_FAILURE';

// deleteQuestionAnswerByEmail Action Types
const DELETE_QUESTION_ANSWER_BY_EMAIL = 'question/DELETE_QUESTION_ANSWER_BY_EMAIL';
const DELETE_QUESTION_ANSWER_BY_EMAIL_RECEIVED = 'question/DELETE_QUESTION_ANSWER_BY_EMAIL_RECEIVED';
const DELETE_QUESTION_ANSWER_BY_EMAIL_FAILURE = 'question/DELETE_QUESTION_ANSWER_BY_EMAIL_FAILURE';

// deleteQuestionAnswerCmtByEmail Action Types
const DELETE_QUESTION_ANSWER_CMT_BY_EMAIL = 'question/DELETE_QUESTION_ANSWER_CMT_BY_EMAIL';
const DELETE_QUESTION_ANSWER_CMT_BY_EMAIL_RECEIVED = 'question/DELETE_QUESTION_ANSWER_CMT_BY_EMAIL_RECEIVED';
const DELETE_QUESTION_ANSWER_CMT_BY_EMAIL_FAILURE = 'question/DELETE_QUESTION_ANSWER_CMT_BY_EMAIL_FAILURE';

// Actions
// 외부에서 호출하여 입력받아줄 값 ( ex) this.getProductList(search) )
export const getQuestionList = createAction(GET_QUESTION_LIST, search => search);
export const getQuestion = createAction(GET_QUESTION, questionSid => questionSid);
export const deleteQuestion = createAction(DELETE_QUESTION, questionSid => questionSid);
export const deleteQuestionByList = createAction(DELETE_QUESTION_BY_LIST, (ids, search) => ({ids, search}));

export const getQuestionListByEmail = createAction(GET_QUESTION_LIST_BY_EMAIL, (email, search) => ({email, search}));
export const getQuestionAnswerList = createAction(GET_QUESTION_ANSWER_LIST, questionSid => questionSid);
// export const getQuestionAnswerCmtList = createAction(GET_QUESTION_ANSWER_CMT_LIST, questionAnswerSid => questionAnswerSid);

export const addQuestion = createAction(ADD_QUESTION, (email, dto, search) => ({email, dto, search}));
export const addQuestionAnswer = createAction(ADD_QUESTION_ANSWER, (questionSid, email, dto) => ({questionSid, email, dto}));
export const addQuestionAnswerCmt = createAction(ADD_QUESTION_ANSWER_CMT, (questionSid, questionAnswerSid, email, dto) => ({questionSid, questionAnswerSid, email, dto}));

export const updateQuestion = createAction(UPDATE_QUESTION, (questionSid, email, dto, search) => ({questionSid, email, dto, search}));
export const updateQuestionAnswer = createAction(UPDATE_QUESTION_ANSWER, (questionSid, questionAnswerSid, email, dto) => ({questionSid, questionAnswerSid, email, dto}));
export const updateQuestionAnswerCmt = createAction(UPDATE_QUESTION_ANSWER_CMT, (questionSid, questionAnswerCmtSid, email, dto) => ({questionSid, questionAnswerCmtSid, email, dto}));

export const deleteQuestionByEmail = createAction(DELETE_QUESTION_BY_EMAIL, (questionSid, email, search) => ({questionSid, email, search}));
export const deleteQuestionAnswerByEmail = createAction(DELETE_QUESTION_ANSWER_BY_EMAIL, (questionSid, questionAnswerSid, email) => ({questionSid, questionAnswerSid, email}));
export const deleteQuestionAnswerCmtByEmail = createAction(DELETE_QUESTION_ANSWER_CMT_BY_EMAIL, (questionSid, questionAnswerCmtSid, email) => ({questionSid, questionAnswerCmtSid, email}));


// 초기 state값 설정
const initialState = Map({
  pending: false,
  error: false,
  success: false,
  complete: false,
  questionList: List(),
  questionAnswerList: List(),
  questionAnswerCmtList: List(),
  question: Map({})
});

// getQuestionList Saga
function* getQuestionListSaga(action) {
  if (action.payload.search !== undefined) {
    try {
      const response = yield call(api.getQuestionList, action.payload.search);
      yield put({type: GET_QUESTION_LIST_RECEIVED, payload: response});
    } catch (error) {
      yield put({type: GET_QUESTION_LIST_FAILURE, payload: error});
    }
  } else {
    try {
      const response = yield call(api.getQuestionList, action.payload);
      yield put({type: GET_QUESTION_LIST_RECEIVED, payload: response});
    } catch (error) {
      yield put({type: GET_QUESTION_LIST_FAILURE, payload: error});
    }
  }
}

// getQuestion Saga
function* getQuestionSaga(action) {
  try {
    const response = yield call(api.getQuestion, action.payload);
    yield put({type: GET_QUESTION_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_QUESTION_FAILURE, payload: error});
  }
}

// deleteQuestion Saga
function* deleteQuestionSaga(action) {
  try {
    const response = yield call(api.deleteQuestion, action.payload);
    yield put({type: DELETE_QUESTION_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: DELETE_QUESTION_FAILURE, payload: error});
  }
}

// deleteQuestionByList Saga
function* deleteQuestionByListSaga(action) {
  try {
    const response = yield call(api.deleteQuestionByList, action.payload.ids);
    yield put({type: DELETE_QUESTION_BY_LIST_RECEIVED, payload: response});
    yield call(getQuestionListSaga, action);
  } catch (error) {
    yield put({type: DELETE_QUESTION_BY_LIST_FAILURE, payload: error});
  }
}

// getQuestionListByEmail Saga
function* getQuestionListByEmailSaga(action) {
  try {
    const response = yield call(api.getQuestionListByEmail, action.payload.email, action.payload.search);
    yield put({type: GET_QUESTION_LIST_BY_EMAIL_RECEIVED, payload: response});
  } catch (error) {
    yield put({type: GET_QUESTION_LIST_BY_EMAIL_FAILURE, payload: error});
  }
}

// getQuestionAnswerList Saga
function* getQuestionAnswerListSaga(action) {
  if (action.payload.questionSid !== undefined) {
    try {
      const response = yield call(api.getQuestionAnswerList, action.payload.questionSid);
      yield put({type: GET_QUESTION_ANSWER_LIST_RECEIVED, payload: response});
    } catch (error) {
      yield put({type: GET_QUESTION_ANSWER_LIST_FAILURE, payload: error});
    }
  } else {
    try {
      const response = yield call(api.getQuestionAnswerList, action.payload);
      yield put({type: GET_QUESTION_ANSWER_LIST_RECEIVED, payload: response});
    } catch (error) {
      yield put({type: GET_QUESTION_ANSWER_LIST_FAILURE, payload: error});
    }
  }
}

// getQuestionAnswerCmtList Saga
/*
function* getQuestionAnswerCmtListSaga(action) {
  if (action.payload.questionAnswerSid !== undefined) {
    try {
      const response = yield call(api.getQuestionAnswerCmtList, action.payload.questionAnswerSid);
      yield put({type: GET_QUESTION_ANSWER_CMT_LIST_RECEIVED, payload: response});
    } catch (error) {
      yield put({type: GET_QUESTION_ANSWER_CMT_LIST_FAILURE, payload: error});
    }
  } else {
    try {
      const response = yield call(api.getQuestionAnswerCmtList, action.payload);
      yield put({type: GET_QUESTION_ANSWER_CMT_LIST_RECEIVED, payload: response});
    } catch (error) {
      yield put({type: GET_QUESTION_ANSWER_CMT_LIST_FAILURE, payload: error});
    }
  }
}
*/

// addQuestion Saga
function* addQuestionSaga(action) {
  try {
    const response = yield call(api.addQuestion, action.payload.email, action.payload.dto);
    yield put({type: ADD_QUESTION_RECEIVED, payload: response})
    // 추가완료 이후 목록 갱신 호출
    yield call(getQuestionListByEmailSaga, action);
  } catch (error) {
    yield put({type: ADD_QUESTION_FAILURE, payload: error});
  }
}

// addQuestionAnswer Saga
function* addQuestionAnswerSaga(action) {
  try {
    const response = yield call(api.addQuestionAnswer, action.payload.questionSid, action.payload.email, action.payload.dto);
    yield put({type: ADD_QUESTION_ANSWER_RECEIVED, payload: response})
    // 추가완료 이후 답변 목록 갱신 호출
    yield call(getQuestionAnswerListSaga, action);
  } catch (error) {
    yield put({type: ADD_QUESTION_ANSWER_FAILURE, payload: error});
  }
}

// addQuestionAnswerCmt Saga
function* addQuestionAnswerCmtSaga(action) {
  try {
    const response = yield call(api.addQuestionAnswerCmt, action.payload.questionAnswerSid, action.payload.email, action.payload.dto);
    yield put({type: ADD_QUESTION_ANSWER_CMT_RECEIVED, payload: response})
    // 추가완료 이후 답변 코멘트 목록 갱신 호출
    yield call(getQuestionAnswerListSaga, action);
  } catch (error) {
    yield put({type: ADD_QUESTION_ANSWER_CMT_FAILURE, payload: error});
  }
}

// updateQuestion Saga
function* updateQuestionSaga(action) {
  try {
    const response = yield call(api.updateQuestion, action.payload.questionSid, action.payload.email, action.payload.dto);
    yield put({type: UPDATE_QUESTION_RECEIVED, payload: response})
    // 수정완료 이후 목록 갱신 호출
    yield call(getQuestionListByEmailSaga, action);
  } catch (error) {
    yield put({type: UPDATE_QUESTION_FAILURE, payload: error});
  }
}

// updateQuestionAnswer Saga
function* updateQuestionAnswerSaga(action) {
  try {
    const response = yield call(api.updateQuestionAnswer, action.payload.questionAnswerSid, action.payload.email, action.payload.dto);
    yield put({type: UPDATE_QUESTION_ANSWER_RECEIVED, payload: response})
    // 수정완료 이후 답변 목록 갱신 호출
    yield call(getQuestionAnswerListSaga, action);
  } catch (error) {
    yield put({type: UPDATE_QUESTION_ANSWER_FAILURE, payload: error});
  }
}

// updateQuestionAnswerCmt Saga
function* updateQuestionAnswerCmtSaga(action) {
  try {
    const response = yield call(api.updateQuestionAnswerCmt, action.payload.questionAnswerCmtSid, action.payload.email, action.payload.dto);
    yield put({type: UPDATE_QUESTION_ANSWER_CMT_RECEIVED, payload: response})
    // 수정완료 이후 답변 코멘트 목록 갱신 호출
    yield call(getQuestionAnswerListSaga, action);
  } catch (error) {
    yield put({type: UPDATE_QUESTION_ANSWER_CMT_FAILURE, payload: error});
  }
}

// deleteQuestionByEmail Saga
function* deleteQuestionByEmailSaga(action) {
  try {
    const response = yield call(api.deleteQuestionByEmail, action.payload.questionSid, action.payload.email);
    yield put({type: DELETE_QUESTION_BY_EMAIL_RECEIVED, payload: response})
    // 삭제완료 이후 목록 갱신 호출
    yield call(getQuestionListByEmailSaga, action);
  } catch (error) {
    yield put({type: DELETE_QUESTION_BY_EMAIL_FAILURE, payload: error});
  }
}

// deleteQuestionAnswer Saga
function* deleteQuestionAnswerSaga(action) {
  try {
    const response = yield call(api.deleteQuestionAnswerByEmail, action.payload.questionAnswerSid, action.payload.email);
    yield put({type: DELETE_QUESTION_ANSWER_BY_EMAIL_RECEIVED, payload: response})
    // 삭제완료 이후 답변 목록 갱신 호출
    yield call(getQuestionAnswerListSaga, action);
  } catch (error) {
    yield put({type: DELETE_QUESTION_ANSWER_BY_EMAIL_FAILURE, payload: error});
  }
}

// deleteQuestionAnswerCmt Saga
function* deleteQuestionAnswerCmtSaga(action) {
  try {
    const response = yield call(api.deleteQuestionAnswerCmtByEmail, action.payload.questionAnswerCmtSid, action.payload.email);
    yield put({type: DELETE_QUESTION_ANSWER_CMT_BY_EMAIL_RECEIVED, payload: response})
    // 삭제완료 이후 답변 코멘트 목록 갱신 호출
    yield call(getQuestionAnswerListSaga, action);
  } catch (error) {
    yield put({type: DELETE_QUESTION_ANSWER_CMT_BY_EMAIL_FAILURE, payload: error});
  }
}

// Question default root Saga
export function* questionSaga() {
  yield takeEvery(GET_QUESTION_LIST, getQuestionListSaga);
  yield takeEvery(GET_QUESTION, getQuestionSaga);
  yield takeLatest(DELETE_QUESTION, deleteQuestionSaga);
  yield takeLatest(DELETE_QUESTION_BY_LIST, deleteQuestionByListSaga);

  yield takeEvery(GET_QUESTION_LIST_BY_EMAIL, getQuestionListByEmailSaga);
  yield takeEvery(GET_QUESTION_ANSWER_LIST, getQuestionAnswerListSaga);
  // yield takeEvery(GET_QUESTION_ANSWER_CMT_LIST, getQuestionAnswerCmtListSaga);

  yield takeLatest(ADD_QUESTION, addQuestionSaga);
  yield takeLatest(ADD_QUESTION_ANSWER, addQuestionAnswerSaga);
  yield takeLatest(ADD_QUESTION_ANSWER_CMT, addQuestionAnswerCmtSaga);

  yield takeLatest(UPDATE_QUESTION, updateQuestionSaga);
  yield takeLatest(UPDATE_QUESTION_ANSWER, updateQuestionAnswerSaga);
  yield takeLatest(UPDATE_QUESTION_ANSWER_CMT, updateQuestionAnswerCmtSaga);

  yield takeLatest(DELETE_QUESTION_BY_EMAIL, deleteQuestionByEmailSaga);
  yield takeLatest(DELETE_QUESTION_ANSWER_BY_EMAIL, deleteQuestionAnswerSaga);
  yield takeLatest(DELETE_QUESTION_ANSWER_CMT_BY_EMAIL, deleteQuestionAnswerCmtSaga);
}

// 액션 핸들러 설정
export default handleActions({
  // getQuestionList Handler
  [GET_QUESTION_LIST]: (state, action) => {
    console.log('GET_QUESTION_LIST onPending')
    return {pending: true, error: false};
  },
  [GET_QUESTION_LIST_RECEIVED]: (state, action) => {
    console.log('GET_QUESTION_LIST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, questionList: fromJS(content)};
  },
  [GET_QUESTION_LIST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_QUESTION_LIST_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },

  // getQuestion Handler
  [GET_QUESTION]: (state, action) => {
    console.log('GET_QUESTION onPending')
    return {pending: true, error: false};
  },
  [GET_QUESTION_RECEIVED]: (state, action) => {
    console.log('GET_QUESTION_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, question: content};
  },
  [GET_QUESTION_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_QUESTION_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },  

  // deleteQuestion Handler
  [DELETE_QUESTION]: (state, action) => {
    console.log('DELETE_QUESTION onPending')
  },
  [DELETE_QUESTION_RECEIVED]: (state, action) => {
    console.log('DELETE_QUESTION_RECEIVED onReceived')
    return {complete: true};
  },
  [DELETE_QUESTION_FAILURE]: (state, action) => {
    console.log('DELETE_QUESTION_FAILURE onFailure')
    return {complete: false};
  },

  // deleteQuestion Handler
  [DELETE_QUESTION_BY_LIST]: (state, action) => {
    console.log('DELETE_QUESTION_BY_LIST onPending')
  },
  [DELETE_QUESTION_BY_LIST_RECEIVED]: (state, action) => {
    console.log('DELETE_QUESTION_BY_LIST_RECEIVED onReceived')
    return {complete: true};
  },
  [DELETE_QUESTION_BY_LIST_FAILURE]: (state, action) => {
    console.log('DELETE_QUESTION_BY_LIST_FAILURE onFailure')
    return {complete: false};
  },  

  // deleteQuestionByList Handler
  [ADD_QUESTION]: (state, action) => {
    console.log('ADD_QUESTION onPending')
  },
  [ADD_QUESTION_RECEIVED]: (state, action) => {
    console.log('ADD_QUESTION_RECEIVED onReceived')
    return {complete: true};
  },
  [ADD_QUESTION_FAILURE]: (state, action) => {
    console.log('ADD_QUESTION_FAILURE onFailure')
    return {complete: false};
  },

  // getQuestionListByEmail Handler
  [GET_QUESTION_LIST_BY_EMAIL]: (state, action) => {
    console.log('GET_QUESTION_LIST_BY_EMAIL onPending')
    return {pending: true, error: false};
  },
  [GET_QUESTION_LIST_BY_EMAIL_RECEIVED]: (state, action) => {
    console.log('GET_QUESTION_LIST_BY_EMAIL_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {pending: false, error: false, success: true, questionList: fromJS(content)};
  },
  [GET_QUESTION_LIST_BY_EMAIL_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_QUESTION_LIST_BY_EMAIL_FAILURE onFailure')
    console.log('ERROR: ' + error)
    return {error: true};
  },

  // getQuestionAnswerList Handler
  [GET_QUESTION_ANSWER_LIST]: (state, action) => {
    console.log('GET_QUESTION_ANSWER_LIST onPending')
  },
  [GET_QUESTION_ANSWER_LIST_RECEIVED]: (state, action) => {
    console.log('GET_QUESTION_ANSWER_LIST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {questionAnswerList: fromJS(content)};
  },
  [GET_QUESTION_ANSWER_LIST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_QUESTION_ANSWER_LIST_FAILURE onFailure')
    console.log('ERROR: ' + error)
  },

  // getQuestionAnswerCmtList Handler
  /*
  [GET_QUESTION_ANSWER_CMT_LIST]: (state, action) => {
    console.log('GET_QUESTION_ANSWER_CMT_LIST onPending')
  },
  [GET_QUESTION_ANSWER_CMT_LIST_RECEIVED]: (state, action) => {
    console.log('GET_QUESTION_ANSWER_CMT_LIST_RECEIVED onReceived')
    const {data: content} = action.payload;
    return {questionAnswerCmtList: fromJS(content)};
  },
  [GET_QUESTION_ANSWER_CMT_LIST_FAILURE]: (state, action) => {
    const {error} = action.payload;
    console.log('GET_QUESTION_ANSWER_CMT_LIST_FAILURE onFailure')
    console.log('ERROR: ' + error)
  },
  */

  // addQuestion Handler
  [ADD_QUESTION]: (state, action) => {
    console.log('ADD_QUESTION onPending')
  },
  [ADD_QUESTION_RECEIVED]: (state, action) => {
    console.log('ADD_QUESTION_RECEIVED onReceived')
    return {complete: true};
  },
  [ADD_QUESTION_FAILURE]: (state, action) => {
    console.log('ADD_QUESTION_FAILURE onFailure')
    return {complete: false};
  },

  // addQuestionAnswer Handler
  [ADD_QUESTION_ANSWER]: (state, action) => {
    console.log('ADD_QUESTION_ANSWER onPending')
  },
  [ADD_QUESTION_ANSWER_RECEIVED]: (state, action) => {
    console.log('ADD_QUESTION_ANSWER_RECEIVED onReceived')
    return {complete: true};
  },
  [ADD_QUESTION_ANSWER_FAILURE]: (state, action) => {
    console.log('ADD_QUESTION_ANSWER_FAILURE onFailure')
    return {complete: false};
  },

  // addQuestionAnswerCmt Handler
  [ADD_QUESTION_ANSWER_CMT]: (state, action) => {
    console.log('ADD_QUESTION_ANSWER_CMT onPending')
  },
  [ADD_QUESTION_ANSWER_CMT_RECEIVED]: (state, action) => {
    console.log('ADD_QUESTION_ANSWER_CMT_RECEIVED onReceived')
    return {complete: true};
  },
  [ADD_QUESTION_ANSWER_CMT_FAILURE]: (state, action) => {
    console.log('ADD_QUESTION_ANSWER_CMT_FAILURE onFailure')
    return {complete: false};
  },

  // updateQuestion Handler
  [UPDATE_QUESTION]: (state, action) => {
    console.log('UPDATE_QUESTION onPending')
  },
  [UPDATE_QUESTION_RECEIVED]: (state, action) => {
    console.log('UPDATE_QUESTION_RECEIVED onReceived')
    return {complete: true};
  },
  [UPDATE_QUESTION_FAILURE]: (state, action) => {
    console.log('UPDATE_QUESTION_FAILURE onFailure')
    return {complete: false};
  },

  // updateQuestionAnswer Handler
  [UPDATE_QUESTION_ANSWER]: (state, action) => {
    console.log('UPDATE_QUESTION_ANSWER onPending')
  },
  [UPDATE_QUESTION_ANSWER_RECEIVED]: (state, action) => {
    console.log('UPDATE_QUESTION_ANSWER_RECEIVED onReceived')
    return {complete: true};
  },
  [UPDATE_QUESTION_ANSWER_FAILURE]: (state, action) => {
    console.log('UPDATE_QUESTION_ANSWER_FAILURE onFailure')
    return {complete: false};
  },

  // updateQuestionAnswerCmt Handler
  [UPDATE_QUESTION_ANSWER_CMT]: (state, action) => {
    console.log('UPDATE_QUESTION_ANSWER_CMT onPending')
  },
  [UPDATE_QUESTION_ANSWER_CMT_RECEIVED]: (state, action) => {
    console.log('UPDATE_QUESTION_ANSWER_CMT_RECEIVED onReceived')
    return {complete: true};
  },
  [UPDATE_QUESTION_ANSWER_CMT_FAILURE]: (state, action) => {
    console.log('UPDATE_QUESTION_ANSWER_CMT_FAILURE onFailure')
    return {complete: false};
  },

  // deleteQuestionByEmail Handler
  [DELETE_QUESTION_BY_EMAIL]: (state, action) => {
    console.log('DELETE_QUESTION_BY_EMAIL onPending')
  },
  [DELETE_QUESTION_BY_EMAIL_RECEIVED]: (state, action) => {
    console.log('DELETE_QUESTION_BY_EMAIL_RECEIVED onReceived')
    return {complete: true};
  },
  [DELETE_QUESTION_BY_EMAIL_FAILURE]: (state, action) => {
    console.log('DELETE_QUESTION_BY_EMAIL_FAILURE onFailure')
    return {complete: false};
  },

  // deleteQuestionAnswerByEmail Handler
  [DELETE_QUESTION_ANSWER_BY_EMAIL]: (state, action) => {
    console.log('DELETE_QUESTION_ANSWER_BY_EMAIL onPending')
  },
  [DELETE_QUESTION_ANSWER_BY_EMAIL_RECEIVED]: (state, action) => {
    console.log('DELETE_QUESTION_ANSWER_BY_EMAIL_RECEIVED onReceived')
    return {complete: true};
  },
  [DELETE_QUESTION_ANSWER_BY_EMAIL_FAILURE]: (state, action) => {
    console.log('DELETE_QUESTION_ANSWER_BY_EMAIL_FAILURE onFailure')
    return {complete: false};
  },

  // deleteQuestionAnswerCmtByEmail Handler
  [DELETE_QUESTION_ANSWER_CMT_BY_EMAIL]: (state, action) => {
    console.log('DELETE_QUESTION_ANSWER_CMT_BY_EMAIL onPending')
  },
  [DELETE_QUESTION_ANSWER_CMT_BY_EMAIL_RECEIVED]: (state, action) => {
    console.log('DELETE_QUESTION_ANSWER_CMT_BY_EMAIL_RECEIVED onReceived')
    return {complete: true};
  },
  [DELETE_QUESTION_ANSWER_CMT_BY_EMAIL_FAILURE]: (state, action) => {
    console.log('DELETE_QUESTION_ANSWER_CMT_BY_EMAIL_FAILURE onFailure')
    return {complete: false};
  },
}, initialState);
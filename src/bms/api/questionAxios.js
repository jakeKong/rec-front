import axios from 'axios';
import config from '../../config';

// 문의사항 전체 목록 조회 (관리용)
export const getQuestionList = (search) => axios({
  method: 'POST',
  url: `${config.boardService}/question/list`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'fromDt': search.fromDt,
    'toDt': search.toDt,
    'questionTitle': search.questionTitle,
    'questionWriter': search.questionWriter
  })
});

// 문의사항 삭제 (관리용)
export const deleteQuestion = (questionSid) => axios({
  method: 'DELETE',
  url: `${config.boardService}/question/delete/${questionSid}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
});

// 문의사항 선택삭제 (관리용)
export const deleteQuestionByList = (selectQuestionSidList) => axios({
  method: 'DELETE',
  url: `${config.boardService}/question/delete/list`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify(selectQuestionSidList)
});

// 사용자별 문의사항 목록 조회
export const getQuestionListByEmail = (email, search) => axios({
  method: 'POST',
  url: `${config.boardService}/question/list/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'fromDt': search.fromDt,
    'toDt': search.toDt,
    'questionTitle': search.questionTitle,
    'questionWriter': search.questionWriter
  })
});

// 문의사항 단일항목에 대한 답변 목록 조회
export const getQuestionAnswerList = (questionSid) => axios({
  method: 'GET',
  url: `${config.boardService}/question/answer/list/${questionSid}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
});

// 문의사항 단일항목에 대한 답변 목록 조회
/*
export const getQuestionAnswerCmtList = (questionAnswerSid) => axios({
  method: 'GET',
  url: `${config.boardService}/question/cmt/list/${questionAnswerSid}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
});
*/

// 문의사항 등록
export const addQuestion = (email, dto) => axios({
  method: 'POST',
  url: `${config.boardService}/question/add/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'questionTitle': dto.questionTitle,
    'questionTxt': dto.questionTxt,
    'questionLevel': dto.questionLevel,
    'reportingDt': dto.reportingDt,
  })
});

// 문의사항 답변 등록
export const addQuestionAnswer = (questionSid, email, dto) => axios({
  method: 'POST',
  url: `${config.boardService}/question/answer/add/${questionSid}/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'answerTxt': dto.answerTxt,
    'answerLevel': dto.answerLevel,
    'reportingDt': dto.reportingDt,
  })
});

// 문의사항 답변 코멘트 등록
export const addQuestionAnswerCmt = (questionAnswerSid, email, dto) => axios({
  method: 'POST',
  url: `${config.boardService}/question/cmt/add/${questionAnswerSid}/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'cmtTxt': dto.cmtTxt,
    'cmtLevel': dto.cmtLevel,
    'reportingDt': dto.reportingDt,
  })
});

// 문의사항 수정
export const updateQuestion = (questionSid, email, dto) => axios({
  method: 'PUT',
  url: `${config.boardService}/question/update/${questionSid}/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'questionTitle': dto.questionTitle,
    'questionTxt': dto.questionTxt,
  })
});

// 문의사항 답변 수정
export const updateQuestionAnswer = (questionAnswerSid, email, dto) => axios({
  method: 'PUT',
  url: `${config.boardService}/question/answer/update/${questionAnswerSid}/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'answerTxt': dto.answerTxt,
  })
});

// 문의사항 답변 코멘트 수정
export const updateQuestionAnswerCmt = (questionAnswerCmtSid, email, dto) => axios({
  method: 'PUT',
  url: `${config.boardService}/question/cmt/update/${questionAnswerCmtSid}/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'cmtTxt': dto.cmtTxt,
  })
});

// 문의사항 삭제
export const deleteQuestionByEmail = (questionSid, email) => axios({
  method: 'DELETE',
  url: `${config.boardService}/question/delete/${questionSid}/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
});

// 문의사항 답변 삭제
export const deleteQuestionAnswerByEmail = (questionAnswerSid, email) => axios({
  method: 'DELETE',
  url: `${config.boardService}/question/answer/delete/${questionAnswerSid}/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
});

// 문의사항 답변 코멘트 삭제
export const deleteQuestionAnswerCmtByEmail = (questionAnswerCmtSid, email) => axios({
  method: 'DELETE',
  url: `${config.boardService}/question/cmt/delete/${questionAnswerCmtSid}/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
});
import axios from 'axios';
import config from '../../config';

// 포인트 변동내역 조회 (관리자)
export const getChangePointHistoryList = (search) => axios({
  method: 'POST',
  url: `${config.orderService}/changepoint/history/list/`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'userNm': search.userNm,
    'odrNo': search.odrNo,
    'paymentNo': search.paymentNo,
    'fromDt': search.fromDt,
    'toDt': search.toDt,
    'changeType': search.changeType,
    'email': search.email
  })
});

// 포인트 변동내역 조회 (고객)
export const getChangePointHistoryListByEmail = (email, search) => axios({
  method: 'POST',
  url: `${config.orderService}/changepoint/history/list/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'odrNo': search.odrNo,
    'paymentNo': search.paymentNo,
    'fromDt': search.fromDt,
    'toDt': search.toDt,
    'changeType': search.changeType
  })
});

// 포인트 변동내역 추가
export const addChangePointHistory = (email, dto) => axios({
  method: 'POST',
  url: `${config.orderService}/changepoint/history/add/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'changeDt': dto.changeDt,
    'paymentCash': dto.paymentCash,
    'changeType': dto.changeType,
    'changePoint': dto.changePoint,
    'currentBalPoint': dto.currentBalPoint,
    'odrNo': dto.odrNo,
    'paymentNo': dto.paymentNo,
    'activated': dto.activated,
    'remarks': dto.remarks
  })
});

// 포인트 변동내역 활성화 여부 수정
export const updateChangePointHistoryActivated = (changePointSid, email, changePointActivated) => axios({
  method: 'PUT',
  url: `${config.orderService}/changepoint/history/update/activated/${changePointSid}/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify(changePointActivated)
});

// 포인트 변동내역 상태 여부 수정
export const updateChangePointHistoryChangeType = (changePointSid, email, changeType) => axios({
  method: 'PUT',
  url: `${config.orderService}/changepoint/history/update/type/${changePointSid}/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: changeType
});
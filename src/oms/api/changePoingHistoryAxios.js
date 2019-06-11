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
    'changeType': search.changeType
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
    'userNm': search.userNm,
    'odrNo': search.odrNo,
    'paymentNo': search.paymentNo,
    'fromDt': search.fromDt,
    'toDt': search.toDt,
    'changeType': search.changeType
  })
});
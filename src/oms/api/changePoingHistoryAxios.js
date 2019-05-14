import axios from 'axios';
import config from '../../config';

// 포인트 변동내역 조회
export const getChangePointHistoryList = (email, search) => axios({
  method: 'POST',
  url: `${config.orderService}/changepoint/history/list/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'odrNo': search.odrNo,
    'fromDt': search.fromDt,
    'toDt': search.toDt,
    'changeType': search.changeType
  })
});
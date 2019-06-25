/*
import axios from 'axios';
import config from '../../config';

// 구매내역 조회
export const getPurchaseHistoryList = (email, search) => axios({
  method: 'POST',
  url: `${config.orderService}/purchase/history/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'purchaseNo': search.purchaseNo,
    'fromDt': search.fromDt,
    'toDt': search.toDt
  })
});
*/
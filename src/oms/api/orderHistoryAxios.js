import axios from 'axios';
import config from '../../config';

// 조건별 주문내역 조회
export const getOrderHistoryList = (search) => axios({
  method: 'POST',
  url: `${config.orderService}/order/history/list`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    // 'email': search.email,
    'ordererNm': search.ordererNm,
    'odrNo': search.odrNo,
    'fromDt': search.fromDt,
    'toDt': search.toDt,
    'realEstateType': search.realEstateType,
    'status': search.status,
    'email' : search.email
  })
});
// 사용자기준 조건별 주문내역 조회
export const getOrderHistoryListByEmail = (email, search) => axios({
  method: 'POST',
  url: `${config.orderService}/order/history/list/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    // 'email': null,
    'odrNo': search.odrNo,
    'fromDt': search.fromDt,
    'toDt': search.toDt,
    'realEstateType': search.realEstateType,
    'status': search.status
  })
});

// 주문내역 추가
export const addOrderHistory = (email, dto) => axios({
  method: 'POST',
  url: `${config.orderService}/order/history/add/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'odrNo': dto.odrNo,
    'odrDt': dto.odrDt,
    'marketPrice': dto.marketPrice,
    'variationPoint': dto.variationPoint,
    'realEstateType': dto.realEstateType,
    'downloadEndDt': dto.downloadEndDt,
    'downloadCnt': dto.downloadCnt,
    'pnuNo': dto.pnuNo,
    'pdfFileNm': dto.pdfFileNm,
    'status': dto.status,
    'activated': dto.activated,
    'jibunAddr': dto.jibunAddr
  })
});

// 주문내역 활성화 여부 수정
export const updateOrderHistoryActivated = (odrSid, email, orderActivated) => axios({
  method: 'PUT',
  url: `${config.orderService}/order/history/update/activated/${odrSid}/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify(orderActivated)
});

// 주문내역 취소요청 상태 수정
export const updateOrderHistoryCancleAttemptStatus = (odrSid, email, status) => axios({
  method: 'PUT',
  url: `${config.orderService}/order/history/update/status/${odrSid}/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: status
});
// export const addOrderHistory = (email, productSid, orderDto) => axios.post(`${config.orderService}/order/history/add/${email}/${productSid}`, {orderDto});
// 주문내역 수정
// export const updateOrderHistory = (odrSid, email, productSid, orderDto) => axios.put(`${config.orderService}/order/history/update/${odrSid}/${email}/${productSid}`, {orderDto});

// PAYMENT API
// export const getPaymentHistoryList = (odrSid) => axios.post(`${config.orderService}/payment/history/list/${odrSid}`);
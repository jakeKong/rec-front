import axios from 'axios';
import config from '../../config';

// 결제 승인 요청
export const paymentApprovalRequest = (paymentId) => axios({
  // method: 'POST',
  method: 'OPTIONS',
  // naverpay-partner {가맹점 ID 필요} - 2019-05-30
  // url: `${config.naverpay}/${PartnerId}/naverpay/payment/v2.2/apply/payment`,
  url: `${config.naverpay}/naverpay-partner/naverpay/payment/v2.2/apply/payment`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Naver-Client-Id': "u86j4ripEt8LRfPGzQ8",
    // 'X-Naver-Client-Id': {발급된 client id},
    // 'X-Naver-Client-Secret': {발급된 client secret}

    // CORS 설정 필요 - 2019-05-30
    // 'crossDomain': true,
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE, OPTIONS",
    'Access-Control-Max-Age': "3600",
    'Access-Control-Allow-Headers': "x-naver-client-id,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization"
  },
  data: JSON.stringify({
    'paymentId': paymentId,
  })
});

// 결제내역 조회
export const getPaymentHistoryList = (search) => axios({
  method: 'POST',
  // naverpay-partner {가맹점 ID 필요} - 2019-05-30
  // url: `${config.naverpay}/${PartnerId}/naverpay/payment/v2.2/apply/payment`,
  url: `${config.naverpay}/naverpay-partner/naverpay/payments/v1/cancel`,
  headers: {
    'Content-Type': 'application/json',
    'X-Naver-Client-Id': "u86j4ripEt8LRfPGzQ8",
    // 'X-Naver-Client-Id': {발급된 client id},
    // 'X-Naver-Client-Secret': {발급된 client secret}

    // CORS 설정 필요 - 2019-05-30
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE, OPTIONS",
    'Access-Control-Max-Age': "3600",
    'Access-Control-Allow-Headers': "x-naver-client-id,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization"
  },
  data: JSON.stringify({
    'paymentId': search.paymentId,
    'startTime': search.startTime,
    'endTime': search.endTime,
    'approvalType': search.approvalType
  })
});
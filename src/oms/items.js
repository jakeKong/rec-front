/** OMS UTIL */
// orderHistory
export const statusItems = [
  {value: 'ALL', label: '전체'},
  {value: 'TRADE_COMPLETE', label: '주문완료'},
  {value: 'TRADE_CANCLE', label: '주문취소'},
  {value: 'TRADE_CANCLE_ATTEMPT', label: '취소신청'},
];

export const realEstateTypeItems = [
  {value: 'ALL', label: '전체'},
  {value: 'APARTMENT', label: '아파트'},
  {value: 'MULTI_HOUSE', label: '연립/다세대'},
  {value: 'DETACHED_HOUSE', label: '단독/다가구'},
  {value: 'OFFICETEL', label: '오피스텔'},
  {value: 'BUISNESS', label: '상업/업무용'},
  {value: 'LAND', label: '토지'}
  // {value: 'VILLA', label: '빌라'},
  // {value: 'SHOPPING_DISTRICT', label: '상가'}
];

/// reportMakeHistory
/*
export const reportTypeItems = [
  {value: 'MARKET_PRICE_ANALYSIS', textContent: '시세분석'},
];
*/

export const changeTypeItems = [
  {value: 'ALL', label: '전체'},
  {value: 'PAYMENT_ADD', label: '결제'},
  {value: 'PAYMENT_SUB', label: '결제취소'},
  {value: 'PAYMENT_SUB_ATTEMPT', label: '결제취소요청'},
  {value: 'PURCHASE_ADD', label: '주문'},
  {value: 'PURCHASE_SUB', label: '주문취소'},
  {value: 'EVENT_ADD', label: '이벤트지급'},
  {value: 'EVENT_SUB', label: '이벤트지급취소'}
];
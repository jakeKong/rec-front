/** OMS UTIL */
// orderHistory
export const statusItems = [
  {value: 'TRADE_COMPLETE', textContent: '구매완료'},
  {value: 'TRADE_CANCLE', textContent: '구매취소'}
];

export const realEstateTypeItems = [
  {value: 'APARTMENT', textContent: '아파트'},
  {value: 'OFFICETEL', textContent: '오피스텔'},
  {value: 'DETACHED_HOUSE', textContent: '단독주택'},
  {value: 'VILLA', textContent: '빌라'},
  {value: 'SHOPPING_DISTRICT', textContent: '상가'}
];

/// reportMakeHistory
/*
export const reportTypeItems = [
  {value: 'MARKET_PRICE_ANALYSIS', textContent: '시세분석'},
];
*/

// changPointHistory //2019-06-03 수정 요청 
export const changeTypeItems = [
  {value: 'PAYMENT_ADD', textContent: '결제'},
  {value: 'PAYMENT_SUB', textContent: '결제취소'},
  {value: 'PURCHASE_ADD', textContent: '구매'},
  {value: 'PURCHASE_SUB', textContent: '구매취소'},
  {value: 'EVENT_ADD', textContent: '이벤트지급'},
  {value: 'EVENT_SUB', textContent: '이벤트지급취소'}
];
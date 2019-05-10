/** OMS UTIL */
// orderHistory
const statusItems = [
  {value: 'TRADE_COMPLETE', textContent: '구매완료'},
  {value: 'TRADE_CANCLE', textContent: '구매취소'}
];

const realEstateTypeItems = [
  {value: 'APARTMENT', textContent: '아파트'},
  {value: 'OFFICETEL', textContent: '오피스텔'},
  {value: 'DETACHED_HOUSE', textContent: '단독주택'},
  {value: 'VILLA', textContent: '빌라'},
  {value: 'SHOPPING_DISTRICT', textContent: '상가'}
];
export { statusItems, realEstateTypeItems } ;

/// reportMakeHistory
const reportTypeItems = [
  {value: 'MARKET_PRICE_ANALYSIS', textContent: '시세분석'},
];

export { reportTypeItems };

// changPointHistory
const changeTypeItems = [
  {value: 'PURCHASE', textContent: '구매'},
  {value: 'SUBSTRACT', textContent: '차감'}
];

export { changeTypeItems };
import { combineReducers} from 'redux';
/*
BackGroud에서의 동적 실행을 위한 fork
결합된 포크를 만들때 사용
fork 완료: Saga는 오직 다음의 사건에만 종료됩니다.
           -> 자신의 명령을 모두 이행한 뒤
           -> 모든 결합된 포크들이 종료된 뒤
*/
import { fork } from 'redux-saga/effects';

// OMS
import orderHistory, { orderHistorySaga } from './oms/OrderHistoryModule';
import reportMakeHistory, { reportMakeHistorySaga } from './oms/ReportMakeHistoryModule';
import changePointHistory, { changePointHistorySaga } from './oms/ChangePointHistoryModule';
import purchaseHistory, { purchaseHistorySaga } from './oms/PurchaseHistoryModule';
import product, { productSaga } from './oms/ProductManageModule';

// rootSaga 설정
export function* rootSaga() {
  // OMS
  yield fork(orderHistorySaga);
  yield fork(reportMakeHistorySaga);
  yield fork(changePointHistorySaga);
  yield fork(purchaseHistorySaga);
  yield fork(productSaga);
  // BMS
}

// 통합 reducer
export default combineReducers({
  orderHistory,
  reportMakeHistory,
  changePointHistory,
  purchaseHistory,
  product
});
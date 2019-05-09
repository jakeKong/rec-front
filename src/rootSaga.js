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
import orderHistory, { orderHistorySaga } from './oms/modules/OrderHistoryModule';
import reportMakeHistory, { reportMakeHistorySaga } from './oms/modules/ReportMakeHistoryModule';
import changePointHistory, { changePointHistorySaga } from './oms/modules/ChangePointHistoryModule';
import purchaseHistory, { purchaseHistorySaga } from './oms/modules/PurchaseHistoryModule';
import product, { productSaga } from './oms/modules/ProductManageModule';

// BMS
import notice, { noticeSaga } from './bms/modules/NoticeModule';

// rootSaga 설정
export function* rootSaga() {
  // OMS
  yield fork(orderHistorySaga);
  yield fork(reportMakeHistorySaga);
  yield fork(changePointHistorySaga);
  yield fork(purchaseHistorySaga);
  yield fork(productSaga);
  // BMS
  yield fork(noticeSaga);
}

// 통합 reducer
export default combineReducers({
  // OMS
  orderHistory, reportMakeHistory, changePointHistory, purchaseHistory, product,
  // BMS
  notice
});
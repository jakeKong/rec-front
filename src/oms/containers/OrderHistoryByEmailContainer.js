import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as orderHistoryActions from "../modules/OrderHistoryModule";
import { OrderHistoryGrid, OrderHistorySearch } from "../index";

import '@vaadin/vaadin-ordered-layout';

import storage from '../../common/storage';
import { checkInfo } from '../../common/loggedInfoCheck'

import { updateOrderHistoryActivated, updateOrderHistoryCancleAttemptStatus } from '../api/orderHistoryAxios'

class OrderHistoryByEmailContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        ordererNm: '',
        odrNo: '',
        fromDt: null,
        toDt: null,
        realEstateType: null,
        status: null
      }
    }
  }

  /* callback method 
  -> searchComponent로부터 parameter를 전달받을 경우 현재 컴포넌트의 state.search에 전달받은 parameter값을 세팅하고
     rerendering을 위한 변경된 값으로의 REST API를 호출한다. 
       -> 호출 후 state.search값 초기화
  */
  searchCallback = async (dataSearchChild) => {
    const loggedInfo = storage.get('loggedInfo');
    this.getOrderHistoryListByEmail(loggedInfo.email, dataSearchChild);
  }

  // 마운트 이전 권한 체크
  componentWillMount() {
    // 고객 권한 체크 필요 + 이메일 체크
  }

  // 마운트 직후 한번 (rendering 이전 마운트 이후의 작업)
  componentDidMount() {
    // orderHistoryListByEmail Setting //
    // 전달받은 email값이 존재 할 경우 최초 마운트시 grid의 목록조회 API를 요청한다.
    const loggedInfo = storage.get('loggedInfo');
    if (loggedInfo.email || loggedInfo.email !== null || loggedInfo.email !== undefined) {
        const { search } = this.state;
        // 로그인 된 사용자 정보로 목록 조회
        this.getOrderHistoryListByEmail(loggedInfo.email, search);
      // }
    }
  }

  // 사용자별 주문내역 조회
  getOrderHistoryListByEmail = async (email, search) => {
    const { OrderHistoryModule } = this.props;
    try {
      await OrderHistoryModule.getOrderHistoryListByEmail(email, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 주문취소요청 callback 이벤트
  orderCancleAttemptCallback = (dto) => {
    const { search } =this.state;
    const loggedInfo = storage.get('loggedInfo');
    //주문취소여부 변환
    updateOrderHistoryActivated(dto.odrSid, loggedInfo.email, false).then(res => {
      // 주문취소 상태로 변환
      updateOrderHistoryCancleAttemptStatus(dto.odrSid, loggedInfo.email, 'TRADE_CANCLE_ATTEMPT').then(res => {
        // 로그인 된 사용자 정보로 목록 조회
        this.getOrderHistoryListByEmail(loggedInfo.email, search);
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const { email, orderHistoryList, pending, error, success } = this.props;
    checkInfo();
    return (
      <Fragment>
        <div className="wrap-search">
          <OrderHistorySearch searchCallback={ this.searchCallback } email={ email } />
        </div>
        <div className="div-main page-log-purchase">
          { pending && <div className="boxLoading"/> }
          { error && <h1>Server Error!</h1> }
          { success && <OrderHistoryGrid orderHistoryList={ orderHistoryList } email={ email } orderCancleAttemptCallback={this.orderCancleAttemptCallback}/>}
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    orderHistoryList: state.orderHistory.orderHistoryList,
    pending: state.orderHistory.pending,
    error: state.orderHistory.error,
    success: state.orderHistory.success,
  }),
  dispatch => ({
    OrderHistoryModule: bindActionCreators(orderHistoryActions, dispatch)
  })
)(OrderHistoryByEmailContainer);
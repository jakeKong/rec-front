import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as orderHistoryActions from "../modules/OrderHistoryModule";
import * as userManageActions from "../../scm/modules/UserModule";
import { OrderHistoryGrid, OrderHistorySearch } from "../index";

import '@vaadin/vaadin-ordered-layout';

import storage from '../../common/storage';

import { addChangePointHistory } from '../api/changePoingHistoryAxios'
import { updateOrderHistoryActivated, updateOrderHistoryCancleAttemptStatus } from '../api/orderHistoryAxios'

class OrderHistoryContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        email: '',
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
    this.getOrderHistoryList(dataSearchChild);
  }

  // 마운트 이전 권한 체크
  componentWillMount() {
    // 관리자 권한 체크 필요
  }

  // 마운트 직후 한번 (rendering 이전 마운트 이후의 작업)
  componentDidMount() {
    // 초기 GRID 세팅 필요
    // const { orderHistoryList } = this.props;
    // if (!orderHistoryList || orderHistoryList === undefined || orderHistoryList.isEmpty()) {
      const { search } = this.state;
      this.getOrderHistoryList(search);
    // }
  }

  getOrderHistoryList = async (search) => {
    const { OrderHistoryModule } = this.props;
    try {
      await OrderHistoryModule.getOrderHistoryList(search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  orderCancleAttemptToBackCallback = (dto) => {
    // this.updateOrderHistoryActivated(dto.odrSid, dto.email, true);
    // this.updateOrderHistoryCancleAttemptStatus(dto.odrSid, dto.email, 'TRADE_COMPLETE', search);
    const { search } =this.state;
    updateOrderHistoryActivated(dto.odrSid, dto.email, true).then(res => {
      updateOrderHistoryCancleAttemptStatus(dto.odrSid, dto.email, 'TRADE_COMPLETE').then(res => {
        this.getOrderHistoryList(search);
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  }

  orderCancleCallback = (dto) => {
    const { search } =this.state;
    // const loggedInfo = storage.get('loggedInfo');
    const token = storage.get('token');
    // let orderDto = {
    //   'odrNo': dto.odrNo,
    //   'odrDt': new Date(),
    //   'marketPrice': dto.marketPriceOrigin,
    //   'variationPoint': dto.variationPointOrigin,
    //   'realEstateType': dto.realEstateTypeOrigin,
    //   'downloadEndDt': dto.downloadEndDtOrigin,
    //   'downloadCnt': dto.downloadCnt,
    //   'pnuNo': dto.pnuNo,
    //   'pdfFileNm': dto.pdfFileNm,
    //   'status': 'TRADE_CANCLE',
    //   'activated': false
    // };
    let changePointDto = {
      'changeDt': new Date(),
      'paymentCash': null,
      'changeType': 'PURCHASE_SUB',
      'changePoint': dto.variationPointOrigin,
      'currentBalPoint': null,
      'odrNo': dto.odrNo,
      'paymentNo': null,
      'activated': false
    }
    updateOrderHistoryActivated(dto.odrSid, dto.email, false).then(res => {
      updateOrderHistoryCancleAttemptStatus(dto.odrSid, dto.email, 'TRADE_CANCLE').then(res => {
        addChangePointHistory(dto.email, changePointDto).then(res => {
          this.updateUserByBalancePointIncrease(dto.email, dto.variationPointOrigin, token);
          this.getOrderHistoryList(search);
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })

    // this.updateOrderHistoryActivated(dto.odrSid, dto.email, false);
    // this.updateOrderHistoryCancleAttemptStatus(dto.odrSid, dto.email, 'TRADE_CANCLE', search);
    // // this.addOrderHistory(dto.email, orderDto, search);
    // this.updateUserByBalancePointIncrease(dto.email, dto.variationPointOrigin, token);
    // addChangePointHistory(dto.email, changePointDto).then(res => {
    //   this.getOrderHistoryList(search);
    // }).catch(err => {
    //   console.log(err)
    // })
  }

  addOrderHistory = async (email, dto, search) => {
    const { OrderHistoryModule } = this.props;
    try {
      await OrderHistoryModule.addOrderHistory(email, dto, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  updateOrderHistoryActivated = async (odrSid, email, orderActivated) => {
    const { OrderHistoryModule } = this.props;
    try {
      await OrderHistoryModule.updateOrderHistoryActivated(odrSid, email, orderActivated)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  updateOrderHistoryCancleAttemptStatus = async (odrSid, email, status, search) => {
    const { OrderHistoryModule } = this.props;
    try {
      await OrderHistoryModule.updateOrderHistoryCancleAttemptStatus(odrSid, email, status, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  updateUserByBalancePointIncrease = async (email, increasePoint, token) => {
    const { UserManageModule } = this.props;
    try {
      await UserManageModule.updateUserByBalancePointIncrease(email, increasePoint, token)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  render() {
    const { orderHistoryList, pending, error, success } = this.props;
    let role = 'GUEST';
    const loggedInfo = storage.get('loggedInfo');
    if (loggedInfo && loggedInfo.assignedRoles.indexOf('ROLE_ADMIN') !== -1) {
      role = 'ROLE_ADMIN'
    }
    return (
      <Fragment>
        <div className="wrap-search">
          <OrderHistorySearch searchCallback={ this.searchCallback } role={ role } />
        </div>
        <div className="div-main">
          { pending && <div className="boxLoading"/> }
          { error && <h1>Server Error!</h1> }
          { success && <OrderHistoryGrid orderHistoryList={ orderHistoryList } role={ role } orderCancleCallback={this.orderCancleCallback} orderCancleAttemptToBackCallback={this.orderCancleAttemptToBackCallback}/>}
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
    OrderHistoryModule: bindActionCreators(orderHistoryActions, dispatch),
    UserManageModule: bindActionCreators(userManageActions, dispatch)
  })
)(OrderHistoryContainer);
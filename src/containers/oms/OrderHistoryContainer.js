import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as orderHistoryActions from "../../store/modules/oms/OrderHistoryModule";
import { OrderHistoryGrid, OrderHistorySearch } from "../../components/oms";

import '@vaadin/vaadin-ordered-layout';

class OrderHistoryContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        email: null,
        pnu: null,
        odrNo: null,
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
    this.setState({search: dataSearchChild});

    const { search } = this.state;
    this.getOrderHistoryList(search);
    // state.search 값 초기화
    this.setState({search: {
      email: null,
      pnu: null,
      odrNo: null,
      fromDt: null,
      toDt: null,
      realEstateType: null,
      status: null
    }});
  }

  // 마운트 이전 권한 체크
  componentWillMount() {
    // 관리자 권한 체크 필요
  }

  // 마운트 직후 한번 (rendering 이전 마운트 이후의 작업)
  componentDidMount() {
    // 초기 GRID 세팅 필요
  }

  getOrderHistoryList = async (search) => {
    const { OrderHistoryModule } = this.props;
    try {
      await OrderHistoryModule.getOrderHistoryList(search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  render() {
    const { orderHistoryList, pending, error, success } = this.props;
    return (
      <Fragment>
        <vaadin-vertical-layout>
          <OrderHistorySearch searchCallback={ this.searchCallback } />
          { pending && "Loading..." }
          { error && <h1>Server Error!</h1> }
          { success && <OrderHistoryGrid orderHistoryList={ orderHistoryList } />}
        </vaadin-vertical-layout>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    orderHistoryList: state.orderHistory.orderHistoryList,
    pending: state.orderHistory.pending,
    error: state.orderHistory.error,
    success: state.orderHistory.success
  }),
  dispatch => ({
    OrderHistoryModule: bindActionCreators(orderHistoryActions, dispatch)
  })
)(OrderHistoryContainer);
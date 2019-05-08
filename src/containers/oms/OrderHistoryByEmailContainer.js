import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as orderHistoryActions from "../../store/modules/oms/OrderHistoryModule";
import { OrderHistoryGrid, OrderHistorySearch } from "../../components/oms";

import '@vaadin/vaadin-ordered-layout';

class OrderHistoryByEmailContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
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
    const { email } = this.props;
    this.getOrderHistoryListByEmail(email, search);
    // state.search 값 초기화
    this.setState({search: {
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
    // 고객 권한 체크 필요 + 이메일 체크
  }

  // 마운트 직후 한번 (rendering 이전 마운트 이후의 작업)
  componentDidMount() {
    // orderHistoryListByEmail Setting //
    // 전달받은 email값이 존재 할 경우 최초 마운트시 grid의 목록조회 API를 요청한다.
    const { email } = this.props;
    if (email || email !== null || email !== undefined) {
      const { orderHistoryList } = this.props;
      if (!orderHistoryList || orderHistoryList === undefined || orderHistoryList.isEmpty()) {
        const { search } = this.state;
        this.getOrderHistoryListByEmail(email, search);
      }
    }
  }

  getOrderHistoryListByEmail = async (email, search) => {
    const { OrderHistoryModule } = this.props;
    try {
      await OrderHistoryModule.getOrderHistoryListByEmail(email, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  render() {
    const { email, orderHistoryList, pending, error, success } = this.props;
    return (
      <Fragment>
        <div className="search-div">
          <OrderHistorySearch searchCallback={ this.searchCallback } email={ email } />
        </div>
        <div className="main-div">
          { pending && "Loading..." }
          { error && <h1>Server Error!</h1> }
          { success && <OrderHistoryGrid orderHistoryList={ orderHistoryList } email={ email } />}
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
    // 임시 값 (삭제 후 pageTemplate등 상위 컴포넌트에서 email정보를 받아와 props로 사용해야 함)
    email: 'yieon@test.com'
  }),
  dispatch => ({
    OrderHistoryModule: bindActionCreators(orderHistoryActions, dispatch)
  })
)(OrderHistoryByEmailContainer);
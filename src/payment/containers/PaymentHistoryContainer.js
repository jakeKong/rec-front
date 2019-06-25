import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as paymentActions from "../modules/PaymentModule";
import { PaymentHistoryGrid, PaymentHistorySearch } from "../index";

import '@vaadin/vaadin-notification';

class PaymentHistoryContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        paymentId: null,
        startTime: null,
        endTime: null,
        approvalType: null
      }
    };
  }

  searchCallback = async (dataSearchChild) => {
    this.setState({search: dataSearchChild});

    // const { search } = this.state;
    // this.getPaymentHistoryList(search);

    // --- response값 임시 설정 (결제내역 결과값 가져오기)
    this.getSamplePaymentHistoryList();
    
    // state.search 값 초기화
    this.setState({search: {
      paymentId: null,
      startTime: null,
      endTime: null,
      approvalType: null
    }});
  }

  // 결제내역 조회
  getPaymentHistoryList = async (search) => {
    const { PaymentModule } = this.props;
    try {
      await PaymentModule.getPaymentHistoryList(search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // --- response값 임시 설정 (결제내역 결과값 가져오기)
  getSamplePaymentHistoryList = async () => {
    const { PaymentModule } = this.props;
    try {
      await PaymentModule.getSamplePaymentHistoryList()
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 마운트 이전 권한 체크
  componentWillMount() {
    // 관리자 권한 체크 필요
  }

  // 마운트 직후 한번 (rendering 이전, 마운트 이후의 작업)
  componentDidMount() {
    // const { search } = this.state;
    const { paymentHistoryList } = this.props;
    if (!paymentHistoryList || paymentHistoryList === undefined || paymentHistoryList === null) {
      // this.getPaymentHistoryList(search);

      // --- response값 임시 설정 (결제내역 결과값 가져오기)
      this.getSamplePaymentHistoryList();
    }
  }

  render() {
    const { paymentHistoryList, pending, error, success } = this.props;

    return (
      <Fragment>
        <div>
          <div className="div-search">
            <PaymentHistorySearch searchCallback={ this.searchCallback }/>
          </div>
          <div className="div-main">
            { pending && "Loading..." }
            { error && <h1>Server Error!</h1> }
            { success && <PaymentHistoryGrid paymentHistoryList={paymentHistoryList} />}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    paymentHistoryList: state.payment.paymentHistoryList,
    pending: state.payment.pending,
    error: state.payment.error,
    success: state.payment.success,
  }),
  dispatch => ({
    PaymentModule: bindActionCreators(paymentActions, dispatch)
  })
)(PaymentHistoryContainer);
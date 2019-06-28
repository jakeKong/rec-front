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
      },
    };
  }

  searchCallback = async (dataSearchChild) => {
    this.setState({search: dataSearchChild});

    const { search } = this.state;
    console.log(search)
    this.getPaymentHistoryList(search);

    // --- response값 임시 설정 (결제내역 결과값 가져오기)
    // this.getSamplePaymentHistoryList();
    
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
    const { search } = this.state;
    const { paymentHistoryList } = this.props;
    if (!paymentHistoryList || paymentHistoryList === undefined || paymentHistoryList === null) {
      // this.getPaymentHistoryList(search);

      // --- response값 임시 설정 (결제내역 결과값 가져오기)
      // this.getSamplePaymentHistoryList();
      this.getPaymentHistoryList(search);
    }
  }

  render() {
    const { paymentHistoryList, pending, error, success } = this.props;

    let successHistory = false
    if (paymentHistoryList !== null && paymentHistoryList !== undefined) {
      if (paymentHistoryList.code !== 'Success') {
        if (paymentHistoryList.code === 'InvalidMerchant') {
          window.confirm('유효하지 않은 가맹점입니다. \n확인 후 다시 시도해주세요.\n' + paymentHistoryList.message);
        } else if (paymentHistoryList.code === 'RequireCondition') {
          window.confirm('입력값이 조건을 만족하지 않습니다. \npaymentId 혹은 검색 시간 조건이 필요합니다. \n확인 후 다시 시도해주세요.\n' + paymentHistoryList.message);
        } else if (paymentHistoryList.code === 'TimeConditionError') {
          window.confirm('검색 조건을 만족하지 않습니다 \n 최대 31일 차이의 기간 조회만 가능합니다. \n확인 후 다시 시도해주세요.\n' + paymentHistoryList.message);
        } else {
          console.log(paymentHistoryList)
          const check = window.confirm('결제요청에 실패하였습니다. \n샘플 테스트를 진행하시겠습니까?\n' + paymentHistoryList.message);
          if (check === true) {
            this.getSamplePaymentHistoryList();
          }
        }
      } else {
        successHistory = true;
      }
    }

    return (
      <Fragment>
        <div>
          <div className="div-search">
            <PaymentHistorySearch searchCallback={ this.searchCallback }/>
          </div>
          <div className="div-main">
            { pending && "Loading..." }
            { error && <h1>Server Error!</h1> }
            { successHistory === true && success && <PaymentHistoryGrid paymentHistoryList={paymentHistoryList} />}
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
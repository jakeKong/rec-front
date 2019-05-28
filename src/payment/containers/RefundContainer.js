import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as changePointHistoryActions from "../../oms/modules/ChangePointHistoryModule";
import * as purchaseHistoryActions from "../../oms/modules/PurchaseHistoryModule";
import { ChangePointHistoryGrid, ChangePointHistorySearch, PurchaseHistoryGrid } from "../../oms/index";

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-split-layout';

class RefundContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        odrNo: null,
        purchaseNo: null,
        fromDt: null,
        toDt: null,
        changeType: null
      },
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
    this.getChangePointHistoryList(email, search);
    this.getPurchaseHistoryList(email, search);
    // state.search 값 초기화
    this.setState({search: {
        odrNo: null,
        purchaseNo: null,
        fromDt: null,
        toDt: null,
        changeType: null
    }});
  }

  // 마운트 이전 권한 체크
  componentWillMount() {
    // 관리자 권한 체크 필요
  }

  // 마운트 직후 한번 (rendering 이전, 마운트 이후의 작업)
  componentDidMount() {
    const { email } = this.props;
    if (email || email !== null || email !== undefined) {
        const { search } = this.state;
        const { changePointHistoryList } = this.props;
        if (!changePointHistoryList || changePointHistoryList === undefined || changePointHistoryList.isEmpty()) {
            this.getChangePointHistoryList(email, search);
        }
        const { purchaseHistoryList } = this.props;
        if (!purchaseHistoryList || purchaseHistoryList === undefined || purchaseHistoryList.isEmpty()) {
            this.getPurchaseHistoryList(email, search)
        }
    }

    const splitLayout = document.querySelector('#splitLayout');
    splitLayout.className = "vaadin-split-layout-main"
    
  }

  getChangePointHistoryList = async (email, search) => {
    const { ChangePointHistoryModule } = this.props;
    try {
      await ChangePointHistoryModule.getChangePointHistoryList(email, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  getPurchaseHistoryList = async (email, search) => {
      const { PurchaseHistoryModule } = this.props;
      try {
        await PurchaseHistoryModule.getPurchaseHistoryList(email, search)
      } catch (e) {
        console.log("error log : " + e);
      }
  }

  render() {
    const { changePointHistoryList, pending, error, success,
            purchaseHistoryList, purchasePending, purchaseError, purchaseSuccess } = this.props;
    return (
      <Fragment>
        <div className="div-search">
          <ChangePointHistorySearch searchCallback={ this.searchCallback } />
        </div>
        <vaadin-split-layout id="splitLayout">
          <div className="div-width-40">
            { purchasePending && "Loading..." }
            { purchaseError && <h1>Server Error!</h1> }
            { purchaseSuccess && <PurchaseHistoryGrid purchaseHistoryList={ purchaseHistoryList } /> }
          </div>
          <div className="div-width-60">
            { pending && "Loading..." }
            { error && <h1>Server Error!</h1> }
            { success && <ChangePointHistoryGrid changePointHistoryList={ changePointHistoryList } /> }
          </div>
        </vaadin-split-layout>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    changePointHistoryList: state.changePointHistory.changePointHistoryList,
    pending: state.changePointHistory.pending,
    error: state.changePointHistory.error,
    success: state.changePointHistory.success,

    purchaseHistoryList: state.purchaseHistory.purchaseHistoryList,
    purchasePending: state.purchaseHistory.pending,
    purchaseError: state.purchaseHistory.error,
    purchaseSuccess: state.purchaseHistory.success,
    // 임시 값 (삭제 후 pageTemplate등 상위 컴포넌트에서 email정보를 받아와 props로 사용해야 함)
    email: 'yieon@test.com'
  }),
  dispatch => ({
    ChangePointHistoryModule: bindActionCreators(changePointHistoryActions, dispatch),
    PurchaseHistoryModule: bindActionCreators(purchaseHistoryActions, dispatch)
  })
)(RefundContainer);
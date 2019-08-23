import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as changePointHistoryActions from "../modules/ChangePointHistoryModule";
import * as userManageActions from "../../scm/modules/UserModule";
import { ChangePointHistoryGrid, ChangePointHistorySearch } from "../index";

import storage from '../../common/storage';

class ChangePointHistoryByEmailContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        userNm: '',
        odrNo: '',
        paymentNo: '',
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
    const loggedInfo = storage.get('loggedInfo');
    this.getChangePointHistoryListByEmail(loggedInfo.email, dataSearchChild);
  }

  // 마운트 이전 권한 체크
  componentWillMount() {
    // 관리자 권한 체크 필요
  }

  // 마운트 직후 한번 (rendering 이전, 마운트 이후의 작업)
  componentDidMount() {
    const loggedInfo = storage.get('loggedInfo');
    if (loggedInfo.email || loggedInfo.email !== null || loggedInfo.email !== undefined) {
        const { search } = this.state;
        // const { changePointHistoryList } = this.props;
        // if (!changePointHistoryList || changePointHistoryList === undefined || changePointHistoryList.isEmpty()) {
            this.getChangePointHistoryListByEmail(loggedInfo.email, search);
        // }
    }

  }

  getChangePointHistoryListByEmail = async (email, search) => {
    const { ChangePointHistoryModule } = this.props;
    try {
      await ChangePointHistoryModule.getChangePointHistoryListByEmail(email, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  changePointCancleCallback = (dto) => {
    const { search } = this.state;
    const loggedInfo = storage.get('loggedInfo');
    if (loggedInfo.balancePoint-dto.changePointOrigin < 0) {
      window.alert('잔여 포인트가 부족하여 결제취소를 할 수 없습니다.')
    } else {
      let changePointDto = {
        'changeDt': new Date(),
        'paymentCash': dto.paymentCashOrigin,
        'changeType': 'PAYMENT_SUB',
        'changePoint': dto.changePointOrigin,
        'currentBalPoint': loggedInfo.balancePoint-dto.changePointOrigin,
        'odrNo': dto.odrNo,
        'paymentNo': dto.paymentNo,
        'activated': false
      }
      const token = storage.get('token');
      // 실제 결제 취소 내용 추가 필요 (or 관리자의 결제 취소로 재변경)
      this.updateChangePointHistoryActivated(dto.changePointSid, false);
      this.addChangePointHistory(loggedInfo.email, changePointDto, search);
      this.updateUserByBalancePointDifference(loggedInfo.email, dto.changePointOrigin, token);
    }
  }

  addChangePointHistory = async (email, dto, search) => {
    const { ChangePointHistoryModule } = this.props;
    try {
      await ChangePointHistoryModule.addChangePointHistory(email, dto, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  updateChangePointHistoryActivated = async (changePointSid, chagePPointActivated) => {
    const { ChangePointHistoryModule } = this.props;
    try {
      await ChangePointHistoryModule.updateChangePointHistoryActivated(changePointSid, chagePPointActivated)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  updateUserByBalancePointDifference = async (email, differencePoint, token) => {
    const { UserManageModule } = this.props;
    try {
      await UserManageModule.updateUserByBalancePointDifference(email, differencePoint, token)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  render() {
    const { changePointHistoryList, pending, error, success } = this.props;
    return (
      <Fragment>
        <div className="wrap-search">
          <ChangePointHistorySearch searchCallback={ this.searchCallback } />
        </div>
        <div className="div-main">
          { pending && <div className="boxLoading"/> }
          { error && <h1>Server Error!</h1> }
          { success && <ChangePointHistoryGrid changePointHistoryList={ changePointHistoryList } changePointCancleCallback={this.changePointCancleCallback} /> }
        </div>
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
  }),
  dispatch => ({
    ChangePointHistoryModule: bindActionCreators(changePointHistoryActions, dispatch),
    UserManageModule: bindActionCreators(userManageActions, dispatch)
  })
)(ChangePointHistoryByEmailContainer);
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as changePointHistoryActions from "../modules/ChangePointHistoryModule";
import * as userManageActions from "../../scm/modules/UserModule";
import { ChangePointHistoryGrid, ChangePointHistorySearch } from "../index";

import storage from '../../common/storage';
import { checkInfo } from '../../common/loggedInfoCheck'

// 동기 사용을 위한 api
import { updateChangePointHistoryActivated, updateChangePointHistoryChangeType } from '../api/changePoingHistoryAxios'

// 포인트 변동내역 컨테이느
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
    // 로그인 된 사용자 정보로 목록 조회
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
        // 로그인 된 사용자 정보로 목록 조회
        this.getChangePointHistoryListByEmail(loggedInfo.email, search);
    }

  }

  // 사용자별 포인트 변동내역 조회
  getChangePointHistoryListByEmail = async (email, search) => {
    const { ChangePointHistoryModule } = this.props;
    try {
      await ChangePointHistoryModule.getChangePointHistoryListByEmail(email, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 결제 취소 요청 이벤트
  changePointCancleAttmeptCallback = (dto) => {
    const { search } = this.state;
    const loggedInfo = storage.get('loggedInfo');
    if (loggedInfo.balancePoint-dto.changePointOrigin < 0) {
      window.alert('잔여 포인트가 부족하여 결제취소를 할 수 없습니다.')
    } else {
      // 취소상태로 변경
      updateChangePointHistoryActivated(dto.changePointSid, loggedInfo.email, false).then(res => {
        // 변동타입 취소요청으로 변경
        updateChangePointHistoryChangeType(dto.changePointSid, loggedInfo.email, 'PAYMENT_SUB_ATTEMPT').then(res => {
          // 목록 재호출
          this.getChangePointHistoryListByEmail(loggedInfo.email, search);
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }

  render() {
    const { changePointHistoryList, pending, error, success } = this.props;
    checkInfo();
    return (
      <Fragment>
        <div className="wrap-search">
          <ChangePointHistorySearch searchCallback={ this.searchCallback } />
        </div>
        <div className="div-main">
          { pending && <div className="boxLoading"/> }
          { error && <h1>Server Error!</h1> }
          { success && <ChangePointHistoryGrid changePointHistoryList={ changePointHistoryList } changePointCancleAttmeptCallback={this.changePointCancleAttmeptCallback} /> }
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
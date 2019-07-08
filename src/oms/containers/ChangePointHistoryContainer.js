import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as changePointHistoryActions from "../modules/ChangePointHistoryModule";
import { ChangePointHistoryGrid, ChangePointHistorySearch } from "../index";

class ChangePointHistoryContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        userNm: null,
        odrNo: null,
        paymentNo: null,
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
    this.getChangePointHistoryList(search);
    // state.search 값 초기화
    this.setState({search: {
      userNm: null,
      odrNo: null,
      paymentNo: null,
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
    const { search } = this.state;
    // const { changePointHistoryList } = this.props;
    // if (!changePointHistoryList || changePointHistoryList === undefined || changePointHistoryList.isEmpty()) {
        this.getChangePointHistoryList(search);
    // }
  }

  getChangePointHistoryList = async (search) => {
    const { ChangePointHistoryModule } = this.props;
    try {
      await ChangePointHistoryModule.getChangePointHistoryList(search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  render() {
    const { changePointHistoryList, pending, error, success, role } = this.props;
    return (
      <Fragment>
        <div className="div-search">
          <ChangePointHistorySearch searchCallback={ this.searchCallback } role={ role } />
        </div>
        <div className="div-main">
          { pending && <div className="boxLoading"/> }
          { error && <h1>Server Error!</h1> }
          { success && <ChangePointHistoryGrid changePointHistoryList={ changePointHistoryList } role={ role } /> }
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

    // 임시 값 (삭제 후 pageTemplate등 상위 컴포넌트에서 email정보를 받아와 props로 사용해야 함)
    // email: 'yieon@test.com',
    role: 'ROLE_ADMIN'
  }),
  dispatch => ({
    ChangePointHistoryModule: bindActionCreators(changePointHistoryActions, dispatch),
  })
)(ChangePointHistoryContainer);
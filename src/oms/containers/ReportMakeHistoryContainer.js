import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reportMakeHistoryActions from "../modules/ReportMakeHistoryModule";
import { ReportMakeHistoryGrid, ReportMakeHistorySearch } from "../index";

import '@vaadin/vaadin-ordered-layout';

class ReportMakeHistoryContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        reportMakeNo: null,
        pnu: null,
        marketPrice: null,
        fromDt: null,
        toDt: null,
        reportType: null
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
    this.getReportMakeHistoryList(search);
    // state.search 값 초기화
    this.setState({search: {
      reportMakeNo: null,
      pnu: null,
      marketPrice: null,
      fromDt: null,
      toDt: null,
      reportType: null
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

  getReportMakeHistoryList = async (search) => {
    const { ReportMakeHistoryModule } = this.props;
    try {
      await ReportMakeHistoryModule.getReportMakeHistoryList(search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  render() {
    const { reportMakeHistoryList, pending, error, success } = this.props;
    return (
      <Fragment>
        <div className="search-div">
          <ReportMakeHistorySearch searchCallback={ this.searchCallback } />
        </div>
        <div className="main-div">
          { pending && "Loading..." }
          { error && <h1>Server Error!</h1> }
          { success && <ReportMakeHistoryGrid reportMakeHistoryList={ reportMakeHistoryList } />}
          </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    reportMakeHistoryList: state.reportMakeHistory.reportMakeHistoryList,
    pending: state.reportMakeHistory.pending,
    error: state.reportMakeHistory.error,
    success: state.reportMakeHistory.success
  }),
  dispatch => ({
    ReportMakeHistoryModule: bindActionCreators(reportMakeHistoryActions, dispatch)
  })
)(ReportMakeHistoryContainer);
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as noticeActions from "../modules/NoticeModule";
import { NoticeGrid, NoticeDetail } from "../index";

import '@vaadin/vaadin-ordered-layout';

class NoticeContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notice: {
        noticeSid: null,
        noticeTitle: null,
        noticeTxt: null,
        noticeWriter: null,
        reportingDt: null
      },
      detailStatus: false
    }
    this.detailStatusChangeEvent = this.detailStatusChangeEvent.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    // const { noticeList } = this.props;
    // if (!noticeList || noticeList === undefined || noticeList.isEmpty()) {
      this.getNoticeList();
    // }
  }

  // 공지사항 목록 조회 호출
  getNoticeList = async () => {
    const { NoticeModule } = this.props;
    try {
      await NoticeModule.getNoticeList()
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 상세조회 상태로 변경
  detailStatusChangeEvent() {
    this.setState({detailStatus: true})
  }

  // 그리드로부터 전달받은 공지사항 값으로 상세조회 화면으로 변경
  detailCallback = async (noticeDto) => {
    console.log(noticeDto);
    this.setState({notice: noticeDto});
    this.detailStatusChangeEvent();
  }

  // 상세조회 화면에서 돌아가기 버튼 클릭 시 목록조회 화면으로 돌아오는 이벤트
  detailToListCallback = async () => {
    this.setState({detailStatus: false})
  }

  render() {
    const { detailStatus, notice } = this.state;
    const { noticeList, pending, error, success } = this.props;
    return (
      <Fragment>
        <div className="div-main">
          { pending && <div className="boxLoading"/> }
          { error && <h1>Server Error!</h1> }
          { !detailStatus && success && <NoticeGrid noticeList={ noticeList } detailCallback={ this.detailCallback } />}
          { detailStatus && <NoticeDetail notice={ notice } detailToListCallback={ this.detailToListCallback } /> }
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    noticeList: state.notice.noticeList,
    pending: state.notice.pending,
    error: state.notice.error,
    success: state.notice.success
  }),
  dispatch => ({
    NoticeModule: bindActionCreators(noticeActions, dispatch)
  })
)(NoticeContainer);
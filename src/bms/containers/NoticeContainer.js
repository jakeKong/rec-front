import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as noticeActions from "../modules/NoticeModule";
import { NoticeGrid } from "../index";

class NoticeContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.detailCallback = this.detailCallback.bind(this);
  }

  // 컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행되는 메소드입니다.
  componentDidMount() {
      this.getNoticeList();
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

  // 그리드로부터 전달받은 공지사항 값으로 상세조회 화면으로 이동
  detailCallback = async (noticeDto) => {
    window.location.href = `/bms/notice/details/${noticeDto.noticeSid}`
  }

  render() {
    const { noticeList, pending, error, success } = this.props;
    return (
      <Fragment>
        <div className="div-main">
          { pending && <div className="boxLoading"/> }
          { error && <h1>Server Error!</h1> }
          { success && <NoticeGrid noticeList={ noticeList } detailCallback={ this.detailCallback } />}
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
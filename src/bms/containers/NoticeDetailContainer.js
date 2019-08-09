import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as noticeActions from "../modules/NoticeModule";
import { NoticeDetail } from "../index";

import '@vaadin/vaadin-ordered-layout';

class NoticeDetailContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    const { noticeSid } = this.props;
    this.getNotice(noticeSid);
  }

  // 공지사항 조회 호출
  getNotice = async (noticeSid) => {
    const { NoticeModule } = this.props;
    try {
      await NoticeModule.getNotice(noticeSid)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  render() {
    const { notice, pending, error, success } = this.props;
    return (
      <Fragment>
        <div className="div-main">
          { pending && <div className="boxLoading"/> }
          { error && <h1>Server Error!</h1> }
          { success && <NoticeDetail notice={notice} /> }
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    notice: state.notice.notice,
    pending: state.notice.pending,
    error: state.notice.error,
    success: state.notice.success
  }),
  dispatch => ({
    NoticeModule: bindActionCreators(noticeActions, dispatch)
  })
)(NoticeDetailContainer);
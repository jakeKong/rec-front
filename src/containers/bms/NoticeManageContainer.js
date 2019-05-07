import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as noticeActions from "../../store/modules/bms/NoticeModule";
import { NoticeGrid, NoticeDetail } from "../../components/bms";

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-button';

class NoticeManageContainer extends Component {

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
    const { noticeList } = this.props;
    if (!noticeList || noticeList === undefined || noticeList.isEmpty()) {
      this.getNoticeList();
    }

    const btnSelectDelete = document.querySelector('#btnSelectDelete');
    btnSelectDelete.innerHTML = '선택삭제';
    btnSelectDelete.addEventListener('click', function() {  
      
    });
    const btnRegister = document.querySelector('#btnRegister');
    btnRegister.innerHTML = '등록';
    btnRegister.addEventListener('click', function() {
      
    });
  }

  getNoticeList = async () => {
    const { NoticeModule } = this.props;
    try {
      await NoticeModule.getNoticeList()
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  detailStatusChangeEvent() {
    this.setState({detailStatus: true})
  }

  detailCallback = async (noticeDto) => {
    this.setState({notice: noticeDto});
    this.detailStatusChangeEvent();
  }

  detailToListCallback = async () => {
    this.setState({detailStatus: false})
  }

  render() {
    const { detailStatus, notice } = this.state;
    const { noticeList, pending, error, success, role } = this.props;
    return (
      <Fragment>
        <vaadin-vertical-layout>
          { pending && "Loading..." }
          { error && <h1>Server Error!</h1> }
          { !detailStatus && success && <NoticeGrid noticeList={ noticeList } detailCallback={ this.detailCallback } role={ role } />}
          { detailStatus && <NoticeDetail notice={ notice } detailToListCallback={ this.detailToListCallback } role={ role } /> }
        </vaadin-vertical-layout>
        <vaadin-horizontal-layout>
          <vaadin-button id="btnSelectDelete"/>
          <vaadin-button id="btnRegister"/>
        </vaadin-horizontal-layout>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    noticeList: state.notice.noticeList,
    pending: state.notice.pending,
    error: state.notice.error,
    success: state.notice.success,

    // 임시 설정
    role: 'ROLE_ADMIN'
  }),
  dispatch => ({
    NoticeModule: bindActionCreators(noticeActions, dispatch)
  })
)(NoticeManageContainer);
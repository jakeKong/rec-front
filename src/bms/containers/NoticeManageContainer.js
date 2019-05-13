import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as noticeActions from "../modules/NoticeModule";
import { NoticeGrid, NoticeDetail, NoticeRegister } from "../index";

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
      selectList: [],
      detailStatus: false,
      registerStatus: false
    }
    this.detailStatusChangeEvent = this.detailStatusChangeEvent.bind(this);
    this.registerStatusChangeEvent = this.registerStatusChangeEvent.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    const { noticeList } = this.props;
    // 공지사항 목록이 존재하지 않을 경우 목록조회 API서비스 호출
    if (!noticeList || noticeList === undefined || noticeList.isEmpty()) {
      this.getNoticeList();
    }

    const { selectList } = this.state;
    const deleteNoticeList = this.deleteNoticeList;

    const btnSelectDelete = document.querySelector('#btnSelectDelete');
    btnSelectDelete.innerHTML = '선택삭제';
    btnSelectDelete.addEventListener('click', function() {
      console.log(selectList)
      if (selectList.length > 0) {
        const check = window.confirm('선택한 항목을 삭제 하시겠습니까?');
        if (check === true) {
          deleteNoticeList(selectList);
        }
      } else {
        const nfNotfoundSelectColumn = document.createElement('vaadin-notification');
        nfNotfoundSelectColumn.renderer = function(root) {
          root.textContent = '선택된 항목이 존재하지 않습니다.'
        }
        document.body.appendChild(nfNotfoundSelectColumn);
        nfNotfoundSelectColumn.position = 'middle';
        nfNotfoundSelectColumn.duration = 2000;
        nfNotfoundSelectColumn.opened = true;
      }
    });

    const registerStatusChangeEvent = this.registerStatusChangeEvent;
    const btnRegister = document.querySelector('#btnRegister');
    btnRegister.innerHTML = '등록';
    btnRegister.addEventListener('click', function() {
      registerStatusChangeEvent();
    });
  }

  // 공지사항 값 초기화
  resetNotice() {
    this.setState({notice: {
      noticeSid: null,
      noticeTitle: null,
      noticeTxt: null,
      noticeWriter: null,
      reportingDt: null
    }})
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
    this.setState({notice: noticeDto});
    this.detailStatusChangeEvent();
  }

  // 상세조회 화면에서 돌아가기 버튼 클릭 시 목록조회 화면으로 변경
  detailToListCallback = async () => {
    this.setState({detailStatus: false})
    this.resetNotice();
  }

  // 등록 및 수정 상태로 변경
  registerStatusChangeEvent() {
    this.setState({registerStatus: true})
  }

  // 등록 화면에서 취소 버튼 클릭 시 목록조회 화면으로 변경
  registerToListCallback = async () => {
    this.setState({registerStatus: false})
    this.resetNotice();
  }

  // 그리드로부터 전달받은 공지사항 값으로 등록 화면으로 변경
  registerCallback = async (noticeChild) => {
    this.setState({notice: noticeChild})
    this.registerStatusChangeEvent();
  }

  // 수정 화면에서 취소 버튼 클릭 시 상세조회 화면으로 변경
  registerToDetailCallback = async (noticeDto) => {
    this.setState({notice: noticeDto});
    this.setState({registerStatus: false})
    this.detailStatusChangeEvent();
  }

  // 그리드의 체크박스 선택 시 선택한 컬럼의 값을 선택목록에 저장
  selectCallback = async (selectDto) => {
    const { selectList } = this.state;
    selectList.push(selectDto.noticeSid)
    this.setState({selectList})
  }

  // 그리드의 체크박스 선택 취소 했을때 선택목록에 저장되어있는 값 중 선택취소한 컬럼의 값을 찾아 목록에서 제거
  deselectCallback = async (selectDto) => {
    const { selectList } = this.state;
    const itemToFind = selectList.find(function(item) {
      // return item.noticeSid === selectDto.noticeSid
      return item === selectDto.noticeSid
    });
    const idx = selectList.indexOf(itemToFind);
    if (idx > -1) selectList.splice(idx, 1)
    this.setState({selectList})
  }

  // 공지사항 등록 요청
  addCallback = async (noticeChild) => {
    this.setState({notice: noticeChild})
    const { email } = this.props;
    const { notice } = this.state;
    this.addNotice(email, notice);
    this.resetNotice();
  }

  // 공지사항 수정 요청
  updateCallback = async (noticeSid, noticeChild) => {
    this.setState({notice: noticeChild})
    const { email } = this.props;
    const { notice } = this.state;
    this.updateNotice(noticeSid, email, notice);
    this.resetNotice();
  }

  // 공지사항 단일항목 삭제 요청
  deleteCallback = async (noticeSid) => {
    this.deleteNotice(noticeSid);
    this.resetNotice();
  }

  // 공지사항 등록 API 호출 이벤트
  addNotice = async (email, notice) => {
    const { NoticeModule } = this.props;
    try {
      await NoticeModule.addNotice(email, notice)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 공지사항 수정 API 호출 이벤트
  updateNotice = async (noticeSid, email, notice) => {
    const { NoticeModule } = this.props;
    try {
      await NoticeModule.updateNotice(noticeSid, email, notice)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 공지사항 단일항목 삭제 API 호출 이벤트
  deleteNotice = async (noticeSid) => {
    const { NoticeModule } = this.props;
    try {
      await NoticeModule.deleteNotice(noticeSid)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 공지사항 선택삭제 API 호출 이벤트
  deleteNoticeList = async (list) => {
    const { NoticeModule } = this.props;
    try {
      await NoticeModule.deleteNoticeList(list)
    } catch (e) {
      console.log("error log : " + e);
    }
    const { selectList } = this.state;
    selectList.splice(0, selectList.length)
    this.setState({selectList});
  }

  render() {
    const { detailStatus, notice, registerStatus } = this.state;
    const { noticeList, pending, error, success, role } = this.props;
    return (
      <Fragment>
        <div>
          <div className="div-main">
            { pending && "Loading..." }
            { error && <h1>Server Error!</h1> }
            { !registerStatus && !detailStatus && success && <NoticeGrid noticeList={ noticeList } detailCallback={ this.detailCallback } role={ role } selectCallback={ this.selectCallback } deselectCallback={ this.deselectCallback } /* registerCallback={ this.registerCallback } */ />}
            { detailStatus && <NoticeDetail notice={ notice } detailToListCallback={ this.detailToListCallback } role={ role } registerCallback={ this.registerCallback } deleteCallback={this.deleteCallback } /> }
            { registerStatus ? <NoticeRegister registerToListCallback={ this.registerToListCallback } addCallback={ this.addCallback } noticeDto={ notice } updateCallback={ this.updateCallback } registerToDetailCallback={ this.registerToDetailCallback } /> : null }
          </div>
          <div className="div-sub-main" hidden={registerStatus || detailStatus}>
            <vaadin-button id="btnSelectDelete" theme="error" />
            <vaadin-button id="btnRegister" />
          </div>
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
    success: state.notice.success,
    // complete: state.notice.complete,

    // 임시 설정
    role: 'ROLE_ADMIN',
    email: 'admin@test.com'
  }),
  dispatch => ({
    NoticeModule: bindActionCreators(noticeActions, dispatch)
  })
)(NoticeManageContainer);
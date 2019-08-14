import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as noticeActions from "../modules/NoticeModule";
import { NoticeGrid, NoticeSearch } from "../index";

import '@vaadin/vaadin-button';

import storage from '../../common/storage';

class NoticeManageContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectList: [],
      search: {
        fromDt: null,
        toDt: null,
        noticeTitle: null
      }
    }
  }

  componentDidMount() {
    this.getNoticeListBySpec(this.state.search);

    const selectedDeleteCheckEvent = this.selectedDeleteCheckEvent;
    const btnSelectDelete = document.querySelector('#btnSelectDelete');
    btnSelectDelete.innerHTML = '선택삭제';
    btnSelectDelete.addEventListener('click', function() {
      selectedDeleteCheckEvent();
    });

    const btnRegister = document.querySelector('#btnRegister');
    btnRegister.innerHTML = '등록';
    btnRegister.addEventListener('click', function() {
      window.location.href = '/bms/notice/register';
    });
  }

  selectedDeleteCheckEvent() {
    const { selectList } = this.state;
    const deleteNoticeList = this.deleteNoticeList;

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
      window.setTimeout(function() {
        nfNotfoundSelectColumn.remove();
      }, 2000)
    }
  }

  searchCallback = async (fromDt, toDt, noticeTitle) => {
    let searchValue = {
      fromDt: fromDt,
      toDt: toDt,
      noticeTitle: noticeTitle,
    };
    this.getNoticeListBySpec(searchValue);
  }

  // 공지사항 목록 조회 호출
  getNoticeListBySpec = async (search) => {
    const { NoticeModule } = this.props;
    try {
      await NoticeModule.getNoticeListBySpec(search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 그리드로부터 전달받은 공지사항 값으로 상세조회 화면으로 변경
  detailCallback = async (noticeDto) => {
    window.location.href = `/bms/notice/details/${noticeDto.noticeSid}`
  }

  // 그리드의 체크박스 선택 시 선택한 컬럼의 값을 선택목록에 저장
  selectCallback = async (getSelectList) => {
    this.setState({selectList: getSelectList});
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
    const { noticeList, pending, error, success } = this.props;
    const loggedInfo = storage.get('loggedInfo')
    let role = 'GUEST';
    if (loggedInfo) {
      if (loggedInfo.assignedRoles.indexOf('ROLE_ADMIN') !== -1) {
        role = 'ROLE_ADMIN';
      }
    }
    return (
      <Fragment>
        <div>
          <div className="div-search" >
            <NoticeSearch searchCallback={ this.searchCallback } role={role} />
          </div>
          <div className="div-main">
            { pending && <div className="boxLoading"/> }
            { error && <h1>Server Error!</h1> }
            { success && <NoticeGrid noticeList={ noticeList } detailCallback={ this.detailCallback } selectCallback={ this.selectCallback } />}
          </div>
          <div className="div-sub-main">
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
  }),
  dispatch => ({
    NoticeModule: bindActionCreators(noticeActions, dispatch)
  })
)(NoticeManageContainer);
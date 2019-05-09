import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as noticeActions from "../modules/NoticeModule";
import { NoticeGrid, NoticeDetail } from "../index";

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
      detailStatus: false
    }
    this.detailStatusChangeEvent = this.detailStatusChangeEvent.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    const { selectList } = this.state;
    if (selectList === nextState.selectList) {


    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    const { noticeList } = this.props;
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

  selectCallback = async (selectDto) => {
    const { selectList } = this.state;
    // selectList.push({
    //   noticeSid: selectDto.noticeSid,
    // })
    selectList.push(selectDto.noticeSid)
    this.setState({selectList})
  }

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
    
    // RECEIVED || FAILURE가 동작하기 전에 실행되는 문제 -- 해결중  2019-05-08
    const { complete } = this.props;
    console.log('complete : ' + complete)
    if ( complete ) {
      const nfDeleteComplete = document.createElement('vaadin-notification');
      nfDeleteComplete.renderer = function(root) {
        root.textContent = '삭제가 정상적으로 완료되었습니다.'
      }
      
      document.body.appendChild(nfDeleteComplete);
      nfDeleteComplete.position = 'middle';
      nfDeleteComplete.duration = 3000;
      nfDeleteComplete.opened = true;

    } else {
      const nfDeleteComplete = document.createElement('vaadin-notification');
      nfDeleteComplete.renderer = function(root) {
        root.textContent = '삭제 실패. 다시 시도해주세요.'
      }
      
      document.body.appendChild(nfDeleteComplete);
      nfDeleteComplete.position = 'middle';
      nfDeleteComplete.duration = 3000;
      nfDeleteComplete.opened = true;
    }
  }

  render() {
    const { detailStatus, notice } = this.state;
    const { noticeList, pending, error, success, role } = this.props;
    const { complete } = this.props;
    console.log(complete)
    return (
      <Fragment>
        <div className="main-div">
          { pending && "Loading..." }
          { error && <h1>Server Error!</h1> }
          { !detailStatus && success && <NoticeGrid noticeList={ noticeList } detailCallback={ this.detailCallback } role={ role } selectCallback={ this.selectCallback } deselectCallback={ this.deselectCallback } />}
          { detailStatus && <NoticeDetail notice={ notice } detailToListCallback={ this.detailToListCallback } role={ role } /> }
        </div>
        <div className="sub-main-div">
          <vaadin-button id="btnSelectDelete"/>
          <vaadin-button id="btnRegister"/>
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
    complete: state.notice.complete,

    // 임시 설정
    role: 'ROLE_ADMIN'
  }),
  dispatch => ({
    NoticeModule: bindActionCreators(noticeActions, dispatch)
  })
)(NoticeManageContainer);
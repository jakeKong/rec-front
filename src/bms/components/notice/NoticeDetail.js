import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-button';
import '../../../styles/components/ToastEditor.scss';

// 회원정보를 담고있는 로컬 스토리지
import storage from '../../../common/storage';
// 동기작업에 필요한 삭제 api
import { deleteNotice } from '../../api/noticeAxios'

// deps for viewer.
require('tui-editor/dist/tui-editor-contents.css'); // editor content
require('highlight.js/styles/github.css'); // code block highlight

// 뷰어
const Viewer = require('tui-editor/dist/tui-editor-Viewer');

// 공지사항 상세조회 컴포넌트
class NoticeDetail extends Component {

  // 초기 마운트
  componentDidMount() {
    const { notice } = this.props;
    // 상단 컴포넌트인 공지사항 상세 컴포넌트에서 전달받은 값이 존재하는지 여부 체크
    if (!notice || notice === undefined) {
      return
    }
    // date 라이브러리 호출
    let moment = require('moment');

    // 공지사항 타이틀명
    const lbTitle = document.querySelector('#lbTitle')
    lbTitle.innerHTML = notice.noticeTitle;
    
    // 공지사항 작성일자
    document.querySelector('#lbReportingDt').innerHTML = '작성일 : '+moment(notice.reportingDt).format('YYYY년MM월DD')+'&nbsp&nbsp';
    document.querySelector('#lbNoticeWriter').innerHTML = '작성자 : '+notice.noticeWriter;

    // 뷰어 (공지사항 내용)
    this.toastEditor = new Viewer({
      el: document.querySelector('#viewerSection'),
      height: 'auto',
      initialValue: notice.noticeTxt
    });

    // 돌아가기 버튼
    const btnGoList = document.querySelector('#btnGoList');
    btnGoList.textContent = "돌아가기";

    // 사용자정보 체크
    if (storage.get('loggedInfo')) {
      if (storage.get('loggedInfo').assignedRoles.indexOf('ROLE_ADMIN') === -1) {
        btnGoList.addEventListener('click', function() {
          window.location.href = '/bms/notice';
        })
      } else {
        btnGoList.addEventListener('click', function() {
          window.location.href = '/bms/notice/manage';
        })
        const divSub = document.querySelector('#divSub');
  
        const btnUpdate = document.createElement('vaadin-button');
        btnUpdate.textContent = "수정";
        btnUpdate.addEventListener('click', function() {
          window.location.href = `/bms/notice/update/${notice.noticeSid}`;
        })
  
        const btnDelete = document.createElement('vaadin-button');
        btnDelete.setAttribute('style', 'color: var(--lumo-error-text-color)');
        btnDelete.textContent = "삭제";
        btnDelete.addEventListener('click', function() {
          const check = window.confirm('공지사항을 삭제 하시겠습니까?');
          if (check === true) {
            deleteNotice(notice.noticeSid).then(res => {
              window.alert('삭제가 완료되었습니다.');
              window.location.href = '/bms/notice';
            }).catch(err => {
              console.log(err);
            });
          }
        })
        divSub.appendChild(btnUpdate);
        divSub.appendChild(btnDelete);
      }
    } else {
      btnGoList.addEventListener('click', function() {
        window.location.href = '/bms/notice';
      })
    }
  }
  

  render() {
    return (
      <Fragment>
        <div className="div-board-title">
          <label id="lbTitle" className="label-board-title"/>
        </div>
        <div className="div-board-sub-title">
          <label id="lbReportingDt" />
          <label id="lbNoticeWriter" />
        </div>
        <div id="toastEditor">
          <div id="viewerSection" />
        </div>
        <div id="divSub" className="div-sub-main">
          <vaadin-button id="btnGoList" />
        </div>
      </Fragment>
    );
  }
}
export default NoticeDetail;
import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-button';
import '../../../styles/components/ToastEditor.scss';

import storage from '../../../common/storage';
import { deleteNotice } from '../../api/noticeAxios'

// deps for viewer.
require('tui-editor/dist/tui-editor-contents.css'); // editor content
require('highlight.js/styles/github.css'); // code block highlight

const Viewer = require('tui-editor/dist/tui-editor-Viewer');

// 공지사항 상세조회 컴포넌트
class NoticeDetail extends Component {

  componentDidMount() {
    const { notice } = this.props;
    if (!notice || notice === undefined) {
      return
    }
    let moment = require('moment');

    const lbTitle = document.querySelector('#lbTitle')
    lbTitle.innerHTML = notice.noticeTitle;
    
    document.querySelector('#lbReportingDt').innerHTML = '작성일 : '+moment(notice.reportingDt).format('YYYY년MM월DD')+'&nbsp&nbsp';
    document.querySelector('#lbNoticeWriter').innerHTML = '작성자 : '+notice.noticeWriter;

    this.toastEditor = new Viewer({
      el: document.querySelector('#viewerSection'),
      height: 'auto',
      initialValue: notice.noticeTxt
    });

    const btnGoList = document.querySelector('#btnGoList');
    btnGoList.textContent = "돌아가기";

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
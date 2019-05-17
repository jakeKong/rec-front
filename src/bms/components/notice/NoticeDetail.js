import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-button';

// 공지사항 상세조회 컴포넌트
class NoticeDetail extends Component {

  componentDidMount() {
    const { notice, detailToListCallback } = this.props;
    if (!notice || notice === undefined) {
      return
    }

    const lbTitle = document.querySelector('#lbTitle')
    lbTitle.innerHTML = notice.noticeTitle;
    
    document.querySelector('#lbReportingDt').innerHTML = '작성일 : '+notice.reportingDt+'&nbsp&nbsp';
    document.querySelector('#lbNoticeWriter').innerHTML = '작성자 : '+notice.noticeWriter;

    const dlsTxt = document.querySelector('#dlsTxt')
    dlsTxt.className = 'details-board-txt';
    dlsTxt.innerHTML = notice.noticeTxt;
    
    const btnGoList = document.querySelector('#btnGoList');
    btnGoList.textContent = "돌아가기";
    btnGoList.addEventListener('click', function() {
      detailToListCallback();
    })

    const { role } = this.props;
    if (role === 'ROLE_ADMIN' || role === 'ROLE_SYSADMIN') {

      const divSub = document.querySelector('#divSub');

      const { registerCallback } = this.props;
      const btnUpdate = document.createElement('vaadin-button');
      btnUpdate.textContent = "수정";
      btnUpdate.addEventListener('click', function() {
        registerCallback(notice);
        detailToListCallback();
      })

      const { deleteCallback } = this.props;
      const btnDelete = document.createElement('vaadin-button');
      btnDelete.setAttribute('style', 'color: var(--lumo-error-text-color)');
      btnDelete.textContent = "삭제";
      btnDelete.addEventListener('click', function() {
        const check = window.confirm('공지사항을 삭제 하시겠습니까?');
        if (check === true) {
          deleteCallback(notice.noticeSid);
          detailToListCallback();
        }
      })
      divSub.appendChild(btnUpdate);
      divSub.appendChild(btnDelete);
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
        <div className="div-board-txt">
          <vaadin-details id="dlsTxt" />
        </div>
        <div id="divSub" className="div-sub-main">
          <vaadin-button id="btnGoList" />
        </div>
      </Fragment>
    );
  }
}
export default NoticeDetail;
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

    const { registerCallback } = this.props;
    const btnUpdate = document.querySelector('#btnUpdate');
    btnUpdate.textContent = "수정";
    btnUpdate.addEventListener('click', function() {
      registerCallback(notice);
      detailToListCallback();
    })

    const { deleteCallback } = this.props;
    const btnDelete = document.querySelector('#btnDelete');
    btnDelete.textContent = "삭제";
    btnDelete.addEventListener('click', function() {
      const check = window.confirm('공지사항을 삭제 하시겠습니까?');
      if (check === true) {
        deleteCallback(notice.noticeSid);
        detailToListCallback();
      }
    })

  }

  render() {
    return (
      <Fragment>
        <div className="board-title-div">
          <label id="lbTitle" className="label-board-title"/>
        </div>
        <div className="board-sub-title-div">
          <label id="lbReportingDt" />
          <label id="lbNoticeWriter" />
        </div>
        <div className="board-txt-div">
          <vaadin-details id="dlsTxt" />
        </div>
        <div>
          <vaadin-button id="btnGoList" />
          <vaadin-button id="btnUpdate" />
          <vaadin-button id="btnDelete" theme="error" />
        </div>
      </Fragment>
    );
  }
}
export default NoticeDetail;
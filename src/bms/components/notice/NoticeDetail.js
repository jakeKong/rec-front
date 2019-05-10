import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-button';

class NoticeDetail extends Component {

  componentDidMount() {
    const { notice, detailToListCallback } = this.props;
    if (!notice || notice === undefined) {
      return
    }
    console.log(notice);

    const lbTitle = document.querySelector('#lbTitle')
    lbTitle.innerHTML = notice.noticeTitle;
    
    document.querySelector('#lbReportingDt').innerHTML = '작성일 : '+notice.reportingDt+'&nbsp&nbsp';
    document.querySelector('#lbNoticeWriter').innerHTML = '작성자 : '+notice.noticeWriter;

    const dlsTxt = document.querySelector('#dlsTxt')
    dlsTxt.className = 'details-board-txt';
    dlsTxt.innerHTML = notice.noticeTxt;
    
    const goList = document.querySelector('#goList');
    goList.textContent = "돌아가기";
    goList.addEventListener('click', function() {
      detailToListCallback();
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
          <vaadin-button id="goList" />
        </div>
      </Fragment>
    );
  }
}
export default NoticeDetail;
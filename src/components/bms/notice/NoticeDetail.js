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
    
    const lbSubtitle = document.querySelector('#lbSubtitle')
    lbSubtitle.innerHTML = '작성일 : '+notice.reportingDt+' 작성자 : '+notice.noticeWriter;

    const dlsTxt = document.querySelector('#dlsTxt')
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
        <vaadin-vertical-layout>
          <label id="lbTitle" />
        </vaadin-vertical-layout>
        <vaadin-vertical-layout>
          <label id="lbSubtitle" />
        </vaadin-vertical-layout>
        <vaadin-vertical-layout>
          <vaadin-details id="dlsTxt" />
        </vaadin-vertical-layout>
        <vaadin-vertical-layout>
          <vaadin-button id="goList" />
        </vaadin-vertical-layout>
      </Fragment>
    );
  }
}
export default NoticeDetail;
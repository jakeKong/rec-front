import React, { Component, Fragment } from 'react';

// component
import '@vaadin/vaadin-button';

import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';

import { monthBeforeDate, currentDate, calendarLocale } from '../../../common/items';

let moment = require('moment')
class NoticeSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fromDt: null,
      toDt: null,
      noticeTitle: '',
    }
    this.searchClick = this.searchClick.bind(this);
  }

  componentDidMount() {
    // search label set
    document.querySelector('#lbDate').innerHTML = '기간';
    document.querySelector('#lbPunct').innerHTML = '~';
    document.querySelector('#lbSearch').innerHTML = '제목';
    
    // default before Week date set
    this.setState({fromDt: moment(monthBeforeDate).format('YYYY-MM-DD')});
    // this.setState({fromDt: dateFormat(new Date(monthBeforeDate), 'yyyy-mm-dd')});
    // default today
    // this.setState({toDt: dateFormat(new Date(currentDate), 'yyyy-mm-dd')});
    this.setState({toDt: moment(currentDate).format('YYYY-MM-DD')});

    // Search button set
    const btnSearch = document.querySelector('#btnSearch')
    btnSearch.innerHTML = '조회';
    btnSearch.className = 'btn';

    const searchClick = this.searchClick;
    document.querySelector('#itSearch').addEventListener('keypress', function(e) {
      if (e.keyCode === 13) {
        searchClick();
      }
    })
  }

  // 제목 텍스트 입력 이벤트
  SearchItemByTitleInputEvent(e) {
    this.setState({noticeTitle: e.target.value})
  }

  // 버튼 클릭 이벤트
  searchClick() {
    const { searchCallback } = this.props;
    const { fromDt, toDt, noticeTitle } = this.state;
    if (fromDt === null || fromDt === undefined) {
      return;
    }
    if (toDt === null || toDt === undefined) {
      return;
    }
    searchCallback(fromDt, toDt, noticeTitle);
  }

  render() {
    return (
      <Fragment>
        <label className="label" id="lbDate" />
        <Calendar className="calendar-width-100" readOnlyInput={true} locale={calendarLocale} id="dpStart" showIcon={true} value={this.state.fromDt} onChange={(e) => this.setState({fromDt: moment(e.value).format('YYYY-MM-DD')})}/>
        <label className="label" id="lbPunct" />
        <Calendar className="calendar-width-100" readOnlyInput={true} locale={calendarLocale} id="dpEnd" showIcon={true} value={this.state.toDt} onChange={(e) => this.setState({toDt: moment(e.value).format('YYYY-MM-DD')})}/>
        <label className="label" id="lbSearch" />
        <InputText id="itSearch" value={this.state.noticeTitle} onChange={(e) => this.SearchItemByTitleInputEvent(e)} />
        <vaadin-button id="btnSearch" onClick={() => this.searchClick()}/>
      </Fragment>
    );
  }
}
export default NoticeSearch ;
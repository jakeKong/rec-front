import React, { Component, Fragment } from 'react';

// component
import '@vaadin/vaadin-button';

import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import { monthBeforeDate, currentDate, calendarLocale } from '../../../common/items';

let dateFormat = require('dateformat');
class QuestionSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fromDt: null,
      toDt: null,
      questionTitle: '',
      questionWriter: '',
      searchItemValue: 'title'
    }
  }

  componentDidMount() {
    // search parameter default setting
    const { role } = this.props;

    // search label set
    document.querySelector('#lbDate').innerHTML = '기간';
    document.querySelector('#lbPunct').innerHTML = '~';
    const lbSearch = document.querySelector('#lbSearch');
    lbSearch.innerHTML = '제목';
    
    
    // default before Week date set
    this.setState({fromDt: dateFormat(new Date(monthBeforeDate), 'yyyy-mm-dd')});
    // default today
    this.setState({toDt: dateFormat(new Date(currentDate), 'yyyy-mm-dd')});

    const drSearch = document.querySelector('#drSearch');
    if (role === 'ROLE_ADMIN') {
      drSearch.hidden = false;
      lbSearch.hidden = true;
    } else {
      drSearch.hidden = true;
      lbSearch.hidden = false;
    }

    // Search button set
    const btnSearch = document.querySelector('#btnSearch')
    btnSearch.innerHTML = '조회';
    btnSearch.className = 'btn';
  }

  // 콤보박스 값 변경 이벤트
  SearchItemChangeEvent(e) {
    this.setState({searchItemValue: e.value})
    this.setState({questionTitle: '',
                   questionWriter: ''})
  }

  // 제목 텍스트 입력 이벤트
  SearchItemByTitleInputEvent(e) {
    this.setState({questionTitle: e.target.value})
  }

  // 이름 텍스트 입력 이벤트
  SearchItemByNameInputEvent(e) {
    this.setState({questionWriter: e.target.value})
  }

  // 버튼 클릭 이벤트
  searchClick(e) {
    const { searchCallback } = this.props;
    const { fromDt, toDt, questionTitle, questionWriter } = this.state;
    if (fromDt === null || fromDt === undefined) {
      return;
    }
    if (toDt === null || toDt === undefined) {
      return;
    }
    searchCallback(fromDt, toDt, questionTitle, questionWriter);
  }

  render() {
    const drSearchItems = [
      {label: '제목', value: 'title'},
      {label: '이름', value: 'name'}
    ]

    return (
      <Fragment>
        <label className="label" id="lbDate" />
        <Calendar className="calendar-width-100" locale={calendarLocale} id="dpStart" showIcon={true} dateFormat="yy-mm-dd" value={this.state.fromDt} onChange={(e) => this.setState({fromDt: dateFormat(new Date(e.value), 'yyyy-mm-dd')})}/>
        <label className="label" id="lbPunct" />
        <Calendar className="calendar-width-100" locale={calendarLocale} id="dpEnd" showIcon={true} dateFormat="yy-mm-dd" value={this.state.toDt} onChange={(e) => this.setState({toDt: dateFormat(new Date(e.value), 'yyyy-mm-dd')})}/>

        <Dropdown id="drSearch" 
                  className="dropdown-width-100"
                  value={this.state.searchItemValue}
                  options={drSearchItems} 
                  onChange={e=>this.SearchItemChangeEvent(e)} />
        <label className="label" id="lbSearch"/>
        { this.state.searchItemValue === 'title' &&
          <InputText id="itSearch" value={this.state.questionTitle} onChange={(e) => this.SearchItemByTitleInputEvent(e)} /> }
        { this.state.searchItemValue === 'name' &&
          <InputText id="itSearch" value={this.state.questionWriter} onChange={(e) => this.SearchItemByNameInputEvent(e)} /> }

        <vaadin-button id="btnSearch" onClick={e => this.searchClick(e)}/>
      </Fragment>
    );
  }
}
export default QuestionSearch ;
import React, { Component, Fragment } from 'react';

// component
import '@vaadin/vaadin-button';

import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import { monthBeforeDate, currentDate, calendarLocale } from '../../../common/items';

let moment = require('moment');
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
    this.setState({fromDt: moment(monthBeforeDate).format('YYYY-MM-DD')});
    // default today
    this.setState({toDt: moment(currentDate).format('YYYY-MM-DD')});

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
  searchClick() {
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

  keyPressEvent(e) {
    if (e.charCode === 13) {
      this.searchClick();
    }
  }

  render() {
    const drSearchItems = [
      {label: '제목', value: 'title'},
      {label: '이름', value: 'name'}
    ]

    return (
      <Fragment>
        <label className="label" id="lbDate" />
        <Calendar className="calendar-width-100" yearNavigator={true} yearRange="1900:2030" readOnlyInput={true} locale={calendarLocale} id="dpStart" showIcon={true} value={this.state.fromDt} onChange={(e) => this.setState({fromDt: moment(e.value).format('YYYY-MM-DD')})}/>
        <label className="label" id="lbPunct" />
        <Calendar className="calendar-width-100" yearNavigator={true} yearRange="1900:2030" readOnlyInput={true} locale={calendarLocale} id="dpEnd" showIcon={true} value={this.state.toDt} onChange={(e) => this.setState({toDt: moment(e.value).format('YYYY-MM-DD')})}/>

        <Dropdown id="drSearch" 
                  className="dropdown-width-100"
                  value={this.state.searchItemValue}
                  options={drSearchItems} 
                  onChange={e=>this.SearchItemChangeEvent(e)} />
        <label className="label" id="lbSearch"/>
        { this.state.searchItemValue === 'title' &&
          <InputText id="itSearch" value={this.state.questionTitle} onChange={(e) => this.SearchItemByTitleInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)}/> }
        { this.state.searchItemValue === 'name' &&
          <InputText id="itSearch" value={this.state.questionWriter} onChange={(e) => this.SearchItemByNameInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)}/> }

        <vaadin-button id="btnSearch" onClick={() => this.searchClick()}/>
      </Fragment>
    );
  }
}
export default QuestionSearch ;
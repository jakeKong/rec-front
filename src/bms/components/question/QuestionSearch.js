import React, { Component, Fragment } from 'react';

// layout
import '@vaadin/vaadin-ordered-layout';

// component
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-icons'

import '@vaadin/vaadin-select'
import '@vaadin/vaadin-list-box'
import '@vaadin/vaadin-item'

import {Calendar} from 'primereact/calendar';

import { monthBeforeDate, currentDate, calendarLocale } from '../../../common/items';

let dateFormat = require('dateformat');
class QuestionSearch extends Component {

  constructor(props) {
    super(props);
    this.state ={
        fromDt: null,
        toDt: null,
        questionTitle: null,
        questionWriter: null
    }
  }

  componentDidMount() {
    // search parameter default setting
    let { fromDt, toDt, questionTitle, questionWriter} = this.state;
    const { role } = this.props;

    // search label set
    document.querySelector('#lbDate').innerHTML = '기간';
    document.querySelector('#lbPunct').innerHTML = '~';
    const lbSearch = document.querySelector('#lbSearch');
    lbSearch.innerHTML = '제목';
    
    
    //날짜 선택 필드 세팅
    {
      // Start date-picker set
      const dpStart = document.querySelector('#dpStart')
      // default before Week date set
      fromDt = dateFormat(new Date(monthBeforeDate), 'yyyy-mm-dd');
      this.setState({fromDt: fromDt});
      dpStart.onChanged = function() {
        fromDt = dpStart.value;
      };

      // End date-picker set
      const dpEnd = document.querySelector('#dpEnd')
      // default today
      toDt = dateFormat(new Date(currentDate), 'yyyy-mm-dd');
      this.setState({toDt: toDt});
      dpEnd.addEventListener('onChanged', function() {
        toDt = dpEnd.value;
      })
    }

    const cbSearch = document.querySelector('#cbSearch')

    if (role === 'ROLE_ADMIN') {
      cbSearch.hidden = false;
      lbSearch.hidden = true;

      cbSearch.items = ['제목', '이름'];    
      cbSearch.value = '제목';
      cbSearch.addEventListener('value-changed', function() {
        questionTitle = null;
        questionWriter = null;
        tfSearch.value = null;
      })
    } else {
      cbSearch.hidden = true;
      lbSearch.hidden = false;
    }

    // Search text-field set
    const tfSearch = document.querySelector('#tfSearch')
    tfSearch.placeholder = '검색어를 입력해주세요.';
    tfSearch.maxlength = '15';
    tfSearch.addEventListener('input', function() {
      if (role) {
        if (cbSearch.value === '제목') {
          questionTitle = tfSearch.value;
        }
        if (cbSearch.value === '이름') {
          questionWriter = tfSearch.value;
        }
      } else {
        questionTitle = tfSearch.value;
      }
    })

    // Search button set
    const { searchCallback } = this.props;
    const btnSearch = document.querySelector('#btnSearch')
    btnSearch.innerHTML = '조회';
    btnSearch.addEventListener('click', function() {
      searchCallback(dateFormat(new Date(fromDt), 'yyyymmdd'), dateFormat(new Date(toDt), 'yyyymmdd'), questionTitle, questionWriter);
    })
    btnSearch.className = 'btn';
  }

  render() {
    return (
      <Fragment>
        <label className="label" id="lbDate" />
        <Calendar locale={calendarLocale} id="dpStart" showIcon={true} dateFormat="yy-mm-dd" value={this.state.fromDt} onChange={(e) => this.setState({fromDt: e.value})}/>
        {/* <vaadin-date-picker id="dpStart" /> */}
        <label className="label" id="lbPunct" />
        <Calendar locale={calendarLocale} id="dpEnd" showIcon={true} dateFormat="yy-mm-dd" value={this.state.toDt} onChange={(e) => this.setState({toDt: e.value})}/>
        {/* <vaadin-date-picker id="dpEnd" /> */}

        <vaadin-combo-box id="cbSearch"/>
        <label className="label" id="lbSearch"/>
        <vaadin-text-field id="tfSearch">
          <iron-icon icon="vaadin:search" slot="prefix" />
        </vaadin-text-field>

        <vaadin-button id="btnSearch" />
      </Fragment>
    );
  }
}
export default QuestionSearch ;
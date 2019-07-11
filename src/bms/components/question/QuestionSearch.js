import React, { Component, Fragment } from 'react';

// layout
import '@vaadin/vaadin-ordered-layout';

import Sugar from 'sugar';
import 'sugar/locales/ko';

// component
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-icons'
import '@vaadin/vaadin-date-picker'

import '@vaadin/vaadin-select'
import '@vaadin/vaadin-list-box'
import '@vaadin/vaadin-item'

import { monthBeforeDate, currentDate } from '../../../common/items';

class QuestionSearch extends Component {

  constructor(props) {
    super(props);
    this.state ={
        search: {
          fromDt: null,
          toDt: null,
          questionTitle: null,
          questionWriter: null
        }
    }
  }

  componentDidMount() {
    // search parameter default setting
    const { search } = this.state;
    const { role } = this.props;

    // search label set
    document.querySelector('#lbDate').innerHTML = '기간';
    document.querySelector('#lbPunct').innerHTML = '~';
    const lbSearch = document.querySelector('#lbSearch');
    lbSearch.innerHTML = '제목';
    
    // Start date-picker set
    const dpStart = document.querySelector('#dpStart')
    // default before Week date set
    dpStart.value = monthBeforeDate;
    search.fromDt = dpStart.value;
    dpStart.i18n = {
      today: '오늘',
      cancel: '취소',
      firstDayOfWeek: 1,
      monthNames:
        '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
      weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
      weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
      formatDate: function(date) {
        return Sugar.Date.format(Sugar.Date.create(date), '{yyyy}년{MM}월{dd}일');
      },
      formatTitle: function(monthName, fullYear) {
        return fullYear + '년 ' + monthName;
      },
    }
    dpStart.addEventListener('value-changed', function() {
      search.fromDt = dpStart.value;
    })

    // End date-picker set
    const dpEnd = document.querySelector('#dpEnd')
    // default today
    dpEnd.value = currentDate;
    search.toDt = dpEnd.value;
    dpEnd.i18n = {
      today: '오늘',
      cancel: '취소',
      firstDayOfWeek: 1,
      monthNames:
        '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
      weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
      weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
      formatDate: function(date) {
        return Sugar.Date.format(Sugar.Date.create(date), '{yyyy}년{MM}월{dd}일');
      },
      formatTitle: function(monthName, fullYear) {
        return fullYear + '년 ' + monthName;
      },
    }
    dpEnd.addEventListener('value-changed', function() {
      search.toDt = dpEnd.value;
    })

    const cbSearch = document.querySelector('#cbSearch')

    if (role === 'ROLE_ADMIN') {
      cbSearch.hidden = false;
      lbSearch.hidden = true;

      cbSearch.items = ['제목', '이름'];    
      cbSearch.value = '제목';
      cbSearch.addEventListener('value-changed', function() {
        search.questionTitle = null;
        search.questionWriter = null;
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
          search.questionTitle = tfSearch.value;
        }
        if (cbSearch.value === '이름') {
          search.questionWriter = tfSearch.value;
        }
      } else {
        search.questionTitle = tfSearch.value;
      }
    })

    // Search button set
    const { searchCallback } = this.props;
    const btnSearch = document.querySelector('#btnSearch')
    btnSearch.innerHTML = '조회';
    btnSearch.addEventListener('click', function() {
      searchCallback(search);
    })

    // dpStart.className = 'datepickr';
    // // console.log(dpStart.shadowRoot.querySelector('#input').shadowRoot.querySelector('.vaadin-text-field-container'));
    // // console.log(dpStart.shadowRoot.querySelector('#input').shadowRoot.querySelector('.vaadin-text-field-container').querySelectorAll('div')[0]);
    // // dpStart.shadowRoot.querySelector('#input').shadowRoot.querySelector('.vaadin-text-field-container').querySelectorAll('div')[0].className= 'datepickr';
    // // dpStart.shadowRoot.querySelector('#input').shadowRoot.querySelector('.vaadin-text-field-container').className = 'datepickr';
    // // dpStart.shadowRoot.querySelector('#input').className = 'datepickr';
    // dpEnd.className = 'datepickr';
    // // cbSearch.className = '';
    // tfSearch.className = 'ipt-txt';
    // console.log(tfSearch.shadowRoot.querySelector('.vaadin-text-field-container'))
    // // tfSearch.shadowRoot.querySelector('.vaadin-text-field-container').className = 'ipt-txt';
    // console.log(tfSearch.shadowRoot.querySelector('.vaadin-text-field-container').querySelectorAll('div')[0])
    // tfSearch.shadowRoot.querySelector('.vaadin-text-field-container').querySelectorAll('div')[0].className = 'ipt-txt';
    btnSearch.className = 'btn';
  }

  render() {
    return (
      <Fragment>
        <label className="label" id="lbDate" />
        <vaadin-date-picker id="dpStart" />
        <label className="label" id="lbPunct" />
        <vaadin-date-picker id="dpEnd" />

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
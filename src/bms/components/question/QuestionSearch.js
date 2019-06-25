import React, { Component, Fragment } from 'react';

// layout
import '@vaadin/vaadin-ordered-layout';

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
    document.querySelector('#lbSearch').innerHTML = '제목';
    
    // Start date-picker set
    const dpStart = document.querySelector('#dpStart')
    // default before Week date set
    dpStart.value = monthBeforeDate;
    search.fromDt = dpStart.value;
    dpStart.addEventListener('value-changed', function() {
      search.fromDt = dpStart.value;
    })

    // End date-picker set
    const dpEnd = document.querySelector('#dpEnd')
    // default today
    dpEnd.value = currentDate;
    search.toDt = dpEnd.value;
    dpEnd.addEventListener('value-changed', function() {
      search.toDt = dpEnd.value;
    })

    const cbSearch = document.querySelector('#cbSearch')
    cbSearch.items = ['제목', '이름'];    
    cbSearch.value = '제목';
    cbSearch.addEventListener('value-changed', function() {
      search.questionTitle = null;
      search.questionWriter = null;
      tfSearch.value = null;
    })

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
  }

  render() {
    const { role } = this.props;
    return (
      <Fragment>

        <label className="label-center" id="lbDate" />
        <vaadin-date-picker id="dpStart" />
        <label className="label-center" id="lbPunct" />
        <vaadin-date-picker id="dpEnd" />

        <vaadin-combo-box id="cbSearch" hidden={!role || role === undefined}/>
        <label className="label-center" id="lbSearch" hidden={role}/>
        <vaadin-text-field id="tfSearch">
          <iron-icon icon="vaadin:search" slot="prefix" />
        </vaadin-text-field>

        <vaadin-button id="btnSearch" />
      </Fragment>
    );
  }
}
export default QuestionSearch ;
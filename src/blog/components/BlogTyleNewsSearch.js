import React, { Component, Fragment } from 'react';

import { monthBeforeDate, currentDate } from '../../common/items';

// component
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-icons'
import '@vaadin/vaadin-date-picker'

import '@vaadin/vaadin-select'
import '@vaadin/vaadin-list-box'
import '@vaadin/vaadin-item'

class BlogTyleNewsSearch extends Component {

  constructor(props) {
    super(props);
    this.state ={
      search: {
        tylenewsTitle: null,
        tylenewsSubtitle: null,
        tylenewsWriter: null,
        fromDt: null,
        toDt: null,
        tylenewsVisibility: null
      }
    }
  }

  componentDidMount() {
    // search parameter default setting
    const { search } = this.state;

    const cbVisibility = document.querySelector('#cbVisibility')
    cbVisibility.value = '전체';
    cbVisibility.items = ['전체', '공개', '비공개'];
    cbVisibility.addEventListener('value-changed', function(e) {
      if (e.detail.value === '전체') {
        search.tylenewsVisibility = null;
      } else if (e.detail.value === '공개') {
        search.tylenewsVisibility = true;
      } else {
        search.tylenewsVisibility = false;
      }
    })

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

    // Search combo-box set
    const cbSearch = document.querySelector('#cbSearch')
    // ByAll || byEmail Check
    cbSearch.value = '제목';
    cbSearch.items = ['제목', '분류', '작성자'];
    cbSearch.addEventListener('value-changed', function() {
      search.tylenewsTitle = null;
      search.tylenewsSubtitle = null;
      search.tylenewsWriter = null;
      tfSearch.value = null;
    })

    // Search text-field set
    const tfSearch = document.querySelector('#tfSearch')
    tfSearch.placeholder = '검색어를 입력해주세요.';
    tfSearch.maxlength = '15';
    tfSearch.addEventListener('input', function() {
      if (cbSearch.value === '제목') {
        search.tylenewsTitle = tfSearch.value;
      }
      if (cbSearch.value === '분류') {
        search.tylenewsSubtitle = tfSearch.value;
      }
      if (cbSearch.value === '작성자') {
        search.tylenewsWriter = tfSearch.value;
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
    return (
      <Fragment>
        <vaadin-combo-box id="cbVisibility" />

        <label className="label-center" id="lbDate" />
          <vaadin-date-picker id="dpStart" />
            <label className="label-center" id="lbPunct" />
          <vaadin-date-picker id="dpEnd" />

        <vaadin-combo-box id="cbSearch"/>
          <vaadin-text-field id="tfSearch">
            <iron-icon icon="vaadin:search" slot="prefix" />
          </vaadin-text-field>

        <vaadin-button id="btnSearch" />
      </Fragment>
    );
  }
}
export default BlogTyleNewsSearch ;
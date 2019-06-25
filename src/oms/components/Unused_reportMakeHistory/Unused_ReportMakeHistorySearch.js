/*
import React, { Component, Fragment } from 'react';

// component
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-icons'
import '@vaadin/vaadin-date-picker'

import '@vaadin/vaadin-select'
import '@vaadin/vaadin-list-box'
import '@vaadin/vaadin-item'

import { reportTypeItems } from '../../items';
import { monthBeforeDate, currentDate } from '../../../common/items';

class ReportMakeHistorySearch extends Component {

  constructor(props) {
    super(props);
    this.state ={
      search: {
        reportMakeNo: null,
        pnu: null,
        marketPrice: null,
        fromDt: null,
        toDt: null,
        reportType: null
      }
    }
    // this.setSearchState = this.setSearchState.bind(this);
  }

  componentDidMount() {
    // search parameter default setting
    const { search } = this.state;

    // search label set
    document.querySelector('#lbReportType').innerHTML = '부동산 유형';
    document.querySelector('#lbDate').innerHTML = '기간';
    document.querySelector('#lbPunct').innerHTML = '~';
    
    // status Box set
    const slReportType = document.querySelector('#slReportType')
    // default status Select set
    slReportType.value = 'ALL';
    search.status = slReportType.value;
    slReportType.renderer = function(root) {
      if (root.firstChild) {
        return;
      }
      const listBox = document.createElement('vaadin-list-box');
      const select = document.createElement('vaadin-item');

      select.textContent = '전체';
      select.setAttribute('value', 'ALL');
      listBox.appendChild(select);

      const divider = document.createElement('hr');
      listBox.appendChild(divider);

      reportTypeItems.forEach(function(row){
        const item = document.createElement('vaadin-item');
        item.textContent = row.textContent;
        if (row.value) {
          item.setAttribute('value', row.value);
        }
        listBox.appendChild(item);
      });
      root.appendChild(listBox);
    }
    // 상태 콤보박스의 값 변경 시 SearchParameter에 선택한 값으로 변경
    slReportType.addEventListener('value-changed', function(e) {
      search.reportType = slReportType.value;
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
    cbSearch.items = ['보고서생성번호', '지번', '주문자'];
    cbSearch.value = '보고서생성번호';
    cbSearch.addEventListener('value-changed', function() {
      search.reportMakeNo = null;
      search.pnu = null;
      search.orderBy = null;
      tfSearch.value = null;
    })

    // Search text-field set
    const tfSearch = document.querySelector('#tfSearch')
    tfSearch.placeholder = '검색어를 입력해주세요.';
    tfSearch.maxlength = '15';
    tfSearch.addEventListener('input', function() {
      if (cbSearch.value === '보고서생성번호') {
        search.reportMakeNo = tfSearch.value;
      }
      if (cbSearch.value === '지번') {
        search.pnu = tfSearch.value;
      }
      if (cbSearch.value === '주문자') {
        search.orderBy = tfSearch.value;
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
        <label className="label-center" id="lbReportType" />
          <vaadin-select id="slReportType" />

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
export default ReportMakeHistorySearch ;
*/
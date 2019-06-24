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
            // search: {
            //     title: null,
            //     subTitle: null,
            //     writer: null,
            //     fromDt: null,
            //     toDt: null,
            //     visibility: null,
            // }
        }
    }

  componentDidMount() {
    // search parameter default setting
    // const { search } = this.state;

    const visibilityItems = [
      {value: true, textContent: '공개'},
      {value: false, textContent: '비공개'}
    ];

    // search label set
    document.querySelector('#lbDate').innerHTML = '기간';
    document.querySelector('#lbPunct').innerHTML = '~';
    
    const slVisibility = document.querySelector('#slVisibility')
    slVisibility.value = 'ALL';
    // search.visibility = slVisibility.value;
    slVisibility.renderer = function(root) {
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

      visibilityItems.forEach(function(row){
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
    slVisibility.addEventListener('value-changed', function(e) {
        // search.visibility = slVisibility.value;
    })

    // Start date-picker set
    const dpStart = document.querySelector('#dpStart')
    // default before Week date set
    dpStart.value = monthBeforeDate;
    // search.fromDt = dpStart.value;
    dpStart.addEventListener('value-changed', function() {
      // search.fromDt = dpStart.value;
    })

    // End date-picker set
    const dpEnd = document.querySelector('#dpEnd')
    // default today
    dpEnd.value = currentDate;
    // search.toDt = dpEnd.value;
    dpEnd.addEventListener('value-changed', function() {
      // search.toDt = dpEnd.value;
    })

    // Search combo-box set
    const cbSearch = document.querySelector('#cbSearch')
    // ByAll || byEmail Check
    cbSearch.value = '제목';
    cbSearch.items = ['제목', '분류', '작성자'];
    cbSearch.addEventListener('value-changed', function() {
      // search.title = null;
      // search.subTitle = null;
      // search.writer = null;
      // tfSearch.value = null;
    })

    // Search text-field set
    const tfSearch = document.querySelector('#tfSearch')
    tfSearch.placeholder = '검색어를 입력해주세요.';
    tfSearch.maxlength = '15';
    tfSearch.addEventListener('input', function() {
      if (cbSearch.value === '제목') {
        // search.title = tfSearch.value;
      }
      if (cbSearch.value === '분류') {
        // search.subTitle = tfSearch.value;
      }
      if (cbSearch.value === '작성자') {
        // search.writer = tfSearch.value;
      }
    })

    // Search button set
    // const { searchCallback } = this.props;
    const btnSearch = document.querySelector('#btnSearch')
    btnSearch.innerHTML = '조회';
    btnSearch.addEventListener('click', function() {
      // searchCallback(search);
    })
  }

  render() {
    return (
      <Fragment>
        <vaadin-select id="slVisibility" />

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
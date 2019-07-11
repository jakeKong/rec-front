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

import { statusItems, realEstateTypeItems } from '../../items';
import { monthBeforeDate, currentDate } from '../../../common/items';

class OrderHistorySearch extends Component {

    constructor(props) {
        super(props);
        this.state ={
            search: {
                email: null,
                ordererNm: null,
                odrNo: null,
                fromDt: null,
                toDt: null,
                realEstateType: null,
                status: null
            }
        }
        // this.setSearchState = this.setSearchState.bind(this);
    }

  componentDidMount() {
    // search parameter default setting
    const { search } = this.state;
    const { role } = this.props;

    // search label set
    document.querySelector('#lbStatus').innerHTML = '상태';
    document.querySelector('#lbDate').innerHTML = '기간';
    document.querySelector('#lbPunct').innerHTML = '~';
    document.querySelector('#lbRealEstateType').innerHTML = '부동산 유형';
    
    /*
    // combo-box set
    const cbStatus = document.querySelector('#cbStatus')
    cbStatus.items = [{},'전체','구매완료','구매취소'];
    cbStatus.value = '전체';
    cbStatus.addEventListener('change', function() {
        param.status = cbStatus.value;
        console.log('cbStatus.value = ' + cbStatus.value)
        console.log('param.status = ' + param.status)
    })
    */
    
    // status Box set
    const slStatus = document.querySelector('#slStatus')
    // default status Select set
    slStatus.value = 'ALL';
    search.status = slStatus.value;
    slStatus.renderer = function(root) {
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

      statusItems.forEach(function(row){
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
    slStatus.addEventListener('value-changed', function(e) {
        search.status = slStatus.value;
    })

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

    // realEstateType Box set
    const slRealEstateType = document.querySelector('#slRealEstateType')
    // default realEstateType Select set
    slRealEstateType.value = 'ALL';
    search.realEstateType = slRealEstateType.value;
    slRealEstateType.renderer = function(root) {
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

      realEstateTypeItems.forEach(function(row){
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
    slRealEstateType.addEventListener('value-changed', function(e) {
        search.realEstateType = slRealEstateType.value;
    })

    // Search combo-box set
    const cbSearch = document.querySelector('#cbSearch')
    // ByAll || byEmail Check
    if (role !== 'ROLE_ADMIN') {
      cbSearch.items = ['주문번호'];    
    } else {
      cbSearch.items = ['주문번호', '주문자'];
    }
    cbSearch.value = '주문번호';
    cbSearch.addEventListener('value-changed', function() {
      search.odrNo = null;
      search.ordererNm = null;
      // search.email = null;
      tfSearch.value = null;
    })

    // Search text-field set
    const tfSearch = document.querySelector('#tfSearch')
    tfSearch.placeholder = '검색어를 입력해주세요.';
    tfSearch.maxlength = '15';
    tfSearch.addEventListener('input', function() {
      if (cbSearch.value === '주문번호') {
        search.odrNo = tfSearch.value;
      }
      if (cbSearch.value === '주문자') {
        search.ordererNm = tfSearch.value;
      }
    })

    // Search button set
    const { searchCallback } = this.props;
    const btnSearch = document.querySelector('#btnSearch')
    btnSearch.innerHTML = '조회';
    btnSearch.addEventListener('click', function() {
      searchCallback(search);
    })

    // slStatus.className = "select"
    // slRealEstateType.className = "select"
    // dpStart.className = "datepickr"
    // dpEnd.className = "datepickr"
    // cbSearch.className = ""
    // tfSearch.className = ""
    btnSearch.className = "btn"
  }

  render() {
    return (
      <Fragment>
        <label className="label" id="lbStatus" />
          {/* <vaadin-combo-box id="cbStatus"/> */}
          <vaadin-select id="slStatus" />

        <label className="label" id="lbRealEstateType" />
          <vaadin-select id="slRealEstateType" />

        <label className="label" id="lbDate" />
          <vaadin-date-picker id="dpStart" />
            <label className="label" id="lbPunct" />
          <vaadin-date-picker id="dpEnd" />

        <vaadin-combo-box id="cbSearch"/>
          <vaadin-text-field id="tfSearch">
            {/* <iron-icon icon="vaadin:search" slot="prefix" /> */}
          </vaadin-text-field>

        <vaadin-button id="btnSearch" />
      </Fragment>
    );
  }
}
export default OrderHistorySearch ;
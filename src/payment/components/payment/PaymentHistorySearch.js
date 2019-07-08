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

import Sugar from 'sugar';
import 'sugar/locales/ko';

import { approvalTypeItems } from '../../items';
import { monthBeforeDate, currentDate } from '../../../common/items';

class PaymentHistorySearch extends Component {

  constructor(props) {
    super(props);
    this.state ={
        search: {
          paymentId: null,
          startTime: null,
          endTime: null,
          approvalType: null
        }
    }
  }

  componentDidMount() {
    // search parameter default setting
    const { search } = this.state;

    // search label set
    document.querySelector('#lbDate').innerHTML = '기간';
    document.querySelector('#lbPunct').innerHTML = '~';
    document.querySelector('#lbSearch').innerHTML = '제목';

    // approvalType Box set
    const slApprovalType = document.querySelector('#slApprovalType')
    // default approvalType Select set
    slApprovalType.value = 'ALL';
    search.status = slApprovalType.value;
    slApprovalType.renderer = function(root) {
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

      approvalTypeItems.forEach(function(row){
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
    slApprovalType.addEventListener('value-changed', function(e) {
        search.approvalType = slApprovalType.value;
    })
    
    // Start date-picker set
    const dpStart = document.querySelector('#dpStart')
    // default before Week date set
    dpStart.value = monthBeforeDate;
    search.startTime = dpStart.value;
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
      search.startTime = dpStart.value;
    })

    // End date-picker set
    const dpEnd = document.querySelector('#dpEnd')
    // default today
    dpEnd.value = currentDate;
    search.endTime = dpEnd.value;
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
      search.endTime = dpEnd.value;
    })

    // Search text-field set
    const tfSearch = document.querySelector('#tfSearch')
    tfSearch.placeholder = '검색어를 입력해주세요.';
    tfSearch.maxlength = '15';
    tfSearch.addEventListener('input', function() {
        search.paymentId = tfSearch.value;
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
        <vaadin-select id="slApprovalType" />

        <label className="label-center" id="lbDate" />
        <vaadin-date-picker id="dpStart" />
        <label className="label-center" id="lbPunct" />
        <vaadin-date-picker id="dpEnd" />

        <label className="label-center" id="lbSearch"/>
        <vaadin-text-field id="tfSearch">
          <iron-icon icon="vaadin:search" slot="prefix" />
        </vaadin-text-field>

        <vaadin-button id="btnSearch" />
      </Fragment>
    );
  }
}
export default PaymentHistorySearch ;
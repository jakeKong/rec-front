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

import { changeTypeItems } from '../../items';
import { monthBeforeDate, currentDate } from '../../../common/items';

class ChangePointHistorySearch extends Component {

  constructor(props) {
    super(props);
    this.state ={
      search: {
        userNm: null,
        odrNo: null,
        paymentNo: null,
        fromDt: null,
        toDt: null,
        changeType: null
      },
    }
  }

  componentDidMount() {
      // search parameter default setting
    const { search } = this.state;
    const { role } = this.props;

    // search label set
    document.querySelector('#lbChangeType').innerHTML = '변동 유형';
    document.querySelector('#lbDate').innerHTML = '기간';
    document.querySelector('#lbPunct').innerHTML = '~';
    
    // status Box set
    const slChangeType = document.querySelector('#slChangeType')
    // default status Select set
    slChangeType.value = 'ALL';
    search.changeType = slChangeType.value;
    slChangeType.renderer = function(root) {
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

      changeTypeItems.forEach(function(row){
        const item = document.createElement('vaadin-item');
        item.textContent = row.textContent;
        if (row.value) {
          item.setAttribute('value', row.value);
        }
        listBox.appendChild(item);
      });
      root.appendChild(listBox);
    }

    const cbSearch = document.querySelector('#cbSearch');

    // 상태 콤보박스의 값 변경 시 SearchParameter에 선택한 값으로 변경
    slChangeType.addEventListener('value-changed', function(e) {
      search.changeType = slChangeType.value;
      search.odrNo = null;
      search.paymentNo = null;
      cbSearch.value = null;
      // role
      if (role === 'ROLE_ADMIN') {
        if (slChangeType.value === 'ALL') {
          document.querySelector('#lbSearch').innerHTML = null;
          tfSearch.hidden = true;
          cbSearch.hidden = true;
        }
        else if (slChangeType.value === 'PAYMENT_ADD' || slChangeType.value === 'PAYMENT_SUB') {
          document.querySelector('#lbSearch').innerHTML = null;
          tfSearch.hidden = false;
          cbSearch.items = ['결제번호', '사용자'];
          cbSearch.value = '결제번호';
          cbSearch.hidden = false;
        }
        else if (slChangeType.value === 'PURCHASE_ADD' || slChangeType.value === 'PURCHASE_SUB') {
          document.querySelector('#lbSearch').innerHTML = null;
          tfSearch.hidden = false;
          cbSearch.items = ['주문번호', '사용자'];
          cbSearch.value = '주문번호';
          cbSearch.hidden = false;
        }
        else {
          document.querySelector('#lbSearch').innerHTML = null;
          tfSearch.hidden = true;
          cbSearch.hidden = true;
        }
      } else {
        if (slChangeType.value === 'ALL') {
          document.querySelector('#lbSearch').innerHTML = null;
          tfSearch.hidden = true;
        }
        else if (slChangeType.value === 'PAYMENT_ADD' || slChangeType.value === 'PAYMENT_SUB') {
          document.querySelector('#lbSearch').innerHTML = '결제번호';
          tfSearch.hidden = false;
        }
        else if (slChangeType.value === 'PURCHASE_ADD' || slChangeType.value === 'PURCHASE_SUB') {
          document.querySelector('#lbSearch').innerHTML = '주문번호';
          tfSearch.hidden = false;
        }
        else {
          document.querySelector('#lbSearch').innerHTML = null;
          tfSearch.hidden = true;
        }
      }
    })

    // Search text-field set
    const tfSearch = document.querySelector('#tfSearch')
    tfSearch.maxlength = '15';
    tfSearch.placeholder = '검색어를 입력해주세요.';
    tfSearch.addEventListener('input', function() {
      if (role === 'ROLE_ADMIN') {
        if (cbSearch.value === '결제번호') {
          search.paymentNo = tfSearch.value;
        } else if (cbSearch.value === '주문번호') {
          search.odrNo = tfSearch.value;
        } else {
          search.userNm = tfSearch.value;
        }
      } else {
        if (slChangeType.value === 'PAYMENT_ADD' || slChangeType.value === 'PAYMENT_SUB') {
          search.paymentNo = tfSearch.value;
        } else if (slChangeType.value === 'PURCHASE_ADD' || slChangeType.value === 'PURCHASE_SUB') {
          search.odrNo = tfSearch.value;
        } else {
          search.userNm = tfSearch.value;
        }
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

    // Search button set
    const { searchCallback } = this.props;
    const btnSearch = document.querySelector('#btnSearch')
    btnSearch.innerHTML = '조회';
    btnSearch.addEventListener('click', function() {
      searchCallback(search);
      search.odrNo = null;
      search.paymentNo = null;
      tfSearch.value = null;
    })
  }

  render() {
    return (
      <Fragment>
        <label className="label-center" id="lbChangeType" />
          <vaadin-select id="slChangeType" />

        <label className="label-center" id="lbDate" />
          <vaadin-date-picker id="dpStart" />
            <label className="label-center" id="lbPunct" />
          <vaadin-date-picker id="dpEnd" />

        <label className="label-center" id="lbSearch"/>
        <vaadin-combo-box id="cbSearch" hidden/>
          <vaadin-text-field id="tfSearch" hidden>
            <iron-icon icon="vaadin:search" slot="prefix" />
          </vaadin-text-field>

        <vaadin-button id="btnSearch" />
      </Fragment>
    );
  }
}
export default ChangePointHistorySearch ;
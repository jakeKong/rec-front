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
    console.log(monthBeforeDate)
    search.startTime = dpStart.value;
    dpStart.addEventListener('value-changed', function() {
      search.startTime = dpStart.value;
    })

    // End date-picker set
    const dpEnd = document.querySelector('#dpEnd')
    // default today
    dpEnd.value = currentDate;
    search.endTime = dpEnd.value;
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
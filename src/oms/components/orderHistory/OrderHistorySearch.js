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

import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import { statusItems, realEstateTypeItems } from '../../items';
import { monthBeforeDate, currentDate, calendarLocale } from '../../../common/items';

let moment = require('moment');
class OrderHistorySearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      ordererNm: '',
      odrNo: '',
      fromDt: null,
      toDt: null,
      realEstateType: null,
      status: null,
      searchStatusItemValue: 'ALL',
      searchRealEstateTypeItemValue: 'ALL',
      searchOrderCheckItemValue: 'odrNo',
      inputCheck: false
    }
    this.resetState = this.resetState.bind(this);
    this.searchCallEvent = this.searchCallEvent.bind(this);
    this.SearchStatusItemChangeEvent = this.SearchStatusItemChangeEvent.bind(this);
    this.SearchRealEstateTypeItemChangeEvent = this.SearchRealEstateTypeItemChangeEvent.bind(this);
    this.SearchItemByOrderNumberInputEvent = this.SearchItemByOrderNumberInputEvent.bind(this);
    this.SearchItemByOrdererNameInputEvent = this.SearchItemByOrdererNameInputEvent.bind(this);
    this.SearchItemByEmailInputEvent = this.SearchItemByEmailInputEvent.bind(this);
    this.SearchOrderCheckItemChangeEvent = this.SearchOrderCheckItemChangeEvent.bind(this);
    this.orderItemCheckFieldRendering = this.orderItemCheckFieldRendering.bind(this);
    this.roleCheckFieldRendering = this.roleCheckFieldRendering.bind(this);
  }

  componentDidMount() {
    // search label set
    document.querySelector('#lbStatus').innerHTML = '상태';
    document.querySelector('#lbDate').innerHTML = '기간';
    document.querySelector('#lbPunct').innerHTML = '~';
    document.querySelector('#lbRealEstateType').innerHTML = '부동산 유형';

    // default before Week date set
    this.setState({fromDt: moment(monthBeforeDate).format('YYYY-MM-DD')});
    // default today
    this.setState({toDt: moment(currentDate).format('YYYY-MM-DD')});

    // Search button set
    const searchCallEvent = this.searchCallEvent;
    const resetState = this.resetState;
    const btnSearch = document.querySelector('#btnSearch')
    btnSearch.innerHTML = '조회';
    btnSearch.className = "btn"
    btnSearch.addEventListener('click', function() {
      searchCallEvent();
      resetState();
    })
  }

  resetState() {
    this.setState({
      odrNo: '',
      ordererNm: '',
      email: '',
      inputCheck: false
    })
  }

  keyPressEvent(e) {
    const searchCallEvent = this.searchCallEvent;
    const resetState = this.resetState;
    if (e.charCode === 13) {
      searchCallEvent();
      resetState();
    }
  }

  searchCallEvent() {
    const { email, ordererNm, odrNo, fromDt, toDt, realEstateType, status } = this.state;

    let searchValue = {
      email: email,
      ordererNm: ordererNm,
      odrNo: odrNo,
      fromDt: fromDt,
      toDt: toDt,
      realEstateType: realEstateType,
      status: status
    }
    const { searchCallback } = this.props;
    searchCallback(searchValue);
  }

  // 상태 컬럼 항목 선택 이벤트
  SearchStatusItemChangeEvent(e) {
    this.setState({searchStatusItemValue: e.value})
    this.setState({status: e.value})
  }

  // 부동산 유형 컬럼 항목 선택 이벤트
  SearchRealEstateTypeItemChangeEvent(e) {
    this.setState({searchRealEstateTypeItemValue: e.value})
    this.setState({realEstateType: e.value})
  }

  // 주문번호 입력 텍스트필드 이벤트
  SearchItemByOrderNumberInputEvent(e) {
    if (e.target.value === '') {
      this.setState({inputCheck: false})
    } else {
      this.setState({inputCheck: true})
    }
    this.setState({odrNo: e.target.value})
  }

  // (관리) 주문자 입력 텍스트필드 이벤트
  SearchItemByOrdererNameInputEvent(e) {
    if (e.target.value === '') {
      this.setState({inputCheck: false})
    } else {
      this.setState({inputCheck: true})
    }
    this.setState({ordererNm: e.target.value})
  }

  // (관리) 아이디 입력 텍스트필드 이벤트
  SearchItemByEmailInputEvent(e) {
    if (e.target.value === '') {
      this.setState({inputCheck: false})
    } else {
      this.setState({inputCheck: true})
    }
    this.setState({email: e.target.value})
  }

  // (관리) 주문 텍스트필드 입력조건 항목 선택 이벤트 - 주문번호 / 주문자 선택
  SearchOrderCheckItemChangeEvent(e) {
    this.setState({searchOrderCheckItemValue: e.value})
    this.setState({odrNo: '',
                   ordererNm: '',
                   email: ''})
  }

  // (관리)선택 컬럼항목에 따르는 입력 텍스트필드 반환 - 주문번호 / 주문자 선택
  orderItemCheckFieldRendering() {
    const { searchOrderCheckItemValue } = this.state;
    if (searchOrderCheckItemValue === 'odrNo') {
      return <InputText value={this.state.odrNo} onChange={(e) => this.SearchItemByOrderNumberInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)}/>
    } else if (searchOrderCheckItemValue === 'ordererNm') {
      return <InputText value={this.state.ordererNm} onChange={(e) => this.SearchItemByOrdererNameInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
    } else if (searchOrderCheckItemValue === 'email') {
      return <InputText value={this.state.email} onChange={(e) => this.SearchItemByEmailInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
    } else {
      return null;
    }
  }

  roleCheckFieldRendering(role) {
    if (role === 'ROLE_ADMIN' || role === 'ROLE_SYSADMIN') {
      const orderCheckItems = [
        {label: '주문번호', value: 'odrNo'},
        {label: '주문자', value: 'ordererNm'},
        {label: '아이디', value: 'email'}
      ]
      return (
        <Fragment>
          <Dropdown id="dpOrderItem" 
                    className="dropdown-width-100"
                    value={this.state.searchOrderCheckItemValue}
                    options={orderCheckItems} 
                    onChange={e=>this.SearchOrderCheckItemChangeEvent(e)} disabled={this.state.inputCheck}/>
          {this.orderItemCheckFieldRendering()}
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <label> 주문번호 </label>
          <InputText value={this.state.odrNo} onChange={(e) => this.SearchItemByOrderNumberInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
        </Fragment>
      )
    }
  }

  render() {
    const { role } = this.props;
    return (
      <Fragment>
        <label className="label" id="lbStatus" />
        {/* <vaadin-select id="slStatus" /> */}
        <Dropdown className="dropdown-width-100"
                  value={this.state.searchStatusItemValue}
                  options={statusItems} 
                  onChange={e=>this.SearchStatusItemChangeEvent(e)} />

        <label className="label" id="lbRealEstateType" />
        {/* <vaadin-select id="slRealEstateType" /> */}
        <Dropdown className="dropdown-width-100"
                  value={this.state.searchRealEstateTypeItemValue}
                  options={realEstateTypeItems} 
                  onChange={e=>this.SearchRealEstateTypeItemChangeEvent(e)} />

        <label className="label" id="lbDate" />
        <Calendar className="calendar-width-100" yearNavigator={true} yearRange="1900:2030" readOnlyInput={true} locale={calendarLocale} id="dpStart" showIcon={true} value={this.state.fromDt} onChange={(e) => this.setState({fromDt: moment(e.value).format('YYYY-MM-DD')})}/>
        <label className="label" id="lbPunct" />
        <Calendar className="calendar-width-100" yearNavigator={true} yearRange="1900:2030" readOnlyInput={true} locale={calendarLocale} id="dpEnd" showIcon={true} value={this.state.toDt} onChange={(e) => this.setState({toDt: moment(e.value).format('YYYY-MM-DD')})}/>

        {/* 권한체크 스크립트 호출 */}
        {this.roleCheckFieldRendering(role)}

        <vaadin-button id="btnSearch" />
      </Fragment>
    );
  }
}
export default OrderHistorySearch ;
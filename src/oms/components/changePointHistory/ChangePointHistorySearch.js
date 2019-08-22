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

import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import { changeTypeItems } from '../../items';
import { monthBeforeDate, currentDate, calendarLocale } from '../../../common/items';

let moment = require('moment');
class ChangePointHistorySearch extends Component {

  constructor(props) {
    super(props);
    this.state ={
      userNm: '',
      odrNo: '',
      paymentNo: '',
      changeType: null,
      fromDt: null,
      toDt: null,
      email: '',
      searchItemValue: 'ALL',
      searchAllItemValue: 'paymentNo',
      searchPaymentItemValue: 'paymentNo',
      searchPurchaseItemValue: 'odrNo'
    }

    this.SearchAllItemChangeEvent = this.SearchAllItemChangeEvent.bind(this);
    this.SearchItemChangeEvent = this.SearchItemChangeEvent.bind(this);
    this.roleCheckFieldRendering = this.roleCheckFieldRendering.bind(this);
    this.paymentItemCheckFieldRendering = this.paymentItemCheckFieldRendering.bind(this);
    this.searchCallEvent = this.searchCallEvent.bind(this);
    this.SearchItemByPaymentInputEvent = this.SearchItemByPaymentInputEvent.bind(this);
    this.SearchItemByPurchaseInputEvent = this.SearchItemByPurchaseInputEvent.bind(this);
    this.SearchItemByUserNameInputEvent = this.SearchItemByUserNameInputEvent.bind(this);
    this.SearchItemByEmailInputEvent = this.SearchItemByEmailInputEvent.bind(this);
    this.resetState = this.resetState.bind(this);
    this.SearchPaymentItemChangeEvent = this.SearchPaymentItemChangeEvent.bind(this);
    this.SearchPurchaseItemChangeEvent = this.SearchPurchaseItemChangeEvent.bind(this);
  }

  componentDidMount() {
    // search label set
    document.querySelector('#lbChangeType').innerHTML = '변동 유형';
    document.querySelector('#lbDate').innerHTML = '기간';
    document.querySelector('#lbPunct').innerHTML = '~';
    
    // default before Week date set
    this.setState({fromDt: moment(monthBeforeDate).format('YYYY-MM-DD')});
    // default today
    this.setState({toDt: moment(currentDate).format('YYYY-MM-DD')});

    // Search button set
    const resetState = this.resetState;
    const searchCallEvent = this.searchCallEvent;
    const btnSearch = document.querySelector('#btnSearch')
    btnSearch.innerHTML = '조회';
    btnSearch.className = "btn"
    btnSearch.addEventListener('click', function() {
      searchCallEvent();
      resetState();
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

  resetState() {
    this.setState({
      odrNo: '',
      paymentNo: '',
      userNm: '',
      email: ''
    })
  }

  searchCallEvent() {
    const { fromDt, toDt, odrNo, paymentNo, changeType, userNm, email } = this.state;
    let searchValue = {
      fromDt: fromDt,
      toDt: toDt, 
      odrNo: odrNo, 
      paymentNo: paymentNo, 
      changeType: changeType, 
      userNm: userNm,
      email: email
    }
    const { searchCallback } = this.props;
    searchCallback(searchValue);
  }

  // 결제번호 입력 텍스트필드 이벤트
  SearchItemByPaymentInputEvent(e) {
    this.setState({paymentNo: e.target.value})
  }
  
  // 구매번호 입력 텍스트필드 이벤트
  SearchItemByPurchaseInputEvent(e) {
    this.setState({odrNo: e.target.value})
  }

  // 사용자명 입력 텍스트필드 이벤트
  SearchItemByUserNameInputEvent(e) {
    this.setState({userNm: e.target.value})
  }

  // 사용자 아이디 입력 텍스트필드 이벤트
  SearchItemByEmailInputEvent(e) {
    this.setState({email: e.target.value})
  }

  // 전체 컬럼 항목 선택 이벤트 - 결제번호 / 구매번호
  SearchEmailAllItemChangeEvent(e) {
    this.setState({searchAllItemValue: e.value})
    this.setState({paymentNo: '',
                   odrNo: ''})
  }
  
  // 전체 컬럼 항목에 따르는 입력 텍스트필드 반환 - 결제번호 / 구매번호
  allEmailItemCheckFieldRendering() {
    const { searchAllItemValue } = this.state;
    if (searchAllItemValue === 'odrNo') {
      return <InputText value={this.state.odrNo} onChange={(e) => this.SearchItemByPurchaseInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)}/>
    } else if (searchAllItemValue === 'paymentNo') {
      return <InputText value={this.state.paymentNo} onChange={(e) => this.SearchItemByPaymentInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
    } else {
      return null;
    }
  }

  // (관리) 전체 컬럼 항목 선택 이벤트 - 결제번호 / 구매번호 / 사용자 선택
  SearchAllItemChangeEvent(e) {
    this.setState({searchPaymentItemValue: e.value})
    this.setState({paymentNo: '',
                   odrNo: '',
                   userNm: '',
                   email: ''})
  }

  // 변동 유형 컬럼 항목 선택 이벤트 - 전체/결제/결제취소/구매/구매취소/이벤트지급/이벤트지급취소 선택
  SearchItemChangeEvent(e) {
    this.setState({searchItemValue: e.value})
    this.setState({changeType: e.value})
    this.setState({paymentNo: '',
                   odrNo: '',
                   userNm: '',
                   email: ''})
  }

  // (관리) 결제번호 컬럼 항목 선택 이벤트 - 결제번호 / 사용자 선택
  SearchPaymentItemChangeEvent(e) {
    this.setState({searchPaymentItemValue: e.value})
    this.setState({paymentNo: '',
                   userNm: '',
                   email: ''})
  }

  // (관리) 구매번호 컬럼 항목 선택 이벤트 - 구매번호 / 사용자 선택
  SearchPurchaseItemChangeEvent(e) {
    this.setState({searchPurchaseItemValue: e.value})
    this.setState({odrNo: '',
                   userNm: '',
                   email: ''})
  }

  // (관리) 전체 컬럼 항목 선택 이벤트 - 결제번호 / 구매번호 / 사용자 선택
  SearchAllItemChangeEvent(e) {
    this.setState({searchAllItemValue: e.value})
    this.setState({paymentNo: '',
                   odrNo: '',
                   userNm: '',
                   email: ''})
  }
  
  // (관리) 전체 컬럼 항목에 따르는 입력 텍스트필드 반환 - 결제번호 / 구매번호 / 사용자 선택
  allItemCheckFieldRendering() {
    const { searchAllItemValue } = this.state;
    if (searchAllItemValue === 'odrNo') {
      return <InputText value={this.state.odrNo} onChange={(e) => this.SearchItemByPurchaseInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
    } else if (searchAllItemValue === 'paymentNo') {
      return <InputText value={this.state.paymentNo} onChange={(e) => this.SearchItemByPaymentInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
    } else if (searchAllItemValue === 'userNm') {
      return <InputText value={this.state.userNm} onChange={(e) => this.SearchItemByUserNameInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
    } else if (searchAllItemValue === 'email') {
      return <InputText value={this.state.email} onChange={(e) => this.SearchItemByEmailInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
    } else {
      return null;
    }
  }

  // (관리) 결제번호 컬럼 항목에 따르는 입력 텍스트필드 반환 - 결제번호 / 사용자 선택
  paymentItemCheckFieldRendering() {
    const { searchPaymentItemValue } = this.state;
    if (searchPaymentItemValue === 'paymentNo') {
      return <InputText value={this.state.paymentNo} onChange={(e) => this.SearchItemByPaymentInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
    } else if (searchPaymentItemValue === 'userNm') {
      return <InputText value={this.state.userNm} onChange={(e) => this.SearchItemByUserNameInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
    } else if (searchPaymentItemValue === 'email') {
      return <InputText value={this.state.email} onChange={(e) => this.SearchItemByEmailInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
    } else {
      return null;
    }
  }

  // (관리) 구매번호 컬럼 항목에 따르는 입력 텍스트필드 반환 - 구매번호 / 사용자 선택
  purchaseItemCheckFieldRendering() {
    const { searchPurchaseItemValue } = this.state;
    if (searchPurchaseItemValue === 'odrNo') {
      return <InputText value={this.state.odrNo} onChange={(e) => this.SearchItemByPurchaseInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
    } else if (searchPurchaseItemValue === 'userNm') {
      return <InputText value={this.state.userNm} onChange={(e) => this.SearchItemByUserNameInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
    } else if (searchPurchaseItemValue === 'email') {
      return <InputText value={this.state.email} onChange={(e) => this.SearchItemByEmailInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
    } else {
      return null;
    }
  }

  // 최초 권한 체크 스크립트 (권한 및 선택 아이템 컬럼값에 따른 결과값 리턴)
  roleCheckFieldRendering(role, searchItemValue) {
    // 전체
    if (searchItemValue === 'ALL') {
      if (role === 'ROLE_ADMIN' || role === 'ROLE_SYSADMIN') {
        const drSearchAllItems = [
          {label: '결제번호', value: 'paymentNo'},
          {label: '구매번호', value: 'odrNo'},
          {label: '사용자', value: 'userNm'},
          {label: '아이디', value: 'email'}
        ]
        return (
          <Fragment>
            <Dropdown className="dropdown-width-100"
                      value={this.state.searchAllItemValue}
                      options={drSearchAllItems} 
                      onChange={e=>this.SearchAllItemChangeEvent(e)} />
            {this.allItemCheckFieldRendering()}
          </Fragment>
        );
      } else {
        const drSearchAllItems = [
          {label: '결제번호', value: 'paymentNo'},
          {label: '구매번호', value: 'odrNo'},
        ]
        return (
          <Fragment>
            <Dropdown className="dropdown-width-100"
                      value={this.state.searchAllItemValue}
                      options={drSearchAllItems} 
                      onChange={e=>this.SearchEmailAllItemChangeEvent(e)} />
            {this.allEmailItemCheckFieldRendering()}
          </Fragment>
        );
      }
    }
    // 결제 관련 컬럼 선택 시
    else if (searchItemValue === 'PAYMENT_ADD' || searchItemValue === 'PAYMENT_SUB') {
      // 권한 체크에 따른 결과값 리턴
      if (role === 'ROLE_ADMIN' || role === 'ROLE_SYSADMIN') {
        const drSearchPaymentItems = [
          {label: '결제번호', value: 'paymentNo'},
          {label: '사용자', value: 'userNm'},
          {label: '아이디', value: 'email'}
        ]
        return (
          <Fragment>
            <Dropdown className="dropdown-width-100"
                      value={this.state.searchPaymentItemValue}
                      options={drSearchPaymentItems} 
                      onChange={e=>this.SearchPaymentItemChangeEvent(e)} />
            {this.paymentItemCheckFieldRendering()}
          </Fragment>
        );
      } else {
        // 권한이 없는 일반 사용자일 경우 결제번호 입력텍스트 컴포넌트만 리턴
        return <InputText value={this.state.paymentNo} onChange={(e) => this.SearchItemByPaymentInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
      }
    } 
    // 구매(주문) 관련 컬럼 선택 시 
    else if (searchItemValue === 'PURCHASE_ADD' || searchItemValue === 'PURCHASE_SUB') {
      // 권한 체크
      if (role === 'ROLE_ADMIN' || role === 'ROLE_SYSADMIN') {
        const drSearchPurchaseItems = [
          {label: '구매번호', value: 'odrNo'},
          {label: '사용자', value: 'userNm'},
          {label: '아이디', value: 'email'}
        ]
        return (
          <Fragment>
            <Dropdown className="dropdown-width-100"
                      value={this.state.searchPurchaseItemValue}
                      options={drSearchPurchaseItems} 
                      onChange={e=>this.SearchPurchaseItemChangeEvent(e)} />
            {this.purchaseItemCheckFieldRendering()}
          </Fragment>
        );
      } else {
        // 권한이 없는 일반 사용자일 경우 구매번호 입력텍스트 컴포넌트만 리턴
        return <InputText value={this.state.odrNo} onChange={(e) => this.SearchItemByPurchaseInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
      }
    } else {
      return null;
    }
  }

  render() {
    const { searchItemValue } = this.state;
    const { role } = this.props;
    return (
      <Fragment>
        <label className="label-center" id="lbChangeType" />
        <Dropdown className="dropdown-width-100"
                  value={searchItemValue}
                  options={changeTypeItems} 
                  onChange={e=>this.SearchItemChangeEvent(e)} />
        <label className="label-center" id="lbDate" />
        <Calendar className="calendar-width-100" readOnlyInput={true} locale={calendarLocale} id="dpStart" showIcon={true} value={this.state.fromDt} onChange={(e) => this.setState({fromDt: moment(e.value).format('YYYY-MM-DD')})}/>
        <label className="label" id="lbPunct" />
        <Calendar className="calendar-width-100" readOnlyInput={true} locale={calendarLocale} id="dpEnd" showIcon={true} value={this.state.toDt} onChange={(e) => this.setState({toDt: moment(e.value).format('YYYY-MM-DD')})}/>

        <label className="label" id="lbSearch"/>
        {/* 권한체크 스크립트 호출 */}
        {this.roleCheckFieldRendering(role, searchItemValue)}

        <vaadin-button id="btnSearch" />
      </Fragment>
    );
  }
}
export default ChangePointHistorySearch ;
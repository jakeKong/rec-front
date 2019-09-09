import React, { Component, Fragment } from 'react';

// component
import '@vaadin/vaadin-button';

import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import { changeTypeItems } from '../../items';
// 날짜 관련 items
import { monthBeforeDate, currentDate, calendarLocale } from '../../../common/items';

// date 라이브러리
let moment = require('moment');
// 포인트 변동내역 조회 컴포넌트
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

    // 함수 바인딩
    this.SearchItemChangeEvent = this.SearchItemChangeEvent.bind(this);
    this.roleCheckFieldRendering = this.roleCheckFieldRendering.bind(this);
    this.searchCallEvent = this.searchCallEvent.bind(this);
    this.SearchItemByPaymentInputEvent = this.SearchItemByPaymentInputEvent.bind(this);
    this.SearchItemByPurchaseInputEvent = this.SearchItemByPurchaseInputEvent.bind(this);
    this.SearchItemByUserNameInputEvent = this.SearchItemByUserNameInputEvent.bind(this);
    this.SearchItemByEmailInputEvent = this.SearchItemByEmailInputEvent.bind(this);
    this.resetState = this.resetState.bind(this);
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
      // 조회 요청 callback
      searchCallEvent();
      // 조회 후 사용된 값 초기화
      resetState();
    })
  }

  // inputtext - 엔터 키 동작이벤트
  keyPressEvent(e) {
    const searchCallEvent = this.searchCallEvent;
    const resetState = this.resetState;
    if (e.charCode === 13) {
      // 조회 요청 callback
      searchCallEvent();
      // 조회 후 사용된 값 초기화
      resetState();
    }
  }

  // 조회값 초기화
  resetState() {
    this.setState({
      odrNo: '',
      paymentNo: '',
      userNm: '',
      email: ''
    })
  }

  // 조회 요청 함수
  searchCallEvent() {
    const { fromDt, toDt, odrNo, paymentNo, changeType, userNm, email } = this.state;
    // 값 전달을 위한 변수 생성
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
    // 조회 요청 (컨테이너로)
    searchCallback(searchValue);
  }

  // 결제번호 입력 텍스트필드 이벤트
  SearchItemByPaymentInputEvent(e) {
    this.setState({paymentNo: e.target.value})
  }
  
  // 주문번호 입력 텍스트필드 이벤트
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

  // 전체 컬럼 항목 선택 이벤트 - 결제번호 / 주문번호
  SearchEmailAllItemChangeEvent(e) {
    this.setState({searchAllItemValue: e.value})
    this.setState({paymentNo: '',
                   odrNo: ''})
  }
  
  // 전체 컬럼 항목에 따르는 입력 텍스트필드 반환 - 결제번호 / 주문번호
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

  // 변동 유형 컬럼 항목 선택 이벤트 - 전체/결제/결제취소/주문/주문취소/이벤트지급/이벤트지급취소 선택
  SearchItemChangeEvent(e) {
    this.setState({searchItemValue: e.value})
    this.setState({changeType: e.value})
    this.setState({paymentNo: '',
                   odrNo: '',
                   userNm: '',
                   email: ''})
  }

  // 최초 권한 체크 스크립트 (권한 및 선택 아이템 컬럼값에 따른 결과값 리턴)
  roleCheckFieldRendering(role, searchItemValue) {
    // 전체
    if (searchItemValue === 'ALL') {
      const drSearchAllItems = [
        {label: '결제번호', value: 'paymentNo'},
        {label: '주문번호', value: 'odrNo'},
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
    // 결제 관련 컬럼 선택 시
    else if (searchItemValue === 'PAYMENT_ADD' || searchItemValue === 'PAYMENT_SUB') {
      return <InputText value={this.state.paymentNo} onChange={(e) => this.SearchItemByPaymentInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
    } 
    // 주문(주문) 관련 컬럼 선택 시 
    else if (searchItemValue === 'PURCHASE_ADD' || searchItemValue === 'PURCHASE_SUB') {
      return <InputText value={this.state.odrNo} onChange={(e) => this.SearchItemByPurchaseInputEvent(e)} onKeyPress={e => this.keyPressEvent(e)} />
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
        {/* 변동타입 드롭다운 */}
        <Dropdown className="dropdown-width-150"
                  value={searchItemValue}
                  options={changeTypeItems} 
                  onChange={e=>this.SearchItemChangeEvent(e)} />
        {/* 날짜 컴포넌트 */}
        <label className="label-center" id="lbDate" />
        <Calendar className="calendar-width-100" yearNavigator={true} yearRange="1900:2030" readOnlyInput={true} locale={calendarLocale} id="dpStart" showIcon={true} value={this.state.fromDt} onChange={(e) => this.setState({fromDt: moment(e.value).format('YYYY-MM-DD')})}/>
        <label className="label" id="lbPunct" />
        <Calendar className="calendar-width-100" yearNavigator={true} yearRange="1900:2030" readOnlyInput={true} locale={calendarLocale} id="dpEnd" showIcon={true} value={this.state.toDt} onChange={(e) => this.setState({toDt: moment(e.value).format('YYYY-MM-DD')})}/>

        <label className="label" id="lbSearch"/>
        {/* 권한체크 스크립트 호출 */}
        {this.roleCheckFieldRendering(role, searchItemValue)}

        <vaadin-button id="btnSearch" />
      </Fragment>
    );
  }
}
export default ChangePointHistorySearch ;
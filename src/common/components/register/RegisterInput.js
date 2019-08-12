import React, { Component, Fragment } from 'react';

import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';

import { calendarLocale } from '../../items';
import '@vaadin/vaadin-button'
let dateFormat = require('dateformat');
class RegisterInput extends Component {
  constructor(props) {
    super(props);
    this.state ={
      dto: {
        email: null,
        name: null,
        password: null,
        tellNo: null,
        address: null,
        addressNo: null,
        birthDt: null,
        createdUser: null,
        assignedRoles: [],
      },
      tEmailName: '',
      tEmailDomain: '',
      tEmailCom: '',
      tPassword: '',
      tRePassword: '',
      tName: '',
      tTellStation: '',
      tTellByNumber: '',
      tTellNumberByNumber: '',
      tbirthDt: null,
      tAddressNo: '',
      tAddress: '',
      tAddressTo: '',

      recommendCode: '',
    }
    this.userAddCallEvent = this.userAddCallEvent.bind(this);

    this.changeTEmailName = this.changeTEmailName.bind(this);
    this.changeTEmailDomain = this.changeTEmailDomain.bind(this);
    this.changeTEmailCom = this.changeTEmailCom.bind(this);

    this.changeTPassword = this.changeTPassword.bind(this);
    this.changeTRePassword = this.changeTRePassword.bind(this);

    this.changeTName = this.changeTName.bind(this);

    this.changeTTellStation = this.changeTTellStation.bind(this);
    this.changeTTellByNumber = this.changeTTellByNumber.bind(this);
    this.changeTTellNumberByNumber = this.changeTTellNumberByNumber.bind(this);

    this.changeTAddressNo = this.changeTAddressNo.bind(this);
    this.changeTAddress = this.changeTAddress.bind(this);
    this.changeTAddressTo = this.changeTAddressTo.bind(this);
  }

  componentDidMount() {
    document.querySelector('#lbEmail').innerHTML = "이메일";
    document.querySelector('#lbEmailCommercial').innerHTML = " @ ";
    document.querySelector('#lbEmailPeriod').innerHTML = " . ";
    
    document.querySelector('#lbPw').innerHTML = '비밀번호';
    document.querySelector('#lbRepw').innerHTML = '비밀번호 확인';

    document.querySelector('#lbNm').innerHTML = "이름";

    document.querySelector('#lbTellNo').innerHTML = "전화번호";
    document.querySelector('#lbTellNoHyphen').innerHTML = " - ";
    document.querySelector('#lbTellNoHyphenTo').innerHTML = " - ";

    document.querySelector('#lbAddress').innerHTML = "주소";
    document.querySelector('#lbBirthDt').innerHTML = "생년월일";

    document.querySelector('#lbRecommendCode').innerHTML = "추천인 코드";

    const { userinfo } = this.props;

    const changeTEmailName = this.changeTEmailName;
    const changeTEmailDomain = this.changeTEmailDomain;
    const changeTEmailCom = this.changeTEmailCom;
    const changeTName = this.changeTName;
    if (userinfo !== null && userinfo !== '' && userinfo !== undefined) {
      console.log(userinfo);
      let emailName = userinfo.email.substring(0, userinfo.email.indexOf('@'));
      let emailDomain = userinfo.email.substring(userinfo.email.indexOf('@')+1, userinfo.email.indexOf('.'));
      let emailCom = userinfo.email.substring(userinfo.email.indexOf('.')+1, userinfo.email.length);
      changeTEmailName(emailName);
      changeTEmailDomain(emailDomain);
      changeTEmailCom(emailCom);
      // email 추출
      changeTName(userinfo.name)
    }

    const itdetailAddress = document.querySelector('#itdetailAddress');
    const btnAddressSearch = document.querySelector('#btnAddressSearch');
    const changeTAddressNo = this.changeTAddressNo;
    const changeTAddress = this.changeTAddress;
    btnAddressSearch.textContent = '주소검색';
    btnAddressSearch.addEventListener('click', function() {
      // 도로명주소 오픈 API 호출
      window.daum.postcode.load(function() {
        new window.daum.Postcode({
          oncomplete: function(data) {
            // 우편번호
            changeTAddressNo(data.zonecode);
            // 주소
            changeTAddress(data.address);
            // 상세주소 입력필드 활성화
            itdetailAddress.readOnly = false;
            itdetailAddress.placeholder = '상세주소를 입력해주세요.';
          }
        }).open();
      })
    });

    const userAddCallEvent = this.userAddCallEvent;
    const btnOk = document.querySelector('#btnOk');
    btnOk.innerHTML = "확인";
    btnOk.addEventListener('click', function() {
      userAddCallEvent();
    });

    const btnCancle = document.querySelector('#btnCancle');
    btnCancle.innerHTML = "취소";
    btnCancle.addEventListener('click', function() {
      window.location.href = '/register';
    });
  }

  userAddCallEvent() {
    const { addCallback, addRecommendToAddCallback } = this.props;

    const { dto } = this.state;
    const { tEmailName, tEmailDomain, tEmailCom, 
            tPassword, tRePassword, 
            tName, 
            tTellStation, tTellByNumber, tTellNumberByNumber, 
            tbirthDt,
            tAddressNo, tAddress, tAddressTo,
            recommendCode } = this.state;

    if (tEmailName !== '' && tEmailDomain !== '' && tEmailCom !== '') {
      if (tEmailName.length < 3) {
        window.alert('아이디가 너무 짧습니다.')
        return;
      }
      if (tEmailDomain.length < 3 || tEmailCom.length < 2) {
        window.alert('이메일 주소를 다시 확인해주세요.')
        return;
      }
      dto.email = tEmailName+'@'+tEmailDomain+'.'+tEmailCom;
    } else {
      window.alert('이메일을 입력해주세요.')
      return;
    }

    if (tPassword !== '' && tRePassword !== '') {
      if (tPassword === tRePassword) {
        if (tPassword.length < 5) {
          window.alert('비밀번호가 너무 짧습니다.\n5자 이상 입력해주세요.')
          return;
        }
        if (tRePassword.length < 5) {
          window.alert('비밀번호가 너무 짧습니다.\n5자 이상 입력해주세요.')
          return;
        }
        dto.password = tPassword;
      } else {
        window.alert('비밀번호가 일치하지 않습니다.\n확인 후 다시 시도해주세요.')
        return;
      }
    } else {
      window.alert('비밀번호를 입력해주세요.')
      return;
    }

    if (tName !== '') {
      if (tName.length < 2) {
        window.alert('2자 이상 입력해주세요.')
        return;
      } else {
        dto.name = tName;
      }
    } else {
      window.alert('이름을 입력해주세요.')
      return;
    }

    if (tbirthDt !== '' && tbirthDt !== undefined && tbirthDt !== null) {
      dto.birthDt = tbirthDt;
    } else {
      window.alert('생년월일을 입력해주세요.')
      return;
    }

    if (tTellStation !== '' && tTellByNumber !== '' && tTellNumberByNumber !== '') {
      dto.tellNo = tTellStation+'-'+tTellByNumber+'-'+tTellNumberByNumber;
    } else {
      window.alert('전화번호를 입력해주세요.')
      return;
    }

    if (tAddressNo !== null && tAddressNo !== '' && tAddress !== null && tAddress !== '') {
      if (tAddressTo !== null && tAddress !== '') {
        dto.addressNo = tAddressNo;
        dto.address = tAddress + ' ' + tAddressTo;
      } else {
        dto.addressNo = tAddressNo;
        dto.address = tAddress;
      }
    }

    dto.assignedRoles.push('ROLE_USER');
    dto.createdUser = '관리자';
    if (recommendCode !== null && recommendCode !== '' && recommendCode !== undefined) {
      addRecommendToAddCallback(dto, recommendCode);
    } else {
      addCallback(dto);
    }
  }

  changeTEmailName(e) { 
    if (e.target === undefined || e.target === null) {
      this.setState({tEmailName: e})
      document.querySelector('#itEname').readOnly = true;
    } else {
      this.setState({tEmailName: e.target.value})
    }
  }
  changeTEmailDomain(e) { 
    if (e.target === undefined || e.target === null) {
      this.setState({tEmailDomain: e})
      document.querySelector('#itEdomain').readOnly = true;
    } else {
      this.setState({tEmailDomain: e.target.value}) 
    }
  }
  changeTEmailCom(e) { 
    if (e.target === undefined || e.target === null) {
      this.setState({tEmailCom: e})
      document.querySelector('#itEcom').readOnly = true;
    } else {
      this.setState({tEmailCom: e.target.value}) 
    }
  }

  changeTPassword(e) { this.setState({tPassword: e.target.value}) }
  changeTRePassword(e) { this.setState({tRePassword: e.target.value}) }

  changeTName(e) { 
    if (e.target === undefined || e.target === null) {
      this.setState({tName: e})
      document.querySelector('#itNm').readOnly = true;
    } else {
      this.setState({tName: e.target.value}) 
    }
  }

  changeTTellStation(e) { this.setState({tTellStation: e.target.value}) }
  changeTTellByNumber(e) { this.setState({tTellByNumber: e.target.value}) }
  changeTTellNumberByNumber(e) { this.setState({tTellNumberByNumber: e.target.value}) }

  changeTAddressNo(res) { this.setState({tAddressNo: res}) }
  changeTAddress(res) { this.setState({tAddress: res}) }
  changeTAddressTo(e) { this.setState({tAddressTo: e.target.value}) }

  changeTRecommendCode(e) { this.setState({recommendCode: e.target.value}) }

  render() {
    console.log(this.state.tbirthDt)
    return (
      <Fragment>
        <div className="div-register-input">
          <div className="email-column">
            <label id="lbEmail" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <InputText id="itEname" maxLength="15" value={this.state.tEmailName} onChange={e=>this.changeTEmailName(e)}/>
              <label id="lbEmailCommercial"/>
              <InputText id="itEdomain" maxLength="10" value={this.state.tEmailDomain} onChange={e=>this.changeTEmailDomain(e)}/>
              <label id="lbEmailPeriod"/>
              <InputText id="itEcom" maxLength="15" value={this.state.tEmailCom} onChange={e=>this.changeTEmailCom(e)}/>
            </div>
          </div>
          <div className="default-column">
            <label id="lbPw" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <Password maxLength="15" value={this.state.tPassword} onChange={e=>this.changeTPassword(e)}/>
            </div>
          </div>
          <div className="default-column">
            <label id="lbRepw" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <Password maxLength="15" value={this.state.tRePassword} onChange={e=>this.changeTRePassword(e)}/>
            </div>
          </div>
          <div className="default-column">
            <label id="lbNm" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <InputText id="itNm" maxLength="8" value={this.state.tName} onChange={e=>this.changeTName(e)}/>
            </div>
          </div>
          <div className="default-column">
            <label id="lbBirthDt" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <Calendar className="calendar-width-100" readOnlyInput={true} locale={calendarLocale} showIcon={true} dateFormat="yy-mm-dd" value={this.state.tbirthDt} onChange={(e) => this.setState({tbirthDt: dateFormat(new Date(e.value), 'yyyy-mm-dd')})}/>
            </div>
          </div>
          <div className="default-column">
            <label id="lbTellNo" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <InputText keyfilter="pint" maxLength="3" value={this.state.tTellStation} onChange={e=>this.changeTTellStation(e)}/>
              <label id="lbTellNoHyphen"/>
              <InputText keyfilter="pint" maxLength="4" value={this.state.tTellByNumber} onChange={e=>this.changeTTellByNumber(e)}/>
              <label id="lbTellNoHyphenTo"/>
              <InputText keyfilter="pint" maxLength="4" value={this.state.tTellNumberByNumber} onChange={e=>this.changeTTellNumberByNumber(e)}/>
            </div>
          </div>
          <div className="address-column">
            <label id="lbAddress" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <div>
                <InputText value={this.state.tAddressNo} onChange={e=>this.changeTAddressNo(e)} readOnly/>
                <button id="btnAddressSearch"/>
              </div>
              <InputText value={this.state.tAddress} onChange={e=>this.changeTAddress(e)} readOnly/>
              <InputText id="itdetailAddress" value={this.state.tAddressTo} onChange={e=>this.changeTAddressTo(e)} readOnly/>
            </div>
          </div>
          <div className="default-column">
            <label id="lbRecommendCode" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <InputText maxLength="10" value={this.state.recommendCode} onChange={e=>this.changeTRecommendCode(e)}/>
            </div>
          </div>
        </div>
        <div className="div-register-popup-bottom">
          <vaadin-button id="btnOk"/>
          <vaadin-button id="btnCancle"/>
        </div>
      </Fragment>
    );
  }
}
export default RegisterInput;
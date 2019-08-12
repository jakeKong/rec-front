import React, { Component } from 'react';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

import storage from '../../../common/storage';
import { calendarLocale } from '../../../common/items';

let dateFormat = require('dateformat');
class UserUpdate extends Component {

  constructor(props) {
    super(props);
    this.state ={
      dto: {
        email: null,
        name: null,
        tellNo: null,
        address: null,
        addressNo: null,
        birthDt: null,
        assignedRoles: [],
      },
      // tEmailName: '',
      // tEmailDomain: '',
      // tEmailCom: '',
      tName: '',
      tTellStation: '',
      tTellByNumber: '',
      tTellNumberByNumber: '',
      tbirthDt: null,
      tAddressNo: '',
      tAddress: '',
      tAddressTo: '',
    }
    // this.changeTEmailName = this.changeTEmailName.bind(this);
    // this.changeTEmailDomain = this.changeTEmailDomain.bind(this);
    // this.changeTEmailCom = this.changeTEmailCom.bind(this);

    this.changeTName = this.changeTName.bind(this);

    this.changeTBirthDt = this.changeTBirthDt.bind(this);

    this.changeTTellStation = this.changeTTellStation.bind(this);
    this.changeTTellByNumber = this.changeTTellByNumber.bind(this);
    this.changeTTellNumberByNumber = this.changeTTellNumberByNumber.bind(this);

    this.changeTAddressNo = this.changeTAddressNo.bind(this);
    this.changeTAddress = this.changeTAddress.bind(this);
    this.changeTAddressTo = this.changeTAddressTo.bind(this);
  }

  componentDidMount() {
    document.querySelector('#lbUpdateUserEmail').innerHTML = "이메일";
    // document.querySelector('#lbUpdateUserEmailCommercial').innerHTML = " @ ";
    // document.querySelector('#lbUpdateUserEmailPeriod').innerHTML = " . ";
    
    document.querySelector('#lbUpdateUserNm').innerHTML = "이름";

    document.querySelector('#lbUpdateUserTellNo').innerHTML = "전화번호";
    document.querySelector('#lbUpdateUserTellNoHyphen').innerHTML = " - ";
    document.querySelector('#lbUpdateUserTellNoHyphenTo').innerHTML = " - ";

    document.querySelector('#lbUpdateUserAddress').innerHTML = "주소";
    document.querySelector('#lbUpdateUserBirthDt').innerHTML = "생년월일";

    const loggedInfo = storage.get('loggedInfo');

    // const changeTEmailName = this.changeTEmailName;
    // const changeTEmailDomain = this.changeTEmailDomain;
    // const changeTEmailCom = this.changeTEmailCom;

    const changeTName = this.changeTName;

    const changeTBirthDt = this.changeTBirthDt;

    const changeTTellStation = this.changeTTellStation;
    const changeTTellByNumber = this.changeTTellByNumber;
    const changeTTellNumberByNumber = this.changeTTellNumberByNumber;

    const changeTAddressNo = this.changeTAddressNo;
    const changeTAddress = this.changeTAddress;

    if (loggedInfo.email !== null && loggedInfo.email !== undefined && loggedInfo.email !== '') {
      document.querySelector('#lbFullEmail').innerHTML = loggedInfo.email;
      // let emailName = loggedInfo.email.substring(0, loggedInfo.email.indexOf('@'));
      // let emailDomain = loggedInfo.email.substring(loggedInfo.email.indexOf('@')+1, loggedInfo.email.indexOf('.'));
      // let emailCom = loggedInfo.email.substring(loggedInfo.email.indexOf('.')+1, loggedInfo.email.length);
      // changeTEmailName(emailName);
      // changeTEmailDomain(emailDomain);
      // changeTEmailCom(emailCom);
    }

    if (loggedInfo.name !== null && loggedInfo.name !== undefined && loggedInfo.name !== '') {
      changeTName(loggedInfo.name);
    }

    if (loggedInfo.birthDt !== null && loggedInfo.birthDt !== undefined && loggedInfo.birthDt !== '') {
      changeTBirthDt(loggedInfo.birthDt);
    }

    if (loggedInfo.tellNo !== null && loggedInfo.tellNo !== undefined && loggedInfo.tellNo !== '') {
      let tellStation = loggedInfo.tellNo.substr(0, loggedInfo.tellNo.indexOf("-"));
      let tellByNumber = loggedInfo.tellNo.substr(loggedInfo.tellNo.indexOf("-")+1, loggedInfo.tellNo.lastIndexOf("-")-loggedInfo.tellNo.indexOf("-")-1);
      let tellNumberByNumber = loggedInfo.tellNo.substr(loggedInfo.tellNo.lastIndexOf("-")+1, loggedInfo.tellNo.lastIndexOf("-"));
      changeTTellStation(tellStation);
      changeTTellByNumber(tellByNumber);
      changeTTellNumberByNumber(tellNumberByNumber);
    }

    if (loggedInfo.addressNo !== null && loggedInfo.addressNo !== undefined && loggedInfo.addressNo !== '') {
      changeTAddressNo(loggedInfo.addressNo);
    }

    if (loggedInfo.address !== null && loggedInfo.address !== undefined && loggedInfo.address !== '') {
      changeTAddress(loggedInfo.address);
    }

    const itdetailAddress = document.querySelector('#itdetailAddress');
    const btnAddressSearch = document.querySelector('#btnAddressSearch');
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
            itdetailAddress.hidden = false;
            itdetailAddress.placeholder = '상세주소를 입력해주세요.';
          }
        }).open();
      })
    });
  }

  // changeTEmailName(e) { 
  //   if (e.target === undefined || e.target === null) {
  //     this.setState({tEmailName: e})
  //     document.querySelector('#itEname').readOnly = true;
  //   } else {
  //     this.setState({tEmailName: e.target.value})
  //   }
  // }
  // changeTEmailDomain(e) { 
  //   if (e.target === undefined || e.target === null) {
  //     this.setState({tEmailDomain: e})
  //     document.querySelector('#itEdomain').readOnly = true;
  //   } else {
  //     this.setState({tEmailDomain: e.target.value}) 
  //   }
  // }
  // changeTEmailCom(e) { 
  //   if (e.target === undefined || e.target === null) {
  //     this.setState({tEmailCom: e})
  //     document.querySelector('#itEcom').readOnly = true;
  //   } else {
  //     this.setState({tEmailCom: e.target.value}) 
  //   }
  // }

  changeTName(e) { 
    if (e.target === undefined || e.target === null) {
      this.setState({tName: e})
    } else {
      this.setState({tName: e.target.value}) 
    }
  }

  changeTTellStation(e) { 
    if (e.target === undefined || e.target === null) {
      this.setState({tTellStation: e})
    } else {
      this.setState({tTellStation: e.target.value}) 
    }
  }
  changeTTellByNumber(e) { 
    if (e.target === undefined || e.target === null) {
      this.setState({tTellByNumber: e})
    } else {
      this.setState({tTellByNumber: e.target.value}) 
    }
  }
  changeTTellNumberByNumber(e) { 
    if (e.target === undefined || e.target === null) {
      this.setState({tTellNumberByNumber: e})
    } else {
      this.setState({tTellNumberByNumber: e.target.value})
    } 
  }

  changeTBirthDt(e) {
    if (e.value !== '' && e.value !== null && e.value !== undefined) {
      this.setState({tbirthDt: dateFormat(new Date(e.value), 'yyyy-mm-dd')})
    } else {
      this.setState({tbirthDt: dateFormat(new Date(e), 'yyyy-mm-dd')})
    }
  }

  changeTAddressNo(res) { this.setState({tAddressNo: res}) }
  changeTAddress(res) { this.setState({tAddress: res}) }
  changeTAddressTo(e) { 
    if (e.target === undefined || e.target === null) {
      this.setState({tAddressTo: e})
    } else {
      this.setState({tAddressTo: e.target.value}) 
    }
  }

  updateCall() {
    const { userUpdateAttemptCallback, popupClose } = this.props;
    const { dto } = this.state;
    const { /* tEmailName, tEmailDomain, tEmailCom, */
            tName, 
            tTellStation, tTellByNumber, tTellNumberByNumber, 
            tbirthDt,
            tAddressNo, tAddress, tAddressTo } = this.state;
    // dto.email = tEmailName+'@'+tEmailDomain+'.'+tEmailCom;
    dto.email = storage.get('loggedInfo').email;
    dto.tellNo = tTellStation+'-'+tTellByNumber+'-'+tTellNumberByNumber;
    dto.name = tName;
    dto.birthDt = tbirthDt;
    dto.addressNo = tAddressNo;
    if (tAddressTo !== '' && tAddressTo !== undefined && tAddressTo !== null) {
      dto.address = tAddress + ' ' + tAddressTo;
    } else {
      dto.address = tAddress;
    }
    dto.assignedRoles = storage.get('loggedInfo').assignedRoles;
    userUpdateAttemptCallback(dto);
    popupClose();
  }

  cancle() {
    const { popupClose } = this.props;
    popupClose();
  }

  render() {

    const popupFooter = (
      <div>
        <button onClick={() => this.updateCall()}>확인</button>
        <button onClick={() => this.cancle()}>취소</button>
      </div>
    );

    const { visiblility, popupClose } = this.props;
    return (
      <Dialog header="회원정보 수정" footer={popupFooter} style={{width: '500px'}} modal={true} visible={ visiblility } onHide={() => popupClose()}>
        <div className="div-register-input">
          <div className="email-column">
            <label id="lbUpdateUserEmail" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <label id="lbFullEmail"/>
              {/* <InputText id="itEname" maxLength="15" value={this.state.tEmailName} onChange={e=>this.changeTEmailName(e)}/>
              <label id="lbUpdateUserEmailCommercial"/>
              <InputText id="itEdomain" maxLength="10" value={this.state.tEmailDomain} onChange={e=>this.changeTEmailDomain(e)}/>
              <label id="lbUpdateUserEmailPeriod"/>
              <InputText id="itEcom" maxLength="15" value={this.state.tEmailCom} onChange={e=>this.changeTEmailCom(e)}/> */}
            </div>
          </div>
          <div className="default-column">
            <label id="lbUpdateUserNm" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <InputText id="itNm" maxLength="8" value={this.state.tName} onChange={e=>this.changeTName(e)}/>
            </div>
          </div>
          <div className="default-column">
            <label id="lbUpdateUserBirthDt" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <Calendar className="calendar-width-100" readOnlyInput={true} locale={calendarLocale} showIcon={true} dateFormat="yy-mm-dd" value={this.state.tbirthDt} onChange={(e) => this.changeTBirthDt(e)}/>
            </div>
          </div>
          <div className="default-column">
            <label id="lbUpdateUserTellNo" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <InputText keyfilter="pint" maxLength="3" value={this.state.tTellStation} onChange={e=>this.changeTTellStation(e)}/>
              <label id="lbUpdateUserTellNoHyphen"/>
              <InputText keyfilter="pint" maxLength="4" value={this.state.tTellByNumber} onChange={e=>this.changeTTellByNumber(e)}/>
              <label id="lbUpdateUserTellNoHyphenTo"/>
              <InputText keyfilter="pint" maxLength="4" value={this.state.tTellNumberByNumber} onChange={e=>this.changeTTellNumberByNumber(e)}/>
            </div>
          </div>
          <div className="address-column">
            <label id="lbUpdateUserAddress" className="label-flex-20-left"/>
            <div className="div-flex-80-left">
              <div>
                <InputText value={this.state.tAddressNo} onChange={e=>this.changeTAddressNo(e)} readOnly/>
                <button id="btnAddressSearch"/>
              </div>
              <InputText value={this.state.tAddress} onChange={e=>this.changeTAddress(e)} readOnly/>
              <InputText id="itdetailAddress" value={this.state.tAddressTo} onChange={e=>this.changeTAddressTo(e)} hidden/>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
export default UserUpdate ;


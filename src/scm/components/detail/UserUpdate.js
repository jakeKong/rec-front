import React, { Component } from 'react';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

import storage from '../../../common/storage';
import { calendarLocale } from '../../../common/items';

import axios from 'axios';
import config from '../../../config';
import { CountDownTimer } from '../../../common/items';

import { checkUserByTellNo } from '../../../scm/api/userAxios';

let moment = require('moment');
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
      authNumber: '',
      responseAuthNumber: null,
      authStatus: false
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

    this.changeAuthNumber = this.changeAuthNumber.bind(this);

    this.authAttempt = this.authAttempt.bind(this);
    this.authCheck = this.authCheck.bind(this);
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
      this.setState({tbirthDt: moment(e.value).format('YYYY-MM-DD')})
    } else {
      this.setState({tbirthDt: moment(e).format('YYYY-MM-DD')})
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
    const { dto, authStatus } = this.state;
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
    if (dto.tellNo !== storage.get('loggedInfo').tellNo) {
      if (authStatus === true) {
        userUpdateAttemptCallback(dto);
        popupClose();
      } else {
        window.alert('인증이 완료되지 않았습니다.\n인증을 완료해주세요.')
      }
    } else {
      userUpdateAttemptCallback(dto);
      popupClose();
    }
  }

  cancle() {
    const { popupClose } = this.props;
    popupClose();
  }

  phoneAuthCheckingEvent() {
    const { tTellStation, tTellByNumber, tTellNumberByNumber } = this.state;
    let tellNo = tTellStation+'-'+tTellByNumber+'-'+tTellNumberByNumber;
    if (storage.get('loggedInfo').tellNo !== tellNo) {
      return (
        <div className="div-user-detail-auth">
          <button id="btnMessageCall"className="button-user-detail-auth-attempt" onClick={() => this.authAttempt()}>인증번호 전송</button>
          <InputText className="itAuthUserDetails" keyfilter="pint" maxLength="4" value={this.state.authNumber} onChange={e=>this.changeAuthNumber(e)} style={{width: '70px'}}/>
          <button className="button-user-detail-auth-check" onClick={() => this.authCheck()}>인증확인</button>
          <label id="lbTimer" />
        </div>
      )
    } else {
      return null;
    }
  }

  authAttempt() {
    const { tTellStation, tTellByNumber, tTellNumberByNumber } = this.state;
    let phoneNumber;
    if (tTellStation !== '' && tTellByNumber !== '' && tTellNumberByNumber !== '') {
      this.setState({tellNo: tTellStation+'-'+tTellByNumber+'-'+tTellNumberByNumber})
      phoneNumber = tTellStation+tTellByNumber+tTellNumberByNumber
    } else {
      window.alert('전화번호를 입력해주세요.')
      return;
    }

    document.querySelector('#lbTimer').hidden = false;
    document.querySelector('#btnMessageCall').innerHTML = '재전송';

    const token = storage.get('token');

    checkUserByTellNo(tTellStation+'-'+tTellByNumber+'-'+tTellNumberByNumber, token).then(res => {
      if (res.data !== '' && res.data === true) {
        window.confirm('해당 번호로 가입된 회원정보가 존재합니다.');
        return;
      } else {
        axios({
          method: 'GET',
          // url: `${config.solapiService}/solapi/simple/send/${this.state.tellNo}`,
          url: `${config.solapiService}/solapi/simple/send/${phoneNumber}`,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          }
        }).then(res => {
          console.log(res);
          if (res.data !== '') {
            if (res.data.errorCode !== '' && res.data.errorCode !== undefined && res.data.errorCode !== null) {
              console.log(res.data.errorCode)
              window.alert(res.data.errorMessage);
            } else if (res.data === '연결실패'){
              window.alert(res.data);
            } else {
              // 문자 발송 성공 인증번호 4자리 코드 발급
              this.setState({responseAuthNumber: JSON.stringify(res.data)})
              // 인증번호 발급 후 30초 이후 폐기
              setTimeout(() => this.setState({responseAuthNumber: null}), 30000)
              CountDownTimer('#lbTimer', '#btnMessageCall');
            }
          }
        }).catch(err => {
          window.alert('인증번호 요청에 실패하였습니다.')
          console.log(err);
        })
      }
    }).catch(err => {
      console.log(err);
      window.confirm('요청 실패');
    })
  }

  authCheck() {
    const {responseAuthNumber, authNumber} = this.state;
    if (responseAuthNumber !== null && responseAuthNumber !== undefined && responseAuthNumber !== '') {
      if (authNumber !== null && authNumber !== undefined && authNumber !== '') {
        if(responseAuthNumber === authNumber) {
          // 인증번호 일치 ==> 인증 완료
          window.alert('인증 완료');
          this.setState({authStatus: true});
          document.querySelector('#lbTimer').hidden = true;
        } else {
          window.alert('인증번호가 일치하지 않습니다.')
          return;
        }
      } else {
        window.alert('인증번호를 입력해주세요.')
        return;
      }
    } else {
      window.alert('요청된 인증번호가 존재하지 않습니다.\n인증번호 전송 버튼을 눌러주세요.')
      return;
    }
  }

  changeAuthNumber(e) {
    this.setState({authNumber: e.target.value}) 
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
              <Calendar className="calendar-width-100" yearNavigator={true} yearRange="1900:2030" readOnlyInput={true} locale={calendarLocale} showIcon={true} value={this.state.tbirthDt} onChange={(e) => this.changeTBirthDt(e)}/>
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
          {this.phoneAuthCheckingEvent()}
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


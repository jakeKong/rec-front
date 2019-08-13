import React, { Component, Fragment } from 'react';

import { InputText } from 'primereact/inputtext';

import axios from 'axios';
import config from '../../../config';
import { CountDownTimer } from '../../items';

class PwFindByAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tellNo: null,
      tellName: '',
      tellStation: '',
      tellByNumber: '',
      tellNumberByNumber: '',
      authNumber: '',

      responseAuthNumber: null,

      authStatus: false
    }
    this.AuthCompleteNext = this.AuthCompleteNext.bind(this);
    this.inputName = this.inputName.bind(this);
    this.inputTellStation = this.inputTellStation.bind(this);
    this.inputTellByNumber = this.inputTellByNumber.bind(this);
    this.inputTellNumberByNumber = this.inputTellNumberByNumber.bind(this);
    this.inputAuthNumber = this.inputAuthNumber.bind(this);
    this.solapiCall = this.solapiCall.bind(this);
    this.numberAuthCheck = this.numberAuthCheck.bind(this);
  }

  componentDidMount() {
    const AuthCompleteNext = this.AuthCompleteNext;
    const btnAuthCheck = document.querySelector('#btnAuthCheck');
    btnAuthCheck.innerHTML = '다음';
    btnAuthCheck.addEventListener('click', function() {
      AuthCompleteNext();
    })

    const solapiCall = this.solapiCall;
    const btnMessageCall = document.querySelector('#btnMessageCall');
    btnMessageCall.innerHTML = '인증번호 전송'
    btnMessageCall.addEventListener('click', function() {
      solapiCall();
    })

    const numberAuthCheck = this.numberAuthCheck;
    const btnNumberAuthCheck = document.querySelector('#btnNumberAuthCheck');
    btnNumberAuthCheck.innerHTML = '인증확인'
    btnNumberAuthCheck.addEventListener('click', function() {
      numberAuthCheck();
    });
  }

  numberAuthCheck() {
    const {responseAuthNumber, authNumber} = this.state;
    if (responseAuthNumber !== null && responseAuthNumber !== undefined && responseAuthNumber !== '') {
      if (authNumber !== null && authNumber !== undefined && authNumber !== '') {
        if(responseAuthNumber === authNumber) {
          // 인증번호 일치 ==> 인증 완료
          window.alert('인증 완료');
          this.setState({authStatus: true});
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

  AuthCompleteNext() {
    const { focusPwAuthStatusToChangeEvent } = this.props;
    const { authStatus, tellNo, tellName } = this.state;
    if (authStatus === true) {
      focusPwAuthStatusToChangeEvent(tellName, tellNo)
    } else {
      window.alert('인증을 완료해주세요.')
    }
  }

  solapiCall() {
    const { tellName, tellStation, tellByNumber, tellNumberByNumber } = this.state;
    let phoneNumber;
    if (tellName === null || tellName === '') {
      window.alert('이름을 입력해주세요.')
      return;
    }

    if (tellStation !== '' && tellByNumber !== '' && tellNumberByNumber !== '') {
      this.setState({tellNo: tellStation+'-'+tellByNumber+'-'+tellNumberByNumber})
      phoneNumber = tellStation+tellByNumber+tellNumberByNumber
    } else {
      window.alert('전화번호를 입력해주세요.')
      return;
    }

    document.querySelector('#btnMessageCall').innerHTML = '재전송';

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

  inputName(e) {
    this.setState({tellName: e.target.value})
  }

  inputTellStation(e) {
    this.setState({tellStation: e.target.value})
  }
  inputTellByNumber(e) {
    this.setState({tellByNumber: e.target.value})
  }
  inputTellNumberByNumber(e) {
    this.setState({tellNumberByNumber: e.target.value})
  }

  inputAuthNumber(e) {
    this.setState({authNumber: e.target.value})
  }

  render() {

    return (
      <Fragment>
        <div>
          <p>본인확인</p>
          <div>
            <p>이름</p>
            <InputText maxLength='7' value={this.state.tellName} onChange={e=>this.inputName(e)}/>
          </div>
          <div>
            <p>전화번호</p>
            <InputText maxLength='3' keyfilter="pint" value={this.state.tellStation} onChange={e=>this.inputTellStation(e)}/>
            <label>-</label>
            <InputText maxLength='4' keyfilter="pint" value={this.state.tellByNumber} onChange={e=>this.inputTellByNumber(e)}/>
            <label>-</label>
            <InputText maxLength='4' keyfilter="pint" value={this.state.tellNumberByNumber} onChange={e=>this.inputTellNumberByNumber(e)}/>
            <button id="btnMessageCall"/>
          </div>
          <div>
            <p>인증번호</p>
            <InputText maxLength='4' keyfilter="pint" value={this.state.authNumber} onChange={e=>this.inputAuthNumber(e)}/>
            <button id="btnNumberAuthCheck"/>
            <label id="lbTimer" />
          </div>
          <div>
            <button id="btnAuthCheck" />
          </div>
        </div>
      </Fragment>
    );
  }
}
export default PwFindByAuth;
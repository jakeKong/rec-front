import React, { Component, Fragment } from 'react';

import { InputText } from 'primereact/inputtext';

import '@vaadin/vaadin-button'

import storage from '../../../common/storage';
// import { calendarLocale } from '../../../common/items';

import axios from 'axios';
import config from '../../../config';
import { CountDownTimer } from '../../../common/items';

import { checkUserByTellNo } from '../../../scm/api/userAxios';

class RegisterNaver extends Component {
  constructor(props) {
    super(props);
    this.state ={
      tTellStation: '',
      tTellByNumber: '',
      tTellNumberByNumber: '',
      recommendCode: '',
      authNumber: '',
      responseAuthNumber: null,
      authStatus: false
    }
    this.userRecommentAddCallEvent = this.userRecommentAddCallEvent.bind(this);

    this.changeTTellStation = this.changeTTellStation.bind(this);
    this.changeTTellByNumber = this.changeTTellByNumber.bind(this);
    this.changeTTellNumberByNumber = this.changeTTellNumberByNumber.bind(this);

    this.authAttempt = this.authAttempt.bind(this);
    this.authCheck = this.authCheck.bind(this);
  }

  componentDidMount() {

    document.querySelector('#lbUpdateUserTellNoHyphen').innerHTML = " - ";
    document.querySelector('#lbUpdateUserTellNoHyphenTo').innerHTML = " - ";

    const userRecommentAddCallEvent = this.userRecommentAddCallEvent;
    const btnOk = document.querySelector('#btnOk');
    btnOk.innerHTML = "확인";
    btnOk.addEventListener('click', function() {
      userRecommentAddCallEvent();
    });

    const btnCancle = document.querySelector('#btnCancle');
    btnCancle.innerHTML = "취소";
    btnCancle.addEventListener('click', function() {
      window.location.href = '/register';
    });
  }

  userRecommentAddCallEvent() {
    const { addCallback, addRecommendToAddCallback } = this.props;
    const { recommendCode, tTellStation, tTellByNumber, tTellNumberByNumber } = this.state;

    if (tTellStation === '' || tTellByNumber === '' || tTellNumberByNumber === '') {
      window.alert('전화번호를 입력해 주세요.')
      return;
    }
    if (this.state.authStatus === false) {
      window.alert('휴대폰 인증이 진행되지 않았습니다.\n인증절차 진행 후 다시 시도해주세요.')
      return;
    }

    const { userinfo } = this.props;
    
    let createDto = {
      email: userinfo.email,
      name: userinfo.name,
      password: null,
      tellNo: tTellStation+'-'+tTellByNumber+'-'+tTellNumberByNumber,
      address: null,
      addressNo: null,
      birthDt: null,
      createdUser: '관리자',
      assignedRoles: ['ROLE_USER'],
      division: 'NAVER'
    }
    if (recommendCode !== null && recommendCode !== '' && recommendCode !== undefined) {
      addRecommendToAddCallback(createDto, recommendCode);
    } else {
      addCallback(createDto);
    }
  }

  userAddPassCallEvent() {
    const { addCallback } = this.props;
    const { tTellStation, tTellByNumber, tTellNumberByNumber } = this.state;
    if (tTellStation === '' || tTellByNumber === '' || tTellNumberByNumber === '') {
      window.alert('전화번호를 입력해 주세요.')
      return;
    }
    if (this.state.authStatus === false) {
      window.alert('휴대폰 인증이 진행되지 않았습니다.\n인증절차 진행 후 다시 시도해주세요.')
      return;
    }

    const { userinfo } = this.props;
    let createDto = {
      email: userinfo.email,
      name: userinfo.name,
      password: null,
      tellNo: tTellStation+'-'+tTellByNumber+'-'+tTellNumberByNumber,
      address: null,
      addressNo: null,
      birthDt: null,
      createdUser: '관리자',
      assignedRoles: ['ROLE_USER'],
      division: 'NAVER'
    }
    addCallback(createDto);
  }

  changeTRecommendCode(e) { this.setState({recommendCode: e.target.value}) }

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
    return (
      <Fragment>
        <div className="div-register-input-naver">
          <div>
            <p>전화번호</p>
            <InputText keyfilter="pint" maxLength="3" value={this.state.tTellStation} onChange={e=>this.changeTTellStation(e)}/>
            <label id="lbUpdateUserTellNoHyphen"/>
            <InputText keyfilter="pint" maxLength="4" value={this.state.tTellByNumber} onChange={e=>this.changeTTellByNumber(e)}/>
            <label id="lbUpdateUserTellNoHyphenTo"/>
            <InputText keyfilter="pint" maxLength="4" value={this.state.tTellNumberByNumber} onChange={e=>this.changeTTellNumberByNumber(e)}/>
            <button id="btnMessageCall"className="button-user-detail-auth-attempt" onClick={() => this.authAttempt()}>인증번호 전송</button>
          </div>
          <div>
            <p>인증번호</p>
            <InputText className="itAuthUserDetails" keyfilter="pint" maxLength="4" value={this.state.authNumber} onChange={e=>this.changeAuthNumber(e)} style={{width: '150px'}}/>
            <button className="button-user-detail-auth-check" onClick={() => this.authCheck()}>인증확인</button>
            <label id="lbTimer" />
          </div>
          <div>
            <p>추천인 코드</p>
            <InputText maxLength="10" value={this.state.recommendCode} onChange={e=>this.changeTRecommendCode(e)}/>
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
export default RegisterNaver;
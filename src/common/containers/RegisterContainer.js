import React, { Component } from "react";
import { RegisterAgree, RegisterAuth, RegisterInput, RegisterNaver, RegisterComplete } from "../index";

import storage from '../storage';
import { oauth_web } from '../../OAuth2Config'

import { createUser, checkRecommendCode, updateUserByBalancePointIncrease, getUser, checkUserByTellNo } from '../../scm/api/userAxios';
import { addChangePointHistory } from '../../oms/api/changePoingHistoryAxios';

import { getDefaultPointList } from '../../oms/setupPoint';

class RegisterContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      isRegisterAgree: true,
      isRegisterAuth: false,
      isRegisterInput: false,
      isNaverRegisterInput: false,
      isRegisterComplete: false,
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
        registerPoint: undefined,
        referrerPoint: undefined,
      },
      userinfo: undefined
    }
    this.goCommonRegisterCallback = this.goCommonRegisterCallback.bind(this);
    this.goAuthRegisterCallback = this.goAuthRegisterCallback.bind(this);
    this.addCallback = this.addCallback.bind(this);
    this.addRecommendToAddCallback = this.addRecommendToAddCallback.bind(this);
  }

  // 마운트 직후 한번 (rendering 이전 마운트 이후의 작업)
  componentDidMount() {
    document.querySelector('#lbAgree').innerHTML = '약관동의';
    document.querySelector('#lbAuth').innerHTML = '본인인증';
    document.querySelector('#lbInput').innerHTML = '회원정보 입력';
    document.querySelector('#lbComplete').innerHTML = '가입완료';

    // 현재 설정된 포인트값 가져오기 (주문포인트, 회원가입 시 지급 포인트, 추천인 코드 입력 시 지급 포인트))
    getDefaultPointList().then(res => {
      this.setState({registerPoint: res.data[0].registerPoint})
      this.setState({referrerPoint: res.data[0].referrerPoint})
    }).catch(err => {
      console.log(err)
      throw(err);
    });

    const { unrefined_userinfo } = this.props;
    // 네이버 회원가입으로 요청된 url 일 경우 (/register:userinfo)
    if (unrefined_userinfo !== '' && unrefined_userinfo !== null && unrefined_userinfo !== undefined) {
      // 값이 존재하면 전달받은 props의 값을 정제하여 사용 (이메일, 이름)
      // props값의 ? 값을 공백 문자열로 변환
      let userinfo = unrefined_userinfo.replace('?','');
      // 이름이 시작되는 인덱스 찾기
      let nameIndex = userinfo.indexOf('&name=')

      // 이메일 값
      let email = userinfo.substring(0, nameIndex);
      // 이름 값
      let name = userinfo.substring(nameIndex+6, userinfo.length);

      try {
        // 기본 설정된 (root)guest@test.com으로 default 토큰 접근
        // 기본 guest@test.com으로 설정된 유저정보가 존재하지 않을 경우 내용수정 혹은 유저정보 생성 필요
        oauth_web.owner.getToken('guest@test.com', 'test123').then((result) => {
          this.setState({token: result.accessToken});
          storage.set('token', result.accessToken)
  
          // 가입된 사용자 존재여부 체크
          getUser(email, result.accessToken).then(e => {
            console.log(e)
            if (e.data !== '' && e.data !== null && e.data !== undefined) {
              // 네이버로부터 인증받아 로그인된 이메일로 가입된 사용자 정보가 존재할 경우
              window.alert('가입된 이메일이 존재합니다.')
              window.location.href = '/login';
            } else {
              // 네이버정보로 가입된 회원정보가 존재하지 않을 경우 이메일과 이름값을 저장하고 다음단계로 이동 (네이버전용 추가입력)
              this.setState({userinfo: {
                                        email: email,
                                        name: name
              }})
              this.setState({isRegisterAgree: false, 
                             isNaverRegisterInput: true});
            }
          }).catch(err => {
            console.log(err);
          })
        })
      } catch(error) {
        console.log(error);
        window.confirm('토큰 발급에 실패하였습니다.\n새로고침 혹은 브라우저 재실행 후 다시 시도해주세요.');
      }
    }
  }

  goCommonRegisterCallback() {
    this.setState({isRegisterAgree: false, 
                   isRegisterAuth: true});
  }

  goAuthRegisterCallback(name, phone) {

    try {
      oauth_web.owner.getToken('guest@test.com', 'test123').then((result) => {
        this.setState({token: result.accessToken});
        storage.set('token', result.accessToken)
        checkUserByTellNo(phone, result.accessToken).then(res => {
          if (res.data !== '' && res.data === true) {
            window.alert('가입된 회원이 존재합니다.')
            window.location.href='/login';
          } else {
            console.log(res.data)
            this.setState({userinfo: {
                                      name: name,
                                      tellNo: phone
            }})
            this.setState({isRegisterAuth: false, 
                           isRegisterInput: true});
          }
        }).catch(err => {
          console.log(err);
          window.confirm('요청 실패');
        })
      })
    } catch(error) {
      console.log(error);
      window.confirm('토큰 발급에 실패하였습니다.\n새로고침 혹은 브라우저 재실행 후 다시 시도해주세요.');
    }

    /* IMP 휴대폰 인증 예제 - 미사용
    let IMP = window.IMP;
    IMP.init(config.iamportpayMemberId)
    // IMP.certification(param, callback) 호출
    IMP.certification({ // param
      merchant_uid: "ORD20190131-8346011",
      popup: true
    }, rsp => { // callback
      if (rsp.success) {
        // 인증 성공 시 로직,
        console.log(rsp)
      } else {
        // 인증 실패 시 로직,
        console.log(rsp)
      }
    });
    */

  }

  addCallback = (getDto) => {
    this.setState({dto : getDto});
    try {
      oauth_web.owner.getToken('guest@test.com', 'test123').then((result) => {
        this.setState({token: result.accessToken});
        storage.set('token', result.accessToken)

        getUser(getDto.email, result.accessToken).then(e => {
          console.log(e)
          if (e.data !== '' && e.data !== null && e.data !== undefined) {
            window.alert('가입된 이메일이 존재합니다.')
          } else {
            createUser(getDto, result.accessToken).then(e => {
              if (e.data === '') {
                console.log(e)
                window.confirm('회원가입에 실패하였습니다. 다시 시도해주세요.');
                window.location.href="/register";
              } else {
                this.setState({isRegisterInput: false, 
                               isNaverRegisterInput: false,
                               isRegisterComplete: true});
                // 이벤트성 포인트 지급
                updateUserByBalancePointIncrease(getDto.email, this.state.registerPoint, result.accessToken).then(res => {
                  let changePointDto = {
                    'changeDt': new Date(),
                    'paymentCash': 0,
                    'changeType': 'EVENT_ADD',
                    'changePoint': this.state.registerPoint,
                    'currentBalPoint': this.state.registerPoint,
                    'odrNo': '',
                    'paymentNo': '',
                    'activated': true,
                    'remarks': '회원가입'
                  }
                  addChangePointHistory(getDto.email, changePointDto).then(res => {
                    // 완료
                  }).catch(err => {
                    console.log(err)
                    throw err;
                  })
                }).catch(err => {
                  console.log(err)
                  throw err;
                })
              }
            }).catch(err => {
              console.log(err);
              window.confirm('회원가입에 실패하였습니다. 다시 시도해주세요.');
              window.location.href="/register";
            })
          }
        }).catch(err => {
          console.log(err);
        })
      })
    } catch(error) {
      console.log(error);
      window.confirm('토큰 발급에 실패하였습니다.\n새로고침 혹은 브라우저 재실행 후 다시 시도해주세요.');
    }
  }

  addRecommendToAddCallback = (getDto, recommendCode) => {
    this.setState({dto : getDto});
    // 추천인 코드 사용가능한지 체크
    try {
      oauth_web.owner.getToken('guest@test.com', 'test123').then((result) => {
        this.setState({token: result.accessToken});
        storage.set('token', result.accessToken)
        checkRecommendCode(recommendCode, result.accessToken).then(res => {
          if (res.data !== '') {
            // 추천인 코드 존재 시
            if (res.data === true) {
              getUser(getDto.email, result.accessToken).then(e => {
                console.log(e)
                if (e.data !== '' && e.data !== null && e.data !== undefined) {
                  window.alert('가입된 이메일이 존재합니다.')
                } else {
                  // 회원가입 요청
                  createUser(getDto, result.accessToken).then(e => {
                    if (e.data === '') {
                      window.confirm('회원가입에 실패하였습니다.');
                      window.location.href="/register";
                    } else {
                      this.setState({isRegisterInput: false, 
                                     isNaverRegisterInput: false,
                                     isRegisterComplete: true});
                      // 이벤트성 포인트 지급
                      updateUserByBalancePointIncrease(getDto.email, this.state.referrerPoint, result.accessToken).then(res => {
                        let changePointDto = {
                          'changeDt': new Date(),
                          'paymentCash': 0,
                          'changeType': 'EVENT_ADD',
                          'changePoint': this.state.referrerPoint,
                          'currentBalPoint': this.state.referrerPoint,
                          'odrNo': '',
                          'paymentNo': '',
                          'activated': true,
                          'remarks': '추천인 코드 입력'
                        }
                        addChangePointHistory(getDto.email, changePointDto).then(res => {
                          // 완료
                        }).catch(err => {
                          console.log(err)
                          throw err;
                        })
                      }).catch(err => {
                        console.log(err)
                        throw err;
                      })
                    }
                  }).catch(err => {
                    console.log(err);
                    window.confirm('회원가입에 실패하였습니다.');
                    window.location.href="/register";
                  })
                }
              }).catch(err => {
                console.log(err);
              })
            } else {
              window.alert('추천인 코드가 존재하지 않습니다. 확인 후 다시 시도해주세요.')
            }
          }
        }).catch(err => {
          window.alert('추천인 코드 확인에 실패하였습니다. 다시 시도해주세요')
        })
      })
    } catch(error) {
      console.log(error);
      window.confirm('토큰 발급에 실패하였습니다.\n새로고침 혹은 브라우저 재실행 후 다시 시도해주세요.');
    }
  }

  titleBooleanCheckEvent(agree, auth, input, naverInput, complete) {
    
    if (agree) {
      return (
        <div className="div-register">
          <div className="div-register-title">
            <div className="div-register-title-focus-on">
              <label id="lbAgree" className="label-register-title" />
            </div>
            <div className="div-register-title-focus-off">
              <label id="lbAuth" className="label-register-title" />
            </div>
              <div className="div-register-title-focus-off">
              <label id="lbInput" className="label-register-title" />
            </div>
              <div className="div-register-title-focus-off">
              <label id="lbComplete" className="label-register-title" />
            </div>
          </div>
          <RegisterAgree goCommonRegisterCallback={this.goCommonRegisterCallback} goNaverRegisterCallback={this.goNaverRegisterCallback}/>
        </div>
      );
    } else if (auth) {
      return (
        <div className="div-register">
          <div className="div-register-title">
            <div className="div-register-title-focus-off">
              <label id="lbAgree" className="label-register-title" />
            </div>
            <div className="div-register-title-focus-on">
              <label id="lbAuth" className="label-register-title" />
            </div>
              <div className="div-register-title-focus-off">
              <label id="lbInput" className="label-register-title" />
            </div>
              <div className="div-register-title-focus-off">
              <label id="lbComplete" className="label-register-title" />
            </div>
          </div>
          <RegisterAuth goAuthRegisterCallback={this.goAuthRegisterCallback} />
        </div>
      );
    } else if (input) {
      return  (
        <div className="div-register">
          <div className="div-register-title">
            <div className="div-register-title-focus-off">
              <label id="lbAgree" className="label-register-title" />
            </div>
            <div className="div-register-title-focus-off">
              <label id="lbAuth" className="label-register-title" />
            </div>
              <div className="div-register-title-focus-on">
              <label id="lbInput" className="label-register-title" />
            </div>
              <div className="div-register-title-focus-off">
              <label id="lbComplete" className="label-register-title" />
            </div>
          </div>
          <RegisterInput addCallback={this.addCallback} addRecommendToAddCallback={this.addRecommendToAddCallback} userinfo={this.state.userinfo}/>
        </div>
      );
    } else if (naverInput) {
      return  (
        <div className="div-register">
          <div className="div-register-title">
            <div className="div-register-title-focus-off">
              <label id="lbAgree" className="label-register-title" />
            </div>
            <div className="div-register-title-focus-off">
              <label id="lbAuth" className="label-register-title" />
            </div>
              <div className="div-register-title-focus-on">
              <label id="lbInput" className="label-register-title" />
            </div>
              <div className="div-register-title-focus-off">
              <label id="lbComplete" className="label-register-title" />
            </div>
          </div>
          <RegisterNaver addCallback={this.addCallback} addRecommendToAddCallback={this.addRecommendToAddCallback} userinfo={this.state.userinfo}/>
        </div>
      );
    } else if (complete) {
      return  (
        <div className="div-register">
          <div className="div-register-title">
            <div className="div-register-title-focus-off">
              <label id="lbAgree" className="label-register-title" />
            </div>
            <div className="div-register-title-focus-off">
              <label id="lbAuth" className="label-register-title" />
            </div>
              <div className="div-register-title-focus-off">
              <label id="lbInput" className="label-register-title" />
            </div>
              <div className="div-register-title-focus-on">
              <label id="lbComplete" className="label-register-title" />
            </div>
          </div>
          <RegisterComplete dto={this.state.dto}/>
        </div>
      );
    }
  }

  render() {
    const { isRegisterAgree, isRegisterAuth, isRegisterInput, isNaverRegisterInput, isRegisterComplete } = this.state;
    return (
      this.titleBooleanCheckEvent(isRegisterAgree, isRegisterAuth, isRegisterInput, isNaverRegisterInput, isRegisterComplete)
    );
  }
}

export default RegisterContainer;
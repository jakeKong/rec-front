import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import * as registerActions from "../modules/RegisterModule";
import { RegisterAgree, RegisterAuth, RegisterInput, RegisterComplete } from "../index";

class RegisterContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      isRegisterAgree: true,
      isRegisterAuth: false,
      isRegisterInput: false,
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
      }
    }
    this.goCommonRegisterCallback = this.goCommonRegisterCallback.bind(this);
    this.goNaverRegisterCallback = this.goNaverRegisterCallback.bind(this);
    this.goAuthRegisterCallback = this.goAuthRegisterCallback.bind(this);
    this.addCallback = this.addCallback.bind(this);
  }

  /*
  register = async () => {
    const { RegisterModule } = this.props;
    try {
      await RegisterModule.register();
    } catch (e) {
      console.log("error log : " + e);
    }
  }
  */

  // 마운트 직후 한번 (rendering 이전 마운트 이후의 작업)
  componentDidMount() {
    document.querySelector('#lbAgree').innerHTML = '약관동의';
    document.querySelector('#lbAuth').innerHTML = '본인인증';
    document.querySelector('#lbInput').innerHTML = '회원정보 입력';
    document.querySelector('#lbComplete').innerHTML = '가입완료';
  }

  goCommonRegisterCallback() {
    this.setState({isRegisterAgree: false, 
                   isRegisterAuth: true});
  }

  goNaverRegisterCallback() {
    console.log('naverLogin')
    // this.setState({isRegisterAgree: false, 
    //                isRegisterAuth: true});
  }

  goAuthRegisterCallback() {
    this.setState({isRegisterAuth: false, 
                   isRegisterInput: true});
  }

  addCallback = (getDto) => {
    this.setState({dto : getDto});
    let userCreateComplete = false;
    // user 등록 이벤트

    // 임시 등록성공 설정
    userCreateComplete = true;
    if (userCreateComplete) {
      this.setState({isRegisterInput: false, 
                    isRegisterComplete: true});
    }
  }

  titleBooleanCheckEvent(agree, auth, input, complete) {
    
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
          <RegisterAuth goAuthRegisterCallback={this.goAuthRegisterCallback}/>
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
          <RegisterInput addCallback={this.addCallback}/>
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
    // const { pending, error, success } = this.props;
    const { isRegisterAgree, isRegisterAuth, isRegisterInput, isRegisterComplete } = this.state;
    return (
      this.titleBooleanCheckEvent(isRegisterAgree, isRegisterAuth, isRegisterInput, isRegisterComplete)
    );
  }
}

export default connect(
  state => ({
    // pending: state.main.pending,
    // error: state.main.error,
    // success: state.main.success,
  }),
  dispatch => ({
    // RegisterModule: bindActionCreators(registerActions, dispatch)
  })
)(RegisterContainer);
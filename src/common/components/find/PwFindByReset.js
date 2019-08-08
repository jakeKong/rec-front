import React, { Component, Fragment } from 'react';
import { Password } from 'primereact/password';

class PwFindByReset extends Component {
  constructor(props) {
    super(props);
    this.state ={
      // afterpw: '',
      beforepw: '',
      rebeforepw: ''
    }
    this.passwordResetEvent = this.passwordResetEvent.bind(this);
  }

  componentDidMount() {
    // document.querySelector('#lbAfterPw').innerHTML = '기존 비밀번호';
    document.querySelector('#lbBeforePw').innerHTML = '새로운 비밀번호';
    document.querySelector('#lbBeforeRePw').innerHTML = '재입력';
  }

  passwordResetEvent() {
    const { email, PwResetCallbackEvent } = this.props;
    const { afterpw, beforepw, rebeforepw } = this.state;
    // const { afterpw, beforepw, rebeforepw } = this.state;
    // if (afterpw === '') {
    //   window.alert('기존 비밀번호를 입력해주세요.')
    // }
    if (beforepw === '') {
      window.alert('새로운 비밀번호를 입력해주세요.')
    }
    if (rebeforepw === '') {
      window.alert('새로운 비밀번호를 입력해주세요.')
    }
    if (beforepw !== rebeforepw) {
      window.alert('변경 비밀번호가 일치하지 않습니다.\n확인 후 다시 시도해주세요')
    } else {
      // PwResetCallbackEvent(email, afterpw, beforepw);
      PwResetCallbackEvent(email, beforepw);
    }
  }

  // pwResetAfterPWInputEvent(e) {
  //   this.setState({afterpw: e.target.value})
  // }

  pwResetBeforePWInputEvent(e) {
    this.setState({beforepw: e.target.value})
  }

  pwResetBeforeRePWInputEvent(e) {
    this.setState({rebeforepw: e.target.value})
  }

  render() {

    return (
      <Fragment>
        <div>
          {/* <div>
            <label id="lbAfterPw"/>
            <Password value={this.state.afterpw} onChange={(e) => this.pwResetAfterPWInputEvent(e) }/>
          </div> */}
          <div>
            <label id="lbBeforePw"/>
            <Password value={this.state.beforepw} onChange={(e) => this.pwResetBeforePWInputEvent(e) }/>
          </div>
          <div>
            <label id="lbBeforeRePw"/>
            <Password value={this.state.rebeforepw} onChange={(e) => this.pwResetBeforeRePWInputEvent(e) }/>
          </div>
          <div>
            <button onClick={this.passwordResetEvent}>변경하기</button>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default PwFindByReset;
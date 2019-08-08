import React, { Component, Fragment } from 'react';
import { Password } from 'primereact/password';

class PwFindByReset extends Component {
  constructor(props) {
    super(props);
    this.state ={
      afterpw: '',
      reafterpw: ''
    }
    this.passwordResetEvent = this.passwordResetEvent.bind(this);
  }

  componentDidMount() {
    document.querySelector('#lbAfterPw').innerHTML = '새로운 비밀번호';
    document.querySelector('#lbAfterRePw').innerHTML = '재입력';
  }

  passwordResetEvent() {
    const { email, PwResetCallbackEvent } = this.props;
    const { afterpw, reafterpw } = this.state;
    if (afterpw === '') {
      window.alert('새로운 비밀번호를 입력해주세요.')
    }
    if (reafterpw === '') {
      window.alert('새로운 비밀번호를 입력해주세요.')
    }
    if (afterpw !== reafterpw) {
      window.alert('변경 비밀번호가 일치하지 않습니다.\n확인 후 다시 시도해주세요')
    } else {
      PwResetCallbackEvent(email, afterpw);
    }
  }

  pwResetAfterPWInputEvent(e) {
    this.setState({beforepw: e.target.value})
  }

  pwResetAfterRePWInputEvent(e) {
    this.setState({rebeforepw: e.target.value})
  }

  render() {

    return (
      <Fragment>
        <div>
          <div>
            <label id="lbAfterPw"/>
            <Password value={this.state.afterpw} onChange={(e) => this.pwResetAfterPWInputEvent(e) }/>
          </div>
          <div>
            <label id="lbAfterRePw"/>
            <Password value={this.state.reafterpw} onChange={(e) => this.pwResetAfterRePWInputEvent(e) }/>
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
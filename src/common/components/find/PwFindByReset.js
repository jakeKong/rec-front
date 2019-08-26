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
    
    const { email } = this.props;

    if (email !== undefined && email !== null) {
      document.querySelector('#lbID').innerHTML = '변경할 아이디';
    
      document.querySelector('#lbAfterPw').innerHTML = '새로운 비밀번호';
      document.querySelector('#lbAfterRePw').innerHTML = '재입력';

      document.querySelector('#lbIDResult').innerHTML = email;
    }
  }

  passwordResetEvent() {
    const { email, PwResetCallbackEvent } = this.props;
    const { afterpw, reafterpw } = this.state;
    if (afterpw === '') {
      window.alert('새로운 비밀번호를 입력해주세요.')
      return;
    }
    if (reafterpw === '') {
      window.alert('새로운 비밀번호를 입력해주세요.')
      return;
    }
    if (afterpw !== reafterpw) {
      window.alert('변경 비밀번호가 일치하지 않습니다.\n확인 후 다시 시도해주세요')
      return;
    } else {
      PwResetCallbackEvent(email, afterpw);
    }
  }

  pwResetAfterPWInputEvent(e) {
    this.setState({afterpw: e.target.value})
  }

  pwResetAfterRePWInputEvent(e) {
    this.setState({reafterpw: e.target.value})
  }

  render() {

    return (
      <Fragment>
        <div>
          <div>
            <label id="lbID"/>
            <label id="lbIDResult"/>
          </div>
          <div>
            <label id="lbAfterPw"/>
            <Password feedback={false} id="pwAfterPw" value={this.state.afterpw} onChange={(e) => this.pwResetAfterPWInputEvent(e) }/>
          </div>
          <div>
            <label id="lbAfterRePw"/>
            <Password feedback={false} id="pwAfterRePw"value={this.state.reafterpw} onChange={(e) => this.pwResetAfterRePWInputEvent(e) }/>
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
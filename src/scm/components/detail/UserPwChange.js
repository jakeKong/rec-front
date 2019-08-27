import React, { Component } from 'react';

import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';

class UserPwChange extends Component {

  constructor(props) {
    super(props);
    this.state ={
      beforepw: '',
      afterpw: '',
      reafterpw: ''
    }
    this.pwResetBeforePWInputEvent = this.pwResetBeforePWInputEvent.bind(this);
    this.pwResetAfterPWInputEvent = this.pwResetAfterPWInputEvent.bind(this);
    this.pwResetAfterRePWInputEvent = this.pwResetAfterRePWInputEvent.bind(this);
  }

  componentDidMount() {
    document.querySelector('#lbBeforePwUser').innerHTML = '기존 비밀번호';
    document.querySelector('#lbAfterPwUser').innerHTML = '새로운 비밀번호';
    document.querySelector('#lbAfterRePwUser').innerHTML = '재입력';
  }

  pwResetBeforePWInputEvent(e) {
    this.setState({beforepw: e.target.value})
  }
  
  pwResetAfterPWInputEvent(e) {
    this.setState({afterpw: e.target.value})
  }

  pwResetAfterRePWInputEvent(e) {
    this.setState({reafterpw: e.target.value})
  }

  updateCall() {
    const { popupClose } = this.props;
    const { passwordResetAttemptCallback } = this.props;
    const { beforepw, afterpw, reafterpw } = this.state;
    if (beforepw === '') {
      window.alert('기존 비밀번호를 입력해주세요.')
    }
    if (afterpw === '') {
      window.alert('새로운 비밀번호를 입력해주세요.')
    }
    if (reafterpw === '') {
      window.alert('새로운 비밀번호를 입력해주세요.')
    }
    if (afterpw !== reafterpw) {
      window.alert('변경 비밀번호가 일치하지 않습니다.\n확인 후 다시 시도해주세요.')
    } else {
      if (afterpw === beforepw) {
        window.alert('동일한 비밀번호로 변경할 수 없습니다.\n확인 후 다시 시도해주세요.')
      } else {
        passwordResetAttemptCallback(beforepw, afterpw);
        this.setState({ beforepw: '',
                        afterpw: '',
                        reafterpw: ''})
        popupClose();
      }
    }
  }

  cancle() {
    const { popupClose } = this.props;
    this.setState({ beforepw: '',
                    afterpw: '',
                    reafterpw: ''})
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
      <Dialog header="비밀번호 변경" footer={popupFooter} style={{width: '500px'}} modal={true} visible={ visiblility } onHide={() => popupClose()}>
        <div className="modal-modify-pw">
          <div>
            <label id="lbBeforePwUser"/>
            <Password feedback={false} value={this.state.beforepw} onChange={(e) => this.pwResetBeforePWInputEvent(e) }/>
          </div>
          <div>
            <label id="lbAfterPwUser"/>
            <Password feedback={false} value={this.state.afterpw} onChange={(e) => this.pwResetAfterPWInputEvent(e) }/>
          </div>
          <div>
            <label id="lbAfterRePwUser"/>
            <Password feedback={false} value={this.state.reafterpw} onChange={(e) => this.pwResetAfterRePWInputEvent(e) }/>
          </div>
        </div>
      </Dialog>
    );
  }
}
export default UserPwChange ;


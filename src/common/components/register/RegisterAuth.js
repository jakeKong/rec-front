import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-button';

class RegisterAuth extends Component {
  constructor(props) {
    super(props);
    this.state ={
      
    }
  }

  componentDidMount() {
    document.querySelector('#lbPhoneAuth').innerHTML = '휴대폰 본인인증';

    const { goAuthRegisterCallback } = this.props;
    const btnPhoneAuth = document.querySelector('#btnPhoneAuth');
    btnPhoneAuth.textContent = '인증하기';
    btnPhoneAuth.addEventListener('click', function() {
      const check = window.confirm('임시 인증 완료하기');
      if (check === true) {
        goAuthRegisterCallback();
      }
    })
  }

  render() {
    return (
      <Fragment>
        <div className="div-register-auth">
          <div>
            <label id="lbPhoneAuth"/>
          </div>
          <vaadin-button id="btnPhoneAuth"/>
        </div>
      </Fragment>
    );
  }
}
export default RegisterAuth;
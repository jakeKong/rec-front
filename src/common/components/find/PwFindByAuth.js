import React, { Component, Fragment } from 'react';

class PwFindByAuth extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  componentDidMount() {
    const { focusPwAuthStatusToChangeEvent } = this.props;
    const btnAuthCheck = document.querySelector('#btnAuthCheck');
    btnAuthCheck.innerHTML = '임시 인증하기';
    btnAuthCheck.addEventListener('click', function() {
      window.alert('임시 인증 테스트');
      // 인증 완료 응답 파라미터 임시설정
      focusPwAuthStatusToChangeEvent();
    })
  }

  render() {

    return (
      <Fragment>
        <div>
          <div>
            <button id="btnAuthCheck" />
          </div>
          <div>

          </div>
        </div>
      </Fragment>
    );
  }
}
export default PwFindByAuth;
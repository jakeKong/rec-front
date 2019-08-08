import React, { Component, Fragment } from 'react';

class IdFindByAuth extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  componentDidMount() {
    const { focusIdAuthStatusToChangeEvent } = this.props;
    const btnAuthCheck = document.querySelector('#btnAuthCheck');
    btnAuthCheck.innerHTML = '임시 인증하기';
    btnAuthCheck.addEventListener('click', function() {
      window.alert('임시 인증 테스트');
      // 인증 완료 응답 파라미터 임시설정
      let name = '사용자'
      let phone = '010-4112-3321'
      focusIdAuthStatusToChangeEvent(name, phone);
    })
  }

  render() {

    return (
      <Fragment>
        <div>
          ID 찾기
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
export default IdFindByAuth;
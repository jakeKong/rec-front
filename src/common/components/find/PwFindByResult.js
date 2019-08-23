import React, { Component, Fragment } from 'react';

class PwFindByResult extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  componentDidMount() {
    
    const btnIdResultToLoginGo = document.querySelector('#btnIdResultToLoginGo');
    btnIdResultToLoginGo.innerHTML = '로그인';
    btnIdResultToLoginGo.addEventListener('click', function() {
      window.location.href = '/login';
    })
    const btnIdResultToHomeGo = document.querySelector('#btnIdResultToHomeGo');
    btnIdResultToHomeGo.innerHTML = '홈';
    btnIdResultToHomeGo.addEventListener('click', function() {
      window.location.href = '/';
    })
  }

  render() {

    return (
      <Fragment>
        <div className="id-find-result-field">
          <label className="label-find-pw-complete"> 비밀번호 변경이 정상적으로 완료되었습니다!</label>
        </div>
        <div className="id-find-result-btn-field">
          <button id="btnIdResultToLoginGo"/>
          <button id="btnIdResultToHomeGo"/>
        </div>
      </Fragment>
    );
  }
}
export default PwFindByResult;
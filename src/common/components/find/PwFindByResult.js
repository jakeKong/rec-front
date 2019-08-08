import React, { Component, Fragment } from 'react';

class PwFindByResult extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  componentDidMount() {
    
    const btnIdResultToLoginGo = document.querySelector('#btnIdResultToLoginGo');
    btnIdResultToLoginGo.innerHTML = '로그인 화면으로';
    btnIdResultToLoginGo.addEventListener('click', function() {
      window.location.href = '/login';
    })
    const btnIdResultToHomeGo = document.querySelector('#btnIdResultToHomeGo');
    btnIdResultToHomeGo.innerHTML = '홈으로';
    btnIdResultToHomeGo.addEventListener('click', function() {
      window.location.href = '/';
    })
  }

  render() {

    return (
      <Fragment>
        <div>
          <label> 비밀번호 변경이 정상적으로 완료되었습니다!</label>
        </div>
        <div>
          <button id="btnIdResultToLoginGo"/>
          <button id="btnIdResultToHomeGo"/>
        </div>
      </Fragment>
    );
  }
}
export default PwFindByResult;
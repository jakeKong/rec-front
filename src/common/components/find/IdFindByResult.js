import React, { Component, Fragment } from 'react';

class IdFindByResult extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  componentDidMount() {
    const { email } = this.props;
    document.querySelector('#lbFindIdResultTag').innerHTML = '사용자 아이디 : ';
    document.querySelector('#lbFindIdResult').innerHTML = email;

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
          <label id="lbFindIdResultTag"/>
          <label id="lbFindIdResult"/>
        </div>
        <div className="id-find-result-btn-field">
          <button id="btnIdResultToLoginGo"/>
          <button id="btnIdResultToHomeGo"/>
        </div>
      </Fragment>
    );
  }
}
export default IdFindByResult;
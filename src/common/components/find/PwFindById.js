import React, { Component, Fragment } from 'react';

import { InputText } from 'primereact/inputtext';

class PwFindById extends Component {
  constructor(props) {
    super(props);
    this.state ={
      email: ''
    }
    this.pwFindNextClickEvent = this.pwFindNextClickEvent.bind(this);
  }

  componentDidMount() {
    document.querySelector('#lbFindById').innerHTML = 'ID';
  }
  
  pwFindNextClickEvent() {
    const { focusPwIdStatusToChangeEvent } = this.props;
    const { email } = this.state;
    if (email !== null && email !== '' && email !== undefined) {
      focusPwIdStatusToChangeEvent(email);
    } else {
      window.alert('찾고자 하는 아이디를 입력해 주세요.')
    }
  }

  pwFindByIdEmailCheckInputEvent(e) {
    this.setState({email: e.target.value})
  }
  
  render() {

    return (
      <Fragment>
        <div>
        <p>비밀번호 찾기</p>
          <div>
            <label id="lbFindById"/>
            <InputText id="itEmailCheck" value={this.state.email} onChange={(e) => this.pwFindByIdEmailCheckInputEvent(e) }/>
          </div>
          <div>
            <button id="btnPwFindNext" onClick={this.pwFindNextClickEvent}>다음</button>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default PwFindById;
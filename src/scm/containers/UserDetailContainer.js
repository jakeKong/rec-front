import React, { Component, Fragment } from "react";

import { UserDetail, UserPwChange, UserUpdate, 
         updateUser, updateUserPwByEmailAndPassword } from "../index";
import storage from '../../common/storage';
import { checkInfo } from '../../common/loggedInfoCheck'

class UserManageContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      update_visiblility: false,
      reset_visiblility: false,
    }
    this.userUpdatePopupOpen = this.userUpdatePopupOpen.bind(this);
    this.userUpdatePopupClose = this.userUpdatePopupClose.bind(this);
    this.userUpdateAttemptCallback = this.userUpdateAttemptCallback.bind(this);
    
    this.passwordResetPopupOpen = this.passwordResetPopupOpen.bind(this);
    this.passwordResetPopupClose = this.passwordResetPopupClose.bind(this);
    this.passwordResetAttemptCallback = this.passwordResetAttemptCallback.bind(this);
  }

  componentDidMount() {

  }

  // 회원정보 수정 팝업열기
  userUpdatePopupOpen() {
    this.setState({update_visiblility: true});
  }

  // 회원정보 수정 팝업닫기
  userUpdatePopupClose() {
    this.setState({update_visiblility: false});
  }

  // 비밀번호 수정 팝업열기
  passwordResetPopupOpen() {
    this.setState({reset_visiblility: true});
  }

  // 비밀번호 수정 팝업닫기
  passwordResetPopupClose() {
    this.setState({reset_visiblility: false});
  }

  // 회원정보 수정 요청
  userUpdateAttemptCallback(dto) {
    const token = storage.get('token');
    updateUser(dto, token).then(res => {
      window.alert('수정완료!');
      window.location.reload();
    }).catch(err => {
      console.log(err);
      throw err;
    })
  }

  // 비밀번호 변경 요청
  passwordResetAttemptCallback(beforepw, afterpw) {
    const token = storage.get('token');
    const loggedInfo = storage.get('loggedInfo');

    updateUserPwByEmailAndPassword(loggedInfo.email, beforepw, afterpw, token).then(res => {
      window.alert('비밀번호 변경완료!');
      window.location.reload();
    }).catch(err => {
      console.log(err);
      window.alert('비밀번호 변경에 실패하였습니다.\n확인 후 다시 시도해주세요.')
    })
  }

  render() {
    checkInfo();
    return (
      <Fragment>
        <UserDetail userUpdatePopupOpen={this.userUpdatePopupOpen} passwordResetPopupOpen={this.passwordResetPopupOpen}/>
        <UserUpdate visiblility={this.state.update_visiblility} popupClose={this.userUpdatePopupClose} userUpdateAttemptCallback={this.userUpdateAttemptCallback}/>
        <UserPwChange visiblility={this.state.reset_visiblility} popupClose={this.passwordResetPopupClose} passwordResetAttemptCallback={this.passwordResetAttemptCallback}/>
      </Fragment>
    );
  }
}

export default UserManageContainer;
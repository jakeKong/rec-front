import React, { Component, Fragment } from 'react';
import storage from '../../../common/storage';

import { comma } from '../../../common/utils';

class UserDetail extends Component {

  constructor(props) {
    super(props);
    this.state ={

    }
  }

  componentDidMount() {
    const { userUpdatePopupOpen, passwordResetPopupOpen } = this.props;

    const loggedInfo = storage.get('loggedInfo');
    
    document.querySelector('#lbEmail').innerHTML = loggedInfo.email;
    document.querySelector('#lbName').innerHTML = loggedInfo.name;
    document.querySelector('#lbTellNo').innerHTML = loggedInfo.tellNo;
    document.querySelector('#lbBirthDt').innerHTML = loggedInfo.birthDt;
    // document.querySelector('#lbAddressNo').innerHTML = loggedInfo.addressNo;
    document.querySelector('#lbAddress').innerHTML = loggedInfo.address;

    document.querySelector('#lbBalancePoint').innerHTML = comma(loggedInfo.balancePoint)+'P';
    document.querySelector('#lbRecommendCode').innerHTML = loggedInfo.recommendCode;
    
    document.querySelector('#btnUserUpdate').innerHTML = '회원정보 수정'
    document.querySelector('#btnUserUpdate').addEventListener('click', function() {
      userUpdatePopupOpen();
    })
    document.querySelector('#btnPasswordReset').innerHTML = '비밀번호 변경'
    document.querySelector('#btnPasswordReset').addEventListener('click', function() {
      passwordResetPopupOpen();
    })
  }

  render() {
    const loggedInfo = storage.get('loggedInfo');
    return (
      <Fragment>
        <div className="section-profile">
          <ul>
            <li className="default-column">
              <label className="label-flex-30-left">이메일</label>
              <label className="label-flex-70-left" id="lbEmail"/>
            </li>
            <li className="default-column">
              <label className="label-flex-30-left">이름</label>
              <label className="label-flex-70-left" id="lbName"/>
            </li>
            <li className="default-column">
              <label className="label-flex-30-left">전화번호</label>
              <label className="label-flex-70-left" id="lbTellNo"/>
            </li>
            <li className="default-column">
              <label className="label-flex-30-left">생년월일</label>
              <label className="label-flex-70-left" id="lbBirthDt"/>
            </li>
            <li className="default-column">
              <label className="label-flex-30-left">주소</label>
              {/* <p id="lbAddressNo"/> */}
              <label className="label-flex-70-left" id="lbAddress"/>
            </li>
            <li className="default-column">
              <label className="label-flex-30-left">잔여 포인트</label>
              <label className="label-flex-70-left" id="lbBalancePoint"/>
            </li>
            <li className="default-column">
              <label className="label-flex-30-left">추천인 코드</label>
              <label className="label-flex-70-left" id="lbRecommendCode"/>
            </li>
          </ul>
          <div>
            <button id="btnUserUpdate"/>
            <button id="btnPasswordReset" hidden={loggedInfo.division === 'NAVER'}/>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default UserDetail ;


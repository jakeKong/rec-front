import React, { Component, Fragment } from 'react';

import * as popup from '../popupUtil';

import beta_test from '../../styles/agz/image/popup_beta_test.png'

class BetaTestNotificationPage extends Component {

  componentDidMount() {

    const notshow = document.querySelector('#notshow');
    notshow.addEventListener('click', function() {
      popup.closeWinAt00('div_betatest_popup', 1)
    })

  }

  render() {
    return (
      <Fragment>
        {/* <div>
          베타테스트 안내 입니다.
        </div> */}
        <img alt="" src={beta_test} ></img>
        <span style={{float:'right', fontSize:'12px', color:'#666', margin:'10px 10px'}}>
          <label>오늘하루이창 열지 않기</label>
          <input type="checkbox" name="notshow" id="notshow" />
          {/* <input type="checkbox" name="notshow" id="notshow" onclick="closeWin()" style="vertical-align:middle;" /> */}
          {/* <input type="checkbox" name="notshow" id="notshow" onClick={this.closeWin()} style="vertical-align:middle;" /> */}
        </span>
      </Fragment>
    )
  }
};

export default BetaTestNotificationPage;
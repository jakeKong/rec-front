import React, { Component } from 'react';

class NaverCallbackPage extends Component {

  componentDidMount() {
    let naverLogin = new window.naver.LoginWithNaverId({
      clientId: "1iW5r3Qytlk4tte3X_UX",
      // clientSecret = 'jdC9xJas1b';
      callbackUrl: "http://algozip.co.kr/naver/log/pop",
      // callbackUrl: "http://localhost:3000/login",
      // callbackUrl: "http://localhost:3000/login",
      isPopup: false, /* 팝업을 통한 연동처리 여부 */
      callbackHandle: true,
      // loginButton: {color: "white", type: 3, height: 60} /* 로그인 버튼의 타입을 지정 */
    })
    naverLogin.init();
    // naverLogin.reprompt();
    window.addEventListener('load', function () {
      naverLogin.getLoginStatus(function (status) {
        if (status) {
          /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
          let name = naverLogin.user.getName();
          if( name === undefined || name === null) {
            window.alert("이름은 필수정보입니다. 정보제공을 동의해주세요.");
            /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
            naverLogin.reprompt();
            return;
          }
          let email = naverLogin.user.getEmail();
          if( email === undefined || email === null) {
            window.alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
            /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
            naverLogin.reprompt();
            return;
          }
          // naverLoginStateSetEvent(email, name);

          // let url = "/login?name="+name+"&email="+email;
          // let url = "/login?email="+email;
          let url = "/login?"+email;

          window.self.close();
          window.opener.location.replace("http://" + window.location.hostname + ( (window.location.port===""||window.location.port===undefined)?"":":" + window.location.port) + url);

          // let uniqId = naverLogin.user.getId();
          // let nickname = naverLogin.user.getNickName();
          // let profileImage = naverLogin.user.getProfileImage();
          // let birthday = naverLogin.user.getBirthday();
          // let age = naverLogin.user.getAge();
          // let gender = naverLogin.user.getGender();
        } else {
          console.log("callback 처리에 실패하였습니다.");
        }
      });
    });
  }

  render() {
    return(<div id="naverIdLogin"></div>);
  }
};

export default NaverCallbackPage;
import React, { Component } from 'react';


// 참고 url : https://developers.naver.com/docs/login/web/#2--javascript%EB%A1%9C-%EB%84%A4%EC%9D%B4%EB%B2%84-%EC%95%84%EC%9D%B4%EB%94%94%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
// 네이버 회원가입 callback 페이지
class NaverCallbackPage extends Component {

  componentDidMount() {   
    // LoginWithNaverId Javascript 설정 정보 및 초기화
    let naverLoginRegister = new window.naver.LoginWithNaverId({
      // algozip 등록 clientID
      clientId: "1iW5r3Qytlk4tte3X_UX",
      // clientSecret = 'jdC9xJas1b';
      callbackUrl: "http://algozip.co.kr/naver/reg/pop",
      isPopup: false, /* 팝업을 통한 연동처리 여부 */
      callbackHandle: true,
    })
    // 설정 정보를 초기화하고 연동을 준비
    naverLoginRegister.init();

    // callback 처리 내용.
    // 정상적으로 Callback 처리가 완료 될 경우 redirect(popup close, replace)
    window.addEventListener('load', function () {
      naverLoginRegister.getLoginStatus(function (status) {
        // callback 처리가 정상적으로 완료되었을 경우 status true
        if (status) {
          /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
          // 사용자 이름 정보 체크
          let name = naverLoginRegister.user.getName();
          if( name === undefined || name === null) {
            window.alert("이름은 필수정보입니다. 정보제공을 동의해주세요.");
            /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
            naverLoginRegister.reprompt();
            return;
          }
          // 사용자 이메일 정보 체크
          let email = naverLoginRegister.user.getEmail();
          if( email === undefined || email === null) {
            window.alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
            /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
            naverLoginRegister.reprompt();
            return;
          }
          // 요청 성공 시 네이버 로그인 정보를 담은 회원가입 이벤트를 동작하기 위한 url 설정
          // 회원가입에 필요한 이메일과 사용자명을 파라미터 함수로 사용
          let url = "/register?"+email+'&name='+encodeURIComponent(name);

          // 별도의 팝업으로 호출된 callback 페이지 닫기.
          window.self.close();
          // App.js의 BY NAVER 회원가입 부분인 <Route exact path="/register/:userinfo" component={RegisterPage} /> 호출
          window.opener.location.replace("http://" + window.location.hostname + ( (window.location.port===""||window.location.port===undefined)?"":":" + window.location.port) + url);
        } else {
          // 정상적인 callback 요청처리 실패 시
          console.log("callback 처리에 실패하였습니다.");
        }
      });
    });
  }

  render() {
    // 네이버 로그인 버튼이 들어갈 위치 선언, ID는 반드시 지정된 값으로 설정하여야 함.
    return(<div id="naverIdLogin"></div>);
  }
};

export default NaverCallbackPage;
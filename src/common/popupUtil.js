// 창열기  
export function openWin( winName ) {  
  var blnCookie = getCookie( winName );  
  if( blnCookie !== 'done') {
    // 팝업 설정
    if (winName === 'div_betatest_popup') {
      var popupOption = "width=500%, height=635%, resizable=no, scrollbars=no, status=no;";
      window.open('/pop/betatest/notification', '베타테스트 안내', popupOption);
    } else if (winName === '') {
      return;
    } else {
      return;
    }
  }  
}

// 창닫기  
export function closeWin(winName, expiredays) {   
  setCookie( winName, "done" , expiredays);
  window.close();
}  
export function closeWinAt00(winName, expiredays) {   
  setCookieAt00( winName, "done" , expiredays);
  window.close();
}  

// 쿠키 가져오기  
export function getCookie(name) {  
  var nameOfCookie = name + "=";  
  var x = 0;  
  while ( x <= document.cookie.length )  
  {  
    var y = (x+nameOfCookie.length);  
    if ( document.cookie.substring( x, y ) === nameOfCookie ) {  
      if ( (window.endOfCookie = document.cookie.indexOf( ";", y )) === -1 )  
      window.endOfCookie = document.cookie.length;  
      return unescape( document.cookie.substring( y, window.endOfCookie ) );  
    }  
    x = document.cookie.indexOf( " ", x ) + 1;  
    if ( x === 0 )  
      break;  
  }  
  return "";  
}  

// 24시간 기준 쿠키 설정하기  
// expiredays 후의 클릭한 시간까지 쿠키 설정  
export function setCookie( name, value, expiredays ) {   
  var todayDate = new Date();   
  todayDate.setDate( todayDate.getDate() + expiredays );   
  document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"   
}  

// 00:00 시 기준 쿠키 설정하기  
// expiredays 의 새벽  00:00:00 까지 쿠키 설정  
export function setCookieAt00( name, value, expiredays ) {   
  var todayDate = new Date();   
  todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);  
  if ( todayDate > new Date() )  
  {  
  expiredays = expiredays - 1;  
  }  
  todayDate.setDate( todayDate.getDate() + expiredays );   
  document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"   
}  
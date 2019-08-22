// Aate Util
let moment = require('moment')

// export const currentDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
export const currentDate = moment();

// let weekBefore = new Date();
// weekBefore.setDate(weekBefore.getDate()-7);
// export const weekBeforeDate = weekBefore.getFullYear() + '-' + (weekBefore.getMonth() + 1) + '-' + weekBefore.getDate();
export const weekBeforeDate = moment().add(-7, 'days');

// let monthBefore = new Date();
// monthBefore.setMonth(monthBefore.getMonth()-1);
// export const monthBeforeDate = monthBefore.getFullYear() + '-' + (monthBefore.getMonth() + 1) + '-' + monthBefore.getDate();
export const monthBeforeDate = moment().add(-1, 'months');


export let calendarLocale = {
    firstDayOfWeek: 1,
    dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    today: '오늘',
    clear: '취소',
    dateFormat: 'yyyy/mm/dd',
    weekHeader: 'Sm'
  };

// 30초 표시
export function CountDownTimer(id, btn) {
  // let end = new Date();
  // end.setSeconds(end.getSeconds()+30);
  let end = moment();
  end.add(30, 'seconds');
  
  let _second = 1000;
  let _minute = _second * 60;
  // var _hour = _minute * 60;
  let timer;

  function showRemaining() {
    if(document.querySelector(id) === undefined || document.querySelector(id) === null) {
      clearInterval(timer);
      return;
    }
    // let now = new Date();
    let now = moment();
    let distance = end - now;
    if (distance < 0) {
      clearInterval(timer);
      document.querySelector(id).innerHTML = '';
      document.querySelector(btn).disabled = false;

      return false;
    }
    // let minutes = Math.floor((distance % _hour) / _minute);
    let seconds = Math.floor((distance % _minute) / _second);
    
    document.querySelector(id).innerHTML = seconds + '초';
    document.querySelector(btn).disabled = true;
  }

  timer = setInterval(showRemaining, 1000);
}  

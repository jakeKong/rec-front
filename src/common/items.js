// Aate Util

export const currentDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

let weekBefore = new Date();
weekBefore.setDate(weekBefore.getDate()-7);
export const weekBeforeDate = weekBefore.getFullYear() + '-' + (weekBefore.getMonth() + 1) + '-' + weekBefore.getDate();

let monthBefore = new Date();
monthBefore.setMonth(monthBefore.getMonth()-1);
export const monthBeforeDate = monthBefore.getFullYear() + '-' + (monthBefore.getMonth() + 1) + '-' + monthBefore.getDate();


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

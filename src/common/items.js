// Aate Util

export const currentDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

let weekBefore = new Date();
weekBefore.setDate(weekBefore.getDate()-7);
export const weekBeforeDate = weekBefore.getFullYear() + '-' + (weekBefore.getMonth() + 1) + '-' + weekBefore.getDate();

let monthBefore = new Date();
monthBefore.setMonth(monthBefore.getMonth()-1);
export const monthBeforeDate = monthBefore.getFullYear() + '-' + (monthBefore.getMonth() + 1) + '-' + monthBefore.getDate();

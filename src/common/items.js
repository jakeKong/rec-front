// date
let date = new Date(), 
weekBeforeDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() - 7),
currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

export { weekBeforeDate, currentDate };
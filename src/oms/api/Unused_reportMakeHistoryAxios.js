/*
import axios from 'axios';
import config from '../../config';

// 보고서 생성이력 조회
export const getReportMakeHistoryList = (search) => axios({
  method: 'POST',
  url: `${config.orderService}/report/history/list`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'reportMakeNo': search.reportMakeNo,
    'pnu': search.pnu,
    'orderBy': search.orderBy,
    'fromDt': search.fromDt,
    'toDt': search.toDt,
    'reportType': search.reportType
  })
});
*/
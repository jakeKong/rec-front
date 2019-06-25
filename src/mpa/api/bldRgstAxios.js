import axios from 'axios';
import config from '../../config';

//공공데이터 건축물대장 건축물 표제부
//https://www.data.go.kr/subMain.jsp?param=T1BFTkFQSUAxNTAwNDgyNQ==#/L3B1YnIvcG90L215cC9Jcm9zTXlQYWdlL29wZW5EZXZHdWlkZVBhZ2UkQF4wMTJtMSRAXnB1YmxpY0RhdGFQaz0xNTAwNDgyNSRAXnB1YmxpY0RhdGFEZXRhaWxQaz11ZGRpOjAzNmI1ODRlLTJlYTItNDQ4Ny1iOWE4LWMyZjUwMTdlNWZiOCRAXm9wcnRpblNlcU5vPTEwNDQzJEBebWFpbkZsYWc9dHJ1ZQ==
 export const getBrRecapTitleInfoList = (search) => 
  axios({
      method: 'POST',
      url: `${config.marketPriceService}/bldrgst/brRecapTitle/list`,
      headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
      },
      data: JSON.stringify({
          'sigunguCd': search.sigunguCd,
          'bjdongCd': search.bjdongCd,
          'platGbCd': search.platGbCd,
          'bun': search.bun,
          'ji': search.ji,
          'numOfRows': search.numOfRows,
      })
  });
// 조건별 상품 조회
/*export const getBrRecapTitleInfoList = (search) => 
  axios({
      method: 'POST',
      url: `${config.orderService}/test/list`,
      headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
      },
      data: JSON.stringify({
          'productCd': '',
          'productNm': '',
          'productPoint': '',
      })
  });
*/
//공공데이터 건축물대장 건축물대장 층별 개요
//https://www.data.go.kr/subMain.jsp?param=T1BFTkFQSUAxNTAwNDgyNQ==#/L3B1YnIvcG90L215cC9Jcm9zTXlQYWdlL29wZW5EZXZHdWlkZVBhZ2UkQF4wMTJtMSRAXnB1YmxpY0RhdGFQaz0xNTAwNDgyNSRAXnB1YmxpY0RhdGFEZXRhaWxQaz11ZGRpOjAzNmI1ODRlLTJlYTItNDQ4Ny1iOWE4LWMyZjUwMTdlNWZiOCRAXm9wcnRpblNlcU5vPTEwNDQ0JEBebWFpbkZsYWc9dHJ1ZQ==

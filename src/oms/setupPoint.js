import axios from "axios";
import config from '../config';

// 기본설정 조회 -- 주문포인트가격, 회원가입시 지급포인트, 추천인코드입력 지급포인트
export const getDefaultPointList = () => axios({
  method: 'GET',
  url: `${config.orderService}/default/point/list`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
})
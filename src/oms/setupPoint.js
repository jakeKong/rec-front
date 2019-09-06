import axios from "axios";
import config from '../config';

export const getDefaultPointList = () => axios({
  method: 'GET',
  url: `${config.orderService}/default/point/list`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
})
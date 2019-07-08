import axios from 'axios';
import config from '../../config';


//주소검색 API
export const getAddress = (search) => 
axios({
    method: 'POST',
    url: `${config.commonService}/juso/${search}`,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
    }
});
  
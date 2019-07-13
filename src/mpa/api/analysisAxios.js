import axios from 'axios';
import config from '../../config';


//토지 속성 정보
export const getLandInfoView = (search) => 
axios({
    method: 'POST',
    url: `${config.marketPriceService}/analysis/landInfo`,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
    },
    data: JSON.stringify({
    'jibunAddr': search.jibunAddr,
    'roadAddr': search.roadAddr,
    'pnu': search.pnu,
    // 'startDate': search.pnu,
    // 'endDate': search.pnu,
    })
});

export const makeLandInfoView = (search) => 
axios({
    method: 'POST',
    url: `${config.marketPriceService}/analysis/pdf`,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
    },
    data: JSON.stringify({
        'jibunAddr': search.jibunAddr,
        'roadAddr': search.roadAddr,
        'pnu': search.pnu,
    })
});
  
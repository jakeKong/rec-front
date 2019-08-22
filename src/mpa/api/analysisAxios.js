import axios from 'axios';
import config from '../../config';


//주택정보 조회 
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
    'userId': search.userId,
    'userNm': search.userNm,
    'mngNo': search.mngNo,
    })
});

//주문으로 PDF 생성
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
        'comment': search.comment,
        'userId': search.userId,
        'userNm': search.userNm,
        'mngNo': search.mngNo,
    })
});

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
    'sigunguCd': search.sigunguCd,
    'bjdongCd': search.bjdongCd,
    'platGbCd': search.platGbCd,
    'bun': search.bun,
    'ji': search.ji,
    'pnu': search.pnu,
    })
});
  
import axios from 'axios';
import config from '../../config';

// 조건별 상품 조회
export const getProductList = (search) => 
  axios({
    method: 'POST',
    url: `${config.orderService}/product/list`,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json'
    },
    data: JSON.stringify({
      'productCd': search.productCd,
      'productNm': search.productNm,
      'productPoint': search.productPoint,
    })
  });
// 상품 추가
export const addProduct = (dto) => 
  axios({
    method: 'POST',
    url: `${config.orderService}/product/add`,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json'
    },
    data: JSON.stringify({
      'productCd': dto.productCd,
      'productNm': dto.productNm,
      'productPoint': dto.productPoint,
      'cashRatio': dto.cashRatio,
    })
  });

// 상품 수정
export const updateProduct = (dto) => 
  axios({
    method: 'PUT',
    url: `${config.orderService}/product/update/${dto.productSid}`,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json'
    },
    data: JSON.stringify({
      'productCd': dto.productCd,
      'productNm': dto.productNm,
      'productPoint': dto.productPoint,
      'cashRatio': dto.cashRatio,
    })
  });

// 상품 삭제
export const deleteProduct = (productSid) => 
  axios({
    method: 'DELETE',
    url: `${config.orderService}/product/delete/${productSid}`,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json'
    }
  });
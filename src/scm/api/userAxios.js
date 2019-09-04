import axios from 'axios';
import config from '../../config';

// 사용자 목록 조회
export const getUserList = (search, token) => axios({
  method: 'POST',
  url: `${config.systemService}/user/list`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  data: JSON.stringify({
    'email': search.email,
    'name': search.name,
    'roleCode': search.roleCode,
  })
});

// 사용자 정보 조회
export const getUser = (email, token) => axios({
  method: 'GET',
  url: `${config.systemService}/user/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

// 특정 조건(이름, 전화번호) 사용자 정보 조회
export const getUserByNameAndTell = (name, phone, token) => axios({
  method: 'GET',
  url: `${config.systemService}/user/search/${name}/${phone}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

// 전화번호로 가입된 사용자 정보 존재 여부 체크
export const checkUserByTellNo = (phone, token) => axios({
  method: 'GET',
  url: `${config.systemService}/user/check/user/${phone}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

// 사용자 등록 (관리)
export const addUser = (userDto, token) => axios({
  method: 'POST',
  url: `${config.systemService}/user/add`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  data: JSON.stringify({
    'email': userDto.email,
    'name': userDto.name,
    'tellNo': userDto.tellNo,
    'address': userDto.address,
    'addressNo': userDto.addressNo,
    'birthDt': userDto.birthDt,
    'createdUser': userDto.createdUser,
    'assignedRoles': userDto.assignedRoles,
    'division': userDto.division
  })
});

// 사용자 등록(고객)
export const createUser = (userDto, token) => axios({
  method: 'POST',
  url: `${config.systemService}/user/create`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  data: JSON.stringify({
    'email': userDto.email,
    'name': userDto.name,
    'password': userDto.password,
    'tellNo': userDto.tellNo,
    'address': userDto.address,
    'addressNo': userDto.addressNo,
    'birthDt': userDto.birthDt,
    'createdUser': userDto.createdUser,
    'assignedRoles': userDto.assignedRoles,
    'division': userDto.division
  })
});

// 사용자 수정
export const updateUser = (userDto, token) => axios({
  method: 'PUT',
  url: `${config.systemService}/user/${userDto.email}/update`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  data: JSON.stringify({
    'name': userDto.name,
    'tellNo': userDto.tellNo,
    'address': userDto.address,
    'addressNo': userDto.addressNo,
    'birthDt': userDto.birthDt,
    'balancePoint': userDto.balancePoint,
    'assignedRoles': userDto.assignedRoles,
  })
});

// 사용자 비밀번호 초기화
export const resetUserPwByEmailAndPassword = (email, afterpw, token) => axios({
  method: 'PUT',
  url: `${config.systemService}/user/reset/pw/${email}/${afterpw}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

// 사용자 비밀번호 변경
export const updateUserPwByEmailAndPassword = (email, beforepw, afterpw, token) => axios({
  method: 'PUT',
  url: `${config.systemService}/user/update/pw/${email}/${beforepw}/${afterpw}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

// 사용자 삭제
export const deleteUser = (email, token) => axios({
  method: 'DELETE',
  url: `${config.systemService}/user/${email}/delete`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

// 사용자 일괄삭제
export const deleteUsers = (emails, token) => axios({
  method: 'DELETE',
  url: `${config.systemService}/user/deletes`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  data: JSON.stringify(emails)
});

// 사용자 포인트 수정
export const updateUserByBalancePoint = (email, balancePoint, token) => axios({
  method: 'PUT',
  url: `${config.systemService}/user/${email}/update/balancepoint`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  data: JSON.stringify(balancePoint)
});

// 사용자 포인트 추가
export const updateUserByBalancePointIncrease = (email, increasePoint, token) => axios({
  method: 'PUT',
  url: `${config.systemService}/user/${email}/update/balancepoint/increase`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  data: JSON.stringify(increasePoint)
});

// 사용자 포인트 차감
export const updateUserByBalancePointDifference = (email, differencePoint, token) => axios({
  method: 'PUT',
  url: `${config.systemService}/user/${email}/update/balancepoint/difference`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  data: JSON.stringify(differencePoint)
});

// 추천인 코드 존재여부 확인
export const checkRecommendCode = (recommendCode, token) => axios({
  method: 'GET',
  url: `${config.systemService}/user/check/${recommendCode}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

// 사용자 사용여부 수정
export const changedActivated = (email, boolean, token) => axios({
  method: 'PUT',
  url: `${config.systemService}/user/changed/activated/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  data: JSON.stringify(boolean)
});

// 사용자 탈퇴여부 수정
export const changedDisabled = (email, boolean, token) => axios({
  method: 'PUT',
  url: `${config.systemService}/user/changed/disabled/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  data: JSON.stringify(boolean)
});
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

// 사용자 등록
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
import axios from 'axios';
import config from '../../config';

// 사용자 목록 조회
export const getUserList = (search) => axios({
  method: 'POST',
  url: `${config.sysyemService}/user/list`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'email': search.email,
    'name': search.name,
    'roleCode': search.roleCode,
  })
});

// 사용자 정보 조회
export const getUser = (email) => axios({
  method: 'GET',
  url: `${config.sysyemService}/user/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
});

// 사용자 등록
export const addUser = (userDto) => axios({
  method: 'POST',
  url: `${config.sysyemService}/user/add`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
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
export const updateUser = (userDto) => axios({
  method: 'PUT',
  url: `${config.sysyemService}/user/${userDto.email}/update`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
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
export const deleteUser = (email) => axios({
  method: 'DELETE',
  url: `${config.sysyemService}/user/${email}/delete`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
});

// 사용자 일괄삭제
export const deleteUsers = (emails) => axios({
  method: 'DELETE',
  url: `${config.sysyemService}/user/deletes`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify(emails)
});
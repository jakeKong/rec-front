import storage from './storage';

import { getUser } from '../scm';

export function checkInfo() {

  function compareWithUserInfo(prevUserInfo, nextUserInfo) {
    if (prevUserInfo !== null && prevUserInfo !== undefined && nextUserInfo !== null && nextUserInfo !== undefined) {
      if (prevUserInfo.name !== nextUserInfo.name || 
          prevUserInfo.tellNo !== nextUserInfo.tellNo || 
          prevUserInfo.birthDt !== nextUserInfo.birthDt ||
          prevUserInfo.address !== nextUserInfo.address ||
          prevUserInfo.addressNo !== nextUserInfo.addressNo ||
          prevUserInfo.balancePoint !== nextUserInfo.balancePoint) {
        storage.remove('loggedInfo');
        storage.remove('compareInfo');
        storage.set('loggedInfo', nextUserInfo);
        // window.location.reload();
      }
    }
  }

  const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
  if(!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.
  // 회원 상태 재확인
  if (loggedInfo.activated === false) {
    window.alert('이용이 정지된 회원입니다.')
    storage.remove('loggedInfo');
    return window.location.reload();
  }
  if (loggedInfo.disabled === false) {
    window.alert('탈퇴한 회원입니다.')
    storage.remove('loggedInfo');
    return window.location.reload();
  }
  const token = storage.get('token');
  if(!token) return;
  getUser(loggedInfo.email, token).then(res => {
    if (res.data !== '') {
      storage.set('compareInfo', res.data);
      compareWithUserInfo(storage.get('loggedInfo'), storage.get('compareInfo'))
    } else {
      storage.remove('loggedInfo');
      storage.remove('token');
      window.alert('아이디가 존재하지 않습니다.')
      return window.location.reload();
    }
  }).catch(err => {
    console.log(err)
    storage.remove('loggedInfo');
    storage.remove('token');
    window.alert('로그인 세션이 만료되었습니다.\n다시 로그인 해주세요.')
    return window.location.reload();
  })
  
}
import axios from 'axios';
import config from '../../config';

// 공지사항 전체 목록 조회
export const getNoticeList = () => axios({
  method: 'GET',
  url: `${config.boardService}/notice/list`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
});

// 공지사항 단일 항목 조회
export const getNotice = (noticeSid) => axios({
  method: 'GET',
  url: `${config.boardService}/notice/${noticeSid}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
});

// 공지사항 등록
export const addNotice = (email, dto) => axios({
  method: 'POST',
  url: `${config.boardService}/notice/add/${email}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'noticeTitle': dto.noticeTitle,
    'noticeTxt': dto.noticeTxt,
    'reportingDt': dto.reportingDt,
    'noticeWriter': dto.noticeWriter,
  })
});

// 공지사항 수정
export const updateNotice = (noticeSid, email, dto) => axios({
  method: 'PUT',
  url: `${config.boardService}/notice/update/${email}/${noticeSid}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'noticeTitle': dto.noticeTitle,
    'noticeTxt': dto.noticeTxt,
    'reportingDt': dto.reportingDt,
    'noticeWriter': dto.noticeWriter,
  })
});

// 공지사항 삭제
export const deleteNotice = (noticeSid) => axios({
  method: 'DELETE',
  url: `${config.boardService}/notice/delete/${noticeSid}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
});

// 공지사항 선택삭제
export const deleteNoticeList = (selectNoticeSidList) => axios({
  method: 'DELETE',
  url: `${config.boardService}/notice/delete/list`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify(selectNoticeSidList)
});
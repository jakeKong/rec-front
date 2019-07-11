import axios from 'axios';
import config from '../../config';

// 타일뉴스 전체 목록 조회
export const getBlogTylenewsList = () => axios({
  method: 'GET',
  url: `${config.blogService}/tylenews/list`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
});

// 타일뉴스 조건별 목록 조회
export const getBlogTylenewsListBySpec = (search) => axios({
  method: 'POST',
  url: `${config.blogService}/tylenews/list/search`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'tylenewsTitle': search.tylenewsTitle,
    'tylenewsSubtitle': search.tylenewsSubtitle,
    'tylenewsWriter': search.tylenewsWriter,
    'fromDt': search.fromDt,
    'toDt': search.toDt,
    'tylenewsVisibility': search.tylenewsVisibility,
  })
});

// 타일뉴스 등록
export const addBlogTylenews = (dto) => axios({
  method: 'POST',
  url: `${config.blogService}/tylenews/add`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'tylenewsImg': dto.img,
    'tylenewsLink': dto.link,
    'tylenewsTitle': dto.title,
    'tylenewsSubtitle': dto.subTitle,
    'tylenewsWriter': dto.writer,
    'tylenewsWriteDt': dto.writeDt,
    'tylenewsVisibility': dto.visibility,
  })
});

// 타일뉴스 수정
export const updateBlogTylenews = (tylenewsSid, dto) => axios({
  method: 'PUT',
  url: `${config.blogService}/tylenews/update/${tylenewsSid}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify({
    'tylenewsImg': dto.img,
    'tylenewsLink': dto.link,
    'tylenewsTitle': dto.title,
    'tylenewsSubtitle': dto.subTitle,
    'tylenewsWriter': dto.writer,
    'tylenewsWriteDt': dto.writeDt,
    'tylenewsVisibility': dto.visibility,
  })
});

export const updateBlogTylenewsVisibility = (tylenewsSid, tylenewsVisibility) => axios({
  method: 'PUT',
  url: `${config.blogService}/tylenews/update/visibility/${tylenewsSid}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify(tylenewsVisibility)
});

// 타일뉴스 삭제
export const deleteBlogTylenews = (tylenewsSid) => axios({
  method: 'DELETE',
  url: `${config.blogService}/tylenews/delete/${tylenewsSid}`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
});

// 타일뉴스 선택삭제
export const deleteBlogTylenewsByList = (selectBlogTylenewsSidList) => axios({
  method: 'DELETE',
  url: `${config.blogService}/tylenews/delete/list`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  },
  data: JSON.stringify(selectBlogTylenewsSidList)
});
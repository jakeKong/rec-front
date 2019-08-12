import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { fromJS } from 'immutable';
import storage from './common/storage';

import { MainPage, NotFoundPage, LoginPage, RegisterPage, IdPwFindPage, NaverCallbackLogPage, NaverCallbackRegPage, 
         Popup_BetaTestNotificationPage } from './common';
import { BlogTyleNewsPage, BlogTyleNewsManagePage } from './blog';
import { UserManagePage, UserDetailPage } from './scm';
import { OrderHistoryPage, OrderHistoryByEmailPage, /*ReportMakeHistoryPage,*/ ChangePointHistoryPage, ChangePointHistoryByEmailPage, ProductManagePage } from './oms';
import { NoticePage, NoticeDetailPage, NoticeRegisterPage, NoticeUpdatePage, NoticeManagePage, 
         QuestionPage, QuestionDetailPage, QuestionRegisterPage, QuestionUpdatePage, QuestionManagePage } from './bms';
import { PaymentPage } from './payment';
import { BrRecapTitleInfoPage, LandInfoViewPage } from './mpa';

import { getUser } from './scm';

class App extends Component {
  
  initializeUserInfo = () => {
    const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if(!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.
    const token = storage.get('token');
    if(!token) return;
    getUser(loggedInfo.email, token).then(res => {
      if (res.data !== '') {
        storage.set('compareInfo', fromJS(res.data));
        this.compareWithUserInfo(storage.get('loggedInfo'), storage.get('compareInfo'))
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

  compareWithUserInfo(prevUserInfo, nextUserInfo) {
    if (prevUserInfo.name !== nextUserInfo.name || 
        prevUserInfo.tellNo !== nextUserInfo.tellNo || 
        prevUserInfo.birthDt !== nextUserInfo.birthDt ||
        prevUserInfo.address !== nextUserInfo.address ||
        prevUserInfo.addressNo !== nextUserInfo.addressNo ||
        prevUserInfo.balancePoint !== nextUserInfo.balancePoint) {
      storage.remove('loggedInfo');
      storage.remove('compareInfo');
      storage.set('loggedInfo', nextUserInfo);
      window.location.reload();
    }
  }

  componentDidMount() {
    this.initializeUserInfo();
  }

  render() {
    return (
      <Switch>
        {/* 홈 */}
        <Route exact path="/" component={MainPage} />
  
        {/* 로그인 */}
        <Route exact path="/login/" component={LoginPage} />
        {/* BY NAVER 로그인 */}
        <Route exact path="/login/:email" component={LoginPage} />
        {/* 회원가입 */}
        <Route exact path="/register" component={RegisterPage} />
        {/* BY NAVER 회원가입 */}
        <Route exact path="/register/:userinfo" component={RegisterPage} />
        {/* 아이디/비밀번호 찾기 */}
        <Route exact path="/user/findhelp" component={IdPwFindPage} />
        {/* NAVER LOG POPUP */}
        <Route exact path="/naver/log/pop" component={NaverCallbackLogPage} />
        {/* NAVER REG POPUP */}
        <Route exact path="/naver/reg/pop" component={NaverCallbackRegPage} />
        
        {/* 블로그 */}
        <Route exact path="/blog/tyle" component={BlogTyleNewsPage} />
        {/* 블로그 관리 */}
        <Route exact path="/blog/tyle/manage" component={BlogTyleNewsManagePage} />
  
        {/* 주택정보 조회 */}
        <Route exact path="/mpa" component={LandInfoViewPage} />
  
        {/* 사용자 관리 */}
        <Route exact path="/scm/user/manage" component={ UserManagePage }/>
        {/* 회원정보 */}
        <Route exact path="/user/details" component={ UserDetailPage }/>
  
        {/* 주문내역 조회(고객) */}
        <Route exact path="/oms/order/history/email" component={ OrderHistoryByEmailPage }/>
        {/* 주문내역 관리(관리자) */}
        <Route exact path="/oms/order/history" component={ OrderHistoryPage }/>
        {/* 보고서 생성이력 조회(관리자) */}
        {/* <Route exact path="/oms/reportmake/history" component={ ReportMakeHistoryPage }/> */}
        {/* 포인트 변동내역 조회(고객) */}
        <Route exact path="/oms/changepoint/history/email" component={ ChangePointHistoryByEmailPage }/>
        {/* 포인트 변동내역 관리(관리자) */}
        <Route exact path="/oms/changepoint/history" component={ ChangePointHistoryPage }/>
  
        {/* 상품 관리 */}
        <Route exact path="/oms/product" component={ ProductManagePage }/>
  
        {/* 공지사항 */}
        <Route exact path="/bms/notice" component={ NoticePage }/>
        {/* 공지사항 상세조회 */}
        <Route exact path="/bms/notice/details/:sid" component={ NoticeDetailPage }/>
        {/* 공지사항 등록 */}
        <Route exact path="/bms/notice/register" component={ NoticeRegisterPage }/>
        {/* 공지사항 수정 */}
        <Route exact path="/bms/notice/update/:sid" component={ NoticeUpdatePage }/>
        {/* 공지사항 관리 */}
        <Route exact path="/bms/notice/manage" component={ NoticeManagePage }/>
        {/* 문의사항 */}
        <Route exact path="/bms/question" component={ QuestionPage }/>
        {/* 문의사항 상세조회*/}
        <Route exact path="/bms/question/details/:sid" component={ QuestionDetailPage }/>
        {/* 문의사항 등록*/}
        <Route exact path="/bms/question/register" component={ QuestionRegisterPage }/>
        {/* 문의사항 수정*/}
        <Route exact path="/bms/question/update/:sid" component={ QuestionUpdatePage }/>
        {/* 문의사항 관리 */}
        <Route exact path="/bms/question/manage" component={ QuestionManagePage }/>

        <Route exact path="/bms/notice/list" component={ NoticePage }/>
        <Route exact path="/bms/notice/manage/list" component={ NoticeManagePage }/>
        
        <Route exact path="/mpa/recaptitle/list" component={ BrRecapTitleInfoPage }/>
        {/* 상품 구매 */}
        <Route exact path="/payment/product" component={ PaymentPage }/>

        {/* 베타테스트 안내 팝업 */}
        <Route exact path="/pop/betatest/notification" component={ Popup_BetaTestNotificationPage }/>
  
        <Route component={NotFoundPage}/>
      </Switch>
    );
  };
}

export default App;
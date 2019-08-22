import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LandInfoViewModule, * as landInfoViewActions from "../modules/LandInfoViewModule";
import { LandInfoView } from "../index";
import { AddressSearch } from '../../common';
import '@vaadin/vaadin-button';
import customTheme from '../../styles/agz/landInfo_suggest_thema.css';
import LandInfoOrderCommentPopup from "../components/LandInfoOrderCommentPopup";

import storage from '../../common/storage';

//해당 주소의 주문 버튼 visible 속성 제어
let enabled = 'none';
//현재는 큰 의미 없는 값이며, 원래 목적은 메인화면에서 주소검색을 한건지, 현재 화면에서 한건지 여부를 판별하기 위해서 사용한 필드
let isSearched = false;
class LandInfoViewContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        jibunAddr: '',
        roadAddr: '',
        pnu: '1111111111111111111',
        comment: '',
        userId: 'user@test.com',
        userNm: '사용자',
        mngNo: '',
      },
      selectedSuggestion: null,
      popupOpened: false,
    }; 
    this.makeLandInfo = this.makeLandInfo.bind(this);    
    this.popupOpenStateEvent = this.popupOpenStateEvent.bind(this);
    
    this.enabled = 'none';
  }
  
  popupClose = async (dataClickChild) => {
    this.setState({popupOpened: dataClickChild});
  }
  popupOpenStateEvent() {
    this.setState({popupOpened: true});
  }
  
  popupCallback = async(comment) => {
    
    if (storage.get('loggedInfo')) {
      this.setState ({
        search: {
          jibunAddr: this.state.search.jibunAddr,
          roadAddr: this.state.search.roadAddr,
          pnu: this.state.search.pnu,
          comment: comment,
          userId: storage.get('loggedInfo').email,
          userNm: storage.get('loggedInfo').name,
          mngNo: this.state.search.mngNo,
        }
      });
      // console.log(this.state.search);
      this.makeLandInfo(this.state.search);
      //초기화
      this.setState ({
        search: {
          jibunAddr: '',
          roadAddr: '',
          pnu: '1111111111111111111',
          comment: '',
          userId: storage.get('loggedInfo').email,
          userNm: storage.get('loggedInfo').name,
          mngNo: '',
        },
        selectedSuggestion: null,
        popupOpened: false,
      });

    }
    else {
      //얼럿
    }
    //name, email, balancePoint
    
  }
  
  popupAddAndUpdateCheckOpenEvent(popupOpened) {
    return <LandInfoOrderCommentPopup popupCallback={ this.popupCallback } popupOpened={ popupOpened } popupClose={ this.popupClose }/>      
  }
  
  //주문번호를 state에 기록해 놓기 위해서 VIEW 화면에서 주문번호 MNGNO를 넘겨 받았음
  analysisReturnedCallback = (mngNo) =>{    
    //setState에 mngNo만 넣으니, 나머지 값이 다 날라가더라.
    this.setState ({
      search: {
        jibunAddr: this.state.search.jibunAddr,
        roadAddr: this.state.search.roadAddr,
        pnu: this.state.search.pnu,
        mngNo: mngNo,
      }
    });
    //console.log(this.state.search);
  }
  
  //우편번호 검색이 끝났을 때 사용자가 선택한 정보를 받아올 콜백함수
  onComplete  = async (selectedSuggestion) => {    
    
    // state.search 값 초기화
    this.setState({
      search: {
        jibunAddr: selectedSuggestion.jibunAddr,
        roadAddr: selectedSuggestion.roadAddr,
        pnu: selectedSuggestion.bdMgtSn,
        comment: '',
      }
    });
    this.enabled = 'none';
  }
  onSearchClick = async (selectedSuggestion) => { 
    //로그인 하지 않았으면 PDF 주문 버튼 활성화
    if (storage.get('loggedInfo')) {
      this.enabled = 'inline-block';
    }
    //로그인 하지 않았으면 PDF 주문 버튼 비활성화
    else {
      
      this.enabled = 'none';
    }
    //부동산 정보 검색 API 호출
    this.getLandInfo(this.state.search);
    
  }

  //부동산 정보 검색 API 호출 함수
  getLandInfo = async (search) => {
    const { LandInfoViewModule } = this.props;
    if(search.pnu !== '1111111111111111111') isSearched = true;
    try {
      //
      if (storage.get('loggedInfo')) {
        this.enabled = 'inline-block';
      }
      await LandInfoViewModule.getLandInfo(search);
    } catch (e) {
      console.log("error log : " + e);
    }
  }
  //PDF 주문 API 호출 함수
  makeLandInfo = async (search) => {
    const { LandInfoViewModule } = this.props;
    try {
      await LandInfoViewModule.makeLandInfo(search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

// 마운트 직후 한번 (rendering 이전, 마운트 이후의 작업)
  componentDidMount() {
    //주문버튼 설정
    
    const popupOpenStateEvent = this.popupOpenStateEvent;
    const btnMakePdf = document.querySelector('#btnMakePdf');
    btnMakePdf.innerHTML = '주문';
    btnMakePdf.addEventListener('click', function() {
      popupOpenStateEvent();
    });

    //로그인 하지 않았으면 PDF 버튼 비활성화
    if (!storage.get('loggedInfo')) {
      this.enabled = 'none';
    }
    else {
      this.enabled = 'inline-block';
    }
    
    //MAIN 화면 혹은 기타 화면으로 부터 넘어온 주소검색 결과가 있는지 확인한여 처리한다.
    if(this.props.postStat !== undefined) {
      const {selectedSuggestion} = this.props.postStat;
      isSearched = false;
      this.setState({
        search: {
          jibunAddr: selectedSuggestion.jibunAddr,
          roadAddr: selectedSuggestion.roadAddr,
          pnu: selectedSuggestion.bdMgtSn.substring(0,19),
          comment: '',
        },
        selectedSuggestion: {selectedSuggestion}
      });
      const searchKey = {
        jibunAddr: selectedSuggestion.jibunAddr,
        roadAddr: selectedSuggestion.roadAddr,
        pnu: selectedSuggestion.bdMgtSn.substring(0,19)
      };
      this.getLandInfo(searchKey);
    }
    //이전 화면에서 넘어온 값이 아닌경우
    else {
      if(this.state.search.pnu !== '1111111111111111111') this.getLandInfo(this.state.search);
    }
       
  }
  
  render() {
    const { pending, error, landInfoData } = this.props;
    const { popupOpened } = this.state;
    return (
      <Fragment>
        <div >
          <div className="searchbox">
            <AddressSearch onComplete={this.onComplete} onSearchClick={this.onSearchClick} theme={customTheme} btnClassName='button-address-search'/>
          </div>
          <div style={{marginTop:'2px'}}>
            {pending && <div className="boxLoading" />}
            {error && <h1>Server Error!</h1>}
            {!pending && !error && <LandInfoView landInfoData={landInfoData} isSearched={isSearched} analysisReturnedCallback={this.analysisReturnedCallback}/>}
          </div>
          <div style={{ display: this.enabled, textAlign: 'right', marginLeft: '85%'}}>
            <vaadin-button id="btnMakePdf"/>
          </div>
          { isSearched === true && popupOpened === true &&
            <script>
              {this.popupAddAndUpdateCheckOpenEvent(popupOpened)};
            </script>
          }
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    landInfoData: state.landInfo.landInfoData,
    pending: state.landInfo.pending,
    error: state.landInfo.error,
    success: state.landInfo.success,
    complete: state.landInfo.complete
  }),
  dispatch => ({
    LandInfoViewModule: bindActionCreators(landInfoViewActions, dispatch)
  })
)(LandInfoViewContainer);
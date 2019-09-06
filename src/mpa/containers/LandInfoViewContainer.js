import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as landInfoViewActions from "../modules/LandInfoViewModule";
import { LandInfoView } from "../index";
import { AddressSearch } from '../../common';
import '@vaadin/vaadin-button';
import customTheme from '../../styles/agz/landInfo_suggest_thema.css';
import LandInfoOrderCommentPopup from "../components/LandInfoOrderCommentPopup";
import LandInfoResultPop from '../components/LandInfoResultPop';

import storage from '../../common/storage';

import axios from 'axios';
import config from '../../config';

import { checkInfo } from '../../common/loggedInfoCheck'
import '@vaadin/vaadin-notification';

import { getDefaultPointList } from '../../oms/setupPoint';

let moment = require("moment");
//해당 주소의 주문 버튼 visible 속성 제어
// let enabled = 'none';
//현재는 큰 의미 없는 값이며, 원래 목적은 메인화면에서 주소검색을 한건지, 현재 화면에서 한건지 여부를 판별하기 위해서 사용한 필드
let isSearched = false;
// let result = null;
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
      },
      pricePoint: undefined,
      commentRes: '',
      mngNo: '',
      selectedSuggestion: null,
      popupOpened: false,
      purchaseResult: undefined
    }; 
    this.makeLandInfo = this.makeLandInfo.bind(this);    
    this.popupOpenStateEvent = this.popupOpenStateEvent.bind(this);
    this.makePdfResultCheckEvent = this.makePdfResultCheckEvent.bind(this);

    this.resetResult = this.resetResult.bind(this);
    
    this.enabled = 'none';
  }
  
  popupClose = async (dataClickChild) => {
    this.setState({popupOpened: dataClickChild});
  }
  popupOpenStateEvent() {
    const { mngNo } = this.state;
    const { pending } = this.props;
    if (pending === true) {
      window.alert('로딩중인 정보가 존재합니다.\n잠시 후 다시 시도해주세요.')
      return
    }
    // const btnMakePdf = document.querySelector('#btnMakePdf');
    if (mngNo !== '' && mngNo !== undefined) {
      // btnMakePdf.className = "btn-make-pdf-abled"
      // if (storage.get('loggedInfo').balancePoint-900 < 0) {
      if (storage.get('loggedInfo').balancePoint-this.state.pricePoint < 0) {
        window.alert('포인트가 부족합니다.\n포인트 충전 후 이용해주세요.')
        return;
      }
      this.setState({popupOpened: true});
    } else {
      const nfLoadingData = document.createElement('vaadin-notification');
      nfLoadingData.renderer = function(root) {
        root.textContent = '주문정보가 존재하지 않습니다.';
      }
      document.body.appendChild(nfLoadingData);
      nfLoadingData.position = 'middle';
      nfLoadingData.duration = 2000;
      nfLoadingData.opened = true;
      window.setTimeout(function() {
        nfLoadingData.remove();
      }, 2000)
      // btnMakePdf.className = "btn-make-pdf-disabled"
    }
  }
  
  popupCallback = async(comment) => {
    // 팝업창에서 코멘트 값 받아온 뒤 PDF 파일 생성
    if (storage.get('loggedInfo')) {
      // 팝업창에서 다운로드 버튼 클릭 시 PDF URL호출 (새창)
      // 포인트 잔액 확인 -> pdf 생성 호출 -> 결과 리턴 -> 차감 -> 포인트 변동내역 추가 -> 결과 팝업 -> 다운로드 기능
      // if (storage.get('loggedInfo').balancePoint-900 < 0) {
      if (storage.get('loggedInfo').balancePoint-this.state.pricePoint < 0) {
        window.alert('포인트가 부족합니다.\n포인트 충전 후 이용해주세요.')
        return;
      }
      // 주문번호 존재여부 재확인
      if (this.state.mngNo !== '' && this.state.mngNo !== undefined) {
        let makeLandIndexValue = {
          jibunAddr: this.state.search.jibunAddr,
          roadAddr: this.state.search.roadAddr,
          pnu: this.state.search.pnu,
          comment: comment,
          userId: storage.get('loggedInfo').email,
          userNm: storage.get('loggedInfo').name,
          mngNo: this.state.mngNo,
        }
        this.setState({commentRes: comment})
        this.makeLandInfo(makeLandIndexValue);
      }
    }
    else {
      //얼럿
    }
    //name, email, balancePoint
    
  }
  
  popupAddAndUpdateCheckOpenEvent(popupOpened) {
    const { search, mngNo } = this.state;
    if (mngNo !== '' && mngNo !== undefined) {
      let result = {
        jibunAddr: search.jibunAddr,
        roadAddr: search.roadAddr,
        pnu: search.pnu,
        comment: search.comment,
        userId: search.userId,
        userNm: search.userNm,
        mngNo: mngNo
      }
      return <LandInfoOrderCommentPopup popupCallback={ this.popupCallback } popupOpened={ popupOpened } popupClose={ this.popupClose } result={result}/>      
    } else {
      window.alert('주문에 대한 시세조회가 정상적으로 처리되지 않았습니다.\n확인 후 다시 시도해주세요.')
      return;
    }
  }
  
  //주문번호를 state에 기록해 놓기 위해서 VIEW 화면에서 주문번호 MNGNO를 넘겨 받았음
  analysisReturnedCallback = (mngNo) =>{    
    this.setState ({mngNo: mngNo});
  }
  
  //우편번호 검색이 끝났을 때 사용자가 선택한 정보를 받아올 콜백함수
  onComplete  = async (selectedSuggestion) => {    
    // 선택이 되면 들어오는 함수
    this.setState({selectedSuggestion: selectedSuggestion})
    // state.search 값 초기화
    this.setState({
      search: {
        jibunAddr: selectedSuggestion.jibunAddr,
        roadAddr: selectedSuggestion.roadAddr,
        pnu: selectedSuggestion.bdMgtSn,
        // comment: '',
      }
    });
    if (selectedSuggestion !== undefined) {
      let nowCallSearchValue = {
        jibunAddr: selectedSuggestion.jibunAddr,
        roadAddr: selectedSuggestion.roadAddr,
        pnu: selectedSuggestion.bdMgtSn.substring(0,19),
        userId: storage.get('loggedInfo') ? storage.get('loggedInfo').email : null,
        userNm: storage.get('loggedInfo') ? storage.get('loggedInfo').name : null,
      }
      this.getLandInfo(nowCallSearchValue);
    }
  
    this.enabled = 'none';
    
  }
  onSearchClick = async (selectedSuggestion) => { 
    if (this.state.selectedSuggestion !== null && selectedSuggestion !== undefined) {
      let searchValue = {
        jibunAddr: this.state.selectedSuggestion.jibunAddr,
        roadAddr: this.state.selectedSuggestion.roadAddr,
        pnu: this.state.selectedSuggestion.pnu.substring(0,19),
        userId: storage.get('loggedInfo') ? storage.get('loggedInfo').email : null,
        userNm: storage.get('loggedInfo') ? storage.get('loggedInfo').name : null,
      }
      //부동산 정보 검색 API 호출
      this.getLandInfo(searchValue);
    } else {
      window.alert('시세 조회를 원하는 주소를 입력해주세요.')
    }
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

    getDefaultPointList().then(res => {
      this.setState({pricePoint: res.data[0].pricePoint})
    }).catch(err => {
      console.log(err)
      throw(err);
    });

    //로그인 하지 않았으면 PDF 버튼 비활성화
    if (!storage.get('loggedInfo')) {
      this.enabled = 'none';
      btnMakePdf.className = "btn-make-pdf-disabled"
      btnMakePdf.addEventListener('click', function() {
        window.alert('로그인 이후 시세 주문이 가능합니다.')
      });
    }
    else {
      btnMakePdf.className = "btn-make-pdf-abled"
      this.enabled = 'inline-block';
      btnMakePdf.addEventListener('click', function() {
        popupOpenStateEvent();
      });
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
        pnu: selectedSuggestion.bdMgtSn.substring(0,19),
        userId: storage.get('loggedInfo') ? storage.get('loggedInfo').email : null,
        userNm: storage.get('loggedInfo') ? storage.get('loggedInfo').name : null,
      };
      this.getLandInfo(searchKey);
    }
    //이전 화면에서 넘어온 값이 아닌경우
    else {
      if(this.state.search.pnu !== '1111111111111111111') this.getLandInfo(this.state.search);
    }
  }

  makePdfResultCheckEvent(makeResult) {
    if (makeResult !== undefined) {
      if (makeResult === '파일 생성 실패') {
        window.alert('파일 생성에 실패하였습니다.\n관리자에게 문의해주세요.');
      } else {
        const token = storage.get('token');
        // 실제 결제 취소 내용 추가 필요 (or 관리자의 결제 취소로 재변경)
        // this.updateChangePointHistoryActivated(dto.changePointSid, false);
        // addOrderHistory = mpa api에서 처리
        axios({
          method: 'POST',
          url: `${config.orderService}/order/history/add/${storage.get('loggedInfo').email}`,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
          // data: JSON.stringify(900)
          data: JSON.stringify({
            'odrNo': this.state.mngNo,
            'odrDt': moment(),
            'marketPrice': 0,
            'variationPoint': this.state.pricePoint,
            'realEstateType': 'ALL',
            'downloadEndDt': null,
            'downloadCnt': 0,
            'pnuNo': this.state.search.pnu,
            'pdfFileNm': '/'+makeResult,
            'status': 'TRADE_COMPLETE',
            'activated': true,
            'jibunAddr': this.state.search.jibunAddr
          })
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
        axios({
          method: 'PUT',
          url: `${config.systemService}/user/${storage.get('loggedInfo').email}/update/balancepoint/difference`,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          // data: JSON.stringify(900)
          data: JSON.stringify(this.state.pricePoint)
        }).then(res => {
          console.log(res)
          axios({
            method: 'POST',
            url: `${config.orderService}/changepoint/history/add/${storage.get('loggedInfo').email}`,
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json'
            },
            data: JSON.stringify({
              'changeDt': moment(),
              'paymentCash': null,
              'changeType': 'PURCHASE_ADD',
              // 'changePoint': 900,
              'changePoint': this.state.pricePoint,
              // 'currentBalPoint': storage.get('loggedInfo').balancePoint-900,
              'currentBalPoint': storage.get('loggedInfo').balancePoint-this.state.pricePoint,
              'odrNo': this.state.mngNo,
              'paymentNo': null,
              'activated': true
            })
          }).then(res => {
            console.log(res)
            let result = {
              jibunAddr: this.state.search.jibunAddr,
              mngNo: this.state.mngNo,
              // usedPoint: 900+'P',
              usedPoint: this.state.pricePoint+'P',
              // balancePoint: storage.get('loggedInfo').balancePoint-900,
              balancePoint: storage.get('loggedInfo').balancePoint-this.state.pricePoint,
              comment: this.state.commentRes,
              downloadPdfUrl: makeResult
            }
            this.setState({purchaseResult: result})
          }).catch(err => {
            console.log(err)
            window.alert('주문에 실패하였습니다. 확인 후 다시 시도해주세요.')
          })
        }).catch(err => {
          console.log(err)
          window.alert('주문에 실패하였습니다. 확인 후 다시 시도해주세요.')
        })
      }
    }
  }

  resetResult() {
    this.setState({purchaseResult: undefined})
    this.setState({mngNo: ''})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.makeResult !== undefined) {
      this.makePdfResultCheckEvent(nextProps.makeResult)
    }
  }

  render() {
    const { pending, error, landInfoData } = this.props;
    const { popupOpened, purchaseResult } = this.state;
    checkInfo();

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
          <div style={{textAlign: 'right', marginLeft: '85%'}}>
            <vaadin-button id="btnMakePdf"/>
          </div>
          { isSearched === true && popupOpened === true &&
            <script>
              {this.popupAddAndUpdateCheckOpenEvent(popupOpened)};
            </script>
          }
        </div>
        <LandInfoResultPop result={purchaseResult} resetResult={this.resetResult}/>
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
    complete: state.landInfo.complete,
    makeResult: state.landInfo.makeResult,
  }),
  dispatch => ({
    LandInfoViewModule: bindActionCreators(landInfoViewActions, dispatch)
  })
)(LandInfoViewContainer);
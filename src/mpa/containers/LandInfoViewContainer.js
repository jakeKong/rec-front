import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LandInfoViewModule, * as landInfoViewActions from "../modules/LandInfoViewModule";
import { LandInfoView } from "../index";
import { AddressSearch } from '../../common';
import '@vaadin/vaadin-button';

let enabled = false;
let searchKey;
let IMP = null;
class LandInfoViewContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        jibunAddr: '',
        roadAddr: '',
        pnu: '11111111111111111111'
      },
    };
    this.makeLandInfo = this.makeLandInfo.bind(this);
    
    this.getLandInfo(this.state.search);
    IMP = window.IMP;
  }
  isDisabled = () => {
    return enabled;
  }
  //우편번호 검색이 끝났을 때 사용자가 선택한 정보를 받아올 콜백함수
  onComplete  = async (selectedSuggestion) => {    
    
    // state.search 값 초기화
    this.setState({
      search: {
        jibunAddr: selectedSuggestion.jibunAddr,
        roadAddr: selectedSuggestion.roadAddr,
        pnu: selectedSuggestion.bdMgtSn
      }
    });

    searchKey = {
      jibunAddr: selectedSuggestion.jibunAddr,
      roadAddr: selectedSuggestion.roadAddr,
      pnu: selectedSuggestion.bdMgtSn
    };
    this.enabled = false;
  }
  onSearchClick = async (selectedSuggestion) => { 
    this.getLandInfo(this.state.search);
    this.enabled = true;
  }

  getLandInfo = async (search) => {
    const { LandInfoViewModule } = this.props;
    try {
      await LandInfoViewModule.getLandInfo(search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }
  makeLandInfo = async (search) => {
    // const { LandInfoViewModule } = this.props;
    // try {
    //   await LandInfoViewModule.makeLandInfo(search)
    // } catch (e) {
    //   console.log("error log : " + e);
    // }
    IMP.init('imp74972676');
     // IMP.request_pay(param, callback) 호출
    IMP.request_pay({ // param
      pg: "kcp.A52CY",
      pay_method: "card",
      merchant_uid: "ORD20180131-0000011",
      name: "노르웨이 회전 의자",
      amount: 64900,
      buyer_email: "gildong@gmail.com",
      buyer_name: "홍길동",
      buyer_tel: "010-4242-4242",
      buyer_addr: "서울특별시 강남구 신사동",
      buyer_postcode: "01181"
    }, rsp => { // callback
      console.log(rsp);
      if (rsp.success) {
          console.log(rsp.success);
      } else {
          console.log('결제 실패');
      }
    });
  }

// 마운트 이전 권한 체크

  // componentDidMount() {
  //   const { search } = this.state;
  //   const { landInfo } = this.props;
  //     if(!landInfo || landInfo === undefined || landInfo.isEmpty()) {
  //       this.getLandInfo(search);
  //     }
  // }
// 마운트 직후 한번 (rendering 이전, 마운트 이후의 작업)
  componentDidMount() {
  const { landInfoData } = this.props;
    // if(!landInfoData || landInfoData === undefined || landInfoData.isEmpty()) {
    //   this.getLandInfo(search);
    // }
    
    const makeLandInfo = this.makeLandInfo;
    const btnMakePdf = document.querySelector('#btnMakePdf');
    btnMakePdf.innerHTML = '주문'
    btnMakePdf.addEventListener('click', function() {
      makeLandInfo(searchKey);
    })
  }
  
  render() {
    const { pending, error, success, landInfoData } = this.props;
    return (
      <Fragment>
        <div>
          <div className="div-search"><AddressSearch onComplete={this.onComplete} onSearchClick={this.onSearchClick} /></div>
          <div>
            {pending && <div className="boxLoading" />}
            {error && <h1>Server Error!</h1>}
            {success && <LandInfoView landInfoData={landInfoData}/>}
          </div>
          <div style={{ display: 'inline-block', textAlign: 'right', marginLeft: '85%'}}>
            <vaadin-button id="btnMakePdf"/>
          </div>
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
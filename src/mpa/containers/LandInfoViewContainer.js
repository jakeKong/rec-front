import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LandInfoViewModule, * as landInfoViewActions from "../modules/LandInfoViewModule";
import { LandInfoView } from "../index";
import { AddressSearch } from '../../common';

class LandInfoViewContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        jibunAddr: '서울특별시 광진구 능동 260-3',
        roadAddr: '서울특별시 광진구 능동로32길 31(능동)',
        pnu: '1121510200102600003'
      },
    };
    
    //this.getLandInfo(this.state.search);
  }
 
  //우편번호 검색이 끝났을 때 사용자가 선택한 정보를 받아올 콜백함수
  onComplete  = async (selectedSuggestion) => {    
    console.log(selectedSuggestion); 
    console.log(selectedSuggestion.jibunAddr); 
    console.log(selectedSuggestion.roadAddr); 
    //41281 10100 1 0350 0001 014742
    // console.log(selectedSuggestion.bdMgtSn.substring(0,5));
    // console.log(selectedSuggestion.bdMgtSn.substring(5,10));
    // console.log(selectedSuggestion.bdMgtSn.substring(10,11));
    // console.log(selectedSuggestion.bdMgtSn.substring(11,15));
    // console.log(selectedSuggestion.bdMgtSn.substring(15,19));
    // console.log(selectedSuggestion.bdMgtSn.substring(0,19));
    
    // state.search 값 초기화
    this.setState({
      search: {
        jibunAddr: selectedSuggestion.jibunAddr,
        roadAddr: selectedSuggestion.roadAddr,
        pnu: selectedSuggestion.bdMgtSn
      }
    });
  }
  onSearchClick = async (selectedSuggestion) => { 
    this.getLandInfo(this.state.search);
  }

  getLandInfo = async (search) => {
    const { LandInfoViewModule } = this.props;
    try {
      await LandInfoViewModule.getLandInfo(search)
    } catch (e) {
      console.log("error log : " + e);
    }
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
  onentDidMount() {
  const { search } = this.state;
  const { landInfoData } = this.props;
    if(!landInfoData || landInfoData === undefined || landInfoData.isEmpty()) {
      this.getLandInfo(search);
    }
  }

  

  
  render() {
    const { pending, error, success, landInfoData } = this.props;
    return (
      <Fragment>
        <div>
          <div className="div-search"><AddressSearch onComplete={this.onComplete} onSearchClick={this.onSearchClick} /></div>
          <div className="main-div">
            {pending && "Loading..."}
            {error && <h1>Server Error!</h1>}
            {success && <LandInfoView landInfoData={landInfoData}/>}
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
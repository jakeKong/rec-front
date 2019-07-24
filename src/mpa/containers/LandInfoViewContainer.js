import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LandInfoViewModule, * as landInfoViewActions from "../modules/LandInfoViewModule";
import { LandInfoView } from "../index";
import { AddressSearch } from '../../common';
import '@vaadin/vaadin-button';
import customTheme from '../../styles/agz/landInfo_suggest_thema.css';

let enabled = false;
let searchKey;

class LandInfoViewContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        jibunAddr: '',
        roadAddr: '',
        pnu: '1111111111111111111'
      },
      selectedSuggestion: null,
    };
    this.makeLandInfo = this.makeLandInfo.bind(this);
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
    const { LandInfoViewModule } = this.props;
    try {
      await LandInfoViewModule.makeLandInfo(search)
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
  componentDidMount() {
    //주문버튼 설정
    const makeLandInfo = this.makeLandInfo;
    const btnMakePdf = document.querySelector('#btnMakePdf');
    btnMakePdf.innerHTML = '주문'
    btnMakePdf.addEventListener('click', function() {
      makeLandInfo(searchKey);
    })
    
    //MAIN 화면 혹은 기타 화면으로 부터 넘어온 주소검색 결과가 있는지 확인한여 처리한다.
    if(this.props.postStat !== undefined) {
      const {selectedSuggestion} = this.props.postStat;
      
      this.setState({
        search: {
          jibunAddr: selectedSuggestion.jibunAddr,
          roadAddr: selectedSuggestion.roadAddr,
          pnu: selectedSuggestion.bdMgtSn.substring(0,18)
        },
        selectedSuggestion: {selectedSuggestion}
      });
      
      searchKey = {
        jibunAddr: selectedSuggestion.jibunAddr,
        roadAddr: selectedSuggestion.roadAddr,
        pnu: selectedSuggestion.bdMgtSn
      };
      this.getLandInfo(searchKey);
    }
    //이전 화면에서 넘어온 값이 아닌경우
    else {
      this.getLandInfo(this.state.search);
    }
    
    const { landInfoData } = this.props;
    // if(!landInfoData || landInfoData === undefined || landInfoData.isEmpty()) {
    //   this.getLandInfo(search);
    // }
    
  }
  
  render() {
    const { pending, error, success, landInfoData } = this.props;
    return (
      <Fragment>
        <div >
          <div className="searchbox">
            <AddressSearch onComplete={this.onComplete} onSearchClick={this.onSearchClick} theme={customTheme} btnClassName='button-address-search'/>
          </div>
          <div style={{marginTop:'2px'}}>
            {pending && <div className="boxLoading" />}
            {error && <h1>Server Error!</h1>}
            {!pending && !error && <LandInfoView landInfoData={landInfoData}/>}
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
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LandInfoViewModule, * as landInfoViewActions from "../modules/LandInfoViewModule";
import { LandInfoView } from "../index";

import '@vaadin/vaadin-ordered-layout';

class LandInfoViewContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        sigunguCd: '11410',
        bjdongCd: '11900',
        platGbCd: '0',
        bun: '0012',
        ji: '0000',
        pnu: '1111010100100010000'
      },
    };
    
    this.getLandInfo(this.state.search);
  }

  /* callback method
  -> searchComponent로부터 parameter를 전달받을 경우 현재 컴포넌트의 state.search에 전달받은 parameter값을 세팅하고
     rerendering을 위한 변경된 값으로의 REST API를 호출한다. 
       -> 호출 후 state.search값 초기화
  */
  searchCallback = async (dataSearchChild) => {
    this.setState({ search: dataSearchChild });

    const { search } = this.state;
    this.getLandInfo(search);
    // state.search 값 초기화
    this.setState({
      search: {
        'sigunguCd': search.sigunguCd,
        'bjdongCd': search.bjdongCd,
        'platGbCd': search.platGbCd,
        'bun': search.bun,
        'ji': search.ji,
        'pnu': search.pnu
      }
    });
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
  onentWillMount() {
  // 관리자 권한 체크 필요
  }

// 마운트 직후 한번 (rendering 이전, 마운트 이후의 작업)
  onentDidMount() {
  const { search } = this.state;
  const { landInfo } = this.props;
        if(!landInfo || landInfo === undefined || landInfo.isEmpty()) {
          this.getLandInfo(search);
        }
  }
  
  render() {
    const { pending, error, success } = this.props;
    return (
      <Fragment>
        <div className="main-div">
          {pending && "Loading..."}
          {error && <h1>Server Error!</h1>}
          {success && <LandInfoView />}
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    brRecapTitleInfoList: state.landInfo.landInfoData,
    pending: state.landInfo.pending,
    error: state.landInfo.error,
    success: state.landInfo.success,
    complete: state.landInfo.complete
  }),
  dispatch => ({
    LandInfoViewModule: bindActionCreators(landInfoViewActions, dispatch)
  })
)(LandInfoViewContainer);
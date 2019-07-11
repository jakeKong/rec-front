import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as brRecapTitleInfoActions from "../modules/BrRecapTitleInfoModule";
import { BrRecapTitleInfoGrid } from "../index";

import '@vaadin/vaadin-ordered-layout';

class BrRecapTitleInfoContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        sigunguCd: '11110',
        bjdongCd: '10100',
        platGbCd: '1',
        bun: '0004',
        ji: '0007',
        numOfRows: '1000'
      },
    };
    
    this.getBrRecapTitleInfoList(this.state.search);
  }

  /* callback method
  -> searchComponent로부터 parameter를 전달받을 경우 현재 컴포넌트의 state.search에 전달받은 parameter값을 세팅하고
     rerendering을 위한 변경된 값으로의 REST API를 호출한다. 
       -> 호출 후 state.search값 초기화
  */
  searchCallback = async (dataSearchChild) => {
    this.setState({ search: dataSearchChild });

    const { search } = this.state;
    this.getBrRecapTitleInfoList(search);
    // state.search 값 초기화
    this.setState({
      search: {
        sigunguCd: null,
        bjdongCd: null,
        platGbCd: null,
        bun: null,
        ji: null,
        numOfRows: null
      }
    });
  }

  getBrRecapTitleInfoList = async (search) => {
    const { BrRecapTitleInfoModule } = this.props;
    try {
      await BrRecapTitleInfoModule.getBrRecapTitleInfoList(search)
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
  const { brRecapTitleInfoList } = this.props;
        if(!brRecapTitleInfoList || brRecapTitleInfoList === undefined || brRecapTitleInfoList.isEmpty()) {
          this.getBrRecapTitleInfoList(search);
        }
  }
  
  render() {
    const { brRecapTitleInfoList, pending, error, success } = this.props;
    return (
      <Fragment>
        <div className="main-div">
          {pending && "Loading..."}
          {error && <h1>Server Error!</h1>}
          {success && <BrRecapTitleInfoGrid brRecapTitleInfoList={brRecapTitleInfoList} />}
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    brRecapTitleInfoList: state.bldRgst.titleList,
    pending: state.bldRgst.pending,
    error: state.bldRgst.error,
    success: state.bldRgst.success,
    complete: state.bldRgst.complete
  }),
  dispatch => ({
    BrRecapTitleInfoModule: bindActionCreators(brRecapTitleInfoActions, dispatch)
  })
)(BrRecapTitleInfoContainer);
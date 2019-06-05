import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as possessionActions from "../modules/possessionModule";
import { possessionGrid } from "../index";

import '@vaadin/vaadin-ordered-layout';

class possessionContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        pnu: '1111011000100010001',
        startDt: null,
        endDt: null,
        numOfRows: '1000'
      },
    };
    
    this.getpossessionList(this.state.search);
  }

  /* callback method
  -> searchComponent로부터 parameter를 전달받을 경우 현재 컴포넌트의 state.search에 전달받은 parameter값을 세팅하고
     rerendering을 위한 변경된 값으로의 REST API를 호출한다. 
       -> 호출 후 state.search값 초기화
  */
  searchCallback = async (dataSearchChild) => {
    this.setState({ search: dataSearchChild });

    const { search } = this.state;
    this.getpossessionList(search);
    // state.search 값 초기화
    this.setState({
      search: {
        pnu: '1111011000100010001',
        startDt: null,
        endDt: null,
        numOfRows: '1000'
      }
    });
  }

  getpossessionList = async (search) => {
    const { possessionModule } = this.props;
    try {
      await possessionModule.getpossessionList(search)
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
  const { possessionList } = this.props;
        if(!possessionList || possessionList === undefined || possessionList.isEmpty()) {
          this.getBrRecapTitleInfoList(search);
        }
  }
  
  render() {
    const { possessionList, pending, error, success } = this.props;
    return (
      <Fragment>
        <div className="main-div">
          {pending && "Loading..."}
          {error && <h1>Server Error!</h1>}
          {success && <possessionGrid possessionList={possessionList} />}
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    possessionList: state.possession.titleList,
    pending: state.possession.pending,
    error: state.possession.error,
    success: state.possession.success,
    complete: state.possession.complete
  }),
  dispatch => ({
    possessionModule: bindActionCreators(possessionActions, dispatch)
  })
)(possessionContainer);
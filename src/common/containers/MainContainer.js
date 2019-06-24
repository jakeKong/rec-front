import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mainActions from "../modules/MainModule";
import { MainGrid, MainSearch } from "../index";

class MainContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getHomeList = async () => {
    const { MainModule } = this.props;
    try {
      await MainModule.getHomeList();
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 마운트 직후 한번 (rendering 이전 마운트 이후의 작업)
  componentDidMount() {
    // 초기 GRID 세팅
    const { homeList } = this.props;
    if (!homeList || homeList === undefined || homeList.isEmpty()) {
      this.getHomeList();
    }
  }

  render() {
    const { homeList, pending, error, success } = this.props;
    return (
      <Fragment>
        <div>
          <div className="div-home-search">
            <MainSearch />
          </div>
          <div className="div-main">
            { pending && "Loading..." }
            { error && <h1>Server Error!</h1> }
            { success && <MainGrid homeList={ homeList } />}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    homeList: state.main.homeList,
    pending: state.main.pending,
    error: state.main.error,
    success: state.main.success,
  }),
  dispatch => ({
    MainModule: bindActionCreators(mainActions, dispatch)
  })
)(MainContainer);
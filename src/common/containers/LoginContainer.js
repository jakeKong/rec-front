import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// eslint-disable-next-line
import { bindActionCreators } from "redux";
// import * as loginActions from "../modules/LoginModule";
import { Login } from "../index";

class LoginContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  /*
  login = async () => {
    const { LoginModule } = this.props;
    try {
      await LoginModule.login();
    } catch (e) {
      console.log("error log : " + e);
    }
  }
  */

  // 마운트 직후 한번 (rendering 이전 마운트 이후의 작업)
  componentDidMount() {

  }

  render() {
    // const { pending, error, success } = this.props;
    return (
      <Fragment>
        <div className="div-login">
          <Login />
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    // pending: state.main.pending,
    // error: state.main.error,
    // success: state.main.success,
  }),
  dispatch => ({
    // LoginModule: bindActionCreators(loginActions, dispatch)
  })
)(LoginContainer);
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionActions from "../modules/QuestionModule";
import { QuestionRegister } from "../index";

import storage from '../../common/storage';

class QuestionUpdateContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
   
    }
  }

  componentDidMount() {
    const { questionSid } = this.props;
    this.getQuestion(questionSid);
  }

  // 문의사항 조회
  getQuestion = async (questionSid) => {
    const { QuestionModule } = this.props;
    try {
      await QuestionModule.getQuestion(questionSid)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  render() {
    const { question, pending, error, success } = this.props;

    if (storage.get('loggedInfo').assignedRoles.indexOf('ROLE_ADMIN') === -1) {
      if (question !== undefined) {
        if (question.email !== storage.get('loggedInfo').email) {
          window.alert('해당 페이지에 접근 할 수 없습니다.');
          window.location.href = '/bms/question';
        }
      }
    }

    return (
      <Fragment>
        <div>
          <div className="div-main">
          { pending && <div className="boxLoading"/> }
          { error && <h1>Server Error!</h1> }
          { success && <QuestionRegister registerToListCallback={ this.registerToListCallback } addCallback={ this.addCallback } questionDto={ question } updateCallback={ this.updateCallback } registerToDetailCallback={ this.registerToDetailCallback } /> }
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    question: state.question.question,
    pending: state.question.pending,
    error: state.question.error,
    success: state.question.success,
  }),
  dispatch => ({
    QuestionModule: bindActionCreators(questionActions, dispatch)
  })
)(QuestionUpdateContainer);
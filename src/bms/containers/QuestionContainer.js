import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionActions from "../modules/QuestionModule";
import { QuestionGrid, QuestionSearch } from "../index";

import storage from '../../common/storage';

class QuestionContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: {
        questionSid: null,
        questionTitle: null,
        questionTxt: null,
        questionLevel: null,
        questionWriter: null,
        reportingDt: null
      },
      search: {
        fromDt: null,
        toDt: null,
        questionTitle: null,
        questionWriter: null
      },
      detailStatus: false,
      registerStatus: false
    }
  }

  componentDidMount() {
    const { search } = this.state;
    const loggedInfo = storage.get('loggedInfo')
    this.getQuestionListByEmail(loggedInfo.email, search);

    const registerStatusChangeEvent = this.registerStatusChangeEvent;
    const btnRegister = document.querySelector('#btnRegister');
    btnRegister.className = "btn";
    btnRegister.innerHTML = '등록';
    btnRegister.addEventListener('click', function() {
      registerStatusChangeEvent();
    });
  }

  searchCallback = ( fromDt, toDt, questionTitle, questionWriter ) => {
    let searchValue = {
      fromDt: fromDt,
      toDt: toDt,
      questionTitle: questionTitle,
      questionWriter: questionWriter
    };
    const loggedInfo = storage.get('loggedInfo')
    this.getQuestionListByEmail(loggedInfo.email, searchValue);
  }

  // 그리드로부터 전달받은 문의사항 값으로 상세조회 화면으로 변경
  detailCallback = async (questionDto) => {
    window.location.href = `/bms/question/details/${questionDto.questionSid}`;
  }

  // 문의사항 목록 조회 호출
  getQuestionListByEmail = async (email, search) => {
    const { QuestionModule } = this.props;
    try {
      await QuestionModule.getQuestionListByEmail(email, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  render() {
    const { questionList, pending, error, success } = this.props;
    return (
      <Fragment>
        <div>
          <div className="wrap-search">
            <QuestionSearch searchCallback={ this.searchCallback } />
          </div>
          <div className="div-main">
            { pending && <div className="boxLoading"/> }
            { error && <h1>Server Error!</h1> }
            { success && <QuestionGrid questionList={ questionList } detailCallback={ this.detailCallback } />}
          </div>
          <div className="wrap-btn-pet">
            <vaadin-button id="btnRegister" />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    questionList: state.question.questionList,
    pending: state.question.pending,
    error: state.question.error,
    success: state.question.success,
  }),
  dispatch => ({
    QuestionModule: bindActionCreators(questionActions, dispatch)
  })
)(QuestionContainer);
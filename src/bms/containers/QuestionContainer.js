import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionActions from "../modules/QuestionModule";
import { QuestionDetail, QuestionGrid, QuestionRegister, QuestionSearch } from "../index";

import '@vaadin/vaadin-ordered-layout';

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
    this.detailStatusChangeEvent = this.detailStatusChangeEvent.bind(this);
    this.registerStatusChangeEvent = this.registerStatusChangeEvent.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    const { search } = this.state;
    const { /* questionList,*/ email } = this.props;
    // if (!questionList || questionList === undefined || questionList.isEmpty()) {
      this.getQuestionListByEmail(email, search);
    // }

    const registerStatusChangeEvent = this.registerStatusChangeEvent;
    const btnRegister = document.querySelector('#btnRegister');
    btnRegister.innerHTML = '등록';
    btnRegister.addEventListener('click', function() {
      registerStatusChangeEvent();
    });
  }

  // 문의사항 값 초기화
  resetQuestion() {
    this.setState({question: {
      questionSid: null,
      questionTitle: null,
      questionTxt: null,
      questionLevel: null,
      questionWriter: null,
      reportingDt: null
    }})
  }

  searchCallback = async (dataSearchChild) => {
    this.setState({search: dataSearchChild});

    const { search } = this.state;
    const { email } = this.props;
    this.getQuestionListByEmail(email, search);
    // state.search 값 초기화
    this.setState({search: {
      fromDt: null,
      toDt: null,
      questionTitle: null,
      questionWriter: null
    }});
  }

  // 상세조회 상태로 변경
  detailStatusChangeEvent() {
    this.setState({detailStatus: true})
  }

  // 그리드로부터 전달받은 문의사항 값으로 상세조회 화면으로 변경
  detailCallback = async (questionDto) => {
    this.setState({question: questionDto});
    // this.getQuestionAnswerList(questionDto.questionSid);
    this.detailStatusChangeEvent();
  }

  // 상세조회 화면에서 돌아가기 버튼 클릭 시 목록조회 화면으로 돌아오는 이벤트
  detailToListCallback = async () => {
    this.setState({detailStatus: false})
    this.resetQuestion();
    const { search } = this.state;
    const { email } = this.props;
    this.getQuestionListByEmail(email, search);
  }

  // 등록 및 수정 상태로 변경
  registerStatusChangeEvent() {
    this.setState({registerStatus: true})
  }

  // 등록 화면에서 취소 버튼 클릭 시 목록조회 화면으로 변경
  registerToListCallback = async () => {
    this.setState({registerStatus: false})
    this.resetQuestion();
  }

  // 그리드로부터 전달받은 문의사항 값으로 등록 화면으로 변경
  registerCallback = async (questionChild) => {
    this.setState({question: questionChild})
    this.registerStatusChangeEvent();
  }

  // 수정 화면에서 취소 버튼 클릭 시 상세조회 화면으로 변경
  registerToDetailCallback = async (questionDto) => {
    this.setState({question: questionDto});
    this.setState({registerStatus: false})
    this.detailStatusChangeEvent();
  }

  // 문의사항 등록 요청
  addCallback = async (questionChild) => {
    this.setState({question: questionChild})
    const { email } = this.props;
    const { question, search } = this.state;
    this.addQuestion(email, question, search);
    this.resetQuestion();
  }

  // 문의사항 수정 요청
  updateCallback = async (questionSid, questionChild) => {
    this.setState({question: questionChild})
    const { email } = this.props;
    const { question, search } = this.state;
    this.updateQuestion(questionSid, email, question, search);
    this.resetQuestion();
  }

  // 문의사항 단일항목 삭제 요청
  deleteCallback = async (questionSid) => {
    const { search } = this.state;
    const { email } = this.props;
    this.deleteQuestionByEmail(questionSid, email, search);
    this.resetQuestion();
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

  // 문의사항 등록 API 호출 이벤트
  addQuestion = async (email, question, search) => {
    const { QuestionModule } = this.props;
    try {
      await QuestionModule.addQuestion(email, question, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 문의사항 수정 API 호출 이벤트
  updateQuestion = async (questionSid, email, question, search) => {
    const { QuestionModule } = this.props;
    try {
      await QuestionModule.updateQuestion(questionSid, email, question, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 문의사항 단일항목 삭제 API 호출 이벤트
  deleteQuestionByEmail = async (questionSid, email, search) => {
    const { QuestionModule } = this.props;
    try {
      await QuestionModule.deleteQuestionByEmail(questionSid, email, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  render() {
    const { detailStatus, question, registerStatus } = this.state;
    // const { questionList, questionAnswerList, pending, error, success } = this.props;
    const { questionList, pending, error, success, email } = this.props;

    return (
      <Fragment>
        <div>
          <div className="div-search" hidden={registerStatus || detailStatus}>
            <QuestionSearch searchCallback={ this.searchCallback } />
          </div>
          <div className="div-main">
            { pending && <div className="boxLoading"/> }
            { error && <h1>Server Error!</h1> }
            { !registerStatus && !detailStatus && success && <QuestionGrid questionList={ questionList } detailCallback={ this.detailCallback } />}
            {/* { detailStatus && questionAnswerList && <QuestionDetail question={ question } questionAnswerList={ questionAnswerList } detailToListCallback={ this.detailToListCallback } registerCallback={ this.registerCallback } deleteCallback={ this.deleteCallback } addAnswerCallback={ this.addAnswerCallback } deleteAnswerCallback={ this.deleteAnswerCallback } /> } */}
            { detailStatus && <QuestionDetail question={ question } email={ email } detailToListCallback={ this.detailToListCallback } registerCallback={ this.registerCallback } deleteCallback={ this.deleteCallback } /> }
            { registerStatus ? <QuestionRegister registerToListCallback={ this.registerToListCallback } addCallback={ this.addCallback } questionDto={ question } updateCallback={ this.updateCallback } registerToDetailCallback={ this.registerToDetailCallback } /> : null }
          </div>
          <div className="div-sub-main" hidden={registerStatus || detailStatus || !success}>
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
    // questionAnswerList: state.question.questionAnswerList,
    // questionAnswerCmtList: state.question.questionAnswerCmtList,
    pending: state.question.pending,
    error: state.question.error,
    success: state.question.success,

    // 임시 설정
    email: 'yieon@test.com'
  }),
  dispatch => ({
    QuestionModule: bindActionCreators(questionActions, dispatch)
  })
)(QuestionContainer);
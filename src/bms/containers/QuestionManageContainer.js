import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionActions from "../modules/QuestionModule";
import { QuestionGrid, QuestionSearch } from "../index";

import '@vaadin/vaadin-ordered-layout';

import storage from '../../common/storage';

class QuestionManageContainer extends Component {

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
      selectList: [],
      detailStatus: false
    }
    this.selectedDeleteCheckEvent = this.selectedDeleteCheckEvent.bind(this);
  }

  componentDidMount() {
    const { search } = this.state;
    this.getQuestionList(search);

    const selectedDeleteCheckEvent = this.selectedDeleteCheckEvent;
    const btnSelectDelete = document.querySelector('#btnSelectDelete');
    btnSelectDelete.innerHTML = '선택삭제';
    btnSelectDelete.addEventListener('click', function() {
      selectedDeleteCheckEvent();
    });
  }

  selectedDeleteCheckEvent() {
    const { selectList } = this.state;
    const deleteQuestionByList = this.deleteQuestionByList;
    if (selectList.length > 0) {
      const check = window.confirm('선택한 항목을 삭제 하시겠습니까?');
      if (check === true) {
        deleteQuestionByList(selectList);
      }
    } else {
      const nfNotfoundSelectColumn = document.createElement('vaadin-notification');
      nfNotfoundSelectColumn.renderer = function(root) {
        root.textContent = '선택된 항목이 존재하지 않습니다.'
      }
      document.body.appendChild(nfNotfoundSelectColumn);
      nfNotfoundSelectColumn.position = 'middle';
      nfNotfoundSelectColumn.duration = 2000;
      nfNotfoundSelectColumn.opened = true;
      window.setTimeout(function() {
        nfNotfoundSelectColumn.remove();
      }, 2000)
    }
  }

  searchCallback = async (fromDt, toDt, questionTitle, questionWriter) => {
    let searchValue = {
      fromDt: fromDt,
      toDt: toDt,
      questionTitle: questionTitle,
      questionWriter: questionWriter
    };
    this.getQuestionList(searchValue);
  }

  // 그리드의 체크박스 선택 시 선택한 컬럼의 값을 선택목록에 저장
  selectCallback = async (getSelectList) => {
    this.setState({selectList: getSelectList});
  }

  // 그리드로부터 전달받은 문의사항 값으로 상세조회 화면으로 변경
  detailCallback = async (questionDto) => {
    window.location.href = `/bms/question/details/${questionDto.questionSid}`;
  }

  // 문의사항 목록 조회 호출
  getQuestionList = async (search) => {
    const { QuestionModule } = this.props;
    try {
      await QuestionModule.getQuestionList(search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 문의사항 선택삭제 API 호출 이벤트
  deleteQuestionByList = async (list) => {
    const { search } = this.state;
    const { QuestionModule } = this.props;
    try {
      await QuestionModule.deleteQuestionByList(list, search)
    } catch (e) {
      console.log("error log : " + e);
    }
    const { selectList } = this.state;
    selectList.splice(0, selectList.length)
    this.setState({selectList});
  }

  render() {
    const { questionList, pending, error, success } = this.props;
    const loggedInfo = storage.get('loggedInfo')
    let role = 'GUEST';
    if (loggedInfo) {
      if (loggedInfo.assignedRoles.indexOf('ROLE_ADMIN') !== -1) {
        role = 'ROLE_ADMIN';
      }
    }
    return (
      <Fragment>
        <div>
          <div className="div-search" >
            <QuestionSearch searchCallback={ this.searchCallback } role={role} />
          </div>
          <div className="div-main">
            { pending && <div className="boxLoading"/> }
            { error && <h1>Server Error!</h1> }
            { success && questionList && <QuestionGrid questionList={ questionList } detailCallback={ this.detailCallback } selectCallback={ this.selectCallback } />}
          </div>
          <div className="div-sub-main">
            <vaadin-button id="btnSelectDelete" theme="error" />
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
)(QuestionManageContainer);
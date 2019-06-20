import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionActions from "../modules/QuestionModule";
import { QuestionDetail, QuestionGrid, QuestionSearch } from "../index";

import '@vaadin/vaadin-ordered-layout';

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
    this.detailStatusChangeEvent = this.detailStatusChangeEvent.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    const { search } = this.state;
    const { questionList } = this.props;
    if (!questionList || questionList === undefined || questionList.isEmpty()) {
      this.getQuestionList(search);
    }

    const { selectList } = this.state;
    const deleteQuestionByList = this.deleteQuestionByList;

    const btnSelectDelete = document.querySelector('#btnSelectDelete');
    btnSelectDelete.innerHTML = '선택삭제';
    btnSelectDelete.addEventListener('click', function() {
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
      }
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
    this.getQuestionList(search);
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

  // 그리드의 체크박스 선택 시 선택한 컬럼의 값을 선택목록에 저장
  selectCallback = async (selectDto) => {
    const { selectList } = this.state;
    selectList.push(selectDto.questionSid)
    this.setState({selectList})
  }

  // 그리드의 체크박스 선택 취소 했을때 선택목록에 저장되어있는 값 중 선택취소한 컬럼의 값을 찾아 목록에서 제거
  deselectCallback = async (selectDto) => {
    const { selectList } = this.state;
    const itemToFind = selectList.find(function(item) {
      return item === selectDto.questionSid
    });
    const idx = selectList.indexOf(itemToFind);
    if (idx > -1) selectList.splice(idx, 1)
    this.setState({selectList})
  }  

  // 그리드로부터 전달받은 문의사항 값으로 상세조회 화면으로 변경
  detailCallback = async (questionDto) => {
    this.setState({question: questionDto});
    this.detailStatusChangeEvent();
  }

  // 상세조회 화면에서 돌아가기 버튼 클릭 시 목록조회 화면으로 돌아오는 이벤트
  detailToListCallback = async () => {
    this.setState({detailStatus: false})
    this.resetQuestion();
    const { search } = this.state;
    this.getQuestionList(search);
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
    const { detailStatus, question } = this.state;
    const { questionList, pending, error, success, email, role } = this.props;
    return (
      <Fragment>
        <div>
          <div className="div-search" hidden={detailStatus}>
            <QuestionSearch searchCallback={ this.searchCallback } />
          </div>
          <div className="div-main">
            { pending && "Loading..." }
            { error && <h1>Server Error!</h1> }
            { !detailStatus && success && questionList && <QuestionGrid questionList={ questionList } detailCallback={ this.detailCallback } role={ role } selectCallback={ this.selectCallback } deselectCallback={ this.deselectCallback }/>}
            { detailStatus && <QuestionDetail question={ question } email={ email } role={ role } detailToListCallback={ this.detailToListCallback } registerCallback={ this.registerCallback } /> }
          </div>
          <div className="div-sub-main" hidden={detailStatus}>
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
    // questionAnswerList: state.question.questionAnswerList,
    // questionAnswerCmtList: state.question.questionAnswerCmtList,
    pending: state.question.pending,
    error: state.question.error,
    success: state.question.success,

    // 임시 설정
    role: 'ROLE_ADMIN',
    email: 'admin@test.com'
  }),
  dispatch => ({
    QuestionModule: bindActionCreators(questionActions, dispatch)
  })
)(QuestionManageContainer);
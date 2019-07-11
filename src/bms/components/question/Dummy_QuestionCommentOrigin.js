/*
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionActions from "../../modules/QuestionModule";

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@polymer/iron-icons';

// 문의사항 댓글 컴포넌트
class Comment extends Component {

  constructor(props) {
    super(props);
    this.state ={
      answer: {
        questionAnswerSid: null,
        answerTxt: null,
        answerLevel: null,
        answerWriter: null,
        reportingDt: null
      },
      cmt: {
        questionAnswerCmtSid: null,
        cmtTxt: null,
        cmtLevel: null,
        cmtWriter: null,
        reportingDt: null
      },
    }
  }

  cmtListIndex = 0;
  componentDidMount() {
  // componentDidMount() {
    const { question, questionAnswerList } = this.props;
    if (!question || question === undefined) {
      return
    }
    if (questionAnswerList === undefined || !questionAnswerList || questionAnswerList.questionAnswerSid === null) {
      return
    }
    document.querySelector('#lbCommentTitle').innerHTML = '댓글';

    // 하단 댓글등록 컴포넌트
    const {answer, cmt} = this.state;
    const taAnswerRegister = document.querySelector('#taAnswerRegister');
    taAnswerRegister.className = "vaadin-text-area-answer";
    taAnswerRegister.shadowRoot.querySelector('div').querySelector('div').style = "background: white; padding: 0;";
    taAnswerRegister.placeholder = '댓글을 입력해주세요.'
    taAnswerRegister.addEventListener('input', function() {
      answer.answerTxt = taAnswerRegister.value;
    })

    const { addAnswerCallback } = this.props;
    const btnAnswerRegister = document.querySelector('#btnAnswerRegister');
    btnAnswerRegister.textContent = '등록';
    btnAnswerRegister.addEventListener('click', function() {
      if (answer.answerTxt === null || answer.answerTxt === undefined) {
        const nfNotfoundAnswerTxt = document.createElement('vaadin-notification');
        nfNotfoundAnswerTxt.renderer = function(root) {
          root.textContent = '댓글이 입력되지 않았습니다. 입력 후 다시 시도해주세요.'
        } 
        document.body.appendChild(nfNotfoundAnswerTxt);
        nfNotfoundAnswerTxt.position = 'middle';
        nfNotfoundAnswerTxt.duration = 2000;
        nfNotfoundAnswerTxt.opened = true;
      } else {
        answer.answerLevel = 2;
        answer.reportingDt = new Date();
        // 댓글 등록 이벤트 호출
        addAnswerCallback(question.questionSid, answer)
      }
    });

    const divCmtRegister = document.createElement('div');
    divCmtRegister.className = 'div-comment-cmt-register';
    divCmtRegister.id = "divCmtRegister";
    const iconCmtRegister = document.createElement('iron-icon');
    iconCmtRegister.setAttribute("icon", "icons:subdirectory-arrow-right")
    const taCmtRegister = document.createElement('vaadin-text-area');
    taCmtRegister.placeholder = '댓글을 입력해주세요.'
    taCmtRegister.className = "vaadin-text-area-comment";
    taCmtRegister.id = "taCmtRegister";
    taCmtRegister.addEventListener('input', function() {
      cmt.cmtTxt = taCmtRegister.value;
    })
    
    const btnCmtRegister = document.createElement('vaadin-button');
    btnCmtRegister.textContent = '등록';
    
    divCmtRegister.appendChild(iconCmtRegister);
    divCmtRegister.appendChild(taCmtRegister);
    divCmtRegister.appendChild(btnCmtRegister);

    let dateFormat = require('dateformat');
    // 답변 목록 컴포넌트
    const divComment = document.querySelector('#divComment');
    let index = 0;
    questionAnswerList.forEach(e => {
      const divAnswer = document.createElement('div');
      divAnswer.className = "div-comment-answer";
      divAnswer.id = "divAnswer" + index++;

      const {addCmtCallback} = this.props;
      btnCmtRegister.addEventListener('click', function() {
        if (cmt.cmtTxt === null || cmt.cmtTxt === undefined) {
          const nfNotfoundAnswerTxt = document.createElement('vaadin-notification');
          nfNotfoundAnswerTxt.renderer = function(root) {
            root.textContent = '댓글이 입력되지 않았습니다. 입력 후 다시 시도해주세요.'
          } 
          document.body.appendChild(nfNotfoundAnswerTxt);
          nfNotfoundAnswerTxt.position = 'middle';
          nfNotfoundAnswerTxt.duration = 2000;
          nfNotfoundAnswerTxt.opened = true;
        } else {
          cmt.cmtLevel = 3;
          cmt.reportingDt = new Date();
          // 답변 코멘트 등록 이벤트 호출
          addCmtCallback(e.get('questionAnswerSid'), cmt)
        }
      })

      const lbAnswerWriter = document.createElement('label');
      lbAnswerWriter.className = "label-comment-answer-writer"
      lbAnswerWriter.innerHTML = e.get('answerWriter')+'&nbsp&nbsp&nbsp';
      const lbReportingDt = document.createElement('label');
      lbReportingDt.className = "label-comment-answer-dt";
      lbReportingDt.innerHTML = dateFormat(new Date(e.get("reportingDt")), 'yyyy년mm월dd일 HH:MM:ss');

      const btnAnswerCmtRegister = document.createElement('button');
      btnAnswerCmtRegister.id = "btnAnswerCmtRegister";
      btnAnswerCmtRegister.className = 'button-cmt-register-onoff'
      btnAnswerCmtRegister.textContent = '답글'

      // 답글 버튼 클릭에 따르는 댓글 입력폼 컨트롤 이벤트
      btnAnswerCmtRegister.addEventListener('click', function() {
        // 이미 입력폼이 존재하며, 입력폼 이전의 컴포넌트가 존재할 경우(상속받을 부모 컴포넌트의 존재유무 체크)
        if (divComment.querySelector('#divCmtRegister') !== null && divComment.querySelector('#divCmtRegister').previousElementSibling !== null) {
          // 입력폼이 존재할 때 답글 버튼 클릭을 한번 더 실행 할 경우 CASE 3.
          // 1. 답글취소 버튼을 클릭한 컴포넌트와 기존에 존재하는 입력폼 컴포넌트가 같을 경우 입력 폼 제거 후 리턴
          if (divComment.querySelector('#divCmtRegister').previousElementSibling === btnAnswerCmtRegister.parentElement) {
            btnAnswerCmtRegister.textContent = '답글'
            taCmtRegister.placeholder = '';
            divComment.removeChild(divCmtRegister);
            return;
          }
          // 2. 클릭 이전 입력폼 컴포넌트의 클래스명이 답변(댓글) 컴포넌트에 해당하는 경우 이전 입력폼의 textContent 값을 초기상태로 전환
          if (divComment.querySelector('#divCmtRegister').previousElementSibling.className === 'div-comment-answer') {
            divComment.querySelector('#divCmtRegister').previousElementSibling.querySelector('#btnAnswerCmtRegister').textContent = '답글'
          }
          // 3. 클릭 이전 입력폼 컴포넌트의 클래스명이 코멘트 컴포넌트에 해당하는 경우 이전 입력폼의 textContent 값을 초기상태로 전환
          if (divComment.querySelector('#divCmtRegister').previousElementSibling.className === 'div-comment-cmt') {
            divComment.querySelector('#divCmtRegister').previousElementSibling.querySelector('#btnCmtCmtRegister').textContent = '답글'
          }
          // 
          divComment.querySelector('#divCmtRegister').querySelector('#taCmtRegister').value = '';
          divComment.removeChild(divComment.querySelector('#divCmtRegister'));

          btnAnswerCmtRegister.textContent = '답글취소'
          taCmtRegister.placeholder = '댓글을 입력해주세요.';
          divAnswer.insertAdjacentElement('afterend', divCmtRegister);
          // text-area의 스타일 적용은 활성화 이후에 노출되는 shadowRoot이하의 컴포넌트 스타일에 적용시켜야 한다.
          taCmtRegister.shadowRoot.querySelector('div').querySelector('div').style = "background: white; padding: 0;";
        }
        // 입력 폼이 존재하지 않을 경우 입력 폼 생성 이벤트
        else {
          btnAnswerCmtRegister.textContent = '답글취소'
          taCmtRegister.placeholder = '댓글을 입력해주세요.';
          divAnswer.insertAdjacentElement('afterend', divCmtRegister);
          taCmtRegister.shadowRoot.querySelector('div').querySelector('div').style = "background: white; padding: 0;";
        }
      })

      const btnAnswerUpdate = document.createElement('button');
      btnAnswerUpdate.className = 'button-cmt-update-onoff'
      btnAnswerUpdate.textContent = '수정'
      let updateOnoff = false;
      const taAnswerTxt = document.createElement('vaadin-text-area');
      taAnswerTxt.className = 'vaadin-text-area-answer';
      taAnswerTxt.value = e.get('answerTxt');
      taAnswerTxt.addEventListener('input', function() {
        answer.answerTxt = taAnswerTxt.value;
      })
      const {updateAnswerCallback} = this.props;
      const btnAnswerUpdateComplete = document.createElement('vaadin-button');
      btnAnswerUpdateComplete.textContent = "수정";
      btnAnswerUpdateComplete.addEventListener('click', function() {
        updateAnswerCallback(e.get('questionAnswerSid'), answer)
      })
      btnAnswerUpdate.addEventListener('click', function() {
        updateOnoff = !updateOnoff;
        if(updateOnoff) {
          btnAnswerUpdate.textContent = '수정취소'
          divAnswer.removeChild(lbAnswerTxt);
          divAnswer.removeChild(btnAnswerCmtRegister);
          divAnswer.removeChild(btnAnswerCmtDelete);
          divAnswer.appendChild(taAnswerTxt);
          divAnswer.appendChild(btnAnswerUpdateComplete);
          divAnswer.className = 'div-comment-answer-update';

          taAnswerTxt.shadowRoot.querySelector('div').querySelector('div').style = "background: white; padding: 0;";
        } else {
          btnAnswerUpdate.textContent = '수정'
          divAnswer.removeChild(br);
          divAnswer.removeChild(taAnswerTxt);
          divAnswer.removeChild(btnAnswerUpdate);
          divAnswer.removeChild(btnAnswerUpdateComplete);
          divAnswer.appendChild(btnAnswerCmtRegister);
          divAnswer.appendChild(btnAnswerCmtDelete);
          divAnswer.appendChild(btnAnswerUpdate);
          divAnswer.appendChild(br);
          divAnswer.appendChild(lbAnswerTxt);
          divAnswer.className = "div-comment-answer";
        }
      })

      const { deleteAnswerCallback } = this.props;
      const btnAnswerCmtDelete = document.createElement('button');
      btnAnswerCmtDelete.className = 'button-cmt-delete'
      btnAnswerCmtDelete.textContent = '삭제'
      btnAnswerCmtDelete.addEventListener('click', function() {
        const check = window.confirm('선택한 항목을 삭제 하시겠습니까? 삭제 시 댓글에 대한 답글이 전부 삭제됩니다.');
        if (check === true) {
          deleteAnswerCallback(e.get('questionSid'), e.get('questionAnswerSid'));
        }
      })
      const br = document.createElement('br');
      const lbAnswerTxt = document.createElement('label');
      lbAnswerTxt.className = "label-comment-answer-txt";
      lbAnswerTxt.innerHTML = e.get('answerTxt');

      divAnswer.appendChild(lbAnswerWriter);
      divAnswer.appendChild(lbReportingDt);
      divAnswer.appendChild(btnAnswerCmtRegister);
      divAnswer.appendChild(btnAnswerCmtDelete);
      divAnswer.appendChild(btnAnswerUpdate);
      divAnswer.appendChild(br);
      divAnswer.appendChild(lbAnswerTxt);

      // 댓글 추가 시 댓글 목록을 가져오는 컨테이너에서 리렌더링 됨
      // - 최신데이터 = 상단 divComment.insertBefore(divAnswer, divComment.childNodes[0]);
      // 최신데이터 = 하단
      divComment.insertBefore(divAnswer, divComment.lastChild);
      // 답변 코멘트 목록 컴포넌트 (역순정렬)
      e.get('cmts').reverse().forEach(cmt=> {
        this.cmtListIndex++
        const divCmt = document.createElement('div');
        divCmt.className = "div-comment-cmt";
        const iconCmt = document.createElement('iron-icon');
        iconCmt.setAttribute("icon", "icons:subdirectory-arrow-right")
  
        const lbCmtWriter = document.createElement('label');
        lbCmtWriter.className = "label-comment-cmt-writer"
        lbCmtWriter.innerHTML = cmt.get('cmtWriter')+'&nbsp&nbsp&nbsp';
        const lbCmtReportingDt = document.createElement('label');
        lbCmtReportingDt.className = "label-comment-cmt-dt";
        lbCmtReportingDt.innerHTML = dateFormat(new Date(cmt.get("reportingDt")), 'yyyy년mm월dd일 HH:MM:ss');
  
        const brCmt = document.createElement('br');

        const lbCmtTxt = document.createElement('label');
        lbCmtTxt.className = "label-comment-cmt-txt";
        lbCmtTxt.innerHTML = cmt.get('cmtTxt');

        const btnCmtCmtRegister = document.createElement('button');
        btnCmtCmtRegister.className = 'button-cmt-register-onoff'
        btnCmtCmtRegister.id = 'btnCmtCmtRegister';
        btnCmtCmtRegister.textContent = '답글'

        btnCmtCmtRegister.addEventListener('click', function() {
          if (divComment.querySelector('#divCmtRegister') !== null && divComment.querySelector('#divCmtRegister').previousElementSibling !== null) {
            if (divComment.querySelector('#divCmtRegister').previousElementSibling === btnCmtCmtRegister.parentElement) {
              btnCmtCmtRegister.textContent = '답글'
              taCmtRegister.placeholder = '';
              divComment.removeChild(divCmtRegister);
              return;
            }
            if (divComment.querySelector('#divCmtRegister').previousElementSibling.className === 'div-comment-answer') {
              divComment.querySelector('#divCmtRegister').previousElementSibling.querySelector('#btnAnswerCmtRegister').textContent = '답글'
            }
            if (divComment.querySelector('#divCmtRegister').previousElementSibling.className === 'div-comment-cmt') {
              divComment.querySelector('#divCmtRegister').previousElementSibling.querySelector('#btnCmtCmtRegister').textContent = '답글'
            }
            divComment.querySelector('#divCmtRegister').querySelector('#taCmtRegister').value = '';
            divComment.removeChild(divComment.querySelector('#divCmtRegister'));
  
            btnCmtCmtRegister.textContent = '답글취소'
            taCmtRegister.placeholder = '댓글을 입력해주세요.';
            divCmt.insertAdjacentElement('afterend', divCmtRegister);
            taCmtRegister.shadowRoot.querySelector('div').querySelector('div').style = "background: white; padding: 0;";
          } else {
            btnCmtCmtRegister.textContent = '답글취소'
            taCmtRegister.placeholder = '댓글을 입력해주세요.';
            divCmt.insertAdjacentElement('afterend', divCmtRegister);
            taCmtRegister.shadowRoot.querySelector('div').querySelector('div').style = "background: white; padding: 0;";
          }
        })

        const btnCmtCmtUpdate = document.createElement('button');
        btnCmtCmtUpdate.className = 'button-cmt-update-onoff'
        btnCmtCmtUpdate.textContent = '수정'
        btnCmtCmtUpdate.addEventListener('click', function() {
          
        })

        const btnCmtCmtDelete = document.createElement('button');
        btnCmtCmtDelete.className = 'button-cmt-delete'
        btnCmtCmtDelete.textContent = '삭제'
        btnCmtCmtDelete.addEventListener('click', function() {
          
        })
  
        divCmt.appendChild(iconCmt)
        divCmt.appendChild(lbCmtWriter)
        divCmt.appendChild(lbCmtReportingDt)
        divCmt.appendChild(btnCmtCmtRegister)
        divCmt.appendChild(btnCmtCmtDelete)
        divCmt.appendChild(btnCmtCmtUpdate)
        divCmt.appendChild(brCmt)
        divCmt.appendChild(lbCmtTxt)
        
        for (let index=0; index<questionAnswerList.size; index++) {
          if (questionAnswerList.get(index).get('questionAnswerSid') === cmt.get('questionAnswerSid')) {
            const divAnswerByIndex = document.querySelector('#divAnswer'+index);
            divAnswerByIndex.insertAdjacentElement('afterend', divCmt);
          }
        }
      
      document.querySelector('#lbCommentTitleCount').innerHTML = questionAnswerList.size+this.cmtListIndex;
      })
    });
  }

  render() {
    return (
      <Fragment>
        <div className="div-comment-title">
          <label className="label-comment-title" id="lbCommentTitle" />
          <label className="label-comment-title-count" id="lbCommentTitleCount" />
        </div>
        <div className="div-comment" id="divComment">
          <div className="div-comment-answer-register">
            <vaadin-text-area id="taAnswerRegister"/>
            <vaadin-button id="btnAnswerRegister"/>
          </div>
        </div>
      </Fragment>
    );
  }
}
class QuestionComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answer: {
        questionAnswerSid: null,
        questionSid: null,
        answerTxt: null,
        answerLevel: null,
        answerWriter: null,
        reportingDt: null
      },
      cmt: {
        questionAnswerCmtSid: null,
        cmtTxt: null,
        cmtLevel: null,
        cmtWriter: null,
        reportingDt: null
      }
    }
  }

  componentDidMount() {
    const {question, questionAnswerList} = this.props;
    console.log(question);
    if (!questionAnswerList || questionAnswerList === null || questionAnswerList === undefined) {
      this.getQuestionAnswerList(question.questionSid);
    }
  }
  // 문의사항 답변 값 초기화
  resetAnswer() {
    this.setState({answer: {
      questionAnswerSid: null,
      questionSid: null,
      answerTxt: null,
      answerLevel: null,
      answerWriter: null,
      reportingDt: null
    }})
  }
  resetCmt() {
    this.setState({cmt: {
      questionAnswerCmtSid: null,
      cmtTxt: null,
      cmtLevel: null,
      cmtWriter: null,
      reportingDt: null
    }})
  }

  // 문의사항 답변 목록 조회 호출
  getQuestionAnswerList = async (questionSid) => {
    const { QuestionModule } = this.props;
    try {
      await QuestionModule.getQuestionAnswerList(questionSid)
    } catch (e) {
      console.log("error log : " + e);
    }
  }


  // 문의사항 답변 등록 요청
  addAnswerCallback = async (questionSid, answerChild) => {
    this.setState({answer: answerChild})
    const { email } = this.props;
    const { answer } = this.state;
    this.addQuestionAnswer(questionSid, email, answer);
    this.resetAnswer();
  }

  // 문의사항 답변 수정 요청
  updateAnswerCallback = async (questionAnswerSid, answerChild) => {
    this.setState({answer: answerChild})
    const { question, email } = this.props;
    const { answer } = this.state;
    this.updateQuestionAnswer(question.questionSid, questionAnswerSid, email, answer);
    this.resetAnswer();
  }

  // 문의사항 답변 삭제 요청
  deleteAnswerCallback = async (questionSid, questionAnswerSid) => {
    const { email } = this.props;
    this.deleteQuestionAnswerByEmail(questionSid, questionAnswerSid, email);
  }  

  // 문의사항 답변 코멘트 등록 요청
  addCmtCallback = async (questionAnswerSid, cmtChild) => {
    this.setState({cmt: cmtChild})
    const { question, email } = this.props;
    const { cmt } = this.state;
    this.addQuestionAnswerCmt(question.questionSid, questionAnswerSid, email, cmt);
    this.resetCmt();
  }

  // 문의사항 답변 코멘트 수정 요청
  updateCmtCallback = async (questionAnswerCmtSid, cmtChild) => {
    this.setState({cmt: cmtChild})
    const { question, email } = this.props;
    const { cmt } = this.state;
    this.updateQuestionAnswer(question.questionSid, questionAnswerCmtSid, email, cmt);
    this.resetCmt();
  }

  // 문의사항 답변 코멘트 삭제 요청
  deleteCmtCallback = async (questionAnswerCmtSid) => {
    const { question, email } = this.props;
    this.deleteQuestionAnswerByEmail(question.questionSid, questionAnswerCmtSid, email);
  }  

  // 문의사항 답변 등록 API 호출 이벤트
  addQuestionAnswer = async (questionSid, email, answer) => {
    const { QuestionModule } = this.props;
    try {
      await QuestionModule.addQuestionAnswer(questionSid, email, answer)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 문의사항 답변 수정 API 호출 이벤트
  updateQuestionAnswer = async (questionSid, questionAnswerSid, email, answer) => {
    const { QuestionModule } = this.props;
    try {
      await QuestionModule.updateQuestionAnswer(questionSid, questionAnswerSid, email, answer)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 문의사항 답변 삭제 API 호출 이벤트
  deleteQuestionAnswerByEmail = async (questionSid, questionAnswerSid, email) => {
    const { QuestionModule } = this.props;
    try {
      await QuestionModule.deleteQuestionAnswerByEmail(questionSid, questionAnswerSid, email)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 문의사항 답변 코멘트 등록 API 호출 이벤트
  addQuestionAnswerCmt = async (questionSid, questionAnswerSid, email, cmt) => {
    const { QuestionModule } = this.props;
    try {
      await QuestionModule.addQuestionAnswerCmt(questionSid, questionAnswerSid, email, cmt)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 문의사항 답변 코멘트 수정 API 호출 이벤트
  updateQuestionAnswerCmt = async (questionSid, questionAnswerCmtSid, email, cmt) => {
    const { QuestionModule } = this.props;
    try {
      await QuestionModule.updateQuestionAnswerCmt(questionSid, questionAnswerCmtSid, email, cmt)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 문의사항 답변 코멘트 삭제 API 호출 이벤트
  deleteQuestionAnswerCmtByEmail = async (questionSid, questionAnswerCmtSid, email) => {
    const { QuestionModule } = this.props;
    try {
      await QuestionModule.deleteQuestionAnswerCmtByEmail(questionSid, questionAnswerCmtSid, email)
    } catch (e) {
      console.log("error log : " + e);
    }
  }  

  render() {
    const { question, questionAnswerList } = this.props;
    
    return (
      <Fragment>
        { questionAnswerList && <Comment question={question} questionAnswerList={questionAnswerList} 
          addAnswerCallback={this.addAnswerCallback} updateAnswerCallback={this.updateAnswerCallback} deleteAnswerCallback={this.deleteAnswerCallback}
          addCmtCallback={this.addCmtCallback} updateCmtCallback={this.updateCmtCallback} deleteCmtCallback={this.deleteCmtCallback} /> }
      </Fragment>
    );
  }
}
export default connect(
  state => ({
    questionAnswerList: state.question.questionAnswerList,

    // 임시 설정
    email: 'yieon@test.com'
  }),
  dispatch => ({
    QuestionModule: bindActionCreators(questionActions, dispatch)
  })
)(QuestionComment);
// export default QuestionComment;
*/
import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-button';

import { QuestionComment } from "../../index";

// deps for viewer.
require('tui-editor/dist/tui-editor-contents.css'); // editor content
require('highlight.js/styles/github.css'); // code block highlight

const Viewer = require('tui-editor/dist/tui-editor-Viewer');

// 문의사항 상세조회 컴포넌트
class QuestionDetail extends Component {

  componentDidMount() {
    const { question, detailToListCallback } = this.props;
    if (!question || question === undefined) {
      return
    }

    const lbTitle = document.querySelector('#lbTitle')
    lbTitle.innerHTML = question.questionTitle;
    
    document.querySelector('#lbReportingDt').innerHTML = '작성일 : '+question.reportingDt+'&nbsp&nbsp';
    document.querySelector('#lbQuestionWriter').innerHTML = '작성자 : '+question.questionWriter;

    this.toastEditor = new Viewer({
      el: document.querySelector('#viewerSection'),
      height: 'auto',
      initialValue: question.questionTxt
    });

    const btnGoList = document.querySelector('#btnGoList');
    btnGoList.textContent = "돌아가기";
    btnGoList.addEventListener('click', function() {
      detailToListCallback();
    })

    const btnUpdate = document.querySelector('#btnUpdate');
    const { role } = this.props;
    console.log(role)
    if (role === 'ROLE_ADMIN' || role === 'ROLE_SYSADMIN') {
      btnUpdate.hidden = true;
    } else {
      btnUpdate.hidden = false;
      const { registerCallback } = this.props;
      btnUpdate.textContent = "수정";
      btnUpdate.addEventListener('click', function() {
        registerCallback(question);
        detailToListCallback();
      })
    }

    const { deleteCallback } = this.props;
    const btnDelete = document.querySelector('#btnDelete');
    btnDelete.textContent = "삭제";
    btnDelete.addEventListener('click', function() {
      const check = window.confirm('문의사항을 삭제 하시겠습니까?');
      if (check === true) {
        deleteCallback(question.questionSid);
        detailToListCallback();
      }
    })
  }

  render() {
    const { question, email } = this.props;
    // const { question, questionAnswerList, addAnswerCallback, deleteAnswerCallback} = this.props;
    return (
      <Fragment>
        <div className="div-board">
          <div className="div-board-title">
            <label className="label-board-title" id="lbTitle" />
          </div>
          <div className="div-board-sub-title">
            <label id="lbReportingDt" />
            <label id="lbQuestionWriter" />
          </div>
          <div className="div-board-txt">
            <div className="div-board-txt-details">
            <div id="toastEditor">
              <div id="viewerSection" />
            </div>
            </div>
            {/* <QuestionComment question={question} questionAnswerList={questionAnswerList} addAnswerCallback={addAnswerCallback} deleteAnswerCallback={deleteAnswerCallback}/> */}
            <QuestionComment question={question} email={email} />
          </div>
          <div>
            <vaadin-button id="btnGoList" />
            <vaadin-button id="btnUpdate" />
            <vaadin-button id="btnDelete" theme="error" />
          </div>
        </div>
      </Fragment>
    );
  }
}
export default QuestionDetail;
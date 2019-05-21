import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@polymer/iron-icons';

import { QuestionComment } from "../../index";

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

    const dlsTxt = document.querySelector('#dlsTxt')
    dlsTxt.innerHTML = question.questionTxt;
    
    const btnGoList = document.querySelector('#btnGoList');
    btnGoList.textContent = "돌아가기";
    btnGoList.addEventListener('click', function() {
      detailToListCallback();
    })

    const { registerCallback } = this.props;
    const btnUpdate = document.querySelector('#btnUpdate');
    btnUpdate.textContent = "수정";
    btnUpdate.addEventListener('click', function() {
      registerCallback(question);
      detailToListCallback();
    })

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
            <vaadin-details id="dlsTxt" />
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
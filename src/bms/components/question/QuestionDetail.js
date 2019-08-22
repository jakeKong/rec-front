import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-button';

import { QuestionComment } from "../../index";
import storage from '../../../common/storage';
import { deleteQuestion, deleteQuestionAnswerByEmail } from '../../api/questionAxios'

// deps for viewer.
require('tui-editor/dist/tui-editor-contents.css'); // editor content
require('highlight.js/styles/github.css'); // code block highlight

const Viewer = require('tui-editor/dist/tui-editor-Viewer');

// 문의사항 상세조회 컴포넌트
class QuestionDetail extends Component {

  componentDidMount() {
    const { question } = this.props;
    if (!question || question === undefined) {
      return
    }
    let moment = require('moment');

    const lbTitle = document.querySelector('#lbTitle')
    lbTitle.innerHTML = question.questionTitle;
    
    document.querySelector('#lbReportingDt').innerHTML = '작성일 : '+moment(question.reportingDt).format('YYYY년MM월DD일')+'&nbsp&nbsp';
    document.querySelector('#lbQuestionWriter').innerHTML = '작성자 : '+question.questionWriter;

    this.toastEditor = new Viewer({
      el: document.querySelector('#viewerSection'),
      height: 'auto',
      initialValue: question.questionTxt
    });

    const btnGoList = document.querySelector('#btnGoList');
    btnGoList.textContent = "돌아가기";

    const btnDelete = document.querySelector('#btnDelete');
    btnDelete.textContent = "삭제";

    const btnUpdate = document.querySelector('#btnUpdate');

    if (storage.get('loggedInfo')) {
      if (storage.get('loggedInfo').email === question.email) {
        btnUpdate.hidden = false;
        btnGoList.addEventListener('click', function() {
          window.location.href = '/bms/question';
        });
        btnUpdate.textContent = "수정";
      } else {
        btnUpdate.hidden = true;
      }
      if (storage.get('loggedInfo').assignedRoles.indexOf('ROLE_ADMIN') === -1) {

        btnUpdate.addEventListener('click', function() {
          window.location.href = `/bms/question/update/${question.questionSid}`;
        });
        btnDelete.addEventListener('click', function() {
          const check = window.confirm('문의사항을 삭제 하시겠습니까?');
          if (check === true) {
            deleteQuestionAnswerByEmail(question.questionSid, storage.get('loggedInfo').email).then(res => {
              window.alert('삭제 완료')
              window.location.href = '/bms/question'
            }).catch(err => {
              console.log(err);
            });
          }
        });
      } else {
        btnGoList.addEventListener('click', function() {
          window.location.href = '/bms/question/manage';
        });

        btnDelete.addEventListener('click', function() {
          const check = window.confirm('문의사항을 삭제 하시겠습니까?');
          if (check === true) {
            deleteQuestion(question.questionSid).then(res => {
              window.alert('삭제 완료')
              window.location.href = '/bms/question/manage'
            }).catch(err => {
              console.log(err);
            });
          }
        });
      }
    }
  }

  render() {
    const { question, email } = this.props;
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
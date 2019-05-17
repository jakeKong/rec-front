import React, { Component, Fragment } from 'react';

// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as questionActions from "../modules/QuestionModule";

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@polymer/iron-icons';

// 문의사항 상세조회 컴포넌트
class QuestionDetail extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     cmtList: []
  //   }
  // }
  // getQuestionAnswerCmtList = async (questionAnswerSid) => {
  //   const { QuestionModule } = this.props;
  //   try {
  //     await QuestionModule.getQuestionAnswerCmtList(questionAnswerSid)
  //   } catch (e) {
  //     console.log("error log : " + e);
  //   }
  // }

  componentDidMount() {
    const { question, answerList, detailToListCallback } = this.props;
    // if (!question || question === undefined) {
    if (!question || question === undefined || answerList === undefined || !answerList || answerList.questionAnswerSid === null) {
      return
    }

    const lbTitle = document.querySelector('#lbTitle')
    lbTitle.innerHTML = question.questionTitle;
    
    document.querySelector('#lbReportingDt').innerHTML = '작성일 : '+question.reportingDt+'&nbsp&nbsp';
    document.querySelector('#lbQuestionWriter').innerHTML = '작성자 : '+question.questionWriter;

    const dlsTxt = document.querySelector('#dlsTxt')
    dlsTxt.className = 'details-board-txt';
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

    const taAnswerRegister = document.querySelector('#taAnswerRegister');
    taAnswerRegister.className = "vaadin-text-area-answer";
    taAnswerRegister.shadowRoot.querySelector('div').querySelector('div').style = "background: white;";
    taAnswerRegister.placeholder = '댓글을 입력해주세요.'

    const btnAnswerRegister = document.querySelector('#btnAnswerRegister');
    btnAnswerRegister.textContent = '등록';

    document.querySelector('#lbCommentTitle').innerHTML = '댓글&nbsp'+answerList.size;
    let dateFormat = require('dateformat');
    
    // let list = [];
    // const { cmtList } = this.state;
    const divComment = document.querySelector('#divComment');
    let index = 0;
    answerList.forEach(e => {
      const divAnswer = document.createElement('div');
      divAnswer.className = "div-comment-answer";
      divAnswer.id = "divAnswer" + index++;
      console.log(divAnswer.id)
      // cmtList.push({
      //   questionAnswerSid: e.get('questionAnswerSid')
      // })
      // this.setState(cmtList)

      const divCmtRegister = document.createElement('div');
      divCmtRegister.className = 'div-comment-cmt-register';
      const iconCmt = document.createElement('iron-icon');
      iconCmt.setAttribute("icon", "icons:subdirectory-arrow-right")
      const taCmtRegister = document.createElement('vaadin-text-area');
      taCmtRegister.placeholder = '댓글을 입력해주세요.'
      taCmtRegister.className = "vaadin-text-area-comment";
      
      const btnCmtRegister = document.createElement('vaadin-button');
      btnCmtRegister.textContent = '등록';

      const lbAnswerWriter = document.createElement('label');
      lbAnswerWriter.className = "label-comment-answer-writer"
      lbAnswerWriter.innerHTML = e.get('answerWriter')+'&nbsp&nbsp&nbsp';
      const lbReportingDt = document.createElement('label');
      lbReportingDt.className = "label-comment-answer-dt";
      lbReportingDt.innerHTML = dateFormat(new Date(e.get("reportingDt")), 'yyyy년mm월dd일 HH:MM:ss');

      const btnAnswerCmtRegister = document.createElement('vaadin-button');
      btnAnswerCmtRegister.className = 'vaadin-button-cmt-register-onoff'
      btnAnswerCmtRegister.textContent = '답글'
      let onoff = false;
      btnAnswerCmtRegister.addEventListener('click', function() {
        onoff = !onoff;
        if (onoff) {
          btnAnswerCmtRegister.textContent = '답글취소'
          divCmtRegister.appendChild(iconCmt);
          divCmtRegister.appendChild(taCmtRegister);
          divCmtRegister.appendChild(btnCmtRegister);
          divAnswer.insertAdjacentElement('afterend', divCmtRegister);
          // textArea 활성화 이후 스타일 설정
          taCmtRegister.shadowRoot.querySelector('div').querySelector('div').style = "background: white;";
        } else {
          btnAnswerCmtRegister.textContent = '답글'
          taCmtRegister.value = '';
          divCmtRegister.removeChild(iconCmt);
          divCmtRegister.removeChild(taCmtRegister);
          divCmtRegister.removeChild(btnCmtRegister);
          divCmtRegister.remove();
        }
      })
      const br = document.createElement('br');
      const lbAnswerTxt = document.createElement('label');
      lbAnswerTxt.className = "label-comment-answer-txt";
      lbAnswerTxt.innerHTML = e.get('answerTxt');

      divAnswer.appendChild(lbAnswerWriter);
      divAnswer.appendChild(lbReportingDt);
      divAnswer.appendChild(btnAnswerCmtRegister);
      divAnswer.appendChild(br);
      divAnswer.appendChild(lbAnswerTxt);

      divComment.insertBefore(divAnswer, divComment.childNodes[0]);
    });

    // const { questionAnswerList, questionAnswerCmtList } = this.props;
    // console.log(questionAnswerList)
    // console.log(questionAnswerCmtList)
  }

  // 댓글 목록
  componentWillUpdate(nextProps, nextState) {
    const { answerList } = this.props;
    if (answerList !== null && answerList !== undefined) {
      if (nextProps.questionAnswerCmtList !== null && nextProps.questionAnswerCmtList !== undefined) {

        let listIndex = 0;
        let dateFormat = require('dateformat');
        const divComment = document.querySelector('#divComment');
        
        nextProps.questionAnswerCmtList.forEach(e => {
  
          const divCmt = document.createElement('div');
          divCmt.className = "div-comment-cmt";
          const iconCmt = document.createElement('iron-icon');
          iconCmt.setAttribute("icon", "icons:subdirectory-arrow-right")
  
          const lbCmtWriter = document.createElement('label');
          lbCmtWriter.className = "label-comment-cmt-writer"
          lbCmtWriter.innerHTML = e.get('cmtWriter')+'&nbsp&nbsp&nbsp';
          const lbReportingDt = document.createElement('label');
          lbReportingDt.className = "label-comment-cmt-dt";
          lbReportingDt.innerHTML = dateFormat(new Date(e.get("reportingDt")), 'yyyy년mm월dd일 HH:MM:ss');
  
          const br = document.createElement('br');
          const lbCmtTxt = document.createElement('label');
          lbCmtTxt.className = "label-comment-cmt-txt";
          lbCmtTxt.innerHTML = e.get('cmtTxt');
  
          const btnAnswerCmtRegister = document.createElement('vaadin-button');
          btnAnswerCmtRegister.className = 'vaadin-button-cmt-register-onoff'
          btnAnswerCmtRegister.textContent = '답글'
  
          divCmt.appendChild(iconCmt)
          divCmt.appendChild(lbCmtWriter)
          divCmt.appendChild(lbReportingDt)
          divCmt.appendChild(br)
          divCmt.appendChild(lbCmtTxt)
  
          for (let index=0; index<answerList.size; index++) {
            if (answerList.get(index).get('questionAnswerSid') === e.get('questionAnswerSid')) {
              // console.log(nextState.cmtList)
              // nextState.cmtList.forEach(cmt => {
                // console.log(cmt.questionAnswerSid)
                const divAnswer = document.querySelector('#divAnswer'+index);
              // });
                // if (cmt.questionAnswerSid === e.get('questionAnswerSid')) {
                  divAnswer.insertAdjacentElement('afterend', divCmt);
                // }
              // });
              // divComment.insertBefore(divCmt, divComment.childNodes[index+1]);
              // if (divAnswer.value === e.get('questionAnswerSid')) {
                // console.log(divAnswer);
                // console.log(divAnswer.value);
                // console.log(divCmt);
                // divAnswer.insertAdjacentElement('afterend', divCmt);
              // }
            }
          }
        // answerList.forEach(answer => {
        //   if (answer.get('questionAnswerSid') === e.get('questionAnswerSid')) {
        //     divComment.insertBefore(divCmt, divComment.childNodes[index]);
        //     index++;
        //   }
        // });
        
        // divComment.insertAdjacentElement('afterend', divCmt)
        // divComment.insertBefore(divCmt, divComment.childNodes[1]);
        });
      }
    }
  }

  // componentWillUpdate(nextProps, nextState) {
  // componentDidUpdate(nextProps, nextState) {
      // console.log(nextProps);
    // let answerIndexList = [];
    // if (nextProps.questionAnswerList !== null && nextProps.questionAnswerList !== undefined) {
      // document.querySelector('#lbCommentTitle').innerHTML = '댓글&nbsp'+nextProps.questionAnswerList.size;
      // let dateFormat = require('dateformat');
      // const divComment = document.querySelector('#divComment');
      // nextProps.questionAnswerList.forEach(e => {
      //   const divAnswer = document.createElement('div');
      //   divAnswer.className = "div-comment-answer";

      //   const divCmtRegister = document.createElement('div');
      //   divCmtRegister.className = 'div-comment-cmt-register';
      //   const iconCmt = document.createElement('iron-icon');
      //   iconCmt.setAttribute("icon", "icons:subdirectory-arrow-right")
      //   const taCmtRegister = document.createElement('vaadin-text-area');
      //   taCmtRegister.placeholder = '댓글을 입력해주세요.'
      //   taCmtRegister.className = "vaadin-text-area-comment";
        
      //   const btnCmtRegister = document.createElement('vaadin-button');
      //   btnCmtRegister.textContent = '등록';

      //   const lbAnswerWriter = document.createElement('label');
      //   lbAnswerWriter.className = "label-comment-answer-writer"
      //   lbAnswerWriter.innerHTML = e.get('answerWriter')+'&nbsp&nbsp&nbsp';
      //   const lbReportingDt = document.createElement('label');
      //   lbReportingDt.className = "label-comment-answer-dt";
      //   lbReportingDt.innerHTML = dateFormat(new Date(e.get("reportingDt")), 'yyyy년mm월dd일 HH:MM:ss');

      //   const btnAnswerCmtRegister = document.createElement('vaadin-button');
      //   btnAnswerCmtRegister.className = 'vaadin-button-cmt-register-onoff'
      //   btnAnswerCmtRegister.textContent = '답글'
      //   let onoff = false;
      //   btnAnswerCmtRegister.addEventListener('click', function() {
      //     onoff = !onoff;
      //     if (onoff) {
      //       btnAnswerCmtRegister.textContent = '답글취소'
      //       divCmtRegister.appendChild(iconCmt);
      //       divCmtRegister.appendChild(taCmtRegister);
      //       divCmtRegister.appendChild(btnCmtRegister);
      //       divAnswer.insertAdjacentElement('afterend', divCmtRegister);
      //       // textArea 활성화 이후 스타일 설정
      //       taCmtRegister.shadowRoot.querySelector('div').querySelector('div').style = "background: white;";
      //     } else {
      //       btnAnswerCmtRegister.textContent = '답글'
      //       taCmtRegister.value = '';
      //       divCmtRegister.removeChild(iconCmt);
      //       divCmtRegister.removeChild(taCmtRegister);
      //       divCmtRegister.removeChild(btnCmtRegister);
      //       divCmtRegister.remove();
      //     }
      //   })
      //   const br = document.createElement('br');
      //   const lbAnswerTxt = document.createElement('label');
      //   lbAnswerTxt.className = "label-comment-answer-txt";
      //   lbAnswerTxt.innerHTML = e.get('answerTxt');

      //   divAnswer.appendChild(lbAnswerWriter);
      //   divAnswer.appendChild(lbReportingDt);
      //   divAnswer.appendChild(btnAnswerCmtRegister);
      //   divAnswer.appendChild(br);
      //   divAnswer.appendChild(lbAnswerTxt);

      //   divComment.insertBefore(divAnswer, divComment.childNodes[0]);

        // answerIndexList.push({
        //   questionAnswerSid: e.get('questionAnswerSid')
        // });
        // console.log(answerIndexList);
        // this.getQuestionAnswerCmtList(e.get('questionSid'))
        // if (nextProps.questionAnswerCmtList !== null && nextProps.questionAnswerCmtList !== undefined) {
          // console.log(nextProps.questionAnswerCmtList);
          // const lbCmtWriter = document.createElement('label');
          // lbAnswerWriter.className = "label-comment-answer-writer"
          // lbAnswerWriter.innerHTML = e.get('answerWriter')+'&nbsp&nbsp&nbsp';
          // const lbReportingDt = document.createElement('label');
          // lbReportingDt.className = "label-comment-answer-dt";
          // lbReportingDt.innerHTML = dateFormat(new Date(e.get("reportingDt")), 'yyyy년mm월dd일 HH:MM:ss');
  
          // const btnAnswerCmtRegister = document.createElement('vaadin-button');
          // btnAnswerCmtRegister.className = 'vaadin-button-cmt-register-onoff'
          // btnAnswerCmtRegister.textContent = '답글'
        // }
      // })
    // }
    // if (nextProps.questionAnswerCmtList !== null && nextProps.questionAnswerCmtList !== undefined) {
    //   console.log(nextProps.questionAnswerCmtList)
    //   let dateFormat = require('dateformat');
    //   const divComment = document.querySelector('#divComment');
    //   nextProps.questionAnswerCmtList.forEach(e => {

    //     const divCmt = document.createElement('div');
    //     divCmt.className = "div-comment-cmt";
    //     const iconCmt = document.createElement('iron-icon');
    //     iconCmt.setAttribute("icon", "icons:subdirectory-arrow-right")

    //     const lbCmtWriter = document.createElement('label');
    //     lbCmtWriter.className = "label-comment-cmt-writer"
    //     lbCmtWriter.innerHTML = e.get('cmtWriter')+'&nbsp&nbsp&nbsp';
    //     const lbReportingDt = document.createElement('label');
    //     lbReportingDt.className = "label-comment-cmt-dt";
    //     lbReportingDt.innerHTML = dateFormat(new Date(e.get("reportingDt")), 'yyyy년mm월dd일 HH:MM:ss');

    //     const br = document.createElement('br');
    //     const lbCmtTxt = document.createElement('label');
    //     lbCmtTxt.className = "label-comment-cmt-txt";
    //     lbCmtTxt.innerHTML = e.get('cmtTxt');

    //     const btnAnswerCmtRegister = document.createElement('vaadin-button');
    //     btnAnswerCmtRegister.className = 'vaadin-button-cmt-register-onoff'
    //     btnAnswerCmtRegister.textContent = '답글'

    //     divCmt.appendChild(iconCmt)
    //     divCmt.appendChild(lbCmtWriter)
    //     divCmt.appendChild(lbReportingDt)
    //     divCmt.appendChild(br)
    //     divCmt.appendChild(lbCmtTxt)

    //     divComment.insertBefore(divCmt, divComment.childNodes[2]);
    //   });
    // }
  // }

  render() {
    return (
      <Fragment>
        <div className="div-board-title">
          <label className="label-board-title" id="lbTitle" />
        </div>
        <div className="div-board-sub-title">
          <label id="lbReportingDt" />
          <label id="lbQuestionWriter" />
        </div>
        <div className="div-board-txt">
          <vaadin-details id="dlsTxt" />
          <br/>
          <label id="lbCommentTitle">댓글 0</label>
          <div className="div-comment" id="divComment">
            <vaadin-text-area id="taAnswerRegister"/>
            <vaadin-button id="btnAnswerRegister"/>
          </div>
        </div>
        <div>
          <vaadin-button id="btnGoList" />
          <vaadin-button id="btnUpdate" />
          <vaadin-button id="btnDelete" theme="error" />
        </div>
      </Fragment>
    );
  }
}
// export default connect(
//   state => ({
//     questionAnswerCmtList: state.question.questionAnswerCmtList,
//   }),
//   dispatch => ({
//     QuestionModule: bindActionCreators(questionActions, dispatch)
//   })
// )(QuestionDetail);
export default QuestionDetail;
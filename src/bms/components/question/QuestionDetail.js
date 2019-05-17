import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@polymer/iron-icons';

// 문의사항 상세조회 컴포넌트
class QuestionDetail extends Component {

  constructor(props) {
    super(props);
    this.state ={
      answer: {
        questionAnswerSid: null,
        answerTxt: null,
        answerLevel: null,
        answerWriter: null,
        reportingDt: null
      }
    }
  }

  componentDidMount() {
    const { question, answerList, detailToListCallback } = this.props;
    if (!question || question === undefined || answerList === undefined || !answerList || answerList.questionAnswerSid === null) {
      return
    }

    const { answer } = this.state;
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

    const taAnswerRegister = document.querySelector('#taAnswerRegister');
    taAnswerRegister.className = "vaadin-text-area-answer";
    taAnswerRegister.shadowRoot.querySelector('div').querySelector('div').style = "background: white;";
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

    document.querySelector('#lbCommentTitle').innerHTML = '댓글';
    let dateFormat = require('dateformat');
    
    const divComment = document.querySelector('#divComment');
    let index = 0;
    answerList.forEach(e => {
      const divAnswer = document.createElement('div');
      divAnswer.className = "div-comment-answer";
      divAnswer.id = "divAnswer" + index++;

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

      const btnAnswerCmtRegister = document.createElement('button');
      btnAnswerCmtRegister.className = 'button-cmt-register-onoff'
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
      const btnAnswerCmtDelete = document.createElement('button');
      btnAnswerCmtDelete.className = 'button-cmt-delete'
      btnAnswerCmtDelete.textContent = '삭제'
      btnAnswerCmtDelete.addEventListener('click', function() {
        // 삭제 알림 팝업 노출 -- 삭제하시겠습니까? 삭제시 댓글에 대한 답변이 전부 삭제됩니다.
      })
      const br = document.createElement('br');
      const lbAnswerTxt = document.createElement('label');
      lbAnswerTxt.className = "label-comment-answer-txt";
      lbAnswerTxt.innerHTML = e.get('answerTxt');

      divAnswer.appendChild(lbAnswerWriter);
      divAnswer.appendChild(lbReportingDt);
      divAnswer.appendChild(btnAnswerCmtRegister);
      divAnswer.appendChild(btnAnswerCmtDelete);
      divAnswer.appendChild(br);
      divAnswer.appendChild(lbAnswerTxt);

      // 최신순으로 적용되고 있음 수정 필요  2019-05-17 --> 2019-05-20 검토예정 + 댓글 추가 시 댓글목록 초기화 방법 구현 필요
      divComment.insertBefore(divAnswer, divComment.childNodes[0]);
      // divComment.insertAdjacentElement('afterend', divAnswer);
    });

  }
  // 댓글 목록
  cmtListIndex = 0;
  componentWillUpdate(nextProps, nextState) {
    const { answerList } = this.props;
    if (answerList !== null && answerList !== undefined) {
      if (nextProps.questionAnswerCmtList !== null && nextProps.questionAnswerCmtList !== undefined) {

        let dateFormat = require('dateformat');
        nextProps.questionAnswerCmtList.forEach(e => {
          this.cmtListIndex++;
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
              const divAnswer = document.querySelector('#divAnswer'+index);
              divAnswer.insertAdjacentElement('afterend', divCmt);
            }
          }
        });
        document.querySelector('#lbCommentTitleCount').innerHTML = answerList.size+this.cmtListIndex;
      }
    }
  }

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
          <div className="div-board-txt-details">
          <vaadin-details id="dlsTxt" />
          </div>
          <br/>
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
export default QuestionDetail;


  /* 댓글에 대한 대댓글 목록 삽입 테스트
  // componentDidUpdate(nextProps, nextState) {
    componentWillUpdate(nextProps, nextState) {
      console.log(nextProps);
    let answerIndexList = [];
    if (nextProps.questionAnswerList !== null && nextProps.questionAnswerList !== undefined) {
      document.querySelector('#lbCommentTitle').innerHTML = '댓글&nbsp'+nextProps.questionAnswerList.size;
      let dateFormat = require('dateformat');
      const divComment = document.querySelector('#divComment');
      nextProps.questionAnswerList.forEach(e => {
        const divAnswer = document.createElement('div');
        divAnswer.className = "div-comment-answer";

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

        answerIndexList.push({
          questionAnswerSid: e.get('questionAnswerSid')
        });
        console.log(answerIndexList);
        this.getQuestionAnswerCmtList(e.get('questionSid'))
        if (nextProps.questionAnswerCmtList !== null && nextProps.questionAnswerCmtList !== undefined) {
          console.log(nextProps.questionAnswerCmtList);
          const lbCmtWriter = document.createElement('label');
          lbAnswerWriter.className = "label-comment-answer-writer"
          lbAnswerWriter.innerHTML = e.get('answerWriter')+'&nbsp&nbsp&nbsp';
          const lbReportingDt = document.createElement('label');
          lbReportingDt.className = "label-comment-answer-dt";
          lbReportingDt.innerHTML = dateFormat(new Date(e.get("reportingDt")), 'yyyy년mm월dd일 HH:MM:ss');
  
          const btnAnswerCmtRegister = document.createElement('vaadin-button');
          btnAnswerCmtRegister.className = 'vaadin-button-cmt-register-onoff'
          btnAnswerCmtRegister.textContent = '답글'
        }
      })
    }
    if (nextProps.questionAnswerCmtList !== null && nextProps.questionAnswerCmtList !== undefined) {
      console.log(nextProps.questionAnswerCmtList)
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

        divComment.insertBefore(divCmt, divComment.childNodes[2]);
      });
    }
  }
  */
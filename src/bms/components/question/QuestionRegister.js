import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class QuestionRegister extends Component {

  constructor(props) {
    super(props);
    this.state ={
      question: {
        questionTitle: null,
        questionTxt: null,
        reportingDt: null
      }
    }
  }

  componentDidMount() {
    const { question } = this.state;
    const { questionDto, registerToListCallback } = this.props;

    // 등록 및 수정 처리를 위한 문의사항 값 초기화 함수
    const questionReset = () => {
      question.questionTitle = null;
      question.questionTxt = null;
      question.reportingDt = null;
    }

    // 문의사항 제목 수정 및 등록에 사용되는 텍스트필드
    const tfTitle = document.querySelector('#tfTitle');
    tfTitle.className = "vaadin-text-field-title"
    tfTitle.placeholder = '제목을 입력하세요.';
    // 전달받은 문의사항 값 여부 판별 후 텍스트필드 값 할당
    if (questionDto !== null && questionDto !== undefined && questionDto.questionSid !== null) {
      tfTitle.value = questionDto.questionTitle;
    } else {
      tfTitle.value = "";
    }
    // 텍스트 입력 시 문의사항 제목 값 할당
    tfTitle.addEventListener('input', function() { 
      question.questionTitle = tfTitle.value
    });

    let textValue;
    /** CKEditor5 구현 */
    const editor = document.querySelector('#editor');
    const div = document.createElement('div')
    ClassicEditor.create(div, {
      // editor config setting
      language:'ko',
      placeholder: '내용을 입력하세요.',
    }).then( editor => {
      // 전달받은 문의사항 값이 존재할 경우 전달받은 문의사항 값을 에디터값으로 설정
      if (questionDto !== null && questionDto !== undefined && questionDto.questionSid !== null) {
        editor.setData(questionDto.questionTxt);
      }
      textValue = editor;
    })
    .catch( err => {
        console.error( err.stack );
    } );
    editor.appendChild(div)

    const { addCallback, updateCallback } = this.props;
    // 문의사항 등록 버튼 이벤트
    const btnRegister = document.querySelector('#btnRegister');
    btnRegister.textContent = "확인"
    btnRegister.addEventListener('click', function() {
      // 문의사항 제목에 텍스트필드에 저장된 값 할당
      question.questionTitle = tfTitle.value;
      // 문의사항 내용에 CKEditor에 입력된 값 할당
      question.questionTxt = textValue.getData();
      question.questionLevel = 1;
      const check = window.confirm('문의사항을 등록 하시겠습니까?');
      if (check === true) {
        // 알림팝업 확인버튼을 클릭한 시점의 DATE값을 문의사항 작성일자에 할당
        question.reportingDt = new Date();
        // 문의사항 제목과 내용의 값이 존재하고
        // 전달받은 문의사항 값이 존재하지 않을경우 문의사항 등록 이벤트 호출
        if (question.questionTitle !== null && question.questionTxt !== null && questionDto.questionSid === null) {
          addCallback(question);
          registerToListCallback();
          questionReset();
        // 전달받은 문의사항 값이 존재할 경우 문의사항 수정 이벤트 호출 (sid값이 있을 경우)
        } else if (questionDto !== null && questionDto !== undefined && question.questionTitle !== null && question.questionTxt !== null && questionDto.questionSid !== null) {
          updateCallback(questionDto.questionSid, question);
          registerToListCallback();
          questionReset();
        // 입력된 값이 없고 전달받은 문의사항 값이 없을 경우 알림 이벤트
        } else {
          const nfRegisterFailure = document.createElement('vaadin-notification');
          nfRegisterFailure.renderer = function(root) {
            const container = document.createElement('div');
            const boldText = document.createElement('b');
            boldText.textContent = '입력되지 않은 항목이 있습니다.'
            const br = document.createElement('br');
            const labelText = document.createElement('label');
            labelText.textContent = '확인 후 다시 시도해주세요.'
            container.appendChild(boldText);
            container.appendChild(br);
            container.appendChild(labelText);

            root.appendChild(container);
          }
          document.body.appendChild(nfRegisterFailure);
          nfRegisterFailure.position = 'middle';
          nfRegisterFailure.duration = 3000;
          nfRegisterFailure.opened = true;
        }
      }
    })
    
    const { registerToDetailCallback } = this.props;
    const btnCancle = document.querySelector('#btnCancle');
    btnCancle.textContent = "취소";
    // 현재 등록된 문의사항 정보를 초기화하고 문의사항 목록화면으로 이동
    btnCancle.addEventListener('click', function() {
      if (questionDto !== null && questionDto !== undefined && questionDto.questionSid !== null) {
        registerToDetailCallback(questionDto);
      } else {
        registerToListCallback();
      }
      questionReset();
    })
  }

  render() {
    return (
      <Fragment>
        <vaadin-text-field id="tfTitle"/>
        <div id="editor"/>
        <div>
          <vaadin-button id="btnRegister"  />
          <vaadin-button id="btnCancle" theme="error" />
        </div>
      </Fragment>
    );
  }
}
export default QuestionRegister;
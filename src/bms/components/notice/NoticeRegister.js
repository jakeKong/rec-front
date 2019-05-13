import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class NoticeRegister extends Component {

  constructor(props) {
    super(props);
    this.state ={
      notice: {
        noticeTitle: null,
        noticeTxt: null,
        reportingDt: null
      }
    }
  }

  componentDidMount() {
    const { notice } = this.state;
    const { noticeDto, registerToListCallback } = this.props;

    // 등록 및 수정 처리를 위한 공지사항 값 초기화 함수
    const noticeReset = () => {
      notice.noticeTitle = null;
      notice.noticeTxt = null;
      notice.reportingDt = null;
    }

    // 공지사항 제목 수정 및 등록에 사용되는 텍스트필드
    const tfTitle = document.querySelector('#tfTitle');
    tfTitle.className = "vaadin-text-field-title"
    tfTitle.placeholder = '제목을 입력하세요.';
    // 전달받은 공지사항 값 여부 판별 후 텍스트필드 값 할당
    if (noticeDto !== null && noticeDto !== undefined && noticeDto.noticeSid !== null) {
      tfTitle.value = noticeDto.noticeTitle;
    } else {
      tfTitle.value = "";
    }
    // 텍스트 입력 시 공지사항 제목 값 할당
    tfTitle.addEventListener('input', function() { 
      notice.noticeTitle = tfTitle.value
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
      // 전달받은 공지사항 값이 존재할 경우 전달받은 공지사항 값을 에디터값으로 설정
      if (noticeDto !== null && noticeDto !== undefined && noticeDto.noticeSid !== null) {
        editor.setData(noticeDto.noticeTxt);
      }
      textValue = editor;
    })
    .catch( err => {
        console.error( err.stack );
    } );
    editor.appendChild(div)

    const { addCallback, updateCallback } = this.props;
    // 공지사항 등록 버튼 이벤트
    const btnRegister = document.querySelector('#btnRegister');
    btnRegister.textContent = "확인"
    btnRegister.addEventListener('click', function() {
      // 공지사항 제목에 텍스트필드에 저장된 값 할당
      notice.noticeTitle = tfTitle.value;
      // 공지사항 내용에 CKEditor에 입력된 값 할당
      notice.noticeTxt = textValue.getData();
      const check = window.confirm('공지사항을 등록 하시겠습니까?');
      if (check === true) {
        // 알림팝업 확인버튼을 클릭한 시점의 DATE값을 공지사항 작성일자에 할당
        notice.reportingDt = new Date();
        // 공지사항 제목과 내용의 값이 있을 경우
        // 전달받은 공지사항 값이 존재하지 않을경우 공지사항 등록 이벤트 호출
        if (notice.noticeTitle !== null && notice.noticeTxt !== null && noticeDto.noticeSid === null) {
          addCallback(notice);
          registerToListCallback();
          noticeReset();
        // 전달받은 공지사항 값이 존재할 경우 공지사항 수정 이벤트 호출 (sid값이 있을 경우)
        } else if (noticeDto !== null && noticeDto !== undefined && notice.noticeTitle !== null && notice.noticeTxt !== null && noticeDto.noticeSid !== null) {
          updateCallback(noticeDto.noticeSid, notice);
          registerToListCallback();
          noticeReset();
        // 입력된 값이 없고 전달받은 공지사항 값이 없을 경우 알림 이벤트
        } else {
          console.log(notice)
          console.log(noticeDto)
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
    // 현재 등록된 공지사항 정보를 초기화하고 공지사항 목록화면으로 이동
    btnCancle.addEventListener('click', function() {
      if (noticeDto !== null && noticeDto !== undefined && noticeDto.noticeSid !== null) {
        registerToDetailCallback(noticeDto);
      } else {
        registerToListCallback();
      }
      noticeReset();
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
export default NoticeRegister;
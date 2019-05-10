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
    const { noticeDto, RegisterToListCallback } = this.props;

    const noticeReset = () => {
      notice.noticeTitle = null;
      notice.noticeTxt = null;
      notice.reportingDt = null;
    }

    const tfTitle = document.querySelector('#tfTitle');
    tfTitle.className = "vaadin-text-field-title"
    tfTitle.placeholder = '제목을 입력하세요.';
    if (noticeDto !== null && noticeDto !== undefined && noticeDto.noticeSid !== null) {
      tfTitle.value = noticeDto.noticeTitle;
    } else {
      tfTitle.value = "";
    }
    tfTitle.addEventListener('input', function() { 
      notice.noticeTitle = tfTitle.value
    });

    let textValue;
    const editor = document.querySelector('#editor');
    const div = document.createElement('div')
    ClassicEditor.create(div, {
      language:'ko',
      placeholder: '내용을 입력하세요.',
    }).then( editor => {
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
    const btnRegister = document.querySelector('#btnRegister');
    btnRegister.textContent = "확인"
    btnRegister.addEventListener('click', function() {
      notice.noticeTxt = textValue.getData();
      const check = window.confirm('공지사항을 등록 하시겠습니까?');
      if (check === true) {
        notice.reportingDt = new Date();
        if (notice.noticeTitle !== null && notice.noticeTxt !== null && noticeDto.noticeSid === null) {
          addCallback(notice);
          RegisterToListCallback();
          noticeReset();
        } else if (noticeDto !== null && noticeDto !== undefined && noticeDto.noticeSid !== null) {
          updateCallback(noticeDto.noticeSid, notice);
          RegisterToListCallback();
          noticeReset();
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
    
    const btnGoList = document.querySelector('#btnGoList');
    btnGoList.textContent = "취소";
    btnGoList.addEventListener('click', function() {
      RegisterToListCallback();
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
          <vaadin-button id="btnGoList" theme="error" />
        </div>
      </Fragment>
    );
  }
}
export default NoticeRegister;
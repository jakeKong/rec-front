import React, { Component, Fragment } from 'react';

import Editor from 'tui-editor';
import 'tui-color-picker/dist/tui-color-picker.min';
import 'tui-editor/dist/tui-editor-extColorSyntax';
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';
import 'tui-color-picker/dist/tui-color-picker.min.css';
import '../../../styles/ToastEditor.scss';

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';

import storage from '../../../common/storage';
import { addNotice, updateNotice } from '../../api/noticeAxios';

class NoticeRegister extends Component {

  constructor(props) {
    super(props);
    this.state ={
      notice: {
        noticeTitle: null,
        noticeTxt: null,
        reportingDt: null
      },
    }
  }

  componentDidMount() {
    const { notice } = this.state;
    const { noticeDto } = this.props;

    // define youtube extension
    Editor.defineExtension('youtube', function() {
      // runs while markdown-it transforms code block to HTML
      Editor.codeBlockManager.setReplacer('youtube', function(youtubeId) {
        let wrapperId = 'yt' + Math.random().toString(36).substr(2, 10);
        setTimeout(renderYoutube.bind(null, wrapperId, youtubeId), 0);

        return '<div id="' + wrapperId + '"></div>';
      })
      function renderYoutube(wrapperId, youtubeId) {
        var el = document.querySelector('#' + wrapperId);
        el.innerHTML = '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + youtubeId + '"></iframe>';
      }
    })

    const toastEditor = new Editor({
      el: document.querySelector('#editSection'),
      language: 'ko_KR',
      previewStyle: 'vertical',
      height: 'auto',
      initialEditType: 'wysiwyg', // 'markdown',
      exts: ['colorSyntax', 'chart', 'uml', 'table', 'youtube'],
    });

    toastEditor.on('change', function() {
      notice.noticeTxt = toastEditor.getValue();
    })

    // 공지사항 제목 수정 및 등록에 사용되는 텍스트필드
    const tfTitle = document.querySelector('#tfTitle');
    tfTitle.className = "vaadin-text-field-title"
    tfTitle.placeholder = '제목을 입력하세요.';
    tfTitle.maxlength = '15';

    // 텍스트 입력 시 공지사항 제목 값 할당
    tfTitle.addEventListener('input', function() { 
      notice.noticeTitle = tfTitle.value
    });

    const btnRegister = document.querySelector('#btnRegister');

    if (noticeDto !== null && noticeDto !== undefined && noticeDto.noticeSid !== null) {
      toastEditor.setValue(noticeDto.noticeTxt);
      tfTitle.value = noticeDto.noticeTitle;

      notice.noticeTxt = noticeDto.noticeTxt
      notice.noticeTitle = noticeDto.noticeTitle;

      // 공지사항 수정 버튼 이벤트
      btnRegister.textContent = "수정"
      btnRegister.addEventListener('click', function() {
        const check = window.confirm('공지사항을 수정 하시겠습니까?');
        if (check === true) {
          // 알림팝업 확인버튼을 클릭한 시점의 DATE값을 공지사항 작성일자에 할당
          notice.reportingDt = new Date();
          // 공지사항 제목과 내용의 값이 있을 경우
          // 전달받은 공지사항 값이 존재할 경우 공지사항 수정 이벤트 호출 (sid값이 있을 경우)
          if (noticeDto !== null && noticeDto !== undefined && notice.noticeTitle !== null && notice.noticeTxt !== null && noticeDto.noticeSid !== null) {
            updateNotice(noticeDto.noticeSid, storage.get('loggedInfo').email, notice).then(res => {
              window.alert('수정 완료!');
              window.location.href = '/bms/notice/manage';
            }).catch(err => {
              console.log(err);
            })
          // 입력된 값이 없고 전달받은 공지사항 값이 없을 경우 알림 이벤트
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
    } else {
      tfTitle.value = "";
      notice.noticeTxt = null;
      notice.noticeTitle = null;
      // 공지사항 등록 버튼 이벤트
      btnRegister.textContent = "등록"
      btnRegister.addEventListener('click', function() {
        const check = window.confirm('공지사항을 등록 하시겠습니까?');
        if (check === true) {
          // 알림팝업 확인버튼을 클릭한 시점의 DATE값을 공지사항 작성일자에 할당
          notice.reportingDt = new Date();
          // 공지사항 제목과 내용의 값이 있을 경우
          // 전달받은 공지사항 값이 존재하지 않을경우 공지사항 등록 이벤트 호출
          if (notice.noticeTitle !== null && notice.noticeTxt !== null) {
            addNotice(storage.get('loggedInfo').email, notice).then(res => {
              window.alert('등록 완료!');
              window.location.href = '/bms/notice/manage';
            }).catch(err => {
              console.log(err);
            })
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
    }
    
    const btnCancle = document.querySelector('#btnCancle');
    btnCancle.textContent = "취소";
    btnCancle.addEventListener('click', function() {
      window.location.href = '/bms/notice/manage';
    })
  }

  render() {
    return (
      <Fragment>
        <vaadin-text-field id="tfTitle"/>
        <div id="toastEditor">
          <div id="editSection" />
        </div>
        <div>
          <vaadin-button id="btnRegister"  />
          <vaadin-button id="btnCancle" theme="error" />
        </div>
      </Fragment>
    );
  }
}

export default NoticeRegister;
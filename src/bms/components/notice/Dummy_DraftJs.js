/*
import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class NoticeRegister extends Component {

  constructor(props) {
    super(props);
    this.state ={
      notice: {
        noticeTitle: null,
        noticeTxt: null,
        reportingDt: null
      },
      editorState: EditorState.createEmpty(),
    }
    this.getEditorState = this.getEditorState.bind(this);
    this.setEditorState = this.setEditorState.bind(this);
  }

  // componentWillUpdate(nextProps, nextState) {
  //   // console.log(nextProps)
  //   console.log(nextState.editorState)
  //   console.log(nextState)
  //   console.log(document.getElementsByClassName('rdw-image-modal-upload-option-input'))
  // }

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
    // 텍스트 입력 시 공지사항 제목 값 할당
    tfTitle.addEventListener('input', function() { 
      notice.noticeTitle = tfTitle.value
    });

    const setEditorState = this.setEditorState;
    // 전달받은 공지사항 값 여부 판별 후 값 할당
    if (noticeDto !== null && noticeDto !== undefined && noticeDto.noticeSid !== null) {
      tfTitle.value = noticeDto.noticeTitle;
      setEditorState(noticeDto.noticeTxt);
    } else {
      tfTitle.value = "";
    }

    // let textValue;
    // 2019-06-05 13:28:00 issue! = 파일 업로드 드래그로는 가능한데 클릭하여 로컬파일 선택창이 안열림
    // const draftEditor = document.getElementsByClassName('rdw-editor-wrapper')[0];
    // console.log(draftEditor);

    // 2019-06-05 14:30:00 input값 확인 필요(input이 정상적으로 작동하지 않는 문제(원인 찾아보삼))
    // const input = document.getElementsByClassName('rdw-image-modal-upload-option-input')[0]

    const { addCallback, updateCallback } = this.props;
    // 공지사항 등록 버튼 이벤트
    const btnRegister = document.querySelector('#btnRegister');
    btnRegister.textContent = "등록"
    const getEditorState = this.getEditorState;
    btnRegister.addEventListener('click', function() {
      // 공지사항 제목에 텍스트필드에 저장된 값 할당
      notice.noticeTitle = tfTitle.value;
      // 공지사항 내용에 CKEditor에 입력된 값 할당
      // notice.noticeTxt = textValue.getData();
      notice.noticeTxt = getEditorState();
      // console.log(getEditorState());
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

  getEditorState() {
    const { editorState } = this.state;
    return editorState;
  }

  setEditorState(noticeTxt) {
    const contentBlock = htmlToDraft(noticeTxt);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    this.setState({editorState : EditorState.createWithContent(contentState)})
    console.log(noticeTxt)
    console.log(contentBlock)
    console.log(contentState)
    console.log(EditorState.createWithContent(contentState));
  }

  onEditorStateChange = (inputEditorState) => {
    this.setState({
      editorState: draftToHtml(convertToRaw(inputEditorState.getCurrentContent()))
    });
    // console.log(draftToHtml(convertToRaw(inputEditorState.getCurrentContent())));
    // const { editorState } = this.state;
    // console.log(editorState);
  };

  uploadImageCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  render() {
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

    return (
      <Fragment>
        <vaadin-text-field id="tfTitle"/>
        <Editor
          inputEditorState={editorState}
          toolbarClassName="toolbar-class"
          wrapperClassName="wrapper-class"
          editorClassName="toolbar-class"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            link: { showOpenOptionOnHover: true },
            image: { 
              uploadCallback: this.uploadImageCallBack, 
              alt: { present: true, mandatory: true } 
            },
          }}
        />
        <div>
          <vaadin-button id="btnRegister"  />
          <vaadin-button id="btnCancle" theme="error" />
        </div>
      </Fragment>
    );
  }
}
export default NoticeRegister;
*/
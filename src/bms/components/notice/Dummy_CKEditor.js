// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//     let textValue;
//     /** CKEditor5 구현 */
//     const editor = document.querySelector('#editor');
//     const div = document.createElement('div')
//     ClassicEditor.create(div, {
//       // editor config setting
//       language:'ko',
//       placeholder: '내용을 입력하세요.',
//     }).then( editor => {
//       // 전달받은 공지사항 값이 존재할 경우 전달받은 공지사항 값을 에디터값으로 설정
//       if (noticeDto !== null && noticeDto !== undefined && noticeDto.noticeSid !== null) {
//         editor.setData(noticeDto.noticeTxt);
//       }
//       textValue = editor;
//     })
//     .catch( err => {
//         console.error( err.stack );
//     } );
//     editor.appendChild(div)


//   render() {
//     return (
//       <Fragment>
//         <vaadin-text-field id="tfTitle"/>
//         {/* <div id="editor" className="div-editor" /> */}
//         {/* <FroalaEditorComponent /> */}
//         <div>
//           <vaadin-button id="btnRegister"  />
//           <vaadin-button id="btnCancle" theme="error" />
//         </div>
//       </Fragment>
//     );
//   }
// }
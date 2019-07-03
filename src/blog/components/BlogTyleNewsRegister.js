import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as FileLoadActions from "../../common/modules/FileLoadModule";

// layout
import '@vaadin/vaadin-ordered-layout';

// component
import '@vaadin/vaadin-overlay';
import '@vaadin/vaadin-dialog';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-number-field';

class BlogTyleNewsRegister extends Component {

  constructor(props) {
    super(props);
    this.state ={
      dto: {
        sid: null,
        img: null,
        link: null,
        title: null,
        subTitle: null,
        writer: null,
        writeDt: null,
        visibility: false
      },
      clicked: {
        type: Boolean,
        value: false
      },
      noCloseOnOutsideClick: {
        type: Boolean,
        value: false
      },
      noCloseOnEsc: {
        type: Boolean,
        value: false
      },
    }
    this.uploadFile = this.uploadFile.bind(this);
  }

  /**
   * Close the dialog if `noCloseOnOutsideClick` isn't set to true
   */
  _handleOutsideClick(e) {
    if (this.state.noCloseOnOutsideClick) {
      e.preventDefault();
    }
  }

  /**
   * Close the dialog if `noCloseOnEsc` isn't set to true
   */
  _handleEscPress(e) {
    if (this.state.noCloseOnEsc) {
      e.preventDefault();
    }
  }

  uploadFile = async (file) => {
    const { FileLoadModule } = this.props;
    try {
      await FileLoadModule.uploadFile(file);
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  componentDidMount() {
    // search parameter default setting
    const { dto, clicked } = this.state;
    const { blog, popupOpened } = this.props;
    if (popupOpened  === undefined) {
      return;
    } else {

      const resetDto = () => {
        tfTitle.value = null;
        tfSubTitle.value = null;
        tfLink.value = null;
        dto.sid = null;
        dto.title = null;
        dto.subTitle = null;
        dto.link = null;
        dto.img = null;
      }

      document.querySelector('#doRegister').opened = false;
      document.querySelector('#doRegister').withBackdrop = true;
      document.querySelector('#doRegister').focusTrap = true;
      document.querySelector('#doRegister').addEventListener('vaadin-overlay-outside-click', this._handleOutsideClick.bind(this));
      document.querySelector('#doRegister').addEventListener('vaadin-overlay-escape-press', this._handleEscPress.bind(this));

      document.querySelector('#lbTitle').innerHTML = "제목";
      document.querySelector('#lbSubTitle').innerHTML = "분류";
      document.querySelector('#lbLink').innerHTML = "블로그 링크";
      document.querySelector('#lbImage').innerHTML = "파일 이미지";
        
      const tfTitle = document.querySelector('#tfTitle');
      tfTitle.maxlength = '10';
      tfTitle.className = 'vaadin-text-field-width-200-flex-80';
      tfTitle.addEventListener('input', function() {
        dto.title = tfTitle.value;
      });
      const tfSubTitle = document.querySelector('#tfSubTitle');
      tfSubTitle.maxlength = '15';
      tfSubTitle.className = 'vaadin-text-field-width-200-flex-80';
      tfSubTitle.addEventListener('input', function() {
        dto.subTitle = tfSubTitle.value;
      });
      const tfLink = document.querySelector('#tfLink');
      tfLink.className = 'vaadin-text-field-width-200-flex-80';
      tfLink.addEventListener('input', function() {
        dto.link = tfLink.value;
      });

      if (blog === undefined) {
        tfTitle.placeholder = '상품 코드를 입력해주세요.';
        tfSubTitle.placeholder = '상품 명을 입력해주세요.';
        tfLink.placeholder = '상품 포인트를 입력해주세요.';
      } else {
        if (blog.sid !== null) {
          dto.sid = blog.sid;
        }
        if (blog.title !== null) {
          dto.title = blog.title;
          tfTitle.value = blog.title;
        }
        if (blog.subTitle !== null) {
          dto.subTitle = blog.subTitle;
          tfSubTitle.value = blog.subTitle;
        }
        if (blog.link !== null) {
          dto.link = blog.link;
          tfLink.value = blog.link;
        }
        if (blog.image !== null) {
          dto.image = blog.image;
        }
      }

      const uploadFile = this.uploadFile;
      const ipImg = document.querySelector('#ipImg');
      ipImg.addEventListener('input', function(e) {
        let form = new FormData();
        // form.append('file', e.target.files[0])
        form.append('file', e.target.files[0])
        console.log(e.target.files[0])
        console.log(form)
        uploadFile(form)
      })

      // eslint-disable-next-line
      const { addCallback, updateCallback } = this.props;
      const btnOk = document.querySelector('#btnOk');
      btnOk.innerHTML = "확인";
      btnOk.addEventListener('click', function() {
        if (dto.title === null || dto.title === undefined || dto.title === "") {
          window.alert('입력되지 않은 값이 있습니다. 입력 후 다시 시도해주세요.');
          return;
        }
        if (dto.subTitle === null || dto.subTitle === undefined || dto.subTitle === "") {
          window.alert('입력되지 않은 값이 있습니다. 입력 후 다시 시도해주세요.');
          return;
        }
        if (dto.link === null || dto.link === undefined || dto.link === "") {
          window.alert('입력되지 않은 값이 있습니다. 입력 후 다시 시도해주세요.');
          return;
        }
        /*
        if (dto.cashRatio === null || dto.cashRatio === undefined || dto.cashRatio === "") {
          window.alert('입력되지 않은 값이 있습니다. 입력 후 다시 시도해주세요.');
          return;
        }
        */
        if (dto.sid === null || dto.sid === undefined) {
          // addCallback(dto);
        } else {
          // updateCallback(dto);
        }
        popupClose(clicked);
        document.querySelector('#doRegister').opened = false;
        resetDto();
      });

      const { popupClose } = this.props;
      const btnCancle = document.querySelector('#btnCancle');
      btnCancle.innerHTML = "취소";
      btnCancle.addEventListener('click', function() {
        popupClose(clicked);
        document.querySelector('#doRegister').opened = false;
        resetDto();
      });

      if (popupOpened === false) {
        document.querySelector('#doRegister').opened = false;
      } else if (popupOpened === true) {
        document.querySelector('#doRegister').opened = true;
      }
    }
  }

  render() {
    return (
      <Fragment>
        <vaadin-dialog-overlay id="doRegister">
          <div className="div-register-popup-board">
            <div className="default-column">
              <label id="lbTitle" className="label-flex-20-left"/>
              <vaadin-text-field id="tfTitle" required prevent-invalid-input pattern="([a-zA-Zㄱ-ㅎ가-힣0-9]+?)"/>
            </div>
            <div className="default-column">
              <label id="lbSubTitle" className="label-flex-20-left"/>
              <vaadin-text-field id="tfSubTitle" required prevent-invalid-input pattern="([a-zA-Zㄱ-ㅎ가-힣0-9]+?)"/>
            </div>
            <div className="default-column">
              <label id="lbLink" className="label-flex-20-left"/>
              <vaadin-text-field id="tfLink" required prevent-invalid-input pattern="([a-zA-Zㄱ-ㅎ가-힣0-9]+?)"/>
            </div>
            <div className="default-column">
              <label id="lbImage" className="label-flex-20-left" />
              <img id="img" alt=""/>
              <input type="file" id="ipImg" />
            </div>
          </div>
          <div className="div-register-popup-bottom">
            <vaadin-button id="btnOk"/>
            <vaadin-button id="btnCancle" theme="error"/>
          </div>
        </vaadin-dialog-overlay>
      </Fragment>
    );
  }
}
export default connect(
  state => ({
    pending: state.files.pending,
    error: state.files.error,
    success: state.files.success,
  }),
  dispatch => ({
    FileLoadModule: bindActionCreators(FileLoadActions, dispatch)
  })
)(BlogTyleNewsRegister);

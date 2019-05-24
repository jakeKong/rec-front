import React, { Component, Fragment } from 'react';

// layout
import '@vaadin/vaadin-ordered-layout';

// component
import '@vaadin/vaadin-overlay';
import '@vaadin/vaadin-dialog';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-number-field';

class ProductRegister extends Component {

  constructor(props) {
    super(props);
    this.state ={
      dto: {
        productSid: null,
        productCd: null,
        productNm: null,
        productPoint: null,
        cashRatio: null
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

  componentWillUpdate(nextProps, nextState) {
    // popup opened props check
    if (nextProps.popupOpened === false) {
      document.querySelector('#doRegister').opened = false;
    } else if (nextProps.popupOpened === true) {
      document.querySelector('#doRegister').opened = true;
    }

    const { dto } = this.state;
    dto.productSid = nextProps.productDto.productSid;
    
    const tfCd = document.querySelector('#tfCd')
    tfCd.value = nextProps.productDto.productCd;
    dto.productCd = tfCd.value;

    const tfNm = document.querySelector('#tfNm')
    tfNm.value = nextProps.productDto.productNm;
    dto.productNm = tfNm.value;

    const tnfProductPoint = document.querySelector('#tfPoint')
    tnfProductPoint.value = nextProps.productDto.productPoint;
    dto.productPoint = tnfProductPoint.value;

    const tfCashRatio = document.querySelector('#tfCashRatio')
    tfCashRatio.value = nextProps.productDto.cashRatio;
    dto.cashRatio = tfCashRatio.value;

  }

  componentDidMount() {
    // search parameter default setting
    const { dto, clicked } = this.state;

    const resetDto = () => {
      tfProductCd.value = null;
      tfProductNm.value = null;
      tnfProductPoint.value = null;
      tfCashRatio.value = null;
      dto.productSid = null;
      dto.productCd = null;
      dto.productNm = null;
      dto.productPoint = null;
      dto.cashRatio = null;
    }

    document.querySelector('#doRegister').opened = false;
    document.querySelector('#doRegister').withBackdrop = true;
    document.querySelector('#doRegister').focusTrap = true;
    document.querySelector('#doRegister').addEventListener('vaadin-overlay-outside-click', this._handleOutsideClick.bind(this));
    document.querySelector('#doRegister').addEventListener('vaadin-overlay-escape-press', this._handleEscPress.bind(this));

    document.querySelector('#lbCd').innerHTML = "상품 코드";
    document.querySelector('#lbNm').innerHTML = "상품 명";
    document.querySelector('#lbPoint').innerHTML = "상품 포인트";
    document.querySelector('#lbCashRatio').innerHTML = "현금 비율";
      
    // 상품 코드 텍스트필드
    const tfProductCd = document.querySelector('#tfCd');
    tfProductCd.maxlength = '10';
    tfProductCd.placeholder = '상품 코드를 입력해주세요.';
    tfProductCd.addEventListener('input', function() {
      dto.productCd = tfProductCd.value;
    });

    // 상품 명 텍스트필드
    const tfProductNm = document.querySelector('#tfNm');
    tfProductNm.maxlength = '15';
    tfProductNm.placeholder = '상품 명을 입력해주세요.';
    tfProductNm.addEventListener('input', function() {
      dto.productNm = tfProductNm.value;
    });
    // 상품 포인트 텍스트필드 (숫자 체크 필요)
    const tnfProductPoint = document.querySelector('#tfPoint');
    tnfProductPoint.maxlength = '5';
    tnfProductPoint.placeholder = '상품 포인트를 입력해주세요.';
    tnfProductPoint.addEventListener('input', function() {
      dto.productPoint = tnfProductPoint.value;
    });

    // 현금 비율 텍스트필드 (BigDecimal 3.2 체크 필요)
    const tfCashRatio = document.querySelector('#tfCashRatio');
    tfCashRatio.placeholder = '현금 비율을 입력해주세요.';
    tfCashRatio.addEventListener('input', function() {
      dto.cashRatio = tfCashRatio.value;
    });

    const { addCallback, updateCallback } = this.props;
    const btnOk = document.querySelector('#btnOk');
    btnOk.innerHTML = "확인";
    btnOk.addEventListener('click', function() {
      if (dto.productCd === null || dto.productCd === undefined || dto.productCd === "") {
        window.alert('입력되지 않은 값이 있습니다. 입력 후 다시 시도해주세요.');
        return;
      }
      if (dto.productNm === null || dto.productNm === undefined || dto.productNm === "") {
        window.alert('입력되지 않은 값이 있습니다. 입력 후 다시 시도해주세요.');
        return;
      }
      if (dto.productPoint === null || dto.productPoint === undefined || dto.productPoint === "") {
        window.alert('입력되지 않은 값이 있습니다. 입력 후 다시 시도해주세요.');
        return;
      }
      if (dto.cashRatio === null || dto.cashRatio === undefined || dto.cashRatio === "") {
        window.alert('입력되지 않은 값이 있습니다. 입력 후 다시 시도해주세요.');
        return;
      }
      if (dto.productSid === null || dto.productSid === undefined) {
        addCallback(dto);
      } else {
        updateCallback(dto);
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
  }

  render() {
    return (
      <Fragment>
        <vaadin-dialog-overlay id="doRegister">
          <div className="div-register-popup-board">
            <div className="default-column">
              <label id="lbCd"/>
              <vaadin-text-field id="tfCd" required prevent-invalid-input pattern="([a-zA-Zㄱ-ㅎ가-힣0-9]+?)"/>
            </div>
            <div className="default-column">
              <label id="lbNm"/>
              <vaadin-text-field id="tfNm" required prevent-invalid-input pattern="^([a-zA-Zㄱ-ㅎ가-힣0-9\s]+$)"/>
            </div>
            <div className="default-column">
              <label id="lbPoint"/>
              <vaadin-text-field id="tfPoint" required prevent-invalid-input pattern="[0-9]*"/>
            </div>
            <div className="default-column">
              <label id="lbCashRatio"/>
              <vaadin-text-field id="tfCashRatio" required prevent-invalid-input pattern="^(\d{1,1}([.]\d{0,2})?)?$"/>
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
export default ProductRegister ;


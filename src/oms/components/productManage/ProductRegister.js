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
        pointCash: null
        // cashRatio: null
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

  // componentWillUpdate(nextProps, nextState) {
  //   // popup opened props check
  //   if (nextProps.popupOpened === false) {
  //     document.querySelector('#doRegister').opened = false;
  //   } else if (nextProps.popupOpened === true) {
  //     document.querySelector('#doRegister').opened = true;
  //   }

  //   const { dto } = this.state;
  //   dto.productSid = nextProps.productDto.productSid;
    
  //   const tfCd = document.querySelector('#tfCd')
  //   tfCd.value = nextProps.productDto.productCd;
  //   dto.productCd = tfCd.value;

  //   const tfNm = document.querySelector('#tfNm')
  //   tfNm.value = nextProps.productDto.productNm;
  //   dto.productNm = tfNm.value;

  //   const tfProductPoint = document.querySelector('#tfPoint')
  //   tfProductPoint.value = nextProps.productDto.productPoint;
  //   dto.productPoint = tfProductPoint.value;

  //   const tfPointCash = document.querySelector('#tfPointCash')
  //   tfPointCash.value = nextProps.productDto.pointCash;
  //   dto.pointCash = tfPointCash.value;

  //   /*
  //   const tfCashRatio = document.querySelector('#tfCashRatio')
  //   tfCashRatio.value = nextProps.productDto.cashRatio;
  //   dto.cashRatio = tfCashRatio.value;
  //   */

  // }

  componentDidMount() {
    // search parameter default setting
    const { dto, clicked } = this.state;
    const { productDto, popupOpened } = this.props;
    if (popupOpened  === undefined) {
      return;
    } else {

      const resetDto = () => {
        tfProductCd.value = null;
        tfProductNm.value = null;
        tfProductPoint.value = null;
        // tfCashRatio.value = null;
        tfPointCash.value = null;
        dto.productSid = null;
        dto.productCd = null;
        dto.productNm = null;
        dto.productPoint = null;
        dto.pointCash = null;
        // dto.cashRatio = null;
      }

      document.querySelector('#doRegister').opened = false;
      document.querySelector('#doRegister').withBackdrop = true;
      document.querySelector('#doRegister').focusTrap = true;
      document.querySelector('#doRegister').addEventListener('vaadin-overlay-outside-click', this._handleOutsideClick.bind(this));
      document.querySelector('#doRegister').addEventListener('vaadin-overlay-escape-press', this._handleEscPress.bind(this));

      document.querySelector('#lbCd').innerHTML = "상품 코드";
      document.querySelector('#lbNm').innerHTML = "상품 명";
      document.querySelector('#lbPoint').innerHTML = "상품 포인트";
      document.querySelector('#lbPointCash').innerHTML = "포인트 가격";
      // document.querySelector('#lbCashRatio').innerHTML = "현금 비율";
        
      // 상품 코드 텍스트필드
      const tfProductCd = document.querySelector('#tfCd');
      tfProductCd.maxlength = '10';
      tfProductCd.className = 'vaadin-text-field-width-200-flex-80';
      tfProductCd.addEventListener('input', function() {
        dto.productCd = tfProductCd.value;
      });

      // 상품 명 텍스트필드
      const tfProductNm = document.querySelector('#tfNm');
      tfProductNm.maxlength = '15';
      tfProductNm.className = 'vaadin-text-field-width-200-flex-80';
      tfProductNm.addEventListener('input', function() {
        dto.productNm = tfProductNm.value;
      });
      // 상품 포인트 텍스트필드 (숫자 체크 필요)
      const tfProductPoint = document.querySelector('#tfPoint');
      tfProductPoint.maxlength = '5';
      tfProductPoint.className = 'vaadin-text-field-width-200-flex-80';
      tfProductPoint.addEventListener('input', function() {
        dto.productPoint = tfProductPoint.value;
      });

      const tfPointCash = document.querySelector('#tfPointCash');
      tfPointCash.maxlength = '5';
      tfPointCash.className = 'vaadin-text-field-width-200-flex-80';
      tfPointCash.addEventListener('input', function() {
        dto.pointCash = tfPointCash.value;
      });

      // 현금 비율 텍스트필드 (BigDecimal 3.2 체크 필요)
      /*
      const tfCashRatio = document.querySelector('#tfCashRatio');
      tfCashRatio.placeholder = '현금 비율을 입력해주세요.';
      tfCashRatio.addEventListener('input', function() {
        dto.cashRatio = tfCashRatio.value;
      });
      */

      if (productDto === undefined) {
        tfProductCd.placeholder = '상품 코드를 입력해주세요.';
        tfProductNm.placeholder = '상품 명을 입력해주세요.';
        tfProductPoint.placeholder = '상품 포인트를 입력해주세요.';
        tfPointCash.placeholder = '포인트 가격을 입력해주세요.';
      } else {
        if (productDto.productCd !== null) {
          dto.productSid = productDto.productSid;
        }
        if (productDto.productCd !== null) {
          dto.productCd = productDto.productCd;
          tfProductCd.value = productDto.productCd;
        }
        if (productDto.productNm !== null) {
          dto.productNm = productDto.productNm;
          tfProductNm.value = productDto.productNm;
        }
        if (productDto.productPoint !== null) {
          dto.productPoint = productDto.productPoint;
          tfProductPoint.value = productDto.productPoint;
        }
        if (productDto.pointCash !== null) {
          dto.pointCash = productDto.pointCash;
          tfPointCash.value = productDto.pointCash;
        }
      }

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
        if (dto.pointCash === null || dto.pointCash === undefined || dto.pointCash === "") {
          window.alert('입력되지 않은 값이 있습니다. 입력 후 다시 시도해주세요.');
          return;
        }
        /*
        if (dto.cashRatio === null || dto.cashRatio === undefined || dto.cashRatio === "") {
          window.alert('입력되지 않은 값이 있습니다. 입력 후 다시 시도해주세요.');
          return;
        }
        */
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
            <label hidden/>
            <div className="default-column">
              <label className="label-flex-20-left" id="lbCd"/>
              <vaadin-text-field id="tfCd" required prevent-invalid-input pattern="([a-zA-Zㄱ-ㅎ가-힣0-9]+?)"/>
            </div>
            <div className="default-column">
              <label className="label-flex-20-left" id="lbNm"/>
              <vaadin-text-field id="tfNm" required prevent-invalid-input pattern="^([a-zA-Zㄱ-ㅎ가-힣0-9\s,]+$)"/>
            </div>
            <div className="default-column">
              <label className="label-flex-20-left" id="lbPoint"/>
              <vaadin-text-field id="tfPoint" required prevent-invalid-input pattern="[0-9]*"/>
            </div>
            <div className="default-column">
              {/* <label id="lbCashRatio"/> */}
              {/* <vaadin-text-field id="tfCashRatio" required prevent-invalid-input pattern="^(\d{1,1}([.]\d{0,2})?)?$"/> */}
              <label className="label-flex-20-left" id="lbPointCash"/>
              <vaadin-text-field id="tfPointCash" required prevent-invalid-input pattern="[0-9]*"/>
            </div>
            <label hidden/>
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


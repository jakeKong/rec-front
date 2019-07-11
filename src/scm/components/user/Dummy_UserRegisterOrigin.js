/*
import React, { Component, Fragment } from 'react';

// component
import '@vaadin/vaadin-overlay';
import '@vaadin/vaadin-dialog';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-number-field';
import '@vaadin/vaadin-date-picker'
import '@vaadin/vaadin-list-box'

import '@vaadin/vaadin-icons'

import { roleCodeItems } from '../../items';

class UserRegister extends Component {

  constructor(props) {
    super(props);
    this.state ={
      dto: {
        email: null,
        name: null,
        tellNo: null,
        address: null,
        addressNo: null,
        birthDt: null,
        createdUser: null,
        assignedRoles: [],
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

  _handleOutsideClick(e) {
    if (this.state.noCloseOnOutsideClick) {
      e.preventDefault();
    }
  }

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

    // updateOnOff 값 체크로 확인버튼 클릭 시 수정 및 등록 설정 필요 - 2019-05-23
    const { dto } = this.state;
    if (nextProps.user.email !== null) {
      dto.email = nextProps.user.email;
      const tfEmailName = document.querySelector('#tfEmailName');
      tfEmailName.value = nextProps.user.email.substr(0, nextProps.user.email.indexOf("@"));
      const tfEmailDomain = document.querySelector('#tfEmailDomain');
      tfEmailDomain.value = nextProps.user.email.substr(nextProps.user.email.indexOf("@")+1, nextProps.user.email.indexOf(".")-nextProps.user.email.indexOf("@")-1);
      const tfEmailCom = document.querySelector('#tfEmailCom');
      tfEmailCom.value = nextProps.user.email.substr(nextProps.user.email.indexOf(".")+1, nextProps.user.email.indexOf("."));
    }
    if (nextProps.user.name !== null) {
      dto.name = nextProps.user.name;
      const tfNm = document.querySelector('#tfNm');
      tfNm.value = nextProps.user.name;
    }
    if (nextProps.user.tellNo !== null) {
      dto.tellNo = nextProps.user.tellNo;
      const tfTellStation = document.querySelector('#tfTellStation');
      tfTellStation.value = nextProps.user.tellNo.substr(0, nextProps.user.tellNo.indexOf("-"));
      const tfTellByNumber = document.querySelector('#tfTellByNumber');
      tfTellByNumber.value = nextProps.user.tellNo.substr(nextProps.user.tellNo.indexOf("-")+1, nextProps.user.tellNo.lastIndexOf("-")-nextProps.user.tellNo.indexOf("-")-1);
      const tfTellNumberByNumber = document.querySelector('#tfTellNumberByNumber');
      tfTellNumberByNumber.value = nextProps.user.tellNo.substr(nextProps.user.tellNo.lastIndexOf("-")+1, nextProps.user.tellNo.lastIndexOf("-"));
    }
    if (nextProps.user.address !== null) {
      dto.address = nextProps.user.address;
      const tfAddress = document.querySelector('#tfAddress');
      tfAddress.value = nextProps.user.address;
    }
    if (nextProps.user.addressNo !== null) {
      dto.addressNo = nextProps.user.addressNo;
      const tfAddressNo = document.querySelector('#tfAddressNo');
      tfAddressNo.value = nextProps.user.addressNo;
    }
    if (nextProps.user.birthDt !== null) {
      dto.birthDt = nextProps.user.birthDt;
      const dpBirthDt = document.querySelector('#dpBirthDt');
      dpBirthDt.value = nextProps.user.birthDt;
    }

    // 수정중 -- 2019-05-24 --> 2019-06-13 다른거먼저하고 
    
    console.log(nextProps.user.assignedRoles);
    if (nextProps.user.assignedRoles !== null && nextProps.user.assignedRoles.length !== 0) {
      const lsbAfterAssignedRoles = document.querySelector('#lsbAfterAssignedRoles');
      let afterSelectItem = '';
      nextProps.user.assignedRoles.forEach(e => {
        roleCodeItems.forEach(role => {
          if (e === role.value) {
            const roleCodeItem = document.createElement('vaadin-item')
            roleCodeItem.textContent = role.textContent;
            roleCodeItem.addEventListener('click', function() {
              roleCodeItem.selected = !roleCodeItem.selected;
              if (roleCodeItem.selected) {
                afterSelectItem = {value: e, textContent: role.textContent};
                console.log(afterSelectItem)
              } else {
                afterSelectItem = '';
                console.log(afterSelectItem)
              }
            })
            lsbAfterAssignedRoles.appendChild(roleCodeItem);
          }
        })
      })
      function resetLsbAfterAssignedRoles() {
        for (let index=lsbAfterAssignedRoles.childElementCount-1; index>=nextProps.user.assignedRoles.length; index--) {
          lsbAfterAssignedRoles.removeChild(lsbAfterAssignedRoles.childNodes[index]);
        }
      }
      resetLsbAfterAssignedRoles();
    }
    

  }
  componentDidMount() {
    // search parameter default setting
    const { dto, clicked } = this.state;
    
    // 변수 초기화 함수
    const resetDto = () => {
      tfEmailName.value = null;
      tfEmailDomain.value = null;
      tfEmailCom.value = null;
      tfNm.value = null;
      tfTellStation.value = null;
      tfTellByNumber.value = null;
      tfTellNumberByNumber.value = null;
      tfAddress.value = null;
      tfAddressNo.value = null;
      dpBirthDt.value = null;
      dto.email = null;
      dto.name = null;
      dto.tellNo = null;
      dto.address = null;
      dto.addressNo = null;
      dto.birthDt = null;
      dto.createdUser = null;
      dto.assignedRoles = [];
      lsbBeforeAssignedRoles.selected = 'none';
      beforeSelectItem = '';
      lsbAfterAssignedRoles.selected = 'none';
      afterSelectItem = '';
    }

    document.querySelector('#doRegister').opened = false;
    document.querySelector('#doRegister').withBackdrop = true;
    document.querySelector('#doRegister').focusTrap = true;
    document.querySelector('#doRegister').addEventListener('vaadin-overlay-outside-click', this._handleOutsideClick.bind(this));
    document.querySelector('#doRegister').addEventListener('vaadin-overlay-escape-press', this._handleEscPress.bind(this));

    document.querySelector('#lbEmail').innerHTML = "이메일";
    document.querySelector('#lbEmailCommercial').innerHTML = " @ ";
    document.querySelector('#lbEmailPeriod').innerHTML = " . ";
    
    document.querySelector('#lbNm').innerHTML = "이름";

    document.querySelector('#lbTellNo').innerHTML = "전화번호";
    document.querySelector('#lbTellNoHyphen').innerHTML = " - ";
    document.querySelector('#lbTellNoHyphenTo').innerHTML = " - ";

    document.querySelector('#lbAddress').innerHTML = "주소";
    document.querySelector('#lbAddressNo').innerHTML = "&nbsp&nbsp우편번호";
    document.querySelector('#lbBirthDt').innerHTML = "생년월일";

    // 이메일 입력필드
    const tfEmailName = document.querySelector('#tfEmailName');
    tfEmailName.className = 'vaadin-text-field-width-200';
    // tfEmailName.placeholder = '이메일을 입력해주세요.';
    const tfEmailDomain = document.querySelector('#tfEmailDomain');
    tfEmailDomain.className = 'vaadin-text-field-width-100';
    const tfEmailCom = document.querySelector('#tfEmailCom');
    tfEmailCom.className = 'vaadin-text-field-width-70';

    // 이름 입력필드
    const tfNm = document.querySelector('#tfNm');
    tfNm.className = 'vaadin-text-field-width-200-flex-80';
    tfNm.placeholder = '이름을 입력해주세요';
    tfNm.addEventListener('input', function() {
      dto.name = tfNm.value;
    })

    // 전화번호 입력필드
    const tfTellStation = document.querySelector('#tfTellStation');
    tfTellStation.className = 'vaadin-text-field-width-100'
    const tfTellByNumber = document.querySelector('#tfTellByNumber');
    tfTellByNumber.className = 'vaadin-text-field-width-100';
    const tfTellNumberByNumber = document.querySelector('#tfTellNumberByNumber');
    tfTellNumberByNumber.className = 'vaadin-text-field-width-100';

    // 주소 입력필드 (비활성)
    const tfAddress = document.querySelector('#tfAddress');
    tfAddress.className = 'vaadin-text-field-width-100-flex-30';
    tfAddress.disabled = true;
    const tfAddressNo = document.querySelector('#tfAddressNo');
    tfAddressNo.className = 'vaadin-text-field-width-100-flex-30';
    tfAddressNo.disabled = true;

    // 생년월일 입력필드
    const dpBirthDt = document.querySelector('#dpBirthDt');
    dpBirthDt.className = "vaadin-date-picker-width-150-flex-80";
    dpBirthDt.addEventListener('value-changed', function() {
      dto.birthDt = dpBirthDt.value;
    })

    // 권한 선택필드
    let beforeSelectItem = '';
    const lsbBeforeAssignedRoles = document.querySelector('#lsbBeforeAssignedRoles');
    lsbBeforeAssignedRoles.className = 'vaadin-list-box-before';
    // items.js에 등록한 RoleCode 전체 목록 추가
    // 권한 선택 왼쪽필드 (선택안함 상태)
    roleCodeItems.forEach(e => {
      const roleCodeItem = document.createElement('vaadin-item')
      roleCodeItem.textContent = e.textContent;
      roleCodeItem.addEventListener('click', function() {
        roleCodeItem.selected = !roleCodeItem.selected;
        if (roleCodeItem.selected) {
          beforeSelectItem = {value: e.value, textContent: e.textContent};
        } else {
          beforeSelectItem = '';
        }
      })
      lsbBeforeAssignedRoles.appendChild(roleCodeItem);
    })

    const lsbAfterAssignedRoles = document.querySelector('#lsbAfterAssignedRoles');
    lsbAfterAssignedRoles.className = 'vaadin-list-box-after'
    let afterSelectItem = '';

    // 선택한 권한을 오른쪽 필드 목록(선택 상태)에 추가하는 이벤트
    const btnGoToAfter = document.querySelector('#btnGoToAfter');
    btnGoToAfter.className = 'vaadin-button-before';
    btnGoToAfter.addEventListener('click', function() {
      // 클릭 시 선택된 권한이 있는지 체크
      if (beforeSelectItem === '' || beforeSelectItem === null || beforeSelectItem === undefined) {
        return;
      } else {
        // 컬럼 선택 시 값 저장 이벤트
        let selectedItem = {value: beforeSelectItem.value, textContent: beforeSelectItem.textContent}
        const roleCodeItem = document.createElement('vaadin-item')
        roleCodeItem.textContent = beforeSelectItem.textContent;
        roleCodeItem.addEventListener('click', function() {
          roleCodeItem.selected = !roleCodeItem.selected;
          if (roleCodeItem.selected) {
            afterSelectItem = selectedItem;
          } else {
            afterSelectItem = '';
          }
        })
        // 선택한 권한에 대해 추가버튼을 클릭하였을때 오른쪽필드 목록에 이미 선택상태로 등록된 권한이 있을 경우 
        // 등록된 권한의 목록에서 선택한 권한이 존재하는지 여부를 판별하여 존재할 경우 추가하지 않고 존재하지 않을경우 권한 목록에 추가
        if (lsbAfterAssignedRoles.childElementCount > 0) {
          const itemToFind = dto.assignedRoles.find(function(item) {
            return item === beforeSelectItem.value;
          });
          for (let index=0; index<lsbAfterAssignedRoles.childElementCount; index++) {
            if (itemToFind === undefined) {
              lsbAfterAssignedRoles.appendChild(roleCodeItem);
              dto.assignedRoles.push(beforeSelectItem.value)
            }
          }
          // 오른쪽 필드 목록에 값이 존재하지 않을 경우 선택한 권한을 목록에 추가하고 DTO에 추가
        } else {
          lsbAfterAssignedRoles.appendChild(roleCodeItem);
          dto.assignedRoles.push(beforeSelectItem.value)
        }
      }
    })

    // 권한 선택 오른쪽필드에서 선택한 권한을 클릭 시 선택안함 상태로 변경하고 선택된 필드목록에서 해당 권한을 제거하는 이벤트
    const btnGoToBefore = document.querySelector('#btnGoToBefore');
    btnGoToBefore.className = 'vaadin-button-after';
    btnGoToBefore.addEventListener('click', function() {
      if (afterSelectItem === '' || afterSelectItem === null || afterSelectItem === undefined) {
        return;
      } else {
        const itemToFind = dto.assignedRoles.find(function(item) {
          return item === afterSelectItem.value
        });
        if (itemToFind !== undefined) {
          const idx = dto.assignedRoles.indexOf(itemToFind);
          if (idx > -1) dto.assignedRoles.splice(idx, 1)
          lsbAfterAssignedRoles.childNodes[idx].remove();
        }
      }
    });

    const { addCallback, updateCallback } = this.props;
    const btnOk = document.querySelector('#btnOk');
    btnOk.innerHTML = "확인";
    btnOk.addEventListener('click', function() {
      if (tfEmailName.value !== '' && tfEmailDomain.value !== '' && tfEmailCom.value !== '') {
        dto.email = tfEmailName.value+'@'+tfEmailDomain.value+'.'+tfEmailCom.value;
      }
      if (tfTellStation.value !== '' && tfTellByNumber.value !== '' && tfTellNumberByNumber.value !== '') {
        dto.tellNo = tfTellStation.value+'-'+tfTellByNumber.value+'-'+tfTellNumberByNumber.value;
      }
      if (dto.email === null || dto.email === undefined || dto.email === '') {
        window.alert('입력되지 않은 값이 있습니다. 입력 후 다시 시도해주세요.');
        return;
      }
      if (dto.name === null || dto.name === undefined || dto.name === '') {
        window.alert('입력되지 않은 값이 있습니다. 입력 후 다시 시도해주세요.');
        return;
      }
      if (dto.tellNo === null || dto.tellNo === undefined || dto.tellNo === '') {
        window.alert('입력되지 않은 값이 있습니다. 입력 후 다시 시도해주세요.');
        return;
      }
      if (dto.birthDt === null || dto.birthDt === undefined || dto.birthDt === '') {
        window.alert('입력되지 않은 값이 있습니다. 입력 후 다시 시도해주세요.');
        return;
      }
      if (dto.assignedRoles === null || dto.assignedRoles === undefined || dto.assignedRoles.length === 0) {
        window.alert('추가된 권한이 없습니다. 권한 추가 후 다시 시도해주세요.');
        return;
      }
      // 임시 설정
      dto.createdUser = '관리자';
      addCallback(dto);
      popupClose(clicked);
      document.querySelector('#doRegister').opened = false;
      resetDto();
      resetLsbAfterAssignedRoles();
    });

    const { popupClose } = this.props;
    const btnCancle = document.querySelector('#btnCancle');
    btnCancle.innerHTML = "취소";
    btnCancle.addEventListener('click', function() {
      popupClose(clicked);
      document.querySelector('#doRegister').opened = false;
      resetDto();
      resetLsbAfterAssignedRoles();
    });

    function resetLsbAfterAssignedRoles() {
      for (let index=lsbAfterAssignedRoles.childElementCount-1; index>=0; index--) {
        lsbAfterAssignedRoles.removeChild(lsbAfterAssignedRoles.childNodes[index]);
      }
    }
  }

  render() {
    return (
      <Fragment>
        <vaadin-dialog-overlay id="doRegister">
          <div className="div-register-popup-board">
            <div className="email-column">
              <label id="lbEmail" className="label-flex-20-left"/>
              <div className="div-flex-80-left">
                <vaadin-text-field id="tfEmailName" required prevent-invalid-input pattern="([a-zA-Zㄱ-ㅎ가-힣0-9]+?)"/>
                <label id="lbEmailCommercial"/>
                <vaadin-text-field id="tfEmailDomain" required prevent-invalid-input pattern="([a-zA-Zㄱ-ㅎ가-힣0-9]+?)"/>
                <label id="lbEmailPeriod"/>
                <vaadin-text-field id="tfEmailCom" required prevent-invalid-input pattern="([a-zA-Zㄱ-ㅎ가-힣0-9]+?)"/>
              </div>
            </div>
            <div className="default-column">
              <label id="lbNm" className="label-flex-20-left"/>
              <vaadin-text-field id="tfNm" required prevent-invalid-input pattern="^([a-zA-Zㄱ-ㅎ가-힣0-9\s]+$)"/>
            </div>
            <div className="default-column">
              <label id="lbTellNo" className="label-flex-20-left"/>
              <div className="div-flex-80-left">
                <vaadin-text-field id="tfTellStation" required prevent-invalid-input pattern="^(\d{0,3}?)?$"/>
                <label id="lbTellNoHyphen"/>
                <vaadin-text-field id="tfTellByNumber" required prevent-invalid-input pattern="^(\d{0,4}?)?$"/>
                <label id="lbTellNoHyphenTo"/>
                <vaadin-text-field id="tfTellNumberByNumber" required prevent-invalid-input pattern="^(\d{0,4}?)?$"/>
              </div>
            </div>
            <div className="address-column">
              <label id="lbAddress" className="label-flex-20-left"/>
              <vaadin-text-field id="tfAddress" required prevent-invalid-input pattern="([a-zA-Zㄱ-ㅎ가-힣0-9]+?)"/>
              <label id="lbAddressNo" className="label-flex-20-left"/>
              <vaadin-text-field id="tfAddressNo" required prevent-invalid-input pattern="^(\d{0,7}?)?$"/>
            </div>
            <div className="default-column">
              <label id="lbBirthDt" className="label-flex-20-left"/>
              <vaadin-date-picker id="dpBirthDt"/>
            </div>
            <div className="list-box-column">
              <vaadin-list-box id="lsbBeforeAssignedRoles"/>
              <div className="list-box-button">
                <vaadin-button id="btnGoToAfter">
                  <iron-icon icon="vaadin:angle-double-right" />
                </vaadin-button>
                <vaadin-button id="btnGoToBefore">
                  <iron-icon icon="vaadin:angle-double-left" />
                </vaadin-button>
              </div>
              <vaadin-list-box id="lsbAfterAssignedRoles"/>
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
export default UserRegister ;
*/

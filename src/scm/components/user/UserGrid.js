import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';

import { roleCodeItems } from '../../items';

class UserGrid extends Component {

  componentDidMount() {
    const { userList } = this.props;
    if (!userList || userList === undefined || userList.isEmpty()) {
      return
    }
    let inverted = false;
    // let indeterminate = false;

    // 선택삭제 사용을 위한 그리트 체크박스
    const grdSelect = document.querySelector('#grdSelect');
    grdSelect.hidden = false;
    const { selectCallback, deselectCallback } = this.props;
    // 그리드 컬럼 안의 체크박스 이벤트
    grdSelect.renderer = function(cell, column, rowData) {
      var checkbox = cell.firstElementChild;
      if (!checkbox) {
        checkbox = window.document.createElement('vaadin-checkbox');
        checkbox.setAttribute('aria-label', 'Select Row');
        checkbox.addEventListener('change', function(e) {
          if (e.target.checked === inverted) {
            grid.deselectItem(checkbox.__item);
            // 컨테이너로 선택취소된 공지사항 컬럼값 전달
            deselectCallback(checkbox.__item);
          } else {
            grid.selectItem(checkbox.__item);
            // 컨테이너로 선택된 공지사항 컬럼값 전달
            selectCallback(checkbox.__item);
          }
          // indeterminate = grid.selectedItems.length > 0;
          grid.render();
        });
        cell.appendChild(checkbox);
      }
      checkbox.__item = rowData.item;
      checkbox.checked = inverted !== rowData.selected;
    };

    let moment = require('moment');
    let list =[];
    // 그리드 컬럼 인덱스를 위한 변수
    let i=1;
    userList.forEach(e => {
      // push Value type is JSON
      list.push({
        index: i++,
        email: e.get("email"),
        name: e.get("name"),
        tellNo: e.get("tellNo"),
        address: e.get("address"),
        addressNo: e.get("addressNo"),
        birthDt: e.get("birthDt"),
        createdUser: e.get("createdUser"),
        createdDt: moment(e.get("createdDt")).format('YYYY년MM월DD일'),
        balancePoint: e.get("balancePoint"),
        assignedRoles: e.get("assignedRoles"),
        activated: e.get("activated"),
        disabled: e.get("disabled")
      })
    })
        
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = list;
    grid.pageSize = 15;

    grid.className = "agz-bbs";

    const pagesControl = document.querySelector('#pages');
    let pages;
    updateItemsFromPage(1);
    
    // 그리드 페이징
    // pageController
    function updateItemsFromPage(page) {
      if (page === undefined) {
        return;
      }

      if (!pages) {
        pages = Array.apply(null, {length: Math.ceil(list.length / grid.pageSize)}).map(function(item, index) {
          return index + 1;
        });
        const prevBtn = window.document.createElement('vaadin-button');
        prevBtn.textContent = '<';
        prevBtn.addEventListener('click', function() {
          const selectedPage = parseInt(pagesControl.querySelector('[selected]').textContent);
          updateItemsFromPage(selectedPage - 1);
        });
        pagesControl.appendChild(prevBtn);

        pages.forEach(function(pageNumber) {
          const pageBtn = window.document.createElement('vaadin-button');
          pageBtn.textContent = pageNumber;
          pageBtn.addEventListener('click', function(e) {
            updateItemsFromPage(parseInt(e.target.textContent));
          });
          if (pageNumber === page) {
            pageBtn.setAttribute('selected', true);
          }
          pagesControl.appendChild(pageBtn);
        });

        const nextBtn = window.document.createElement('vaadin-button');
        nextBtn.textContent = '>';
        nextBtn.addEventListener('click', function() {
          const selectedPage = parseInt(pagesControl.querySelector('[selected]').textContent);
          updateItemsFromPage(selectedPage + 1);
        });
        pagesControl.appendChild(nextBtn);
      }
      const buttons = Array.from(pagesControl.children);
      buttons.forEach(function(btn, index) {
        if (parseInt(btn.textContent) === page) {
          btn.setAttribute('selected', true);
        } else {
          btn.removeAttribute('selected');
        }
        if (index === 0) {
          if (page === 1) {
            btn.setAttribute('disabled', '');
          } else {
            btn.removeAttribute('disabled');
          }
        }
        if (index === buttons.length - 1) {
          if (page === pages.length) {
            btn.setAttribute('disabled', '');
          } else {
            btn.removeAttribute('disabled');
          }
        }
      });

      var start = (page - 1) * grid.pageSize;
      var end = page * grid.pageSize;
      grid.items = list.slice(start, end);
    }

    // 권한그룹 그리드컬럼
    const grdAssignedRoles = document.querySelector('#grdAssignedRoles');
    grdAssignedRoles.renderer = function(root, column, rowData) {
      root.innerHTML='';
      for (let index = 0; index<rowData.item.assignedRoles.size; index++) {
        if (index === rowData.item.assignedRoles.size-1) {
          root.innerHTML += rowData.item.assignedRoles.get(index);
        } else {
          root.innerHTML += rowData.item.assignedRoles.get(index)+'<br/>';
        }
      }
    }

    // 권한그룹명 그리드컬럼
    const grdAssignedRolesName = document.querySelector('#grdAssignedRolesName');
    grdAssignedRolesName.renderer = function(root, column, rowData) {
      root.innerHTML='';
      for (let index = 0; index<rowData.item.assignedRoles.size; index++) {
        roleCodeItems.forEach(row => {
          if (rowData.item.assignedRoles.get(index) === row.value) {
            if (index === rowData.item.assignedRoles.size-1) {
              root.innerHTML += row.textContent;
            } else {
              root.innerHTML += row.textContent+'<br/>';
            }
          }
        })
      }
    }

    const { activatedChangeCallback } = this.props;
    document.querySelector('#grdBtnActivated').renderer = function(root, column, rowData) {
      if (rowData.item.activated === true) {
        root.innerHTML = ''
        const btnActivatedChange = document.createElement('vaadin-button');
        btnActivatedChange.className = 'button-user-activated-changed-gofalse';
        btnActivatedChange.textContent = '사용중지'
        btnActivatedChange.addEventListener('click', function() {
          const revalue = window.confirm('해당 사용자를 사용중지 하시겠습니까?')
          if (revalue === true) {
            // 사용중지 이벤트 함수 call (axios 사용) or saga 사용
            activatedChangeCallback(rowData.item.email, false)
          }
        })
        root.appendChild(btnActivatedChange);
      } else {
        root.innerHTML = ''
        const btnActivatedChange = document.createElement('vaadin-button');
        btnActivatedChange.className = 'button-user-activated-changed-gotrue';
        btnActivatedChange.textContent = '중지해제'
        btnActivatedChange.addEventListener('click', function() {
          const revalue = window.confirm('해당 사용자를 중지해제 하시겠습니까?')
          if (revalue === true) {
            // 사용중지 이벤트 함수 call (axios 사용) or saga 사용
            activatedChangeCallback(rowData.item.email, true)
          }
        })
        root.appendChild(btnActivatedChange);
      }
    }

    const { disabledChangeCallback } = this.props;
    document.querySelector('#grdBtnDisabled').renderer = function(root, column, rowData) {
      if (rowData.item.disabled === true) {
        root.innerHTML = ''
        const btnDisabledChange = document.createElement('vaadin-button');
        btnDisabledChange.className = 'button-user-disabled-changed-gofalse';
        btnDisabledChange.textContent = '회원탈퇴'
        btnDisabledChange.addEventListener('click', function() {
          const revalue = window.confirm('해당 사용자를 탈퇴처리 하시겠습니까?')
          if (revalue === true) {
            disabledChangeCallback(rowData.item.email, false)
          }
        })
        root.appendChild(btnDisabledChange);
      } else {
        root.innerHTML = ''
        const btnDisabledChange = document.createElement('vaadin-button');
        btnDisabledChange.className = 'button-user-disabled-changed-gotrue';
        btnDisabledChange.textContent = '탈퇴철회'
        btnDisabledChange.addEventListener('click', function() {
          const revalue = window.confirm('해당 사용자에 대한 탈퇴 철회를 진행 하시겠습니까?')
          if (revalue === true) {
            disabledChangeCallback(rowData.item.email, true)
          }
        })
        root.appendChild(btnDisabledChange);
      }
    }

    // grid.addEventListener('active-item-changed', function(event) {
    //   const item = event.detail.value;
    //   grid.selectedItems = item ? [item] : [];
    // });
    
    const { userDtoCallback } = this.props;
    grid.addEventListener('dblclick', function(event) {
      userDtoCallback(grid.getEventContext(event).item)
    });
  }

  render() {
    return (
      <Fragment>
        <div>
          <vaadin-grid theme="column-borders" height-by-rows column-reordering-allowed>
            <vaadin-grid-column auto-select hidden id="grdSelect" flex-grow="0.1" width="70px" />
            {/* <vaadin-grid-sort-column path="index" header="번호" text-align="end" flex-grow="0.2" /> */}
            <vaadin-grid-column path="email" header="이메일" text-align="center" flex-grow="1" width="230px" resizable/>
            <vaadin-grid-column path="name" header="이름" text-align="center" flex-grow="1" width="120px" resizable/>
            <vaadin-grid-column path="tellNo" header="전화번호" text-align="center" flex-grow="1" width="150px" resizable/>
            <vaadin-grid-column path="address" header="주소" text-align="center" flex-grow="1" width="300px" resizable/>
            <vaadin-grid-column path="addressNo" header="우편번호" text-align="center" flex-grow="1" width="100px" resizable/>
            <vaadin-grid-column path="birthDt" header="생년월일" text-align="center" flex-grow="1" width="250px" resizable/>
            {/* <vaadin-grid-column path="createdUser" header="생성자" text-align="center" flex-grow="1" /> */}
            <vaadin-grid-column path="createdDt" header="가입일자" text-align="center" flex-grow="1" width="250px" resizable/>
            <vaadin-grid-column path="balancePoint" header="잔여 포인트" text-align="center" flex-grow="0.3" width="150px" resizable/>
            <vaadin-grid-column id="grdAssignedRoles" header="권한그룹" text-align="center" flex-grow="1" width="180px" resizable/>
            <vaadin-grid-column id="grdAssignedRolesName" header="권한그룹명" text-align="center" flex-grow="1" width="150px" resizable/>
            <vaadin-grid-column id="grdBtnActivated" header="사용상태" text-align="center" flex-grow="10" width="130px" resizable/>
            <vaadin-grid-column id="grdBtnDisabled" header="탈퇴상태" text-align="center" flex-grow="10" width="130px" resizable/>
          </vaadin-grid>
          <div id="pages" style={{textAlign: 'center'}}/>
        </div>
      </Fragment>
    );
  }
}
export default UserGrid;
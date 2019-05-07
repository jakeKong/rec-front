import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-context-menu';
import '@vaadin/vaadin-list-box';
import '@vaadin/vaadin-item';

import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-select';

class Menu extends Component {

  componentDidMount() {

    const OperationMenuItems = [
      {value: '/#/', textContent: '홈'},
      {value: '/#/oms/order/history/list', textContent: '(관리)주문내역 조회'},
      {value: '/#/oms/order/history/list/email', textContent: '주문내역 조회'},
      {value: '/#/oms/reportmake/history/list', textContent: '보고서 생성이력 조회'},
      {value: '/#/oms/changepoint/history/list', textContent: '포인트 변동내역 조회'},
      {value: '/#/oms/product/list', textContent: '상품관리'},
    ];

    const BoardMenuItems = [
      {value: '/#/bms/notice/list', textContent: '공지사항'},
      {value: '/#/bms/notice/manage/list', textContent: '(관리)공지사항'},
      {value: '/#/bms/question/list', textContent: '문의사항'},
    ];

    // 임시 select 설정
    const slOperationMenu = document.querySelector('#slOperationMenu')
    // default Select set
    slOperationMenu.renderer = function(root) {
        if (root.firstChild) {
            return;
        }
        const listBox = document.createElement('vaadin-list-box');
        const select = document.createElement('vaadin-item');

        select.textContent = '운영관리';
        select.setAttribute('value', '');
        listBox.appendChild(select);

        const divider = document.createElement('hr');
        listBox.appendChild(divider);

        OperationMenuItems.forEach(function(row){
            const item = document.createElement('vaadin-item');
            item.textContent = row.textContent;
            if (row.value) {
                item.setAttribute('value', row.value);
            }
            listBox.appendChild(item);
        });
        root.appendChild(listBox);
    }
    
    slOperationMenu.addEventListener('value-changed', function(e) {
      window.location.href = slOperationMenu.value;
    })

    const slBoardMenu = document.querySelector('#slBoardMenu')
    // default Select set
    slBoardMenu.renderer = function(root) {
        if (root.firstChild) {
            return;
        }
        const listBox = document.createElement('vaadin-list-box');
        const select = document.createElement('vaadin-item');

        select.textContent = '게시물관리';
        select.setAttribute('value', '');
        listBox.appendChild(select);

        const divider = document.createElement('hr');
        listBox.appendChild(divider);

        BoardMenuItems.forEach(function(row){
            const item = document.createElement('vaadin-item');
            item.textContent = row.textContent;
            if (row.value) {
                item.setAttribute('value', row.value);
            }
            listBox.appendChild(item);
        });
        root.appendChild(listBox);
    }
    
    slBoardMenu.addEventListener('value-changed', function(e) {
      window.location.href = slBoardMenu.value;
    })
  }

  render() {
    return (
      <Fragment>
        <vaadin-select id="slOperationMenu"/>
        <vaadin-select id="slBoardMenu"/>
      </Fragment>
    );
  }
}

export default Menu;
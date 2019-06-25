import React, { Component, Fragment } from 'react';

// component
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-icons'
import '@vaadin/vaadin-date-picker'

import '@vaadin/vaadin-select'
import '@vaadin/vaadin-list-box'
import '@vaadin/vaadin-item'

import { roleCodeItems } from '../../items';

class UserSearch extends Component {

  constructor(props) {
    super(props);
    this.state ={
        search: {
          email: null,
          name: null,
          roleCode: null
        }
    }
  }

  componentDidMount() {
    // search parameter default setting
    const { search } = this.state;

    const slRoleCode = document.querySelector('#slRoleCode')
    slRoleCode.value = '';
    search.status = slRoleCode.value;
    slRoleCode.renderer = function(root) {
      if (root.firstChild) {
        return;
      }
      const listBox = document.createElement('vaadin-list-box');
      const select = document.createElement('vaadin-item');

      select.textContent = '전체';
      select.setAttribute('value', '');
      listBox.appendChild(select);

      const divider = document.createElement('hr');
      listBox.appendChild(divider);

      roleCodeItems.forEach(function(row){
        const item = document.createElement('vaadin-item');
        item.textContent = row.textContent;
        if (row.value) {
            item.setAttribute('value', row.value);
        }
        listBox.appendChild(item);
      });
      root.appendChild(listBox);
    }
    slRoleCode.addEventListener('value-changed', function(e) {
      search.roleCode = slRoleCode.value;
    })

    const cbSearch = document.querySelector('#cbSearch')
    cbSearch.items = ['이메일', '이름'];    
    cbSearch.value = '이메일';
    cbSearch.addEventListener('value-changed', function() {
      search.email = null;
      search.name = null;
      tfSearch.value = null;
    })

    // Search text-field set
    const tfSearch = document.querySelector('#tfSearch')
    tfSearch.placeholder = '검색어를 입력해주세요.';
    tfSearch.maxlength = '15';
    tfSearch.addEventListener('input', function() {
      if (cbSearch.value === '이메일') {
        search.email = tfSearch.value;
      }
      if (cbSearch.value === '이름') {
        search.name = tfSearch.value;
      }
    })

    // Search button set
    const { searchCallback } = this.props;
    const btnSearch = document.querySelector('#btnSearch')
    btnSearch.innerHTML = '조회';
    btnSearch.addEventListener('click', function() {
      searchCallback(search);
    })
  }

  render() {
    return (
      <Fragment>
        <vaadin-select id="slRoleCode" />
        <vaadin-combo-box id="cbSearch" />
        <label className="label-center" id="lbSearch" />
        <vaadin-text-field id="tfSearch">
          <iron-icon icon="vaadin:search" slot="prefix" />
        </vaadin-text-field>
        <vaadin-button id="btnSearch" />
      </Fragment>
    );
  }
}
export default UserSearch ;
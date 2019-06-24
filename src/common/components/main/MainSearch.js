import React, { Component, Fragment } from 'react';

// component
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';

class MainSearch extends Component {

    constructor(props) {
        super(props);
        this.state ={

        }
    }

  componentDidMount() {
    // search label set
    document.querySelector('#lbSearchField').innerHTML = '지번/도로명';

    const tfSearch = document.querySelector('#tfSearch');
    tfSearch.readonly = true;
    
    const btnAddressSearch = document.querySelector('#btnAddressSearch');
    btnAddressSearch.innerHTML = '주소검색';
    btnAddressSearch.addEventListener('click', function() {
      // 도로명 주소 오픈 API 호출 (CallBack 사용)
    });

    // Search button set
    const btnSearch = document.querySelector('#btnSearch')
    btnSearch.innerHTML = '조회';
    btnSearch.addEventListener('click', function() {
      // 주소정보 입력 여부 확인
      // 클릭 시 입력된 주소정보를 주택정보 페이지에 전달 및 페이지 이동
    })
  }

  render() {
    return (
      <Fragment>
        <label className="label-center" id="lbSearchField" />
        <vaadin-text-field id="tfSearch">
          <iron-icon icon="vaadin:search" slot="prefix" />
        </vaadin-text-field>
        <vaadin-button id="btnAddressSearch" />
        <vaadin-button id="btnSearch" />
      </Fragment>
    );
  }
}
export default MainSearch ;
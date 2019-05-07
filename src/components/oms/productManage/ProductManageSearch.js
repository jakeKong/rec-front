import React, { Component, Fragment } from 'react';

// layout
import '@vaadin/vaadin-ordered-layout';

// component
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-icons'

class ProductManageSearch extends Component {

    constructor(props) {
        super(props);
        this.state ={
            search: {
                productCd: null,
                productNm: null,
                productPoint: null,
            }
        }
    }

    componentDidMount() {
        // search parameter default setting
        const { search } = this.state;

        // search label set
        document.querySelector('#lbProductCd').innerHTML = '상품 코드';
        document.querySelector('#lbProductNm').innerHTML = '상품 명';
        document.querySelector('#lbProductPoint').innerHTML = '상품 포인트';
        
        // ProductCd text-field set
        const tfProductCd = document.querySelector('#tfProductCd')
        tfProductCd.placeholder = '검색어를 입력해주세요.';
        tfProductCd.maxlength = '15';
        tfProductCd.addEventListener('input', function() {
          search.productCd = tfProductCd.value;
        })
        // ProductNm text-field set
        const tfProductNm = document.querySelector('#tfProductNm')
        tfProductNm.placeholder = '검색어를 입력해주세요.';
        tfProductNm.maxlength = '15';
        tfProductNm.addEventListener('input', function() {
          search.productNm = tfProductNm.value;
        })
        // ProductPoint text-field set
        const tfProductPoint = document.querySelector('#tfProductPoint')
        tfProductPoint.placeholder = '검색어를 입력해주세요.';
        tfProductPoint.maxlength = '15';
        tfProductPoint.addEventListener('input', function() {
          search.productPoint = tfProductPoint.value;
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
              <vaadin-horizontal-layout id="searchLayout" theme="spacing">
                  <label className="label-center" id="lbProductCd" />
                    <vaadin-text-field id="tfProductCd">
                      <iron-icon icon="vaadin:search" slot="prefix" />
                    </vaadin-text-field>

                  <label className="label-center" id="lbProductNm" />
                    <vaadin-text-field id="tfProductNm">
                      <iron-icon icon="vaadin:search" slot="prefix" />
                    </vaadin-text-field>

                  <label className="label-center" id="lbProductPoint" />
                    <vaadin-text-field id="tfProductPoint">
                        <iron-icon icon="vaadin:search" slot="prefix" />
                    </vaadin-text-field>

                  <vaadin-button id="btnSearch" />
              </vaadin-horizontal-layout>
          </Fragment>
      );
    }
}
export default ProductManageSearch ;
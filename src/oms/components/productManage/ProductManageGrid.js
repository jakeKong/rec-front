import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-dialog';

class ProductManageGrid extends Component {
  constructor(props) {
    super(props);
    this.state ={
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

  componentDidMount() {
    const { productList, productDtoCallback } = this.props;
    if (!productList || productList === undefined || productList.isEmpty()) {
      return
    }
    
    let list =[];
    let i=1;
    productList.forEach(e => {
      // push Value type is JSON
      list.push({
        index: i++,
        productSid: e.get("productSid"),
        productCd: e.get("productCd"), 
        productNm: e.get("productNm"),
        productPoint: e.get("productPoint"),
        pointCash: e.get("pointCash"),
        // cashRatio: e.get("cashRatio"),
      })
    })
    
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = list;

    grid.className = "agz-bbs";

    grid.addEventListener('dblclick', function(event) {
      productDtoCallback(grid.getEventContext(event).item)
    });

    const { deleteCallback } = this.props;
    document.querySelector('#grdDelete').renderer = function(root, column, rowData) {
      root.innerHTML = '';
      const btnDelete = document.createElement('vaadin-button');
      btnDelete.setAttribute('style', 'color: var(--lumo-error-text-color)');
      btnDelete.textContent = '삭제';
      btnDelete.addEventListener('click', function() {
        const check = window.confirm('해당 상품을 삭제 하시겠습니까?');
        if (check === true) {
          deleteCallback(rowData.item.productSid);
        }
      })
      root.appendChild(btnDelete);
    }
  }

  render() {
    return (
      <Fragment>
        <vaadin-grid theme="no-border" height-by-rows column-reordering-allowed>
          <vaadin-grid-sort-column path="index" header="번호" text-align="center" flex-grow="0.2" width="70px" />
          <vaadin-grid-column path="productCd" header="상품 코드" text-align="center" flex-grow="2" />
          <vaadin-grid-column path="productNm" header="상품 명" text-align="center" flex-grow="4" />
          <vaadin-grid-column path="productPoint" header="상품 포인트" text-align="center" flex-grow="2" />
          <vaadin-grid-column path="pointCash" header="포인트 가격" text-align="center" flex-grow="1" />
          {/* <vaadin-grid-column path="cashRatio" header="현금 비율" text-align="center" flex-grow="1" /> */}
          <vaadin-grid-column id="grdDelete" text-align="center" flex-grow="1" />
        </vaadin-grid>
      </Fragment>
    );
  }
}
export default ProductManageGrid;
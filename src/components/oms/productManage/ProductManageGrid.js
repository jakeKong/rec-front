import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-dialog';

class ProductManageGrid extends Component {
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
    const { dto } = this.state;
    const { productList, productDtoCallback } = this.props;
    if (!productList || productList === undefined || productList.isEmpty()) {
      return
    }
    
    let list =[];
    productList.forEach(e => {
      // push Value type is JSON
      list.push({
        productSid: e.get("productSid"),
        productCd: e.get("productCd"), 
        productNm: e.get("productNm"),
        productPoint: e.get("productPoint"),
        cashRatio: e.get("cashRatio"),
      })
    })
    
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = list;

    grid.addEventListener('active-item-changed', function(event) {
      const item = event.detail.value;
      grid.selectedItems = item ? [item] : [];
    });
    
    grid.addEventListener('dblclick', function(event) {
      dto.productSid = grid.getEventContext(event).item.productSid;
      dto.productCd = grid.getEventContext(event).item.productCd;
      dto.productNm = grid.getEventContext(event).item.productNm;
      dto.productPoint = grid.getEventContext(event).item.productPoint;
      dto.cashRatio = grid.getEventContext(event).item.cashRatio;
      productDtoCallback(dto);
    });

    // number set
    document.querySelector('#grdIndex').renderer = function(root, column, rowData) {
      root.textContent = rowData.index;
    }

    const { deleteCallback } = this.props;
    document.querySelector('#grdDelete').renderer = function(root, column, rowData) {
      root.innerHTML = '';
      const btnDelete = document.createElement('vaadin-button');
      btnDelete.textContent = '삭제';
      btnDelete.addEventListener('click', function() {
        // deleteCallback(rowData.item.productSid);
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
          <vaadin-grid theme="column-borders row-stripes" height-by-rows column-reordering-allowed>
            <vaadin-grid-sort-column id="grdIndex" header="번호" text-align="end" flex-grow="1" />
            <vaadin-grid-column path="productCd" header="상품 코드" text-align="center" flex-grow="2" />
            <vaadin-grid-column path="productNm" header="상품 명" text-align="center" flex-grow="4" />
            <vaadin-grid-column path="productPoint" header="상품 포인트" text-align="center" flex-grow="2" />
            <vaadin-grid-column path="cashRatio" header="현금 비율" text-align="center" flex-grow="1" />
            <vaadin-grid-column id="grdDelete" text-align="center" flex-grow="1" />
          </vaadin-grid>
        </Fragment>
      );
  }
}
export default ProductManageGrid;
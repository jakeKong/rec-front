import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-dialog';

class PaymentProductListGrid extends Component {

  componentDidMount() {
    const { productList, productDtoCallback } = this.props;
    if (!productList || productList === undefined || productList.isEmpty()) {
      return
    }

    let inverted = false;
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
  
    let list =[];
    productList.forEach(e => {
      // push Value type is JSON
      list.push({
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

    grid.addEventListener('dblclick', function(event) {
      productDtoCallback(grid.getEventContext(event).item)
    });

  }

  render() {
    return (
      <Fragment>
        <div>
          <vaadin-grid theme="row-stripes" height-by-rows column-reordering-allowed>
          <vaadin-grid-column auto-select hidden id="grdSelect" flex-grow="0.1" width="50px" />
            <vaadin-grid-column path="productNm" header="상품 명" text-align="center" flex-grow="4" />
            <vaadin-grid-column path="productPoint" header="충전 포인트" text-align="center" flex-grow="2" />
            <vaadin-grid-column path="pointCash" header="포인트 가격" text-align="center" flex-grow="1" />
            {/* <vaadin-grid-column path="cashRatio" header="현금 비율" text-align="center" flex-grow="1" /> */}
          </vaadin-grid>
        </div>
      </Fragment>
    );
  }
}
export default PaymentProductListGrid;
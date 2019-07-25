import React, { Component, Fragment } from 'react';


import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
// import 'primereact/resources/themes/nova-light/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
import '../../../styles/agz/table_style.css';

import '@vaadin/vaadin-dialog';

import { comma } from '../../../common/utils';

class PaymentProductListGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gridData: [],
      selectedItem: undefined
    }
  }

  componentDidMount() {
    const { productList } = this.props;
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
        productPoint: comma(e.get("productPoint")),
        pointCash: comma(e.get("pointCash")),
        // cashRatio: e.get("cashRatio"),
      })
    })
    this.setState({gridData: list});
  }

  onGridSelected(item) {
    const { selectedItem } = this.state;
    if (selectedItem !== undefined && selectedItem !== null) {
      if (item !== undefined && item !== null) {
        if (selectedItem.productSid === item.productSid) {
          return;
        }
      }
    }
    this.setState({selectedItem: item});
    this.props.selectCallback(item);  
    
  }

  render() {
    return (
      <Fragment>
        <DataTable id="table" value={this.state.gridData}
                   //scrollable={true} 
                   paginator={true} rows={10} rowsPerPageOptions={[5,10,15,20]}  
                   selectionMode="single"  selection={this.state.selectedItem} 
                   onSelectionChange={e => this.onGridSelected(e.value)} 
                   // onRowClick={e => this.props.detailCallback(e.data)}
                   >
          <Column selectionMode="single" style={{width:'3em', borderLeft:'none'}}/>
          <Column field="productNm" header="결제번호"/>
          <Column field="productNm" header="상품명" />
          <Column field="productPoint" header="충전 포인트"/>
          <Column field="pointCash" header="포인트 가격"/>
          {/* <Column field="cashRatio" header="현금 비율" style={{textAlign:'center', width: '8em', borderRight:'none'}}/> */}
        </DataTable>
      </Fragment>
    );
  }
}
export default PaymentProductListGrid;
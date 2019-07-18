import React, { Component, Fragment } from 'react';


import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
// import 'primereact/resources/themes/nova-light/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
import '../../../styles/agz/table_style.css';

import '@vaadin/vaadin-dialog';

import { comma } from '../../../common/utils';

let gridData =[];
let  selectCallback, deselectCallback = {};
class PaymentProductListGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {gridData: []}
  }
  componentDidMount() {
    selectCallback = this.props.selectCallback;
    deselectCallback = this.props.deselectCallback;
    const { productList } = this.props;
    if (!productList || productList === undefined || productList.isEmpty()) {
      return
    }
    productList.forEach(e => {
      // push Value type is JSON
      gridData.push({
        productSid: e.get("productSid"),
        productCd: e.get("productCd"), 
        productNm: e.get("productNm"),
        productPoint: comma(e.get("productPoint")),
        pointCash: comma(e.get("pointCash")),
        // cashRatio: e.get("cashRatio"),
      })
    })
    this.setState({gridData: gridData});
    




    // // 스타일 적용 이후 우측정렬 미적용으로 인한 컬럼 렌더링 - 2019-07-12 @yieon
    // const column = grid.querySelectorAll('vaadin-grid-column');
    // column[2].renderer = function(root, column, rowData) {
    //   root.innerHTML = rowData.item.productPoint
    //   root.style = 'text-align: right'
    // }
    // column[3].renderer = function(root, column, rowData) {
    //   root.innerHTML = rowData.item.pointCash
    //   root.style = 'text-align: right'
    // }

  }
  onGridSelected(item) {
    this.setState({selectedItem: item});
    // 단일 선택값 전달 이벤트 <PRE> 2019-06-04 : (다중선택 미사용으로 인한 기능 추가)
    if(item === null || item === {}) {
      console.log(deselectCallback);
     deselectCallback(item);
    }
    else {
      selectCallback(item);  
    }
    
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
            <Column field="productNm" header="결제번호"  style={{textAlign:'center', width: '20em', height:'2.5em'}} />
            <Column field="productNm" header="상품명"  style={{textAlign:'center', width: '10em', height:'2.5em'}} />
            <Column field="productPoint" header="충전 포인트"  style={{textAlign:'center', width: '10em'}} />
            <Column field="pointCash" header="포인트 가격" style={{textAlign:'center', width: '20em'}}/>
            <Column field="cashRatio" header="현금 비율" style={{textAlign:'center', width: '8em', borderRight:'none'}}/>
          </DataTable>
      </Fragment>
    );
  }
}
export default PaymentProductListGrid;
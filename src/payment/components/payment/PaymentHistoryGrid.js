import React, { Component, Fragment } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { comma } from '../../../common/utils';

let gridData =[];
let dateFormat = require('dateformat');
class PaymentHistoryGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {gridData: []}
  }

  componentDidMount() {
    const { paymentHistoryList } = this.props;
    if (!paymentHistoryList || paymentHistoryList === undefined || paymentHistoryList === null) {
      return
    }
    console.log(paymentHistoryList);
  
    paymentHistoryList.body.list.forEach(e => {
      let dateStringValue = e.tradeConfirmYmdt.substring(0,4)+'-'+e.tradeConfirmYmdt.substring(4,6)+'-'+e.tradeConfirmYmdt.substring(6,8)+'T'+e.tradeConfirmYmdt.substring(8,10)+':'+e.tradeConfirmYmdt.substring(10,12)+':'+e.tradeConfirmYmdt.substring(12,14);
      gridData.push({
        paymentId: e.paymentId,
        productName: e.productName,
        totalPayAmount: comma(e.totalPayAmount)+' 원',
        tradeConfirmYmdt: dateFormat(new Date(dateStringValue), 'yyyy년mm월dd일 HH:MM:ss'),
        primaryPayMeans: e.primaryPayMeans
      })
    })
    gridData.reverse();
    this.setState({gridData: gridData});

  }

  render() {
    return (
      <Fragment>
        <div>
            <DataTable id="table" value={this.state.gridData} 
                scrollable={true} 
                paginator={true} rows={10} rowsPerPageOptions={[5,10,15,20]}  
                selection={this.state.selectedItem} 
                onSelectionChange={e => this.setState({selectedItem: e.value})} 
                // onRowClick={e => this.props.detailCallback(e.data)}
                >
              <Column field="paymentId" header="결제번호"  style={{textAlign:'center', width: '20em', height:'2.5em'}} />
              <Column field="productName" header="상품명"  style={{textAlign:'center', width: '10em', height:'2.5em'}} />
              <Column field="totalPayAmount" header="결제금액"  style={{textAlign:'center', width: '10em'}} />
              <Column field="tradeConfirmYmdt" header="결제완료일자" style={{textAlign:'center', width: '20em'}}/>
              <Column field="primaryPayMeans" header="결제방식" style={{textAlign:'center', width: '8em'}}/>
            </DataTable>
          {/* <vaadin-grid theme="row-stripes" height-by-rows column-reordering-allowed>
            <vaadin-grid-column path="paymentId" header="결제번호" text-align="center" flex-grow="4" width="200px"/>
            <vaadin-grid-column path="productName" header="상품명" text-align="center" flex-grow="1" width="100px"/>
            <vaadin-grid-column path="totalPayAmount" header="결제금액" text-align="right" flex-grow="1" width="100px"/>
            <vaadin-grid-column path="tradeConfirmYmdt" header="결제완료일자" text-align="center" flex-grow="2" width="250px"/>
            <vaadin-grid-column path="primaryPayMeans" header="결제방식" text-align="center" flex-grow="1" width="100px"/>
          </vaadin-grid> */}
        </div>
      </Fragment>
    );
  }
}
export default PaymentHistoryGrid;
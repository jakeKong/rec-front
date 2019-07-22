import React, { Component, Fragment } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { comma } from '../../../common/utils';

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
  

    let list = [];
    paymentHistoryList.body.list.forEach(e => {
      let dateStringValue = e.tradeConfirmYmdt.substring(0,4)+'-'+e.tradeConfirmYmdt.substring(4,6)+'-'+e.tradeConfirmYmdt.substring(6,8)+'T'+e.tradeConfirmYmdt.substring(8,10)+':'+e.tradeConfirmYmdt.substring(10,12)+':'+e.tradeConfirmYmdt.substring(12,14);
      list.push({
        paymentId: e.paymentId,
        productName: e.productName,
        totalPayAmount: comma(e.totalPayAmount)+' 원',
        tradeConfirmYmdt: dateFormat(new Date(dateStringValue), 'yyyy년mm월dd일 HH:MM:ss'),
        primaryPayMeans: e.primaryPayMeans
      })
    })
    this.setState({gridData: list.reverse()});

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
                >
              <Column field="paymentId" header="결제번호"  style={{textAlign:'center', width: '20em', height:'2.5em'}} />
              <Column field="productName" header="상품명"  style={{textAlign:'center', width: '10em', height:'2.5em'}} />
              <Column field="totalPayAmount" header="결제금액"  style={{textAlign:'center', width: '10em'}} />
              <Column field="tradeConfirmYmdt" header="결제완료일자" style={{textAlign:'center', width: '20em'}}/>
              <Column field="primaryPayMeans" header="결제방식" style={{textAlign:'center', width: '8em'}}/>
            </DataTable>
        </div>
      </Fragment>
    );
  }
}
export default PaymentHistoryGrid;
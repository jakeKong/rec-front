import React, { Component, Fragment } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { changeTypeItems } from '../../items';

import * as XLSX from 'xlsx';

import { comma } from '../../../common/utils';

class ChangePointHistoryGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {gridData: [],hiddenCheck: ''}
    this.cancelTemplate = this.cancelTemplate.bind(this);
  }

  componentDidMount() {
    const { changePointHistoryList } = this.props;
    if (!changePointHistoryList || changePointHistoryList === undefined || changePointHistoryList.isEmpty()) {
      return
    }
    
    let dateFormat = require('dateformat');
    let list = [];
    changePointHistoryList.sort((prev, next) => new Date(prev.get('changeDt')).getTime() > new Date(next.get('changeDt')).getTime() ? 1 : -1)
    .forEach(e => {
      let changeType = '';
      changeTypeItems.forEach(function(row){
        if (e.get('changeType') === row.value) {
          changeType = row.label;
        };
      });
      // push Value type is JSON
      list.push({
        changePointSid: e.get("changeSid"),
        email: e.get("email"), 
        changeDt: dateFormat(new Date(e.get("changeDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        odrPaymentNo: e.get("odrNo") ? e.get("odrNo") : e.get("paymentNo"),
        odrNo: e.get("odrNo"),
        paymentNo: e.get("paymentNo"),
        paymentCash: e.get("paymentCash") ? comma(e.get("paymentCash"))+' 원' : null,
        paymentCashOrigin: e.get("paymentCash"),
        changeType: changeType,
        changePoint: comma(e.get("changePoint"))+' P',
        changePointOrigin: e.get("changePoint"),
        currentBalPoint: comma(e.get("currentBalPoint"))+' P',
        currentBalPointOrigin: e.get("currentBalPoint"),
        userNm: e.get("userNm"),
        activated: e.get("activated")
      })
    })
    this.setState({gridData: list.reverse()});

    const {role} = this.props;

    let hiddenCheck = '';
    if (role !== 'ROLE_ADMIN') {
      hiddenCheck = 'none';
    }
    this.setState({hiddenCheck: hiddenCheck});

    const btnExcel = document.querySelector('#btnExcel');
    if (role === 'ROLE_ADMIN') {
      btnExcel.hidden = true;
    } else {
      btnExcel.hidden = false;
      btnExcel.textContent = 'EXCEL';
      btnExcel.className="btn down-excel"
      btnExcel.addEventListener('click', function() {
        const check = window.confirm('조회된 정보를 엑셀로 저장 하시겠습니까?');
        if (check === true) {
          let excelList = [];
          let excelNumber = 1;
          changePointHistoryList.forEach(e => {
            let changeType = '';
            changeTypeItems.forEach(function(row){
              if (e.get('changeType') === row.value) {
                changeType = row.textContent;
              };
            });
            // push Value type is JSON
            excelList.push({
              번호: excelNumber++,
              변동일자: dateFormat(new Date(e.get("changeDt")), 'yyyy년mm월dd일 HH:MM:ss'),
              '결제(주문)번호': e.get("odrNo") ? e.get("odrNo") : e.get("paymentNo"),
              // 결제번호: e.get("paymentNo"),
              // 주문번호: e.get("odrNo"),
              결제금액: e.get("paymentCash"),
              변동유형: changeType,
              변동포인트: e.get("changePoint"),
              남은포인트: e.get("currentBalPoint"),
            })
          })
    
          /* make the worksheet */
          let worksheet = XLSX.utils.json_to_sheet(excelList);
    
          /* add to workbook */
          let workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "포인트_변동내역");
    
          /* generate an XLSX file */
          let writeName = dateFormat(new Date(), 'yyyymmdd')+"_SRD_포인트_변동내역.xlsx"
          XLSX.writeFile(workbook, writeName);
        }
      })
    }
    
  }

  cancelTemplate(rowData, column) {

    const { changePointCancleCallback } = this.props;
    function onClickButton() {
      const check = window.confirm('결제하신 포인트상품에 대한 포인트결제 취소를 진행하시겠습니까?');
      if (check === true) {
        changePointCancleCallback(rowData);
      }
    }
    if (rowData.changeType === '결제' || rowData.changeType === '결제취소') {
      if (rowData.changeType === '결제취소') {
        return '-';
      } 
      if (rowData.changeType === '결제') {
        if (rowData.activated === true) {
          return <button id="btnDownload" icon="pi pi-pencil" className="p-button-warning" onClick={onClickButton}>결제취소</button>
        } else {
          return <font style={{color: 'red'}}>취소됨</font>;
        }
      }
    }
  }

  render() {
    return (      
      <Fragment>
        <div>
          <DataTable id="table" 
                     value={this.state.gridData} 
                     scrollable={true} 
                     paginator={true} rows={10} 
                     rowsPerPageOptions={[5,10,15,20]}  
                     selection={this.state.selectedItem} 
                     onSelectionChange={e => this.setState({selectedItem: e.value})} >
            <Column field="changeDt" header="변동 일자"  style={{textAlign:'center', width: '20em', height:'2.5em'}} />
            <Column field="odrPaymentNo" header="결제(주문)번호"  style={{textAlign:'center', width: '20em'}} />
            <Column field="paymentCash" header="결제 금액"  style={{textAlign:'center', width: '8em'}}/>
            <Column field="changeType" header="변동 유형"  style={{textAlign:'center', width: '8em'}}/>
            <Column field="changePoint" header="변동 포인트"  style={{textAlign:'center', width: '10em'}}/>
            <Column field="currentBalPoint" header="남은 포인트"  style={{textAlign:'center', width: '10em'}}/>
            <Column columnKey="grdUserNm" field="userNm" header="주문자"  style={{textAlign:'center', width: '6em', display:this.state.hiddenCheck}}/>
            <Column columnKey="grdEmail" field="email" header="아이디"  style={{textAlign:'center', width: '10em', display:this.state.hiddenCheck}}/>
            <Column columnKey="grdBtnPaymentCancle" body={this.cancelTemplate} style={{textAlign:'center', width: '8em', display:this.state.hiddenCheck}} />
          </DataTable>
          </div>
          <div className="div-sub-top-right">
            <vaadin-button id="btnExcel" />
          </div>
      </Fragment>
    );
  }
}
export default ChangePointHistoryGrid;
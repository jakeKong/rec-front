import React, { Component, Fragment } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { changeTypeItems } from '../../items';

import * as XLSX from 'xlsx';

import { comma } from '../../../common/utils';

let moment = require('moment');
class ChangePointHistoryGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {gridData: [],hiddenCheck: '', toCheck: ''}
    this.cancelAttemptTemplate = this.cancelAttemptTemplate.bind(this);
    this.cancelReCompleteTemplate = this.cancelReCompleteTemplate.bind(this);
    this.cancelTemplate = this.cancelTemplate.bind(this);
  }

  componentDidMount() {
    const { changePointHistoryList } = this.props;
    if (!changePointHistoryList || changePointHistoryList === undefined || changePointHistoryList.isEmpty()) {
      return
    }
    
    
    let list = [];
    changePointHistoryList.sort((prev, next) => moment(prev.get('changeDt')) > moment(next.get('changeDt')) ? 1 : -1)
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
        changeDt: moment(e.get("changeDt")).format('YYYY년MM월DD일 HH:MM:ss'),
        changeDtOrigin: moment(e.get("changeDt")),
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
    let toCheck = 'none'
    if (role !== 'ROLE_ADMIN') {
      hiddenCheck = 'none';
      toCheck = '';
    }
    this.setState({hiddenCheck: hiddenCheck});
    this.setState({toCheck: toCheck});

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
          // let excelNumber = 1;
          changePointHistoryList.sort((prev, next) => moment(prev.get('changeDt')) > moment(next.get('changeDt')) ? 1 : -1)
          .forEach(e => {
            let changeType = '';
            changeTypeItems.forEach(function(row){
              if (e.get('changeType') === row.value) {
                changeType = row.label;
              };
            });
            // push Value type is JSON
            excelList.push({
              // 번호: excelNumber++,
              변동일자: moment(e.get("changeDt")).format('YYYY년MM월DD일 HH:MM:ss'),
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
          let writeName = moment().format('yyyymmdd')+"_ALGO_포인트_변동내역.xlsx"
          XLSX.writeFile(workbook, writeName);
        }
      })
    }
    
  }

  // 취소요청
  cancelAttemptTemplate(rowData, column) {
    const { changePointCancleAttmeptCallback } = this.props;
    function onClickButton() {
      const check = window.confirm('결제하신 포인트상품에 대한 포인트결제 취소요청을 하시겠습니까?');
      if (check === true) {
        changePointCancleAttmeptCallback(rowData);
      }
    }
    if (moment().add(-6, 'months').format() < rowData.changeDtOrigin.format()) {
      // console.log(rowData.changeDtOrigin.format());
      // console.log(moment().add(-6, 'months').format());
      if (rowData.changeType === '결제' || rowData.changeType === '결제취소') {
        if (rowData.changeType === '결제취소') {
          return '-';
        } 
        if (rowData.changeType === '결제') {
          if (rowData.activated === true) {
            return <button id="btnCancleAttempt" icon="pi pi-pencil" className="p-button-warning" onClick={onClickButton}>취소요청</button>
          } else {
            return <font style={{color: 'red'}}>취소됨</font>;
          }
        }
      }
      if (rowData.changeType === '결제취소요청') {
        if (rowData.activated === true) {
          return '-'
        } else {
          return <label>취소요청</label>
        }
      }
    } else {
      if (rowData.changeType === '결제' || rowData.changeType === '결제취소') {
        if (rowData.changeType === '결제취소') {
          return '-';
        } 
        if (rowData.changeType === '결제') {
          if (rowData.activated === true) {
            return '-';
          } else {
            return <font style={{color: 'red'}}>취소됨</font>;
          }
        }
      }
      if (rowData.changeType === '결제취소요청') {
        if (rowData.activated === true) {
          return '-'
        } else {
          return <label>취소요청</label>
        }
      }
    }

  }

  // 취소요청 철회
  cancelReCompleteTemplate(rowData, column) {
    const { changePointCancleReCompleteCallback } = this.props;
    function onClickButton() {
      const check = window.confirm('취소요청에 대한 승인을 하시겠습니까?');
      if (check === true) {
        changePointCancleReCompleteCallback(rowData);
      }
    }
    if (rowData.changeType === '결제' || rowData.changeType === '결제취소') {
      if (rowData.changeType === '결제취소') {
        return '-';
      } 
      if (rowData.changeType === '결제') {
        if (rowData.activated === true) {
          return '-';
        } else {
          return <font style={{color: 'red'}}>취소됨</font>;
        }
      }
    }
    if (rowData.changeType === '결제취소요청') {
      if (rowData.activated === true) {
        return '-'
      } else {
        return <button id="btnCancleReComplete" icon="pi pi-pencil" className="p-button-warning" onClick={onClickButton}>취소철회</button>
      }
    }
  }

  // 취소요청 승인
  cancelTemplate(rowData, column) {
    const { changePointCancleCallback } = this.props;
    function onClickButton() {
      const check = window.confirm('취소요청에 대한 승인을 하시겠습니까?');
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
          return '-';
        } else {
          return <font style={{color: 'red'}}>취소됨</font>;
        }
      }
    }
    if (rowData.changeType === '결제취소요청') {
      if (rowData.activated === true) {
        return '-'
      } else {
        return <button id="btnCancle" icon="pi pi-pencil" className="p-button-warning" onClick={onClickButton}>취소승인</button>
      }
    }
  }

  render() {
    return (      
      <Fragment>
        <section className="section-datatable-changehistory">
          <DataTable id="table" 
                     value={this.state.gridData} 
                     scrollable={true} 
                     paginator={true} rows={10} 
                     rowsPerPageOptions={[5,10,15,20]}  
                     selection={this.state.selectedItem} 
                     onSelectionChange={e => this.setState({selectedItem: e.value})} >
            <Column field="changeDt" header="변동 일자"/>
            <Column field="odrPaymentNo" header="결제(주문)번호"/>
            <Column field="paymentCash" header="결제 금액"/>
            <Column field="changeType" header="변동 유형"/>
            <Column field="changePoint" header="변동 포인트"/>
            <Column field="currentBalPoint" header="남은 포인트"/>
            <Column columnKey="grdUserNm" field="userNm" header="주문자"  style={{display:this.state.hiddenCheck}}/>
            <Column columnKey="grdEmail" field="email" header="아이디"  style={{display:this.state.hiddenCheck}}/>
            <Column columnKey="grdBtnPaymentAttemptCancle" body={this.cancelAttemptTemplate} style={{display:this.state.toCheck}} />
            <Column columnKey="grdBtnPaymentCancleReComplete" body={this.cancelReCompleteTemplate} style={{display:this.state.hiddenCheck}} />
            <Column columnKey="grdBtnPaymentCancle" body={this.cancelTemplate} style={{display:this.state.hiddenCheck}} />
          </DataTable>
        </section>
        <div className="div-sub-top-right">
          <vaadin-button id="btnExcel" hidden/>
        </div>
      </Fragment>
    );
  }
}
export default ChangePointHistoryGrid;
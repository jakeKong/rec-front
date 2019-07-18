import React, { Component, Fragment } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { changeTypeItems } from '../../items';

import * as XLSX from 'xlsx';

import { comma } from '../../../common/utils';

let gridData =[];
class ChangePointHistoryGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {gridData: [],hiddenCheck: ''}
  }
  componentDidMount() {
    const { changePointHistoryList } = this.props;
    if (!changePointHistoryList || changePointHistoryList === undefined || changePointHistoryList.isEmpty()) {
      return
    }
    
    let dateFormat = require('dateformat');
    console.log(changePointHistoryList);
    changePointHistoryList.forEach(e => {
      let changeType = '';
      changeTypeItems.forEach(function(row){
        if (e.get('changeType') === row.value) {
          changeType = row.textContent;
        };
      });
      // push Value type is JSON
      gridData.push({
        changePointSid: e.get("changeSid"),
        email: e.get("email"), 
        changeDt: dateFormat(new Date(e.get("changeDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        // changeType: e.get("changeType"),
        odrPaymentNo: e.get("odrNo") ? e.get("odrNo") : e.get("paymentNo"),
        odrNo: e.get("odrNo"),
        paymentNo: e.get("paymentNo"),
        paymentCash: e.get("paymentCash") ? comma(e.get("paymentCash"))+' 원' : null,
        changeType: changeType,
        changePoint: comma(e.get("changePoint"))+' P',
        currentBalPoint: comma(e.get("currentBalPoint"))+' P',
        userNm: e.get("userNm"),
        activated: e.get("activated")
      })
    })
    
    gridData.reverse();
    this.setState({gridData: gridData});

    //grid.className = "agz-bbs";

    const {role} = this.props;

    let hiddenCheck = '';
    if (role === 'ROLE_ADMIN') {
      hiddenCheck = 'none';
    }
    this.setState({hiddenCheck: hiddenCheck});

    const btnExcel = document.querySelector('#btnExcel');
    if (role === 'ROLE_ADMIN') {
      btnExcel.hidden = true;

      const {changePointCancleCallback} = this.props;
      document.querySelector('#grdBtnPaymentCancle').renderer = function(root, column, rowData) {
        
      }
    } else {
      btnExcel.hidden = false;
      btnExcel.textContent = 'EXCEL';
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

    // 스타일 적용 이후 우측정렬 미적용으로 인한 컬럼 렌더링 - 2019-07-12 @yieon
    // const column = grid.querySelectorAll('vaadin-grid-column');
    // column[2].renderer = function(root, column, rowData) {
    //   root.innerHTML = rowData.item.paymentCash
    //   root.style = 'text-align: right'
    // }
    // column[4].renderer = function(root, column, rowData) {
    //   root.innerHTML = rowData.item.changePoint
    //   root.style = 'text-align: right'
    // }
    // column[5].renderer = function(root, column, rowData) {
    //   root.innerHTML = rowData.item.currentBalPoint
    //   root.style = 'text-align: right'
    // }
    
  }
  cancelTemplate(rowData, column) {
    console.log(rowData);
    if (rowData.changeType === '결제' || rowData.changeType === '결제취소') {
      if (rowData.changeType === '결제취소') {
        return '-';
      } 
      if (rowData.changeType === '결제') {
        if (rowData.activated === true) {
          return <button id="btnDownload" icon="pi pi-pencil" className="p-button-warning" onClick={this.onClickButton}>결제취소</button>
          // const btnDownload = document.createElement('vaadin-button');
          // btnDownload.setAttribute('style', 'color: var(--lumo-error-text-color)');
          // btnDownload.textContent = '결제취소';
          // btnDownload.addEventListener('click', function() {
          //   const check = window.confirm('결제하신 포인트상품에 대한 포인트결제 취소를 진행하시겠습니까?');
          //   if (check === true) {
          //     // 결제취소 버튼 클릭 시 동작 이벤트
          //     changePointCancleCallback(rowData.item)
          //   }
          // })
          // root.appendChild(btnDownload);
        } else {
          return <font style={{color: 'red'}}>취소됨</font>;
        }
      }
    }
  }
  onCancelClick() {
    const check = window.confirm('결제하신 포인트상품에 대한 포인트결제 취소를 진행하시겠습니까?');
    if (check === true) {
      console.log(this.state.selectedItem);
      // 결제취소 버튼 클릭 시 동작 이벤트
      // changePointCancleCallback(this.state.selectedItem)
    }
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
              footer={this.displaySelection(this.state.selectedItem)}>
              <Column field="changeDt" header="변동 일자"  style={{textAlign:'center', width: '20em', height:'2.5em'}} />
              <Column field="odrPaymentNo" header="결제(주문)번호"  style={{textAlign:'center', width: '20em'}} />
              <Column field="paymentCash" header="결제 금액"  style={{textAlign:'center', width: '8em'}}/>
              <Column field="changeType" header="변동 유형"  style={{textAlign:'center', width: '8em'}}/>
              <Column field="changePoint" header="변동 포인트"  style={{textAlign:'center', width: '10em'}}/>
              <Column field="currentBalPoint" header="남은 포인트"  style={{textAlign:'center', width: '10em'}}/>
              <Column columnKey="grdUserNm" field="userNm" header="주문자"  style={{textAlign:'center', width: '6em', display:this.state.hiddenCheck}}/>
              <Column columnKey="grdEmail" field="email" header="아이디"  style={{textAlign:'center', width: '10em', display:this.state.hiddenCheck}}/>
              <Column columnKey="grdBtnPaymentCancle" body={this.cancelTemplate} style={{textAlign:'center', width: '8em', display:this.state.hiddenCheck}}/>
          </DataTable>
          </div>
          <div className="div-sub-top-right">
            <vaadin-button id="btnExcel" />
          </div>
      </Fragment>
    /*<Fragment>
        <div>
          <div className="div-sub-top-right">
            <vaadin-button id="btnExcel" />
          </div>
          <vaadin-grid theme="column-borders row-stripes" height-by-rows column-reordering-allowed>
            <vaadin-grid-column path="changeDt" header="변동 일자" text-align="center" flex-grow="2" width="250px" resizable/>
            <vaadin-grid-column path="odrPaymentNo" header="결제(주문)번호" text-align="center" flex-grow="2" width="200px" resizable/>
            <vaadin-grid-column path="paymentCash" header="결제 금액" text-align="center" flex-grow="1" width="100px" resizable/>
            <vaadin-grid-column path="changeType" header="변동 유형" text-align="center" flex-grow="1" width="100px" resizable/>
            <vaadin-grid-column path="changePoint" header="변동 포인트" text-align="center" flex-grow="1.5" width="100px" resizable/>
            <vaadin-grid-column path="currentBalPoint" header="남은 포인트" text-align="center" flex-grow="1.5" width="100px" resizable/>
            <vaadin-grid-column id="grdUserNm" path="userNm" header="주문자" text-align="center" flex-grow="1" width="100px" resizable/>
            <vaadin-grid-column id="grdEmail" path="email" header="주문자 아이디" text-align="center" flex-grow="1" width="150px" resizable/>
            <vaadin-grid-column id="grdBtnPaymentCancle" header="결제취소" text-align="center" flex-grow="10" width="150px" resizable/>
            */
          /* <vaadin-grid-column path="purchaseNo" header="구매번호" text-align="center" flex-grow="2" /> */
          /*</vaadin-grid>
          <div id="pages"/>
        </div>
      </Fragment>*/
    );
  }
  displaySelection(data) {
    if(!data || data.length === 0) {
        return <div style={{textAlign: 'left'}}>No Selection</div>;
    }
    else {
        if(data instanceof Array)
            return <ul style={{textAlign: 'left', margin: 0}}>{data.map((item,i) => <li key={item.noticeSid}>{item.noticeSid + ' - ' + item.noticeTitle + ' - ' + item.reportingDt}</li>)}</ul>;
        else
            return <div style={{textAlign: 'left'}}>Selected Item: { data.noticeSid + ' - ' + data.noticeTitle + ' - ' + data.reportingDt}</div>
    }
  }
}
export default ChangePointHistoryGrid;
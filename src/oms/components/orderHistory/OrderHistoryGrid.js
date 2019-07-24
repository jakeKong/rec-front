import React, { Component, Fragment } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import '@vaadin/vaadin-button';
import { statusItems, realEstateTypeItems } from '../../items';
import { comma } from '../../../common/utils';
import config from '../../../config';

/* this line is only needed if you are not adding a script tag reference */
import * as XLSX from 'xlsx';
// if(typeof XLSX == 'undefined') XLSX = require('xlsx');

class OrderHistoryGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {gridData: [],hiddenCheck: '', calcleCheck: ''}
    this.btnPurchaseCancleTemplate = this.btnPurchaseCancleTemplate.bind(this);
  }
  componentDidMount() {
    const { orderHistoryList } = this.props;
    if (!orderHistoryList || orderHistoryList === undefined || orderHistoryList.isEmpty()) {
      return
    }
    
    let dateFormat = require('dateformat');
    let list = [];
    let i=1;
    orderHistoryList.sort((prev, next) => new Date(prev.get('odrDt')).getTime() > new Date(next.get('odrDt')).getTime() ? 1 : -1)
    .forEach(e => {
      let status = '';
      statusItems.forEach(function(row){
        if (e.get('status') === row.value) {
          status = row.label;
        };
      });

      let realEstateType = '';
      realEstateTypeItems.forEach(function(row){
        if (e.get('realEstateType') === row.value) {
          realEstateType = row.label;
        };
      });
      
      // push Value type is JSON
      list.push({
        odrSid: e.get("odrSid"), 
        index: i++,
        email: e.get("email"), 
        odrNo: e.get("odrNo"),
        odrDt: dateFormat(new Date(e.get("odrDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        odrDtOrigin: e.get("odrDt"),
        marketPrice: comma(e.get("marketPrice")),
        marketPriceOrigin: e.get("marketPrice"),
        realEstateType: realEstateType,
        realEstateTypeOrigin: e.get("realEstateType"),
        variationPoint: comma(e.get("variationPoint"))+' P',
        variationPointOrigin: e.get("variationPoint"),
        downloadEndDt: dateFormat(new Date(e.get("downloadEndDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        downloadEndDtOrigin: e.get("downloadEndDt"),
        downloadCnt: e.get("downloadCnt"),
        status: status,
        statusOrigin: e.get("status"),
        pnuNo: e.get("pnuNo"),
        pdfFileNm: e.get("pdfFileNm"),
        ordererNm: e.get("ordererNm"),
        activated: e.get("activated")
      })
    })    
    this.setState({gridData: list.reverse()});
    
    const {role} = this.props;

    // 권한 여부에 따른 그리드 컬럼 노출
    let hiddenCheck = '';
    let calcleCheck = '';
    if (role !== 'ROLE_ADMIN' && role !== 'ROLE_SYSADMIN') {
      hiddenCheck = 'none';
    } else {
      calcleCheck = 'none'
    }
    this.setState({hiddenCheck: hiddenCheck});
    this.setState({calcleCheck: calcleCheck});

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
          orderHistoryList.forEach(e => {
            let status = '';
            statusItems.forEach(function(row){
              if (e.get('status') === row.value) {
                status = row.textContent;
              };
            });
      
            let realEstateType = '';
            realEstateTypeItems.forEach(function(row){
              if (e.get('realEstateType') === row.value) {
                realEstateType = row.textContent;
              };
            });
            // push Value type is JSON
            excelList.push({
              번호: excelNumber++,
              주문번호: e.get("odrNo"),
              주문일자: dateFormat(new Date(e.get("odrDt")), 'yyyy년mm월dd일 HH:MM:ss'),
              시세가: comma(e.get("marketPrice")),
              부동산유형: realEstateType,
              변동포인트: comma(e.get("variationPoint"))+' P',
              // 다운로드만료기간: e.get("downloadEndDt"),
              // 다운로드횟수: e.get("downloadCnt"),
              상태: status,
            })
          })
    
          /* make the worksheet */
          let worksheet = XLSX.utils.json_to_sheet(excelList);
    
          /* add to workbook */
          let workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "주문내역");
    
          /* generate an XLSX file */
          let writeName = dateFormat(new Date(), 'yyyymmdd')+"_SRD_주문내역.xlsx"
          XLSX.writeFile(workbook, writeName);
        }
      })
    }
  }

  btnDownloadTemplate(rowData, column) {
    function onClickButton() {
      const check = window.confirm('해당 PDF를 다운로드 하시겠습니까?');
      if (check === true) {
          // 다운로드 버튼 클릭 시 동작 이벤트
          window.open(config.pdfUrl + rowData.pdfFileNm);
        }
    }
    if (rowData.status === '구매취소') {
      return '-';
    } else {
      if (new Date(rowData.downloadEndDtOrigin) < new Date()) {
        return '만료됨';
      } else {
        if (rowData.activated === true) {
          return <button id="btnDownload" icon="pi pi-pencil" className="btn btn-download" onClick={onClickButton}>다운로드</button>
        } else {
          return <font style={{color: 'red'}}>취소됨</font>;
        }
      }
    }
  }
  
  btnPurchaseCancleTemplate(rowData, column ) {
    const { orderCancleCallback } = this.props;
    function onClickButton() {
      const check = window.confirm('구매하신 상품에 대한 상품구매 취소를 진행하시겠습니까?');
      if (check === true) {
        // 구매취소 버튼 클릭 시 동작 이벤트
        orderCancleCallback(rowData)
      }
    }
    if (rowData.status === '구매취소') {
      return '-';
    } else {
      if (new Date(rowData.downloadEndDtOrigin) < new Date()) {
        return '만료됨';
      } else {
        if (rowData.activated === true) {
          return <button id="btnCancel" icon="pi pi-pencil" className="p-button-warning" onClick={onClickButton}>구매취소</button>
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
            <DataTable id="table" value={this.state.gridData} 
                scrollable={true} 
                paginator={true} rows={10} rowsPerPageOptions={[5,10,15,20]} >
                <Column field="index" header="번호"  style={{textAlign:'center', width: '6em', height:'2.5em'}} />
                <Column field="odrNo" header="주문 번호"  style={{textAlign:'center', width: '15em', height:'2.5em'}} />
                <Column field="odrDt" header="주문 일자"  style={{textAlign:'center', width: '20em'}} />
                <Column field="marketPrice" header="시세가" style={{textAlign:'center', width: '10em'}}/>
                <Column field="realEstateType" header="부동산 유형" style={{textAlign:'center', width: '8em'}}/>
                <Column field="variationPoint" header="증감 포인트"  style={{textAlign:'center', width: '10em'}}/>
                <Column field="downloadEndDt" header="다운로드 만료기간"  style={{textAlign:'center', width: '20em'}}/>
                <Column columnKey="grdBtnDownload" body={this.btnDownloadTemplate} header="다운로드" style={{textAlign:'center', width: '8em'}}/>
                <Column field="downloadCnt" header="다운로드 횟수"  style={{textAlign:'center', width: '10em'}}/>
                <Column field="status" header="상태" style={{textAlign:'center', width: '10em'}}/>
                <Column columnKey="grdBtnPurchaseCancle" body={this.btnPurchaseCancleTemplate} header="구매취소"  style={{textAlign:'center', width: '8em', display:this.state.calcleCheck}}/>
                <Column columnKey="grdOrdererNm" field="ordererNm" header="주문자"  style={{textAlign:'center', width: '10em', display:this.state.hiddenCheck}}/>
                <Column columnKey="grdEmail" field="email"  header="아이디" style={{textAlign:'center', width: '10em', display:this.state.hiddenCheck}}/>
            </DataTable>
          </div>
          <div className="align-right-text">
            <vaadin-button id="btnExcel"/>
          </div>
      </Fragment>
    );
  }
}
export default OrderHistoryGrid;
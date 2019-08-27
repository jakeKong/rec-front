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

let moment = require('moment');
class OrderHistoryGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {gridData: []}
    this.btnPurchaseCancleAttemptTemplate = this.btnPurchaseCancleAttemptTemplate.bind(this);
    this.CancleAttemptClickEvent = this.CancleAttemptClickEvent.bind(this);
  }
  componentDidMount() {
    const { orderHistoryList } = this.props;
    if (!orderHistoryList || orderHistoryList === undefined || orderHistoryList.isEmpty()) {
      return
    }
    
    let list = [];
    let i=1;
    orderHistoryList.sort((prev, next) => moment(prev.get('odrDt')) > moment(next.get('odrDt')) ? 1 : -1)
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
        odrDt: moment(e.get("odrDt")).format('YYYY년MM월DD일'),
        odrDtOrigin: e.get("odrDt"),
        marketPrice: comma(e.get("marketPrice")),
        marketPriceOrigin: e.get("marketPrice"),
        realEstateType: realEstateType,
        realEstateTypeOrigin: e.get("realEstateType"),
        variationPoint: comma(e.get("variationPoint"))+' P',
        variationPointOrigin: e.get("variationPoint"),
        downloadEndDt: moment(e.get("downloadEndDt")).format('YYYY년MM월DD일'),
        downloadEndDtOrigin: e.get("downloadEndDt"),
        downloadCnt: e.get("downloadCnt"),
        status: status,
        statusOrigin: e.get("status"),
        pnuNo: e.get("pnuNo"),
        pdfFileNm: e.get("pdfFileNm"),
        ordererNm: e.get("ordererNm"),
        activated: e.get("activated"),
      })
    })    
    this.setState({gridData: list.reverse()});
    
    const btnExcel = document.querySelector('#btnExcel');
    btnExcel.hidden = false;
    btnExcel.textContent = 'EXCEL';
    btnExcel.className="btn down-excel"
    btnExcel.addEventListener('click', function() {
      const check = window.confirm('조회된 정보를 엑셀로 저장 하시겠습니까?');
      if (check === true) {
        let excelList = [];
        let excelNumber = 1;
        orderHistoryList.sort((prev, next) => moment(prev.get('odrDt')) > moment(next.get('odrDt')) ? 1 : -1)
        .forEach(e => {
          let status = '';
          statusItems.forEach(function(row){
            if (e.get('status') === row.value) {
              status = row.label;
            };
          });

          // push Value type is JSON
          excelList.push({
            번호: excelNumber++,
            주문번호: e.get("odrNo"),
            지번: e.get("pnuNo"),
            주문일자: moment(e.get("odrDt")).format('YYYY년MM월DD일'),
            증감포인트: comma(e.get("variationPoint"))+' P',
            만료일자: moment(e.get("downloadEndDt")).format('YYYY년MM월DD일'),
            상태: status,
          })
        })
  
        /* make the worksheet */
        let worksheet = XLSX.utils.json_to_sheet(excelList);
  
        /* add to workbook */
        let workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "주문내역");
  
        /* generate an XLSX file */
        let writeName = moment().format('yyyymmdd')+"_ALGO_주문내역.xlsx"
        XLSX.writeFile(workbook, writeName);
      }
    })
  }

  btnDownloadTemplate(rowData, column) {
    function onClickButton() {
      const check = window.confirm('해당 PDF를 다운로드 하시겠습니까?');
      if (check === true) {
          // 다운로드 버튼 클릭 시 동작 이벤트
          window.open(config.pdfUrl + rowData.pdfFileNm);
        }
    }
    if (rowData.status === '주문취소') {
      return '-';
    } else {
      if (moment(rowData.downloadEndDtOrigin) < moment()) {
        return '만료됨';
      } else if (rowData.status === '취소신청') {
        return <font style={{color: 'red'}}>취소신청</font>;
      } else {
        if (rowData.activated === true) {
          return <button id="btnDownload" icon="pi pi-pencil" className="btn btn-download" onClick={onClickButton}>다운로드</button>
        } else {
          return <font style={{color: 'red'}}>취소됨</font>;
        }
      }
    }
  }

  CancleAttemptClickEvent(rowData) {
    const { orderCancleAttemptCallback } = this.props;
    const check = window.confirm('주문하신 상품에 대한 주문 취소신청을 하시겠습니까?');
    if (check === true) {
      // 취소요청 버튼 클릭 시 동작 이벤트
      orderCancleAttemptCallback(rowData)
    }
  }
  
  btnPurchaseCancleAttemptTemplate(rowData, column ) {
    const CancleAttemptClickEvent = this.CancleAttemptClickEvent;
    function onClickButton() {
      CancleAttemptClickEvent(rowData);
    }
    
    if (rowData.status === '주문취소') {
      return '-';
    } else {
      if (moment(rowData.downloadEndDtOrigin) < moment()) {
        return '만료됨';
      } else if (rowData.status === '취소신청') {
        return <font style={{color: 'red'}}>취소신청</font>;
      } else {
        if (rowData.activated === true) {
          return <button id="btnCancel" icon="pi pi-pencil" className="p-button-warning" onClick={onClickButton}>취소신청</button>
        } else {
          return <font style={{color: 'red'}}>취소됨</font>;
        }
      }
    }
  }

  render() {
    return (
      <Fragment>
        <section className="section-datatable-orderhistory">
          <DataTable id="table" value={this.state.gridData} 
            scrollable={true} 
            paginator={true} rows={10} rowsPerPageOptions={[5,10,15,20]} >
            <Column field="index" header="번호"/>
            <Column field="odrNo" header="주문 번호"/>
            <Column field="pnuNo" header="지번"/>
            <Column field="odrDt" header="주문 일자"/>
            <Column field="variationPoint" header="증감 포인트"/>
            <Column field="downloadEndDt" header="만료일자"/>
            <Column field="status" header="상태"/>
            <Column columnKey="grdBtnDownload" body={this.btnDownloadTemplate} header="다운로드"/>
            <Column columnKey="grdBtnPurchaseCancleAttempt" body={this.btnPurchaseCancleAttemptTemplate} header="취소요청"/>
          </DataTable>
        </section>
        <div className="align-right-text">
          <vaadin-button id="btnExcel" hidden/>
        </div>
      </Fragment>
    );
  }
}
export default OrderHistoryGrid;
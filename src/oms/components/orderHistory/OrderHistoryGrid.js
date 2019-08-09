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
    this.btnPurchaseCancleAttemptTemplate = this.btnPurchaseCancleAttemptTemplate.bind(this);
    this.CancleAttemptClickEvent = this.CancleAttemptClickEvent.bind(this);
    this.CancleClickEvent = this.CancleClickEvent.bind(this);
    this.CancleAttemptClickToBackEvent = this.CancleAttemptClickToBackEvent.bind(this);
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
        odrDt: dateFormat(new Date(e.get("odrDt")), 'yyyy년mm월dd일'),
        odrDtOrigin: e.get("odrDt"),
        marketPrice: comma(e.get("marketPrice")),
        marketPriceOrigin: e.get("marketPrice"),
        realEstateType: realEstateType,
        realEstateTypeOrigin: e.get("realEstateType"),
        variationPoint: comma(e.get("variationPoint"))+' P',
        variationPointOrigin: e.get("variationPoint"),
        downloadEndDt: dateFormat(new Date(e.get("downloadEndDt")), 'yyyy년mm월dd일'),
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
          orderHistoryList.sort((prev, next) => new Date(prev.get('odrDt')).getTime() > new Date(next.get('odrDt')).getTime() ? 1 : -1)
          .forEach(e => {
            let status = '';
            statusItems.forEach(function(row){
              if (e.get('status') === row.value) {
                status = row.label;
              };
            });
      
            // let realEstateType = '';
            // realEstateTypeItems.forEach(function(row){
            //   if (e.get('realEstateType') === row.value) {
            //     realEstateType = row.textContent;
            //   };
            // });
            // push Value type is JSON
            excelList.push({
              번호: excelNumber++,
              주문번호: e.get("odrNo"),
              지번: e.get("pnuNo"),
              주문일자: dateFormat(new Date(e.get("odrDt")), 'yyyy년mm월dd일'),
              // 시세가: comma(e.get("marketPrice")),
              // 부동산유형: realEstateType,
              증감포인트: comma(e.get("variationPoint"))+' P',
              만료일자: dateFormat(new Date(e.get("downloadEndDt")), 'yyyy년mm월dd일'),
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
          let writeName = dateFormat(new Date(), 'yyyymmdd')+"_ALGO_주문내역.xlsx"
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
    if (rowData.status === '주문취소') {
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

  CancleAttemptClickEvent(rowData) {
    const { orderCancleAttemptCallback } = this.props;
    const check = window.confirm('주문하신 상품에 대한 주문 취소신청을 하시겠습니까?');
    if (check === true) {
      // 취소요청 버튼 클릭 시 동작 이벤트
      orderCancleAttemptCallback(rowData)
    }
  }
  
  btnPurchaseCancleAttemptTemplate(rowData, column ) {
    const { role } = this.props;
    const CancleAttemptClickEvent = this.CancleAttemptClickEvent;
    function onClickButton() {
      CancleAttemptClickEvent(rowData);
    }
    
    if (rowData.status === '주문취소') {
      return '-';
    } else {
      if (new Date(rowData.downloadEndDtOrigin) < new Date()) {
        return '만료됨';
      } else if (rowData.status === '취소신청') {
        return <font style={{color: 'red'}}>취소신청</font>;
      } else {
        if (rowData.activated === true) {
          if (role === 'ROLE_ADMIN') {
            return '-';
          } else {
            return <button id="btnCancel" icon="pi pi-pencil" className="p-button-warning" onClick={onClickButton}>취소신청</button>
          }
        } else {
          return <font style={{color: 'red'}}>취소됨</font>;
        }
      }
    }
  }

  CancleClickEvent(rowData) {
    const { orderCancleCallback } = this.props;
    const check = window.confirm('상품에 대한 주문 취소를 진행하시겠습니까?');
    if (check === true) {
      orderCancleCallback(rowData)
    }
  }

  CancleAttemptClickToBackEvent(rowData) {
    const { orderCancleAttemptToBackCallback } = this.props;
    const check = window.confirm('취소 요청상태를 철회하시겠습니까?');
    if (check === true) {
      orderCancleAttemptToBackCallback(rowData)
    }
  }
  
  btnPurchaseCancleTemplate(rowData, column ) {
    const CancleClickEvent = this.CancleClickEvent;
    const CancleAttemptClickToBackEvent = this.CancleAttemptClickToBackEvent;
    function onClickButton() {
      CancleClickEvent(rowData);
    }
    function statusBack() {
      CancleAttemptClickToBackEvent(rowData);
    }
    if (rowData.status === '주문취소') {
      return '-';
    } else {
      if (new Date(rowData.downloadEndDtOrigin) < new Date()) {
        return '만료됨';
      } else if (rowData.status === '취소신청') {
        return (
          <Fragment>
            <button id="btnCancel" icon="pi pi-pencil" className="p-button-warning" onClick={onClickButton}>주문취소</button>
            <button id="btnCancelStatusBackToComplete" icon="pi pi-pencil" className="p-button-warning" onClick={statusBack}>요청철회</button>
          </Fragment>
        );
      } else {
        if (rowData.activated === true) {
          return '-';
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
                {/* <Column field="marketPrice" header="시세가"/> */}
                {/* <Column field="realEstateType" header="부동산 유형"/> */}
                <Column field="variationPoint" header="증감 포인트"/>
                <Column field="downloadEndDt" header="만료일자"/>
                <Column field="status" header="상태"/>
                <Column columnKey="grdBtnDownload" body={this.btnDownloadTemplate} header="다운로드"/>
                {/* <Column field="downloadCnt" header="다운로드 횟수"/> */}
                <Column columnKey="grdBtnPurchaseCancleAttempt" body={this.btnPurchaseCancleAttemptTemplate} header="취소요청"/>
                <Column columnKey="grdBtnPurchaseCancle" body={this.btnPurchaseCancleTemplate} header="주문취소" style={{ display:this.state.hiddenCheck}}/>
                <Column columnKey="grdOrdererNm" field="ordererNm" header="주문자"  style={{display:this.state.hiddenCheck}}/>
                <Column columnKey="grdEmail" field="email"  header="아이디" style={{display:this.state.hiddenCheck}}/>
            </DataTable>
          </section>
          <div className="align-right-text">
            <vaadin-button id="btnExcel"/>
          </div>
      </Fragment>
    );
  }
}
export default OrderHistoryGrid;
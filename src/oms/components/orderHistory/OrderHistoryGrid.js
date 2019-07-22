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

let gridData =[];
let dateFormat = require('dateformat');
class OrderHistoryGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {gridData: [],hiddenCheck: ''}
  }
  componentDidMount() {
    const { orderHistoryList } = this.props;
    if (!orderHistoryList || orderHistoryList === undefined || orderHistoryList.isEmpty()) {
      return
    }
    
    let i=1;
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
      gridData.push({
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
    gridData.reverse();
    this.setState({gridData: gridData});
    
    const {role} = this.props;

    // 권한 여부에 따른 그리드 컬럼 노출
    let hiddenCheck = '';
    if (role === 'ROLE_ADMIN') {
      hiddenCheck = 'none';
    }
    this.setState({hiddenCheck: hiddenCheck});


    const {orderCancleCallback} = this.props;
    
    // list.forEach(e => {
    //   if (e.downloadEndDt > new Date() === false) {

    //   }
    //   if (e.status === 'TRADE_COMPLETE') {
    //     console.log()
    //   }
    // })
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

    // 스타일 적용 이후 우측정렬 미적용으로 인한 컬럼 렌더링 - 2019-07-12 @yieon
    // const column = grid.querySelectorAll('vaadin-grid-column');
    // column[3].renderer = function(root, column, rowData) {
    //   root.innerHTML = rowData.item.marketPrice
    //   root.style = 'text-align: right'
    // }
    // column[5].renderer = function(root, column, rowData) {
    //   root.innerHTML = rowData.item.variationPoint
    //   root.style = 'text-align: right'
    // }
    // column[8].renderer = function(root, column, rowData) {
    //   root.innerHTML = rowData.item.downloadCnt
    //   root.style = 'text-align: right'
    // }
  }


  btnDownloadTemplate(rowData, column) {
    if (rowData.status === '구매취소') {
      return '-';
    } else {
      if (new Date(rowData.downloadEndDtOrigin) < new Date()) {
        return '만료됨';
      } else {
        if (rowData.activated === true) {
          // root.innerHTML = '';
          // const btnDownload = document.createElement('vaadin-button');
          // btnDownload.className = 'btn btn-download';
          // btnDownload.textContent = '다운로드';
          // btnDownload.addEventListener('click', function() {
          // const check = window.confirm('해당 PDF를 다운로드 하시겠습니까?');
          // if (check === true) {
          //    // 다운로드 버튼 클릭 시 동작 이벤트
          //    window.open(config.pdfUrl + rowData.pdfFileNm);
          //  }            
          // })
          return <button id="btnDownload" icon="pi pi-pencil" className="p-button-warning" onClick={this.onClickButton}>다운로드</button>
        } else {
          return <font style={{color: 'red'}}>취소됨</font>;
        }
      }
    }
  }
  
  btnPurchaseCancleTemplate(rowData, column ) {
    if (rowData.status === '구매취소') {
      return '-';
    } else {
      if (new Date(rowData.downloadEndDtOrigin) < new Date()) {
        return '만료됨';
      } else {
        if (rowData.activated === true) {
          // const btnDownload = document.createElement('vaadin-button');
          // // btnDownload.setAttribute('style', 'color: var(--lumo-contrast-text-color)');
          // btnDownload.setAttribute('style', 'color: var(--lumo-error-text-color)');
          // btnDownload.textContent = '구매취소';
          // btnDownload.addEventListener('click', function() {
          //   const check = window.confirm('구매하신 상품에 대한 상품구매 취소를 진행하시겠습니까?');
          //   if (check === true) {
          //     // 구매취소 버튼 클릭 시 동작 이벤트
          //     orderCancleCallback(rowData.item)
          //   }
          // })
          // root.appendChild(btnDownload);
          return <button id="btnCancel" icon="pi pi-pencil" className="p-button-warning" onClick={this.onClickButton}>구매취소</button>
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
                paginator={true} rows={10} rowsPerPageOptions={[5,10,15,20]}  
                selection={this.state.selectedItem} 
                onSelectionChange={e => this.setState({selectedItem: e.value})} 
                // onRowClick={e => this.props.detailCallback(e.data)}
                footer={this.displaySelection(this.state.selectedItem)}>
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
                <Column columnKey="grdBtnPurchaseCancle" body={this.btnPurchaseCancleTemplate} header="구매취소"  style={{textAlign:'center', width: '8em', display:this.state.hiddenCheck}}/>
                <Column columnKey="grdOrdererNm" field="ordererNm" header="주문자"  style={{textAlign:'center', width: '10em', display:this.state.hiddenCheck}}/>
                <Column columnKey="grdEmail" field="email"  header="아이디" style={{textAlign:'center', width: '10em', display:this.state.hiddenCheck}}/>
            </DataTable>
          </div>
          <div className="align-right-text">
            <vaadin-button id="btnExcel"/>
          </div>
        {/* <vaadin-grid theme="column-borders row-stripes" height-by-rows column-reordering-allowed> */}
          {/* <vaadin-grid-sort-column path="odrSid" header="주문 SID" text-align="end" width="10px" flex-grow="1"></vaadin-grid-sort-column> */}
          {/* <vaadin-grid-column path="index" header="번호" text-align="center" flex-grow="1" width="70px"/>
          <vaadin-grid-column path="odrNo" header="주문 번호" text-align="center" flex-grow="10" width="200px" resizable/>
          <vaadin-grid-column path="odrDt" header="주문 일자" text-align="center" flex-grow="15" width="250px" resizable/>
          <vaadin-grid-column path="marketPrice" header="시세가" text-align="center" flex-grow="10" width="150px" resizable/>
          <vaadin-grid-column path="realEstateType" header="부동산 유형" text-align="center" flex-grow="10" width="120px" resizable/>
          <vaadin-grid-column path="variationPoint" header="증감 포인트" text-align="center" flex-grow="3" width="120px" resizable />
          <vaadin-grid-column path="downloadEndDt" header="다운로드 만료기간" text-align="center" flex-grow="15" width="250px" resizable/>
          <vaadin-grid-column id="grdBtnDownload" header="다운로드" text-align="center" flex-grow="10" width="150px" resizable/>
          <vaadin-grid-column path="downloadCnt" header="다운로드 횟수" text-align="center" flex-grow="1" width="120px" resizable/>
          <vaadin-grid-column path="status" header="상태" text-align="center" flex-grow="5" width="100px" resizable/>
          <vaadin-grid-column id="grdBtnPurchaseCancle" header="구매취소" text-align="center" flex-grow="10" width="150px" resizable/>
          <vaadin-grid-column id="grdOrdererNm" path="ordererNm" header="주문자" text-align="center" flex-grow="10" width="100px" resizable/>
          <vaadin-grid-column id="grdEmail" path="email" header="주문자 아이디" text-align="center" flex-grow="10" width="150px" resizable/>
        </vaadin-grid> */}
      </Fragment>
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
export default OrderHistoryGrid;
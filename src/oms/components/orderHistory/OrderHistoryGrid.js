import React, { Component, Fragment } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import '@vaadin/vaadin-button';
import { statusItems, realEstateTypeItems } from '../../items';
// comma 추가를 위한 유틸리티
import { comma } from '../../../common/utils';
import config from '../../../config';

/* this line is only needed if you are not adding a script tag reference */
import * as XLSX from 'xlsx';
// if(typeof XLSX == 'undefined') XLSX = require('xlsx');
// date 라이브러리 호출
let moment = require('moment');
// 주문내역 목록 컴포넌트
class OrderHistoryGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridData: []
    }
    // 사용할 함수 바인딩 처리
    this.btnPurchaseCancleAttemptTemplate = this.btnPurchaseCancleAttemptTemplate.bind(this);
    this.CancleAttemptClickEvent = this.CancleAttemptClickEvent.bind(this);
  }
  // 최초 마운트
  componentDidMount() {
    const { orderHistoryList } = this.props;
    // 목록 존재여부 확인
    if (!orderHistoryList || orderHistoryList === undefined || orderHistoryList.isEmpty()) {
      return
    }
    
    // json 타입으로 전달받은 목록을 데이터에 담기위한 형태로 변환하기 위한 배열생성
    let list = [];
    let i=1;
    // 날짜순 정렬 sorting
    orderHistoryList.sort((prev, next) => moment(prev.get('odrDt')) > moment(next.get('odrDt')) ? 1 : -1)
    .forEach(e => {
      // value값을 label로 변환하여 데이터 테이블에 한글로 표기하기 위한 작업
      // 주문상태
      let status = '';
      statusItems.forEach(function(row){
        if (e.get('status') === row.value) {
          status = row.label;
        };
      });
      // 부동산 유형
      let realEstateType = '';
      realEstateTypeItems.forEach(function(row){
        if (e.get('realEstateType') === row.value) {
          realEstateType = row.label;
        };
      });
      
      // push Value type is JSON
      list.push({
        // 주문내역 sid
        odrSid: e.get("odrSid"), 
        // 번호
        index: i++,
        // 이메일
        email: e.get("email"), 
        // 주문번호
        odrNo: e.get("odrNo"),
        // 주문일자 포맷팅
        odrDt: moment(e.get("odrDt")).format('YYYY년MM월DD일'),
        // 주문일자
        odrDtOrigin: e.get("odrDt"),
        // 시세가 포맷팅
        marketPrice: comma(e.get("marketPrice")),
        // 시세가
        marketPriceOrigin: e.get("marketPrice"),
        // 부동산 유형
        realEstateType: realEstateType,
        // 부동산 유형
        realEstateTypeOrigin: e.get("realEstateType"),
        // 변동 포인트 포맷팅
        variationPoint: comma(e.get("variationPoint"))+' P',
        // 변동포인트
        variationPointOrigin: e.get("variationPoint"),
        // 다운로드 만료일자 포맷팅
        downloadEndDt: moment(e.get("downloadEndDt")).format('YYYY년MM월DD일'),
        // 다운로드 만료일자
        downloadEndDtOrigin: e.get("downloadEndDt"),
        // 다운로드 횟수
        downloadCnt: e.get("downloadCnt"),
        // 상태
        status: status,
        // 상태
        statusOrigin: e.get("status"),
        // 지번
        pnuNo: e.get("pnuNo"),
        // pdf 파일명
        pdfFileNm: e.get("pdfFileNm"),
        // 주문자
        ordererNm: e.get("ordererNm"),
        // 주문 취소여부 확인
        activated: e.get("activated"),
        // 지번주소
        jibunAddr: e.get("jibunAddr")
      })
    })    
    // 데이터테이블에 주문내역 값 할당
    this.setState({gridData: list.reverse()});
    
    // 엑셀 버튼
    const btnExcel = document.querySelector('#btnExcel');
    btnExcel.hidden = false;
    // 버튼 라벨
    btnExcel.textContent = 'EXCEL';
    // 버튼 스타일 적용을 위한 className 설정
    btnExcel.className="btn down-excel"
    // 버튼 클릭 시 이벤트
    btnExcel.addEventListener('click', function() {
      // 여부 재확인
      const check = window.confirm('조회된 정보를 엑셀로 저장 하시겠습니까?');
      if (check === true) {
        let excelList = [];
        let excelNumber = 1;
        // 날짜 순 정렬
        orderHistoryList.sort((prev, next) => moment(prev.get('odrDt')) > moment(next.get('odrDt')) ? 1 : -1)
        .forEach(e => {
          // 상태 라벨값
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
            // 지번: e.get("pnuNo"),
            주소: e.get("jibunAddr"),
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
        // 엑셀 파일명 설정
        let writeName = moment().format('YYYYMMDD')+"_ALGO_주문내역.xlsx"
        XLSX.writeFile(workbook, writeName);
      }
    })
  }

  // 다운로드 컬럼
  btnDownloadTemplate(rowData, column) {
    function onClickButton() {
      const check = window.confirm('해당 PDF를 다운로드 하시겠습니까?');
      if (check === true) {
          // 다운로드 버튼 클릭 시 동작 이벤트
          window.open(config.pdfUrl + rowData.pdfFileNm);
        }
    }
    // 다운로드 가능여부에 따른 컬럼표기
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

  // 주문 취소신청 이벤트
  CancleAttemptClickEvent(rowData) {
    const { orderCancleAttemptCallback } = this.props;
    const check = window.confirm('주문하신 상품에 대한 주문 취소신청을 하시겠습니까?');
    if (check === true) {
      // 취소요청 버튼 클릭 시 동작 이벤트
      orderCancleAttemptCallback(rowData)
    }
  }
  
  // 주문 취소신청 컬럼
  btnPurchaseCancleAttemptTemplate(rowData, column ) {
    const CancleAttemptClickEvent = this.CancleAttemptClickEvent;
    function onClickButton() {
      CancleAttemptClickEvent(rowData);
    }
    
    // 주문취소 상태값에 따른 컬럼값 표기
    if (rowData.status === '주문취소') {
      return '-';
    } else {
      if (moment(rowData.downloadEndDtOrigin) < moment()) {
        // 다운로드 만료일자 지난 경우
        return '만료됨';
      } else if (rowData.status === '취소신청') {
        // 취소신청 상태인 경우
        return <font style={{color: 'red'}}>취소신청</font>;
      } else {
        if (rowData.activated === true) {
          // 취소신청 가능상태
          return <button id="btnCancel" icon="pi pi-pencil" className="p-button-warning" onClick={onClickButton}>취소신청</button>
        } else {
          // 취소 된 상태
          return <font style={{color: 'red'}}>취소됨</font>;
        }
      }
    }
  }

  render() {
    return (
      <Fragment>
        <section className="section-datatable-orderhistory">
          <DataTable id="table" 
            // 데이터 테이블 value
            value={this.state.gridData} 
            // 스크롤 여부
            scrollable={true} 
            // 페이징 여부
            paginator={true} 
            // row 개수
            rows={10} 
            // row 선택 옵션
            rowsPerPageOptions={[5,10,15,20]} >
            <Column field="index" header="번호"/>
            <Column field="odrNo" header="주문 번호"/>
            {/* <Column field="pnuNo" header="지번"/> */}
            <Column field="jibunAddr" header="주소"/>
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
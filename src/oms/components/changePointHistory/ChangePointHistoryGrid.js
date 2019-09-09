import React, { Component, Fragment } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { changeTypeItems } from '../../items';

import * as XLSX from 'xlsx';

// comma 추가를 위한 유틸리티
import { comma } from '../../../common/utils';

// date 라이브러리 호출
let moment = require('moment');
// 포인트 변동내역 목록 컴포넌트
class ChangePointHistoryGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gridData: []
    }
    // 사용할 함수 바인딩 처리
    this.cancelAttemptTemplate = this.cancelAttemptTemplate.bind(this);
  }

  // 최초 마운트
  componentDidMount() {
    const { changePointHistoryList } = this.props;
    // 목록 존재여부 확인
    if (!changePointHistoryList || changePointHistoryList === undefined) {
      return
    }
    
    // json 타입으로 전달받은 목록을 데이터에 담기위한 형태로 변환하기 위한 배열생성
    let list = [];
    // 날짜순 정렬 sorting
    changePointHistoryList.sort((prev, next) => moment(prev.get('changeDt')) > moment(next.get('changeDt')) ? 1 : -1)
    .forEach(e => {
      // value값을 label로 변환하여 데이터 테이블에 한글로 표기하기 위한 작업
      // 변동타입 한글로 표기를 위한 작업
      let changeType = '';
      changeTypeItems.forEach(function(row){
        if (e.get('changeType') === row.value) {
          changeType = row.label;
        };
      });
      // push Value type is JSON
      list.push({
        // 변동내역 sid
        changePointSid: e.get("changeSid"),
        // 이메일
        email: e.get("email"), 
        // 포맷처리된 변동일자
        changeDt: moment(e.get("changeDt")).format('YYYY년MM월DD일 HH:mm:ss'),
        // 변동일자
        changeDtOrigin: moment(e.get("changeDt")),
        // 주문/결제번호
        odrPaymentNo: e.get("odrNo") ? e.get("odrNo") : e.get("paymentNo"),
        // 주문번호
        odrNo: e.get("odrNo"),
        // 결제번호
        paymentNo: e.get("paymentNo"),
        // 포맷처리된 결제금액
        paymentCash: e.get("paymentCash") ? comma(e.get("paymentCash"))+' 원' : null,
        // 결제금액
        paymentCashOrigin: e.get("paymentCash"),
        // 변동타입
        changeType: changeType,
        // 포맷처리된 변동포인트
        changePoint: comma(e.get("changePoint"))+' P',
        // 변동포인트
        changePointOrigin: e.get("changePoint"),
        // 포맷처리된 잔여포인트
        currentBalPoint: comma(e.get("currentBalPoint"))+' P',
        // 잔여포인트
        currentBalPointOrigin: e.get("currentBalPoint"),
        // 주문자
        userNm: e.get("userNm"),
        // 결제취소여부 확인
        activated: e.get("activated"),
        // 비고 (이벤트 지급 메모)
        remarks: e.get("remarks") ? e.get("remarks") : '-'
      })
    })
    // 데이터테이블에 포인트 변동내역 값 할당
    this.setState({gridData: list.reverse()});

    // 엑셀 버튼
    const btnExcel = document.querySelector('#btnExcel');
    btnExcel.hidden = false;
    // 버튼 라벨
    btnExcel.textContent = 'EXCEL';
    // 버튼 스타일적용을 위한 classname 설정
    btnExcel.className="btn down-excel"
    // 버튼 클릭 시 이벤트
    btnExcel.addEventListener('click', function() {
      // 여부 재확인
      const check = window.confirm('조회된 정보를 엑셀로 저장 하시겠습니까?');
      if (check === true) {
        let excelList = [];
        // let excelNumber = 1;
        // 날짜 순 정렬
        changePointHistoryList.sort((prev, next) => moment(prev.get('changeDt')) > moment(next.get('changeDt')) ? 1 : -1)
        .forEach(e => {
          // 변동타입 한글로 표기를 위한 작업
          let changeType = '';
          changeTypeItems.forEach(function(row){
            if (e.get('changeType') === row.value) {
              changeType = row.label;
            };
          });
          // push Value type is JSON
          excelList.push({
            변동일자: moment(e.get("changeDt")).format('YYYY년MM월DD일 HH:mm:ss'),
            '결제(주문)번호': e.get("odrNo") ? e.get("odrNo") : e.get("paymentNo"),
            결제금액: e.get("paymentCash"),
            변동유형: changeType,
            변동포인트: e.get("changePoint"),
            남은포인트: e.get("currentBalPoint"),
            비고: e.get("remarks") ? e.get("remarks") : '-'
          })
        })
  
        /* make the worksheet */
        let worksheet = XLSX.utils.json_to_sheet(excelList);
  
        /* add to workbook */
        let workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "포인트_변동내역");
  
        /* generate an XLSX file */
        // 엑셀 파일명 설정
        let writeName = moment().format('YYYYMMDD')+"_ALGO_포인트_변동내역.xlsx"
        XLSX.writeFile(workbook, writeName);
      }
    })
  }

  // 취소요청 컬럼
  cancelAttemptTemplate(rowData, column) {
    const { changePointCancleAttmeptCallback } = this.props;
    function onClickButton() {
      const check = window.confirm('결제하신 포인트상품에 대한 포인트결제 취소요청을 하시겠습니까?');
      if (check === true) {
        changePointCancleAttmeptCallback(rowData);
      }
    }
    if (moment().add(-6, 'months').format() < rowData.changeDtOrigin.format()) {
      // 현재일자로부터 변동일자가 6개월 미만인 경우
      if (rowData.changeType === '결제' || rowData.changeType === '결제취소') {
        if (rowData.changeType === '결제취소') {
          return '-';
        } 
        if (rowData.changeType === '결제') {
          if (rowData.activated === true) {
            // 결제타입의 결제취소 여부값이 true(결제상태)일 경우
            return <button id="btnCancleAttempt" icon="pi pi-pencil" className="p-button-warning" onClick={onClickButton}>취소요청</button>
          } else {
            // 결제타입이나 취소가 진행된 경우
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
      // 현재일자로부터 변동일자가 6개월 이상인 경우
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

  render() {
    return (      
      <Fragment>
        <section className="section-datatable-changehistory">
          {/* 데이터 테이블 (그리드) */}
          <DataTable id="table" 
                     // 데이터 테이블 value
                     value={this.state.gridData} 
                     // 스크롤 여부
                     scrollable={true} 
                     // 페이징 row 개수
                     paginator={true} rows={10} 
                     // row 개수 선택 옵션
                     rowsPerPageOptions={[5,10,15,20]}  
                     // 선택 items 체크
                     selection={this.state.selectedItem} 
                     onSelectionChange={e => this.setState({selectedItem: e.value})} >
            <Column field="changeDt" header="변동 일자"/>
            <Column field="odrPaymentNo" header="결제(주문)번호"/>
            <Column field="paymentCash" header="결제 금액"/>
            <Column field="changeType" header="변동 유형"/>
            <Column field="changePoint" header="변동 포인트"/>
            <Column field="currentBalPoint" header="남은 포인트"/>
            <Column field="remarks" header="비고"/>
            {/* 결제취소요청컬럼 */}
            <Column columnKey="grdBtnPaymentAttemptCancle" body={this.cancelAttemptTemplate} style={{display:this.state.toCheck}} />
          </DataTable>
        </section>
        <div className="div-sub-top-right">
          {/* 엑셀버튼 */}
          <vaadin-button id="btnExcel" hidden/>
        </div>
      </Fragment>
    );
  }
}
export default ChangePointHistoryGrid;
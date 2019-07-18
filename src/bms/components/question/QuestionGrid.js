import React, { Component, Fragment } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class QuestionGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {gridData: []}
  }

  componentDidMount() {
    const { questionList } = this.props;
    if (!questionList || questionList === undefined || questionList.isEmpty()) {
      return
    }

    const { role } = this.props;
    if (role === 'ROLE_ADMIN' || role === 'ROLE_SYSADMIN') {
     const { selectCallback, deselectCallback } = this.props;
     // 그리드 컬럼 안의 체크박스 이벤트
     
    }
    
    let dateFormat = require('dateformat');
    let gridData =[];
    // 그리드 컬럼 인덱스를 위한 변수
    let i=1;
    questionList.forEach(e => {
      // push Value type is JSON
      gridData.push({
        index: i++,
        questionSid: e.get("questionSid"),
        questionTitle: e.get("questionTitle"),
        questionTxt: e.get("questionTxt"),
        questionLevel: e.get("questionLevel"),
        questionWriter: e.get("questionWriter"),
        reportingDt: dateFormat(new Date(e.get("reportingDt")), 'yyyy년mm월dd일 HH:MM:ss')
      })
    })
    gridData.reverse();
    this.setState({gridData: gridData});
    
    // 제목 컬럼 선택시 상세정보조회 이벤트 요청
    // const { detailCallback } = this.props;
    // document.querySelector('#grdQuestionTitle').renderer = function(root, column, rowData) {
    //   root.innerHTML = '';
    //   const title = document.createElement('label')
    //   title.textContent = rowData.item.questionTitle;
    //   title.className = 'label-color-focus';

    //   title.addEventListener('click', function() {
    //     detailCallback(rowData.item);
    //   })
    //   root.appendChild(title);
    // }
  
  }

  //줄을 클릭하는 경우 이벤트 -> 내용보기 이동 팝업으로 처리 요망
  onRowClick(e) {
    const item = e.data;
    console.log(item);
    // 제목 컬럼 선택시 상세정보조회 이벤트 요청
    console.log(this.detailCallback);
  }

  render() {
    return (
      <Fragment>
          <DataTable id="table" value={this.state.gridData} 
              paginator={true} rows={10} rowsPerPageOptions={[5,10,15,20]}  
              selection={this.state.selectedItem} 
              onSelectionChange={e => this.setState({selectedItem: e.value})} 
              onRowClick={this.onRowClick}
              footer={this.displaySelection(this.state.selectedItem)}>
              <Column selectionMode="multiple" style={{width:'2em', height:'2.5em'}}/>
              <Column field="index" header="번호"  style={{textAlign:'center'}} />
              <Column field="questionTitle" header="제목"  style={{textAlign:'center'}}/>
              <Column field="questionWriter" header="제목"  style={{textAlign:'center'}}/>
              <Column field="reportingDt" header="작성일자"  style={{textAlign:'center'}}/>
          </DataTable>
        </Fragment>
      /* <Fragment>
        <vaadin-grid theme="no-border" height-by-rows multi-sort>
          <vaadin-grid-column auto-select hidden id="grdSelect" flex-grow="0.1" width="50px" />
          <vaadin-grid-column path="index" header="번호" text-align="center" flex-grow="0.2" width="50px"/>
          <vaadin-grid-column id="grdQuestionTitle" header="제목" text-align="center" flex-grow="6.2" />
          <vaadin-grid-column path="questionWriter" header="작성자" text-align="center" flex-grow="1" />
          <vaadin-grid-column path="reportingDt" header="작성일자" text-align="center" flex-grow="2.5" />
        </vaadin-grid>
        <div id="pages" className="pagination"/>
      </Fragment> */
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
export default QuestionGrid;
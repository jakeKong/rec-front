import React, { Component, Fragment } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class QuestionGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridData: [],
      selectedItem: null
    }
    this.questionTitleClickLabelTemplate = this.questionTitleClickLabelTemplate.bind(this);
    this.roleCheckColumnRenderingEvent = this.roleCheckColumnRenderingEvent.bind(this);
    this.selectChangedEvent = this.selectChangedEvent.bind(this);
  }

  componentDidMount() {
    const { questionList } = this.props;
    if (!questionList || questionList === undefined || questionList.isEmpty()) {
      return
    }

    let dateFormat = require('dateformat');
    // 그리드 컬럼 인덱스를 위한 변수
    let i=1;
    let list =[];
    questionList.sort((prev, next) => new Date(prev.get('reportingDt')).getTime() > new Date(next.get('reportingDt')).getTime() ? 1 : -1)
    .forEach(e => {
      // push Value type is JSON
      list.push({
        index: i++,
        questionSid: e.get("questionSid"),
        questionTitle: e.get("questionTitle"),
        questionTxt: e.get("questionTxt"),
        questionLevel: e.get("questionLevel"),
        questionWriter: e.get("questionWriter"),
        reportingDt: dateFormat(new Date(e.get("reportingDt")), 'yyyy년mm월dd일 HH:MM:ss')
      })
    })
    this.setState({gridData: list.reverse()});
  }

  questionTitleClickLabelTemplate(rowData, column) {
    const {detailCallback} = this.props;
    function titleClickEvent() {
      detailCallback(rowData)
    }
    return <label className="" onClick={titleClickEvent} >{rowData.questionTitle}</label>;
  }

  selectChangedEvent(e) {
    this.setState({selectedItem: e.value})
    const {selectCallback} = this.props;
    let selectList = [];
    e.value.forEach(e => {
      selectList.push(e.questionSid);
    })
    selectCallback(selectList)
  }

  roleCheckColumnRenderingEvent(role) {
    if (role === 'ROLE_ADMIN' || role === 'ROLE_SYSADMIN') {
      return (
        <Fragment>
          <DataTable id="table"
                    value={this.state.gridData} 
                    paginator={true} 
                    rows={10} 
                    rowsPerPageOptions={[5,10,15,20]}  
                    selection={this.state.selectedItem} 
                    onSelectionChange={e => this.selectChangedEvent(e)} >
            <Column selectionMode="multiple" style={{width:'2em', height:'2.5em'}}/>
            <Column field="index" header="번호"  style={{textAlign:'center'}} />
            <Column body={this.questionTitleClickLabelTemplate} header="제목" style={{textAlign:'center'}}/>
            <Column field="questionWriter" header="작성자" style={{textAlign:'center'}}/>
            <Column field="reportingDt" header="작성일자" style={{textAlign:'center'}}/>
          </DataTable>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <DataTable id="table"
                    value={this.state.gridData} 
                    paginator={true} 
                    rows={10} 
                    rowsPerPageOptions={[5,10,15,20]} >
            <Column field="index" header="번호"  style={{textAlign:'center'}} />
            <Column body={this.questionTitleClickLabelTemplate} header="제목" style={{textAlign:'center'}}/>
            <Column field="questionWriter" header="작성자" style={{textAlign:'center'}}/>
            <Column field="reportingDt" header="작성일자" style={{textAlign:'center'}}/>
          </DataTable>
        </Fragment>
      );
    }
  }

  render() {
    const { role } = this.props;
    return this.roleCheckColumnRenderingEvent(role);
  }
}
export default QuestionGrid;
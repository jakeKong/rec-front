import React, { Component, Fragment } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import storage from '../../../common/storage';

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

    let moment = require('moment');
    // 그리드 컬럼 인덱스를 위한 변수
    let i=1;
    let list =[];
    questionList.sort((prev, next) => moment(prev.get('reportingDt')) > moment(next.get('reportingDt')) ? 1 : -1)
    .forEach(e => {
      // push Value type is JSON
      list.push({
        index: i++,
        questionSid: e.get("questionSid"),
        questionTitle: e.get("questionTitle"),
        questionTxt: e.get("questionTxt"),
        questionLevel: e.get("questionLevel"),
        questionWriter: e.get("questionWriter"),
        reportingDt: moment(e.get("reportingDt")).format('YYYY년MM월DD일')
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

  roleCheckColumnRenderingEvent() {
    if (storage.get('loggedInfo')) {
      if (storage.get('loggedInfo').assignedRoles.indexOf('ROLE_ADMIN') === -1) {
        return (
          <Fragment>
            <section className="section-datatable-question">
              <DataTable id="table"
                        value={this.state.gridData} 
                        paginator={true} 
                        rows={10} 
                        rowsPerPageOptions={[5,10,15,20]} >
                <Column field="index" header="번호"/>
                <Column body={this.questionTitleClickLabelTemplate} header="제목"/>
                <Column field="questionWriter" header="작성자"/>
                <Column field="reportingDt" header="작성일자"/>
              </DataTable>
            </section>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <DataTable id="table"
                      value={this.state.gridData} 
                      paginator={true} 
                      rows={10} 
                      rowsPerPageOptions={[5,10,15,20]}  
                      selection={this.state.selectedItem} 
                      onSelectionChange={e => this.selectChangedEvent(e)} >
              <Column selectionMode="multiple"/>
              <Column field="index" header="번호"/>
              <Column body={this.questionTitleClickLabelTemplate} header="제목"/>
              <Column field="questionWriter" header="작성자"/>
              <Column field="reportingDt" header="작성일자"/>
            </DataTable>
          </Fragment>
        );
      }
    }
  }

  render() {
    return this.roleCheckColumnRenderingEvent();
  }
}
export default QuestionGrid;
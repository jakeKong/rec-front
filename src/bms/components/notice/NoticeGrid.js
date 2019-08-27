import React, { Component, Fragment } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import storage from '../../../common/storage';

class NoticeGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridData: [],
      selectedItem: null
    }
    this.noticeTitleClickLabelTemplate = this.noticeTitleClickLabelTemplate.bind(this);
    this.roleCheckColumnRenderingEvent = this.roleCheckColumnRenderingEvent.bind(this);
    this.selectChangedEvent = this.selectChangedEvent.bind(this);
  }
  
  componentDidMount() {
    const { noticeList } = this.props;
    if (!noticeList || noticeList === undefined || noticeList.isEmpty()) {
      return
    }
    let moment = require('moment')
    // 그리드 컬럼 인덱스를 위한 변수
    let i=1;
    let list =[];
    noticeList.sort((prev, next) => moment(prev.get('reportingDt')) > moment(next.get('reportingDt')) ? 1 : -1)
    .forEach(e => {
      list.push({
        index: i++,
        noticeSid: e.get('noticeSid'),
        noticeTitle: e.get("noticeTitle"),
        noticeTxt: e.get("noticeTxt"),
        noticeWriter: e.get("noticeWriter"),
        reportingDt: moment(e.get('reportingDt')).format('YYYY년MM월DD일')
      })
    })
    this.setState({gridData: list.reverse()});
  }

  noticeTitleClickLabelTemplate(rowData, column) {
    const {detailCallback} = this.props;
    function titleClickEvent() {
      detailCallback(rowData)
    }
    return <label className="" onClick={titleClickEvent} >{rowData.noticeTitle}</label>;
  }

  selectChangedEvent(e) {
    this.setState({selectedItem: e.value})
    const {selectCallback} = this.props;
    let selectList = [];
    e.value.forEach(e => {
      selectList.push(e.noticeSid);
    })
    selectCallback(selectList)
  }

  roleCheckColumnRenderingEvent() {
    if (storage.get('loggedInfo')) {
      return (
        // 사용자 (기능별 스타일 적용에 필요한 section 추가)
        <Fragment>
          <section className="section-table-notice">
            <DataTable id="table" 
                      value={this.state.gridData} 
                      paginator={true} 
                      rows={10} 
                      rowsPerPageOptions={[5,10,15,20]} >
              <Column field="index" header="번호"/>
              <Column body={this.noticeTitleClickLabelTemplate} header="제목"/>
              <Column field="reportingDt" header="작성일자"/>
            </DataTable>
          </section>
        </Fragment>
      );
    } 
  }

  render() {
    return this.roleCheckColumnRenderingEvent();
  }
}
export default NoticeGrid;
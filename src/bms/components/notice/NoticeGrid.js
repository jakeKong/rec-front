import React, { Component, Fragment } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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

    const { role } = this.props;
    if (role !== 'ROLE_ADMIN' || role !== 'ROLE_SYSADMIN') {
      //  const { selectCallback, deselectCallback } = this.props;
      
      let dateFormat = require('dateformat');
      // 그리드 컬럼 인덱스를 위한 변수
      let i=1;
      let list =[];
      // noticeList.map(e => ({
      //   ...e, 
      //   noticeSid: e.get('noticeSid'),
      //   noticeTitle: e.get("noticeTitle"),
      //   noticeTxt: e.get("noticeTxt"),
      //   noticeWriter: e.get("noticeWriter"),
      //   date: new Date(e.get('reportingDt')).getTime() 
      // }))
      // .sort((prev, next) => prev.date > next.date ? 1 : -1)
      // // .sort((prev, next) => prev.date - next.date)
      // .forEach(v => {
      //   list.push({
      //     index: i++,
      //     noticeSid: v.noticeSid,
      //     noticeTitle: v.noticeTitle,
      //     noticeTxt: v.noticeTxt,
      //     noticeWriter: v.noticeWriter,
      //     reportingDt: dateFormat(v.date, 'yyyy년mm월dd일 HH:MM:ss')
      //   })
      // })

      noticeList.sort((prev, next) => new Date(prev.get('reportingDt')).getTime() > new Date(next.get('reportingDt')).getTime() ? 1 : -1)
      // .sort((prev, next) => prev.date - next.date)
      .forEach(e => {
        list.push({
          index: i++,
          noticeSid: e.get('noticeSid'),
          noticeTitle: e.get("noticeTitle"),
          noticeTxt: e.get("noticeTxt"),
          noticeWriter: e.get("noticeWriter"),
          reportingDt: dateFormat(new Date(e.get('reportingDt')), 'yyyy년mm월dd일 HH:MM:ss')
        })
      })
      this.setState({gridData: list.reverse()});
    }
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

  roleCheckColumnRenderingEvent(role) {
    if (role === 'ROLE_ADMIN' || role === 'ROLE_SYSADMIN') {
      return (
        // 관리자 (공통된 스타일로 사용)
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
            <Column body={this.noticeTitleClickLabelTemplate} header="제목"/>
            <Column field="reportingDt" header="작성일자"/>
          </DataTable>
        </Fragment>
      )
    } else {
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
    const { role } = this.props;
    return this.roleCheckColumnRenderingEvent(role);
  }
}
export default NoticeGrid;
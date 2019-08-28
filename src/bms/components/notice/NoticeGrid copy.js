import React, { Component, Fragment } from 'react';

import BaseTable, { Column, Alignment } from 'react-base-table'
//import 'react-base-table/styles.css'

class NoticeGrid extends Component {

  componentDidMount() {
    const { noticeList } = this.props;
    if (!noticeList || noticeList === undefined || noticeList.isEmpty()) {
      return
    }

    const { role } = this.props;
    if (role === 'ROLE_ADMIN' || role === 'ROLE_SYSADMIN') {
      let inverted = false;
      // let indeterminate = false;

      // 선택삭제 사용을 위한 그리트 체크박스
      const grdSelect = document.querySelector('#grdSelect');
      grdSelect.hidden = false;
      /*
      grdSelect.headerRenderer = function(cell) {
        var checkbox = cell.firstElementChild;
        if (!checkbox) {
          checkbox = window.document.createElement('vaadin-checkbox');
          checkbox.setAttribute('aria-label', 'Select All');
          checkbox.setAttribute('style', 'font-size: var(--lumo-font-size-m)');
          checkbox.addEventListener('change', function(e) {
            if (e.target.checked) {
              grid.selectedItems = grid.item;
            } else {
              grid.selectedItems = [];
            }
            inverted = !inverted;
            indeterminate = false;
            grid.render();
          });
          cell.appendChild(checkbox);
        }
        checkbox.checked = indeterminate || inverted;
        checkbox.indeterminate = indeterminate;
      };
      */
     const { selectCallback, deselectCallback } = this.props;
     // 그리드 컬럼 안의 체크박스 이벤트
      grdSelect.renderer = function(cell, column, rowData) {
        var checkbox = cell.firstElementChild;
        if (!checkbox) {
          checkbox = window.document.createElement('vaadin-checkbox');
          checkbox.setAttribute('aria-label', 'Select Row');
          checkbox.addEventListener('change', function(e) {
            if (e.target.checked === inverted) {
              grid.deselectItem(checkbox.__item);
              // 컨테이너로 선택취소된 공지사항 컬럼값 전달
              deselectCallback(checkbox.__item);
            } else {
              grid.selectItem(checkbox.__item);
              // 컨테이너로 선택된 공지사항 컬럼값 전달
              selectCallback(checkbox.__item);
            }
            // indeterminate = grid.selectedItems.length > 0;
            grid.render();
          });
          cell.appendChild(checkbox);
        }
        checkbox.__item = rowData.item;
        checkbox.checked = inverted !== rowData.selected;
      };
    }
    
    let dateFormat = require('dateformat');
    let list =[];
    // 그리드 컬럼 인덱스를 위한 변수
    let i=1;
    noticeList.forEach(e => {
      // push Value type is JSON
      list.push({
        index: i++,
        noticeSid: e.get("noticeSid"),
        noticeTitle: e.get("noticeTitle"),
        noticeTxt: e.get("noticeTxt"),
        // noticeWriter: e.get("noticeWriter"),
        reportingDt: dateFormat(new Date(e.get("reportingDt")), 'yyyy년mm월dd일 HH:MM:ss')
      })
    })
    
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = list.reverse();
    grid.pageSize = 15;

    grid.className = "agz-bbs";

    // grid.cellClassNameGenerator = function(column, rowData) {
    //   let classes = rowData.item.index;
    //   console.log(column.path);
    //   if (column.path === 'index') {
    //     classes += ' cell th w-10';
    //   }
    //   return classes;
    // };

    // console.log(grid);
    // const gridColumns = grid.querySelectorAll('vaadin-grid-column');
    // const gridCellContent = grid.querySelectorAll('vaadin-grid-cell');
    // gridColumns[1].header.className = 'cell th w-10'
    // console.log(gridCellContent)
    // console.log(gridCellContent[1])
    // gridColumns[1].headerRenderer = function(root, column, rowData) {
      // root.innerHTML = '번호'
      // root.className = "cell th w-10"
    // }
    // gridColumns[1].renderer = function(root, column, rowData) {
      // root.innerHTML = rowData.item.index;
    //   column.path = 'index';
    //   root.className = "cell tc w-10"
    // }

    // gridColumns[3].headerRenderer = function(root, column, rowData) {
    //   root.innerHTML = '작성일자'
    //   root.className = "cell th w-30"
    // }
    // gridColumns[3].renderer = function(root, column, rowData) {
    //   root.innerHTML = rowData.item.reportingDt;
    //   root.className = "cell tc w-30"
    // }

    // 더블클릭한 컬럼 정보를 전달하여 수정 이벤트 요청
    /*
    const { registerCallback } = this.props;
    grid.addEventListener('dblclick', function(e) {
      registerCallback(grid.getEventContext(e).item);
    });
    */

    // 제목 컬럼 선택시 상세정보조회 이벤트 요청
    const { detailCallback } = this.props;
    // document.querySelector('#grdNoticeTitle').headerRenderer = function(root, column, rowData) {
    //   root.innerHTML = '제목'
    //   root.className = "cell th w-60"
    // }
    document.querySelector('#grdNoticeTitle').renderer = function(root, column, rowData) {
      // column.path = "noticeTitle"
      // root.className = 'cell tc w-60'
      root.innerHTML = '';
      const title = document.createElement('label')
      title.textContent = rowData.item.noticeTitle;
      title.className = 'label-color-focus';

      title.addEventListener('click', function() {
        detailCallback(rowData.item);
      })
      root.appendChild(title);
    }

    const pagesControl = document.querySelector('#pages');
    let pages;
    updateItemsFromPage(1);
    
    // 그리드 페이징
    // pageController
    function updateItemsFromPage(page) {
      if (page === undefined) {
        return;
      }
  
      if (!pages) {
        pages = Array.apply(null, {length: Math.ceil(list.length / grid.pageSize)}).map(function(item, index) {
          return index + 1;
        });
        const prevBtn = window.document.createElement('vaadin-button');
        prevBtn.className = 'btn prev';
        prevBtn.textContent = '<';
        prevBtn.addEventListener('click', function() {
          const selectedPage = parseInt(pagesControl.querySelector('[selected]').textContent);
          updateItemsFromPage(selectedPage - 1);
        });
        pagesControl.appendChild(prevBtn);

        pages.forEach(function(pageNumber) {
          const pageBtn = window.document.createElement('vaadin-button');
          pageBtn.textContent = pageNumber;
          pageBtn.className = 'btn number';
          pageBtn.addEventListener('click', function(e) {
            updateItemsFromPage(parseInt(e.target.textContent));
          });
          if (pageNumber === page) {
            pageBtn.setAttribute('selected', true);
          }
          pagesControl.appendChild(pageBtn);
        });

        const nextBtn = window.document.createElement('vaadin-button');
        nextBtn.textContent = '>';
        nextBtn.className = 'btn next';
        nextBtn.addEventListener('click', function() {
          const selectedPage = parseInt(pagesControl.querySelector('[selected]').textContent);
          updateItemsFromPage(selectedPage + 1);
        });
        pagesControl.appendChild(nextBtn);
      }
      const buttons = Array.from(pagesControl.children);
      buttons.forEach(function(btn, index) {
        if (parseInt(btn.textContent) === page) {
          btn.setAttribute('selected', true);
        } else {
          btn.removeAttribute('selected');
        }
        if (index === 0) {
          if (page === 1) {
            btn.setAttribute('disabled', '');
          } else {
            btn.removeAttribute('disabled');
          }
        }
        if (index === buttons.length - 1) {
          if (page === pages.length) {
            btn.setAttribute('disabled', '');
          } else {
            btn.removeAttribute('disabled');
          }
        }
      });

      var start = (page - 1) * grid.pageSize;
      var end = page * grid.pageSize;
      grid.items = list.slice(start, end);

    }
  }

  render() {
    return (
      <Fragment>
        <AutoResizer>
          {({ width, height }) => (
            <BaseTable width={width} height={height} data={data}>
              <Column key="grdSelect" dataKey="col0" title="" align={Alignment.CENTER} hidden="true" width={100} />
              <Column key="col1" dataKey="col0"  title="" width={100} />
              <Column key="grdNoticeTitle" dataKey="col0" title="" width={100} />
              <Column key="reportingDt" dataKey="col0" title="" width={100} />
            </BaseTable>
          )}
        </AutoResizer>
    </Fragment>
      // <Fragment>
      //   <div>
      //     <vaadin-grid theme="no-border" height-by-rows multi-sort>
      //       <vaadin-grid-column auto-select hidden id="grdSelect" flex-grow="0.1" width="50px" />
      //       <vaadin-grid-column path="index" header="번호" text-align="center" flex-grow="0.2" width="50px"/>
      //       <vaadin-grid-column id="grdNoticeTitle" header="제목" text-align="center" flex-grow="6.2" />
      //       {/* <vaadin-grid-column path="noticeWriter" header="작성자" text-align="center" flex-grow="1" /> */}
      //       <vaadin-grid-column path="reportingDt" header="작성일자" text-align="center" flex-grow="2.5" />
      //     </vaadin-grid>
      //     <div id="pages" className="pagination"/>
      //   </div>
      // </Fragment>
    );
  }
}
export default NoticeGrid;
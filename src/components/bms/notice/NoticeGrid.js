import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';

class NoticeGrid extends Component {

  componentDidMount() {
    const { noticeList } = this.props;
    if (!noticeList || noticeList === undefined || noticeList.isEmpty()) {
      return
    }

    const { role } = this.props;
    if (role === 'ROLE_ADMIN') {

    }
    
    let dateFormat = require('dateformat');
    let list =[];
    // odrDt  dateType format 필요
    noticeList.forEach(e => {
      // push Value type is JSON
      list.push({
        noticeSid: e.get("noticeSid"),
        noticeTitle: e.get("noticeTitle"),
        noticeTxt: e.get("noticeTxt"),
        noticeWriter: e.get("noticeWriter"),
        reportingDt: dateFormat(new Date(e.get("reportingDt")), 'yyyy년mm월dd일 HH:MM:ss')
      })
    })
    
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = list;
    grid.pageSize = '15';

    // number set
    document.querySelector('#grdIndex').renderer = function(root, column, rowData) {
      root.textContent = rowData.index;
    }

    const { detailCallback } = this.props;
    document.querySelector('#grdNoticeTitle').renderer = function(root, column, rowData) {
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
        prevBtn.textContent = '<';
        prevBtn.addEventListener('click', function() {
          const selectedPage = parseInt(pagesControl.querySelector('[selected]').textContent);
          updateItemsFromPage(selectedPage - 1);
        });
        pagesControl.appendChild(prevBtn);

        pages.forEach(function(pageNumber) {
          const pageBtn = window.document.createElement('vaadin-button');
          pageBtn.textContent = pageNumber;
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
        <vaadin-grid theme="column-borders" height-by-rows column-reordering-allowed>
          <vaadin-grid-selection-column auto-select />
          <vaadin-grid-sort-column id="grdIndex" header="번호" text-align="end" flex-grow="0.2" />
          <vaadin-grid-column id="grdNoticeTitle" header="제목" text-align="center" flex-grow="6.3" />
          <vaadin-grid-column path="noticeWriter" header="작성자" text-align="center" flex-grow="1" />
          <vaadin-grid-column path="reportingDt" header="작성일자" text-align="center" flex-grow="2.5" />
        </vaadin-grid>
        <div id="pages" />
      </Fragment>
    );
  }
}
export default NoticeGrid;
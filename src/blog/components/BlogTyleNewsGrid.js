import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button';

class BlogTyleNewsGrid extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  componentDidMount() {
    const { blogTyleNewsList, blogDtoCallback } = this.props;
    if (!blogTyleNewsList || blogTyleNewsList === null || blogTyleNewsList === undefined) {
      return;
    }

    let inverted = false;
    // 선택삭제 사용을 위한 그리트 체크박스
    const grdSelect = document.querySelector('#grdSelect');
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
    

    let dateFormat = require('dateformat');
    let list = [];
    let i=1;
    blogTyleNewsList.reverse().forEach(e => {
      list.push({
        index: i++,
        sid: e.get('tylenewsSid'),
        img: e.get('tylenewsImg'),
        link: e.get('tylenewsLink'),
        title: e.get('tylenewsTitle'),
        subTitle: e.get('tylenewsSubtitle'),
        writer: e.get('tylenewsWriter'),
        writeDt: dateFormat(new Date(e.get("tylenewsWriteDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        visibility: e.get('tylenewsVisibility')
      });
    });
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = list;

    grid.addEventListener('dblclick', function(event) {
      blogDtoCallback(grid.getEventContext(event).item)
    });

    const {updateVisibilityCallback} = this.props;
    const grdVisibility = document.querySelector('#grdVisibility');
    grdVisibility.renderer = function(root, column, rowData) {
      root.innerHTML = '';
      const radioGroup = document.createElement('vaadin-radio-group');
      const ribtnTrue = document.createElement('vaadin-radio-button');
      ribtnTrue.innerHTML = "&nbsp&nbsp";
      if (rowData.item.visibility === true) {
        ribtnTrue.checked = true;
      }
      ribtnTrue.addEventListener('click', function(e) {
        if (rowData.item.visibility === true) {
          return;
        } else {
          // event call
          updateVisibilityCallback(rowData.item.sid, true);
          // ex) updateVisibilityCallback(rowData.item, true);
        }
      })
      const ribtnFalse = document.createElement('vaadin-radio-button');
      if (rowData.item.visibility === false) {
        ribtnFalse.checked = true;
      }
      ribtnFalse.addEventListener('click', function(e) {
        if (rowData.item.visibility === false) {
          return;
        } else {
          // event call
          updateVisibilityCallback(rowData.item.sid, false);
          // ex) updateVisibilityCallback(rowData.item, false);
        }
      })
      radioGroup.appendChild(ribtnTrue)
      radioGroup.appendChild(ribtnFalse)
      root.appendChild(radioGroup)
    }

    // const visibilityFalse = document.querySelector('#visibilityFalse');
    // visibilityFalse.renderer = function(root, column, rowData) {
    //   root.innerHTML = '';
    //   const ribtn = document.createElement('vaadin-radio-button');
    //   if (rowData.item.visibility === false) {
    //     ribtn.checked = false;
    //   }
    //   root.appendChild(ribtn)
    // }

    // console.log(visibilityFalse.querySelector('vaadin-grid-cell-content'));
    // console.log(visibilityFalse.path);
  }

  render() {
    return (
      <Fragment>
        <div className="div-home-grid">
          <vaadin-grid theme="row-stripes" height-by-rows column-reordering-allowed>
            <vaadin-grid-column auto-select id="grdSelect" flex-grow="0.1" width="50px" />
            <vaadin-grid-sort-column path="index" header="번호" text-align="center" flex-grow="0.1" width="80px"/>
            <vaadin-grid-column path="title" header="제목" text-align="center" flex-grow="4.9" width="400px"/>
            <vaadin-grid-column path="subTitle" header="분류" text-align="center" flex-grow="1" width="100px"/>
            <vaadin-grid-column path="writer" header="작성자" text-align="center" flex-grow="1" width="80px"/>
            <vaadin-grid-column path="writeDt" header="작성일자" text-align="center" flex-grow="3" width="250px"/>
            <vaadin-grid-column path="visibility" id="grdVisibility" header="공개/비공개" text-align="center" flex-grow="1" width="100px"/>
          </vaadin-grid>
        </div>
      </Fragment>
    );
  }
}
export default BlogTyleNewsGrid;
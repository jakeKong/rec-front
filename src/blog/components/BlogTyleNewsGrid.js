import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';

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
    let dateFormat = require('dateformat');
    let list = [];
    let i=1;
    blogTyleNewsList.forEach(e => {
      list.push({
        index: i++,
        sid: e.get('sid'),
        img: e.get('img'),
        link: e.get('link'),
        title: e.get('title'),
        subTitle: e.get('subTitle'),
        writer: e.get('writer'),
        writeDt: dateFormat(new Date(e.get("writeDt")), 'yyyy년mm월dd일 HH:MM:ss'),
        visibility: e.get('visibility')
      });
    });
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = list;

    grid.addEventListener('dblclick', function(event) {
      blogDtoCallback(grid.getEventContext(event).item)
    });

  }

  render() {
    return (
      <Fragment>
        <div className="div-home-grid">
          <vaadin-grid theme="row-stripes" height-by-rows column-reordering-allowed>
            <vaadin-grid-sort-column path="index" header="번호" text-align="end" flex-grow="0.1" />
            <vaadin-grid-column path="title" header="제목" text-align="center" flex-grow="4.9" />
            <vaadin-grid-column path="subTitle" header="분류" text-align="center" flex-grow="1" />
            <vaadin-grid-column path="writer" header="작성자" text-align="center" flex-grow="1" />
            <vaadin-grid-column path="writeDt" header="작성일자" text-align="center" flex-grow="3" />
            {/* <vaadin-grid-column path="visibility" header="공개" text-align="center" flex-grow="1" />
            <vaadin-grid-column path="visibility" header="비공개" text-align="center" flex-grow="1" /> */}
          </vaadin-grid>
        </div>
      </Fragment>
    );
  }
}
export default BlogTyleNewsGrid;
import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import { comma } from '../../utils';

class MainGrid extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  componentDidMount() {
    const { homeList } = this.props;
    if (!homeList || homeList === undefined || homeList === null) {
      return
    }
  
    let list = [];
    homeList.area.forEach(e => {
      list.push({
        areaNm: e.areaNm,
        realPriceCnt: comma(e.realPriceCnt)+'건',
        buildingCnt: comma(e.buildingCnt)+'건',
        landCnt: comma(e.landCnt)+'건',
        buildingCancleCnt: comma(e.buildingCancleCnt)+'건'
      });
    });
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = list;

  }

  render() {
    return (
      <Fragment>
        <div className="div-home-grid">
          <vaadin-grid theme="row-stripes" height-by-rows column-reordering-allowed>
            <vaadin-grid-column path="areaNm" header="지역" text-align="center" flex-grow="1" />
            <vaadin-grid-column path="realPriceCnt" header="실거래가" text-align="center" flex-grow="1" />
            <vaadin-grid-column path="buildingCnt" header="건축물대장" text-align="center" flex-grow="1" />
            <vaadin-grid-column path="landCnt" header="토지대장" text-align="center" flex-grow="1" />
            <vaadin-grid-column path="buildingCancleCnt" header="말소대장" text-align="center" flex-grow="1" />
          </vaadin-grid>
        </div>
      </Fragment>
    );
  }
}
export default MainGrid;
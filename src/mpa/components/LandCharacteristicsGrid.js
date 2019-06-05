import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';

class LandCharacteristicsGrid extends Component {
  constructor(props) {
    super(props);
    this.state ={
      noCloseOnOutsideClick: {
        type: Boolean,
        value: false
      },
      noCloseOnEsc: {
        type: Boolean,
        value: false
      },
    }
  }

  /**
   * Close the dialog if `noCloseOnOutsideClick` isn't set to true
   */
  _handleOutsideClick(e) {
    if (this.state.noCloseOnOutsideClick) {
      e.preventDefault();
    }
  }

  /**
   * Close the dialog if `noCloseOnEsc` isn't set to true
   */
  _handleEscPress(e) {
    if (this.state.noCloseOnEsc) {
      e.preventDefault();
    }
  }

  componentDidMount() {
    const { dto } = this.state;
    const { landCharacteristicsList } = this.props;
    if (!landCharacteristicsList || landCharacteristicsList === undefined || landCharacteristicsList.isEmpty()) {
      return
    }
    
    let list =[];
    landCharacteristicsList.forEach(e => {
      // push Value type is JSON
      list.push({
        pnu: e.get("pnu"), //고유번호
        ldCode: e.get("ldCode"), //법정동코드
        ldCodeNm: e.get("ldCodeNm"), //법정동명
        regstrSeCode: e.get("regstrSeCode"), //대장구분코드
        regstrSeCodeNm: e.get("regstrSeCodeNm"), //대장구분명
        mnnmSlno: e.get("mnnmSlno"), //지번
        ladSn: e.get("ladSn"), //토지일련번호
        stdrYear: e.get("stdrYear"), //기준년도
        stdrMt: e.get("stdrMt"), //기준월
        lndcgrCode: e.get("lndcgrCode"), //지목코드
        lndcgrCodeNm: e.get("lndcgrCodeNm"), //지목명
        lndpclAr: e.get("lndpclAr"), //토지면적(㎡)
        prposArea1: e.get("prposArea1"), //용도지역코드1
        prposArea1Nm: e.get("prposArea1Nm"), //용도지역명1
        prposArea2: e.get("prposArea2"), //용도지역코드2
        prposArea2Nm: e.get("prposArea2Nm"), //용도지역명2
        ladUseSittn: e.get("ladUseSittn"), //토지이용상황코드
        ladUseSittnNm: e.get("ladUseSittnNm"), //토지이동상황
        tpgrphHgCode: e.get("tpgrphHgCode"), //지형높이코드
        tpgrphHgCodeNm: e.get("tpgrphHgCodeNm"), //지형높이(m)
        tpgrphFrmCode: e.get("tpgrphFrmCode"), //지형형상코드
        tpgrphFrmCodeNm: e.get("tpgrphFrmCodeNm"), //지형형상
        roadSideCode: e.get("roadSideCode"), //도로접면코드
        roadSideCodeNm: e.get("roadSideCodeNm"), //도로접면
        pblntfPclnd: e.get("pblntfPclnd"), //공시지가(원/㎡)
        lastUpdtDt: e.get("lastUpdtDt"), //데이터기준일자


      })
    })
    
    // Grid Items Setting
    const grid = document.querySelector('vaadin-grid');
    grid.items = list;

    grid.addEventListener('active-item-changed', function(event) {
      const item = event.detail.value;
      grid.selectedItems = item ? [item] : [];
    });
    
    grid.addEventListener('dblclick', function(event) {
      dto.sigunguCd = grid.getEventContext(event).item.sigunguCd;
      dto.bjdongCd = grid.getEventContext(event).item.bjdongCd;
      dto.platGbCd = grid.getEventContext(event).item.platGbCd;
      dto.bun = grid.getEventContext(event).item.bun;
      dto.ji = grid.getEventContext(event).item.ji;
      dto.numOfRows = grid.getEventContext(event).item.numOfRows;
    });
  }

  render() {
      return (
        <Fragment>
          <vaadin-grid theme="column-borders row-stripes" height-by-rows column-reordering-allowed>
            <vaadin-grid-column path="pnu" header="고유번호" text-align="center" />
            <vaadin-grid-column path="ldCode" header="법정동코드" text-align="center" />
            <vaadin-grid-sort-column path="ldCodeNm" header="법정동명" text-align="center" />
            <vaadin-grid-column path="regstrSeCode" header="대장구분코드" text-align="center" />
            <vaadin-grid-column path="regstrSeCodeNm" header="대장구분명" text-align="center" />
            <vaadin-grid-sort-column path="mnnmSlno" header="지번" text-align="center" />
            <vaadin-grid-column path="ladSn" header="토지일련번호" text-align="center" />
            <vaadin-grid-column path="stdrYear" header="기준년도" text-align="center" />
            <vaadin-grid-column path="stdrMt" header="기준월" text-align="center" />
            <vaadin-grid-column path="lndcgrCode" header="지목코드" text-align="center" />
            <vaadin-grid-column path="lndcgrCodeNm" header="지목명" text-align="center" />
            <vaadin-grid-column path="lndpclAr" header="토지면적(㎡)" text-align="center" />
            <vaadin-grid-column path="prposArea1" header="용도지역코드1" text-align="center" />
            <vaadin-grid-column path="prposArea1Nm" header="용도지역명1" text-align="center" />
            <vaadin-grid-column path="prposArea2" header="용도지역코드2" text-align="center" />
            <vaadin-grid-column path="prposArea2Nm" header="용도지역명2" text-align="center" />
            <vaadin-grid-column path="ladUseSittn" header="토지이용상황코드" text-align="center" />
            <vaadin-grid-column path="ladUseSittnNm" header="토지이동상황" text-align="center" />
            <vaadin-grid-column path="tpgrphHgCode" header="지형높이코드" text-align="center" />
            <vaadin-grid-column path="tpgrphHgCodeNm" header="지형높이(m)" text-align="center" />
            <vaadin-grid-column path="tpgrphFrmCode" header="지형형상코드" text-align="center" />
            <vaadin-grid-column path="tpgrphFrmCodeNm" header="지형형상" text-align="center" />
            <vaadin-grid-column path="roadSideCode" header="도로접면코드" text-align="center" />
            <vaadin-grid-column path="roadSideCodeNm" header="도로접면" text-align="center" />
            <vaadin-grid-column path="pblntfPclnd" header="공시지가(원/㎡)" text-align="center" />
            <vaadin-grid-column path="lastUpdtDt" header="데이터기준일자" text-align="center" />
          </vaadin-grid>
        </Fragment>
      );
  }
}
export default LandCharacteristicsGrid;
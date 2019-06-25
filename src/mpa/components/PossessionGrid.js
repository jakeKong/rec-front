import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';

class PossessionGrid extends Component {
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
    const { PossessionList } = this.props;
    if (!PossessionList || PossessionList === undefined || PossessionList.isEmpty()) {
      return
    }
    
    let list =[];
    PossessionList.forEach(e => {
      // push Value type is JSON
      list.push({
        pnu: e.get("pnu"), //고유번호
        ldCode: e.get("ldCode"), //법정동코드
        ldCodeNm: e.get("ldCodeNm"), //법정동명
        regstrSeCode: e.get("regstrSeCode"), //대장구분코드
        regstrSeCodeNm: e.get("regstrSeCodeNm"), //대장구분명
        mnnmSlno: e.get("mnnmSlno"), //지번
        agbldgSn: e.get("agbldgSn"), //집합건물일련번호
        buldDongNm: e.get("buldDongNm"), //건물동명
        buldFloorNm: e.get("buldFloorNm"), //건물층명
        buldHoNm: e.get("buldHoNm"), //건물호명
        buldRoomNm: e.get("buldRoomNm"), //건물실명
        cnrsPsnSn: e.get("cnrsPsnSn"), //공유인일련번호
        stdrYm: e.get("stdrYm"), //기준연월
        lndcgrCode: e.get("lndcgrCode"), //지목코드
        lndcgrCodeNm: e.get("lndcgrCodeNm"), //지목
        lndpclAr: e.get("lndpclAr"), //토지면적(㎡)
        pblntfPclnd: e.get("pblntfPclnd"), //공시지가(원/㎡)
        posesnSeCode: e.get("posesnSeCode"), //소유구분코드
        posesnSeCodeNm: e.get("posesnSeCodeNm"), //소유구분
        resdncSeCode: e.get("resdncSeCode"), //거주지구분코드
        resdncSeCodeNm: e.get("resdncSeCodeNm"), //거주지구분
        nationInsttSeCode: e.get("nationInsttSeCode"), //국가기관구분코드
        nationInsttSeCodeNm: e.get("nationInsttSeCodeNm"), //국가기관구분
        ownshipChgCauseCode: e.get("ownshipChgCauseCode"), //소유권변동원인코드
        ownshipChgCauseCodeNm: e.get("ownshipChgCauseCodeNm"), //소유권변동원인
        ownshipChgDe: e.get("ownshipChgDe"), //소유권변동일자
        cnrsPsnCo: e.get("cnrsPsnCo"), //공유인수
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
            <vaadin-grid-column path="agbldgSn" header="집합건물일련번호" text-align="center" />
            <vaadin-grid-column path="buldDongNm" header="건물동명" text-align="center" />
            <vaadin-grid-column path="buldFloorNm" header="건물층명" text-align="center" />
            <vaadin-grid-column path="buldHoNm" header="건물호명" text-align="center" />
            <vaadin-grid-column path="buldRoomNm" header="건물실명" text-align="center" />
            <vaadin-grid-column path="cnrsPsnSn" header="공유인일련번호" text-align="center" />
            <vaadin-grid-column path="stdrYm" header="기준연월" text-align="center" />
            <vaadin-grid-column path="lndcgrCode" header="지목코드" text-align="center" />
            <vaadin-grid-sort-column path="lndcgrCodeNm" header="지목" text-align="center" />
            <vaadin-grid-column path="lndpclAr" header="토지면적(㎡)" text-align="center" />
            <vaadin-grid-column path="pblntfPclnd" header="공시지가(원/㎡)" text-align="center" />
            <vaadin-grid-column path="posesnSeCode" header="소유구분코드" text-align="center" />
            <vaadin-grid-column path="posesnSeCodeNm" header="소유구분" text-align="center" />
            <vaadin-grid-column path="resdncSeCode" header="거주지구분코드" text-align="center" />
            <vaadin-grid-column path="resdncSeCodeNm" header="거주지구분" text-align="center" />
            <vaadin-grid-column path="nationInsttSeCode" header="국가기관구분코드" text-align="center" />
            <vaadin-grid-column path="nationInsttSeCodeNm" header="국가기관구분" text-align="center" />
            <vaadin-grid-column path="ownshipChgCauseCode" header="소유권변동원인코드" text-align="center" />
            <vaadin-grid-column path="ownshipChgCauseCodeNm" header="소유권변동원인" text-align="center" />
            <vaadin-grid-column path="ownshipChgDe" header="소유권변동일자" text-align="center" />
            <vaadin-grid-column path="cnrsPsnCo" header="공유인수" text-align="center" />
            <vaadin-grid-column path="lastUpdtDt" header="데이터기준일자" text-align="center" />
          </vaadin-grid>
        </Fragment>
      );
  }
}
export default PossessionGrid;
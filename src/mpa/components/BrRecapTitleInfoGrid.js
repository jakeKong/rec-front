import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';

class BrRecapTitleInfoGrid extends Component {
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
    const { brRecapTitleInfoList } = this.props;
    if (!brRecapTitleInfoList || brRecapTitleInfoList === undefined || brRecapTitleInfoList.isEmpty()) {
      return
    }
    
    let list =[];
    brRecapTitleInfoList.forEach(e => {
      // push Value type is JSON
      list.push({
        //순번	
        rnum: e.get("rnum"),
        //지능형건축물등급
        itgBldGrade: e.get("itgBldGrade"),   
        //지능형건축물인증점수     
        itgBldCert: e.get("itgBldCert"),
        //생성일자
        crtnDay: e.get("crtnDay"),
        //새주소법정동코드
        naBjdongCd: e.get("naBjdongCd"),
        //새주소지상지하코드
        naUgrndCd: e.get("naUgrndCd"),
        //새주소본번
        naMainBun: e.get("naMainBun"),
        //새주소부번
        naSubBun: e.get("naSubBun"),
        //대지면적(㎡)
        platArea: e.get("platArea"),
        //건축면적(㎡)
        archArea: e.get("archArea"),
        //건폐율(%)	
        bcRat: e.get("bcRat"),
        //연면적(㎡)	
        totArea: e.get("totArea"),
        //용적률산정연면적(㎡)	
        vlRatEstmTotArea: e.get("vlRatEstmTotArea"),
        //용적률(%)	
        vlRat: e.get("vlRat"),
        //주용도코드	
        mainPurpsCd: e.get("mainPurpsCd"),
        //주용도코드명	
        mainPurpsCdNm: e.get("mainPurpsCdNm"),
        //기타용도	
        etcPurps: e.get("etcPurps"),
        //세대수(세대)	
        hhldCnt: e.get("hhldCnt"),
        //가구수(가구)	
        fmlyCnt: e.get("fmlyCnt"),
        //주건축물수	
        mainBldCnt: e.get("mainBldCnt"),
        //부속건축물수	
        atchBldCnt: e.get("atchBldCnt"),
        //부속건축물면적(㎡)	
        atchBldArea: e.get("atchBldArea"),
        //총주차수	
        totPkngCnt: e.get("totPkngCnt"),
        //옥내기계식대수(대)	
        indrMechUtcnt: e.get("indrMechUtcnt"),
        //옥내기계식면적(㎡)	
        indrMechArea: e.get("indrMechArea"),
        //옥외기계식대수(대)	
        oudrMechUtcnt: e.get("oudrMechUtcnt"),
        //옥외기계식면적(㎡)	
        oudrMechArea: e.get("oudrMechArea"),
        //옥내자주식대수(대)	
        indrAutoUtcnt: e.get("indrAutoUtcnt"),
        //옥내자주식면적(㎡)	
        indrAutoArea: e.get("indrAutoArea"),
        //옥외자주식대수(대)	
        oudrAutoUtcnt: e.get("oudrAutoUtcnt"),
        //옥외자주식면적(㎡)	
        oudrAutoArea: e.get("oudrAutoArea"),
        //허가일	
        pmsDay: e.get("pmsDay"),
        //착공일	
        stcnsDay: e.get("stcnsDay"),
        //사용승인일	
        useAprDay: e.get("useAprDay"),
        //허가번호년	
        pmsnoYear: e.get("pmsnoYear"),
        //허가번호기관코드	
        pmsnoKikCd: e.get("pmsnoKikCd"),
        //허가번호기관코드명	
        pmsnoKikCdNm: e.get("pmsnoKikCdNm"),
        //허가번호구분코드	
        pmsnoGbCd: e.get("pmsnoGbCd"),
        //허가번호구분코드명	
        pmsnoGbCdNm: e.get("pmsnoGbCdNm"),
        //호수(호)	
        hoCnt: e.get("hoCnt"),
        //에너지효율등급	
        engrGrade: e.get("engrGrade"),
        //에너지절감율	
        engrRat: e.get("engrRat"),
        //EPI점수	
        engrEpi: e.get("engrEpi"),
        //친환경건축물등급	
        gnBldGrade: e.get("gnBldGrade"),
        //친환경건축물인증점수	
        gnBldCert: e.get("gnBldCert"),
        //	무슨데이터 배열?
        //Items: e.get(""),
        //대지위치	
        platPlc: e.get("platPlc"),
        //시군구코드	
        sigunguCd: e.get("sigunguCd"),
        //법정동코드	
        bjdongCd: e.get("bjdongCd"),
        //대지구분코드	
        platGbCd: e.get("platGbCd"),
        //번	
        bun: e.get("bun"),
        //지	
        ji: e.get("ji"),
        //관리건축물대장PK	
        mgmBldrgstPk: e.get("mgmBldrgstPk"),
        //대장구분코드	
        regstrGbCd: e.get("regstrGbCd"),
        //대장구분코드명	
        regstrGbCdNm: e.get("regstrGbCdNm"),
        //대장종류코드	
        regstrKindCd: e.get("regstrKindCd"),
        //대장종류코드명	
        regstrKindCdNm: e.get("regstrKindCdNm"),
        //신구대장구분코드	
        newOldRegstrGbCd: e.get("newOldRegstrGbCd"),
        //신구대장구분코드명	
        newOldRegstrGbCdNm: e.get("newOldRegstrGbCdNm"),
        //도로명대지위치	
        newPlatPlc: e.get("newPlatPlc"),
        //건물명	
        bldNm: e.get("bldNm"),
        //특수지명	
        splotNm: e.get("splotNm"),
        //블록	
        block: e.get("block"),
        //로트	
        lot: e.get("lot"),
        //외필지수	
        bylotCnt: e.get("bylotCnt"),
        //새주소도로코드	
        naRoadCd: e.get("naRoadCd"),

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
            <vaadin-grid-column path="rnum" header="순번" text-align="center" />
            <vaadin-grid-column path="itgBldGrade" header="지능형건축물등급" text-align="center" />
            <vaadin-grid-column path="itgBldCert" header="지능형건축물인증점수" text-align="center" />
            <vaadin-grid-sort-column path="crtnDay" header="생성일자" text-align="center" />
            <vaadin-grid-column path="naBjdongCd" header="새주소법정동코드" text-align="center" />
            <vaadin-grid-column path="naUgrndCd" header="새주소지상지하코드" text-align="center" />
            <vaadin-grid-column path="naMainBun" header="새주소본번" text-align="center" />
            <vaadin-grid-column path="naSubBun" header="새주소부번" text-align="center" />
            <vaadin-grid-column path="platArea" header="대지면적(㎡)" text-align="center" />
            <vaadin-grid-column path="archArea" header="건축면적(㎡)" text-align="center" />
            <vaadin-grid-column path="bcRat" header="건폐율(%)" text-align="center" />
            <vaadin-grid-column path="totArea" header="연면적(㎡)" text-align="center" />
            <vaadin-grid-column path="vlRatEstmTotArea" header="용적률산정연면적(㎡)" text-align="center" />
            <vaadin-grid-column path="vlRat" header="용적률(%)" text-align="center" />
            <vaadin-grid-sort-column path="mainPurpsCd" header="주용도코드" text-align="center" />
            <vaadin-grid-sort-column path="mainPurpsCdNm" header="주용도코드명" text-align="center" />
            <vaadin-grid-column path="etcPurps" header="기타용도" text-align="center" />
            <vaadin-grid-column path="hhldCnt" header="세대수(세대)" text-align="center" />
            <vaadin-grid-column path="fmlyCnt" header="가구수(가구)" text-align="center" />
            <vaadin-grid-column path="mainBldCnt" header="주건축물수" text-align="center" />
            <vaadin-grid-column path="atchBldCnt" header="부속건축물수" text-align="center" />
            <vaadin-grid-column path="atchBldArea" header="부속건축물면적(㎡)" text-align="center" />
            <vaadin-grid-column path="totPkngCnt" header="총주차수" text-align="center" />
            <vaadin-grid-column path="indrMechUtcnt" header="옥내기계식대수(대)" text-align="center" />
            <vaadin-grid-column path="indrMechArea" header="옥내기계식면적(㎡)" text-align="center" />
            <vaadin-grid-column path="oudrMechUtcnt" header="옥외기계식대수(대)" text-align="center" />
            <vaadin-grid-column path="oudrMechArea" header="옥외기계식면적(㎡)" text-align="center" />
            <vaadin-grid-column path="indrAutoUtcnt" header="옥내자주식대수(대)" text-align="center" />
            <vaadin-grid-column path="indrAutoArea" header="옥내자주식면적(㎡)" text-align="center" />
            <vaadin-grid-column path="oudrAutoUtcnt" header="옥외자주식대수(대)" text-align="center" />
            <vaadin-grid-column path="oudrAutoArea" header="옥외자주식면적(㎡)" text-align="center" />
            <vaadin-grid-column path="pmsDay" header="허가일" text-align="center" />
            <vaadin-grid-column path="stcnsDay" header="착공일" text-align="center" />
            <vaadin-grid-column path="useAprDay" header="사용승인일" text-align="center" />
            <vaadin-grid-column path="pmsnoYear" header="허가번호년" text-align="center" />
            <vaadin-grid-column path="pmsnoKikCd" header="허가번호기관코드" text-align="center" />
            <vaadin-grid-column path="pmsnoKikCdNm" header="허가번호기관코드명" text-align="center" />
            <vaadin-grid-column path="pmsnoGbCd" header="허가번호구분코드" text-align="center" />
            <vaadin-grid-column path="pmsnoGbCdNm" header="허가번호구분코드명" text-align="center" />
            <vaadin-grid-column path="hoCnt" header="호수(호)" text-align="center" />
            <vaadin-grid-column path="engrGrade" header="에너지효율등급" text-align="center" />
            <vaadin-grid-column path="engrRat" header="에너지절감율" text-align="center" />
            <vaadin-grid-column path="engrEpi" header="EPI점수" text-align="center" />
            <vaadin-grid-column path="gnBldGrade" header="친환경건축물등급" text-align="center" />
            <vaadin-grid-column path="gnBldCert" header="친환경건축물인증점수" text-align="center" />
            <vaadin-grid-column path="Items" header="" text-align="center" />
            <vaadin-grid-column path="platPlc" header="대지위치" text-align="center" />
            <vaadin-grid-sort-column path="sigunguCd" header="시군구코드" text-align="center" />
            <vaadin-grid-sort-column path="bjdongCd" header="법정동코드" text-align="center" />
            <vaadin-grid-sort-column path="platGbCd" header="대지구분코드" text-align="center" />
            <vaadin-grid-column path="bun" header="번" text-align="center" />
            <vaadin-grid-column path="ji" header="지" text-align="center" />
            <vaadin-grid-column path="mgmBldrgstPk" header="관리건축물대장PK" text-align="center" />
            <vaadin-grid-column path="regstrGbCd" header="대장구분코드" text-align="center" />
            <vaadin-grid-column path="regstrGbCdNm" header="대장구분코드명" text-align="center" />
            <vaadin-grid-column path="regstrKindCd" header="대장종류코드" text-align="center" />
            <vaadin-grid-column path="regstrKindCdNm" header="대장종류코드명" text-align="center" />
            <vaadin-grid-column path="newOldRegstrGbCd" header="신구대장구분코드" text-align="center" />
            <vaadin-grid-column path="newOldRegstrGbCdNm" header="신구대장구분코드명" text-align="center" />
            <vaadin-grid-column path="newPlatPlc" header="도로명대지위치" text-align="center" />
            <vaadin-grid-column path="bldNm" header="건물명" text-align="center" />
            <vaadin-grid-column path="splotNm" header="특수지명" text-align="center" />
            <vaadin-grid-sort-column path="block" header="블록" text-align="center" />
            <vaadin-grid-column path="lot" header="로트" text-align="center" />
            <vaadin-grid-column path="bylotCnt" header="외필지수" text-align="center" />
            <vaadin-grid-sort-column path="naRoadCd" header="새주소도로코드" text-align="center" />
          </vaadin-grid>
        </Fragment>
      );
  }
}
export default BrRecapTitleInfoGrid;
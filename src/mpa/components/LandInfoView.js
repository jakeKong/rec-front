import React, { Component } from 'react';
//import NumberFormat from 'react-number-format';

const curruncyFormat = (value) => new Intl.NumberFormat('ko-KR', {style: 'currency',currency: 'KRW'}).format(value);
// const commaFormat = (value) => new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3}).format(value);
class LandInfoView extends Component {
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
  componentDidMount() {
    const { landInfoData, isSearched, analysisReturnedCallback } = this.props;
    
    if (!landInfoData || landInfoData === undefined) {
      return
    }
    else {
      // window.setTimeout(function() {
        //주문번호를 container에 알려주기
        analysisReturnedCallback(landInfoData.get("mngNo"));          
      // }, 3000);
    }

    //Choi
    const reportSHtarget = landInfoData.get("reportSH").get("result").get("target");
    const reportSHappraisal = landInfoData.get("reportSH").get("result").get("appraisal");

    document.querySelector('#tdJibunAddr').innerHTML = reportSHtarget.get("building").get("platPlc");
    document.querySelector('#tdRoadAddr').innerHTML = reportSHtarget.get("building").get("newPlatPlc");
    //건축물표제부
    // eslint-disable-next-line no-lone-blocks
    {
      document.querySelector('#tdBldNm').innerHTML = reportSHtarget.get("building").get("bldNm");//건물명
      document.querySelector('#tdMainPurpsCdNm').innerHTML = reportSHtarget.get("building").get("mainPurpsCdNm");//주용도코드명
      document.querySelector('#tdEtcPurps').innerHTML = reportSHtarget.get("building").get("etcPurps");//기타용도
      document.querySelector('#tdStrctCdNm').innerHTML = reportSHtarget.get("building").get("strctCdNm");//구조코드명
      document.querySelector('#tdArchArea').innerHTML = reportSHtarget.get("building").get("archArea");//건축면적(㎡)
      document.querySelector('#tdHeit').innerHTML = reportSHtarget.get("building").get("heit");//높이(m)
      document.querySelector('#tdTotArea').innerHTML = reportSHtarget.get("building").get("totArea");//연면적(㎡)
      document.querySelector('#tdHoCnt').innerHTML = reportSHtarget.get("building").get("hoCnt");//호수
      document.querySelector('#tdHhldCnt').innerHTML = reportSHtarget.get("building").get("hhldCnt");//세대수
      document.querySelector('#tdFmlyCnt').innerHTML = reportSHtarget.get("building").get("fmlyCnt");//가구수
      document.querySelector('#tdBcRat').innerHTML = reportSHtarget.get("building").get("bcRat");//건폐율(%)
      document.querySelector('#tdVlRat').innerHTML = reportSHtarget.get("building").get("vlRat");//용적률(%)
      document.querySelector('#tdUseAprDay').innerHTML = reportSHtarget.get("building").get("useAprDay");//사용승인일
      // document.querySelector('#tdUseAprDay').innerHTML = dateFormat(new Date(landInfoData.get("useAprDay")), 'yyyy년mm월dd일');//사용승인일
    }
    //토지소유자 정보
    // eslint-disable-next-line no-lone-blocks
    {	
      document.querySelector('#tdPosesnSeCodeNm').innerHTML = reportSHtarget.get("landPossession").get("posesnSeCodeNm");//소유구분
      document.querySelector('#tdOwnshipChgCauseCodeNm').innerHTML = reportSHtarget.get("landPossession").get("ownshipChgCauseCodeNm");//소유변경원인
      document.querySelector('#tdOwnshipChgDe').innerHTML = reportSHtarget.get("landPossession").get("ownshipChgDe");//소유권변경일자
      document.querySelector('#tdCnrsPsnCo').innerHTML = reportSHtarget.get("landPossession").get("cnrsPsnCo");//공유 인원수
      // const cnrsPsnCo = landInfoData.get("mnnmSlno");//지번
      // const pnu = landInfoData.get("pnu");//pnu
    }
    //대지속성 
    // eslint-disable-next-line no-lone-blocks
    {
      document.querySelector('#tdLndcgrCodeNm').innerHTML = reportSHtarget.get("land").get("lndcgrCodeNm");//지목
      document.querySelector('#tdLndpclAr').innerHTML = reportSHtarget.get("land").get("lndpclAr");//면적
      document.querySelector('#tdTpgrphFrmCodeNm').innerHTML = reportSHtarget.get("land").get("tpgrphFrmCodeNm");//형상
      document.querySelector('#tdTpgrphHgCode').innerHTML = reportSHtarget.get("land").get("tpgrphHgCode");//고저
      document.querySelector('#tdRoadSideCodeNm').innerHTML = reportSHtarget.get("land").get("roadSideCodeNm");//도로접면
      

    }
    //분석결과
    {
      // V2 적용 에러코드 확인
      if (landInfoData.get("reportSH").get("error").get("errorCode") !== 0) {
        window.alert(landInfoData.get("reportSH").get("error").get("userMessage"));
        return;
      }
      // console.log(isSearched);
      const tradList = reportSHappraisal.get("trade");  
      //reportSHcomparison
      // console.log(tradList);
      // console.log(tradList.get(0));
      // console.log(tradList.get(0).get("지번주소"));
      // console.log(tradList.get(0).get("거래건축가격"));
      if(tradList === null || tradList.size === 0) {
        //화면 로딩시에 바로 얼럿이 나오는 것을 막아주기
        if(isSearched) {
          //분석결과 정보가 없으면 얼럿을 띄워준다.
          window.alert('해당 주소에 대한 분석 대상지가 없습니다.');
        }
      }
      else {
        if(tradList.size >=1){
          document.querySelector('#tdAddrA').innerHTML = tradList.get(0).get("지번주소");
          if(tradList.get(0).get("거래시점").length ===6) {
            document.querySelector('#tdTradeDateA').innerHTML = tradList.get(0).get("거래시점").substring(0,4) + '-' +tradList.get(0).get("거래시점").substring(4,6);
          }
          else {
            document.querySelector('#tdTradeDateA').innerHTML = tradList.get(0).get("거래시점");
          }

          document.querySelector('#tdPriceA').innerHTML = curruncyFormat(tradList.get(0).get("거래가격"));
        }
        if(tradList.size >=2){

          document.querySelector('#tdAddrB').innerHTML = tradList.get(1).get("지번주소");
          if(tradList.get(1).get("거래시점").length ===6) {
            document.querySelector('#tdTradeDateB').innerHTML = tradList.get(1).get("거래시점").substring(0,4) + '-' +tradList.get(1).get("거래시점").substring(4,6);
          }
          else {
            document.querySelector('#tdTradeDateB').innerHTML = tradList.get(1).get("거래시점");
          }
          document.querySelector('#tdPriceB').innerHTML = curruncyFormat(tradList.get(1).get("거래가격"));
        }
        if(tradList.size >=3){

          document.querySelector('#tdAddrC').innerHTML = tradList.get(2).get("지번주소");
          if(tradList.get(2).get("거래시점").length ===6) {
            document.querySelector('#tdTradeDateC').innerHTML = tradList.get(2).get("거래시점").substring(0,4) + '-' +tradList.get(2).get("거래시점").substring(4,6);
          }
          else {
            document.querySelector('#tdTradeDateC').innerHTML = tradList.get(2).get("거래시점");
          }
          document.querySelector('#tdPriceC').innerHTML = curruncyFormat(tradList.get(2).get("거래가격"));
        }
        if(tradList.size >=4){

          document.querySelector('#tdAddrD').innerHTML = tradList.get(3).get("지번주소");
          if(tradList.get(3).get("거래시점").length ===6) {
            document.querySelector('#tdTradeDateD').innerHTML = tradList.get(3).get("거래시점").substring(0,4) + '-' +tradList.get(3).get("거래시점").substring(4,6);
          }
          else {
            document.querySelector('#tdTradeDateD').innerHTML = tradList.get(3).get("거래시점");
          }
          document.querySelector('#tdPriceD').innerHTML = curruncyFormat(tradList.get(3).get("거래가격"));
        }
        if(tradList.size >= 5){

          document.querySelector('#tdAddrE').innerHTML = tradList.get(4).get("지번주소");
          if(tradList.get(4).get("거래시점").length ===6) {
            document.querySelector('#tdTradeDateE').innerHTML = tradList.get(4).get("거래시점").substring(0,4) + '-' +tradList.get(4).get("거래시점").substring(4,6);
          }
          else {
            document.querySelector('#tdTradeDateE').innerHTML = tradList.get(4).get("거래시점");
          }
          document.querySelector('#tdPriceE').innerHTML = curruncyFormat(tradList.get(4).get("거래가격"));
        }
        if(tradList.size > 5){
          document.querySelector('#tdAddrF').innerHTML = tradList.get(5).get("지번주소");
          if(tradList.get(5).get("거래시점").length ===6) {
            document.querySelector('#tdTradeDateF').innerHTML = tradList.get(5).get("거래시점").substring(0,4) + '-' +tradList.get(5).get("거래시점").substring(4,6);
          }
          else {
            document.querySelector('#tdTradeDateF').innerHTML = tradList.get(5).get("거래시점");
          }
          document.querySelector('#tdPriceF').innerHTML = curruncyFormat(tradList.get(5).get("거래가격"));
        }
      }
    }
    document.querySelector('#imgMap').src = landInfoData.get("urlMap");//유사 매매 사례 지도
  }
  render() {
      return (
          <div className="wrap-land-info">
            <ul className="div-land-info-item left">
              <li>
                <table className="tbl-info-01">
                    <tbody>
                      <tr>
                        <th>지번주소</th>
                        <td  id="tdJibunAddr"></td>
                      </tr>
                      <tr>
                        <th>도로명주소</th>
                        <td id="tdRoadAddr"></td>
                      </tr>
                      <tr>
                        <th>소유구분</th>
                        <td id="tdPosesnSeCodeNm"> </td>
                      </tr>
                      <tr>
                        <th>소유권변동일</th>
                        <td id="tdOwnshipChgDe"> </td>
                      </tr>
                      <tr>
                        <th>소유권변동원인</th>
                        <td id="tdOwnshipChgCauseCodeNm"> </td>
                      </tr>
                      <tr>
                        <th>공유원수</th>
                        <td id="tdCnrsPsnCo"> </td>
                      </tr>
                      </tbody>
                  </table>
              </li>
              <li>
                <table className="tbl-info-02">
                  <tbody>
                    <tr>
                      <th>지목</th>
                      <th>면적</th>
                      <th>형상</th>
                      <th>고저</th>
                      <th>도로접면</th>
                    </tr>
                    <tr>
                      <td id="tdLndcgrCodeNm"></td>
                      <td id="tdLndpclAr"></td>
                      <td id="tdTpgrphFrmCodeNm"></td>
                      <td id="tdTpgrphHgCode"></td>
                      <td id="tdRoadSideCodeNm"></td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <div>
                  <table className="tbl-info-03">
                  <tbody>
                    <tr>
                      <th>건물명</th>
                      <td id="tdBldNm"></td>
                    </tr>
                    <tr>
                      <th>주용도명</th>
                      <td id="tdMainPurpsCdNm"></td>
                    </tr>
                    <tr>
                      <th>기타용도</th>
                      <td id="tdEtcPurps"></td>
                    </tr>
                    <tr>
                      <th>구조명</th>
                      <td id="tdStrctCdNm"></td>
                    </tr>
                    <tr>
                      <th>건축면적</th>
                      <td id="tdArchArea"></td>
                    </tr>
                    <tr>
                      <th>높이</th>
                      <td id="tdHeit"></td>
                    </tr>
                    <tr>
                      <th>연면적</th>
                      <td id="tdTotArea"></td>
                    </tr>
                    <tr>
                      <th>호수</th>
                      <td id="tdHoCnt"></td>
                    </tr>
                    
                    <tr>
                      <th>가구수</th>
                      <td id="tdFmlyCnt"></td>
                    </tr>
                    
                    <tr>
                      <th>세대수</th>
                      <td id="tdHhldCnt"></td>
                    </tr>
                    
                    <tr>
                      <th>건폐율</th>
                      <td id="tdBcRat"></td>
                    </tr>
                    
                    <tr>
                      <th>용적율</th>
                      <td id="tdVlRat"></td>
                    </tr>
                    
                    <tr>
                      <th>사용승인일자</th>
                      <td id="tdUseAprDay"></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            </ul>

            <ul className="div-land-info-item right">
              <li>
                <img id="imgMap" className="map" alt=""/>
              </li>
              <li>
                <ul>유사 매매 사례</ul>
                <table className="tbl-info-04">
                  <tbody>
                    <tr>
                      <th>기호</th>
                      <th>지번</th>
                      <th>매매시점</th>
                      <th>매매가격</th>
                    </tr>
                    <tr>
                      <td>A</td>
                      <td id="tdAddrA"></td>
                      <td id="tdTradeDateA"></td>
                      <td id="tdPriceA" className="th-right"></td>
                    </tr>
                    <tr>
                      <td>B</td>
                      <td id="tdAddrB"></td>
                      <td id="tdTradeDateB"></td>
                      <td id="tdPriceB" className="th-right"></td>
                    </tr>
                    <tr>
                      <td>C</td>
                      <td id="tdAddrC"></td>
                      <td id="tdTradeDateC"></td>
                      <td id="tdPriceC" className="th-right"></td>
                    </tr>
                    <tr>
                      <td>D</td>
                      <td id="tdAddrD"></td>
                      <td id="tdTradeDateD"></td>
                      <td id="tdPriceD" className="th-right"></td>
                    </tr>
                    <tr>
                      <td>E</td>
                      <td id="tdAddrE"></td>
                      <td id="tdTradeDateE"></td>
                      <td id="tdPriceE" className="th-right"></td>
                    </tr>
                    <tr>
                      <td>F</td>
                      <td id="tdAddrF"></td>
                      <td id="tdTradeDateF"></td>
                      <td id="tdPriceF" className="th-right"></td>
                    </tr>
                    </tbody>
                  </table>
              </li>
            </ul>
          </div>
      );
  }
}
export default LandInfoView;
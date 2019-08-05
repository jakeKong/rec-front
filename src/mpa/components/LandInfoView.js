import React, { Component, Fragment } from 'react';
//import NumberFormat from 'react-number-format';
const dateFormat = require('dateformat');

const curruncyFormat = (value) => new Intl.NumberFormat('en-IN', {style: 'currency',currency: 'KRW'}).format(value);
const commaFormat = (value) => new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3}).format(value);
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
    const { landInfoData, isSearched } = this.props;
    if (!landInfoData || landInfoData === undefined || landInfoData.isEmpty()) {
      return
    }
    document.querySelector('#tdJibunAddr').innerHTML = landInfoData.get("jibunAddr");
    document.querySelector('#tdRoadAddr').innerHTML = landInfoData.get("roadAddr");
    //건축물표제부
    {
      document.querySelector('#tdBldNm').innerHTML = landInfoData.get("bldNm");//건물명
      document.querySelector('#tdMainPurpsCdNm').innerHTML = landInfoData.get("mainPurpsCdNm");//주용도코드명
      document.querySelector('#tdEtcPurps').innerHTML = landInfoData.get("etcPurps");//기타용도
      document.querySelector('#tdStrctCdNm').innerHTML = landInfoData.get("strctCdNm");//구조코드명
      document.querySelector('#tdArchArea').innerHTML = landInfoData.get("archArea");//건축면적(㎡)
      document.querySelector('#tdHeit').innerHTML = landInfoData.get("heit");//높이(m)
      document.querySelector('#tdTotArea').innerHTML = landInfoData.get("totArea");//연면적(㎡)
      document.querySelector('#tdHoCnt').innerHTML = landInfoData.get("hoCnt");//호수
      document.querySelector('#tdHhldCnt').innerHTML = landInfoData.get("hhldCnt");//세대수
      document.querySelector('#tdFmlyCnt').innerHTML = landInfoData.get("fmlyCnt");//가구수
      document.querySelector('#tdBcRat').innerHTML = landInfoData.get("bcRat");//건폐율(%)
      document.querySelector('#tdVlRat').innerHTML = landInfoData.get("vlRat");//용적률(%)
      document.querySelector('#tdUseAprDay').innerHTML = landInfoData.get("useAprDay");//사용승인일
      // document.querySelector('#tdUseAprDay').innerHTML = dateFormat(new Date(landInfoData.get("useAprDay")), 'yyyy년mm월dd일');//사용승인일
    }
    //토지대장
    {	
      document.querySelector('#tdPosesnSeCodeNm').innerHTML = landInfoData.get("posesnSeCodeNm");
      document.querySelector('#tdOwnshipChgCauseCodeNm').innerHTML = landInfoData.get("ownshipChgCauseCodeNm");
      document.querySelector('#tdOwnshipChgDe').innerHTML = landInfoData.get("ownshipChgDe");
      document.querySelector('#tdCnrsPsnCo').innerHTML = landInfoData.get("cnrsPsnCo");
      // const cnrsPsnCo = landInfoData.get("mnnmSlno");//지번
      // const pnu = landInfoData.get("pnu");//pnu
    }
    //대지속성 
    {
      document.querySelector('#tdLndcgrCodeNm').innerHTML = landInfoData.get("lndcgrCodeNm");//지목
      document.querySelector('#tdLndpclAr').innerHTML = landInfoData.get("lndpclAr");//면적
      document.querySelector('#tdTpgrphFrmCodeNm').innerHTML = landInfoData.get("tpgrphFrmCodeNm");//형상
      document.querySelector('#tdTpgrphHgCode').innerHTML = landInfoData.get("tpgrphHgCode");//고저
      document.querySelector('#tdRoadSideCodeNm').innerHTML = landInfoData.get("roadSideCodeNm");//도로접면
      

    }
    //분석결과
    {
      const analysisTradeInfo = landInfoData.get("analysisTradeInfo");
      
      console.log(isSearched);
      const tradList = analysisTradeInfo.get("trade");
      // console.log(tradList);
      // console.log(tradList.get(0));
      // console.log(tradList.get(0).get("지번주소"));
      // console.log(tradList.get(0).get("거래건축가격"));
      if(tradList == null || tradList.size ==0) {
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
    document.querySelector('#imgMap').src = landInfoData.get("analysisTradeInfo").get("mapUrl");//도로접면
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
                  <img id="imgMap" className="map" />
              </li>
              <li>
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
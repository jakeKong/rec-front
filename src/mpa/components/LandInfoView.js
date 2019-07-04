import React, { Component, Fragment } from 'react';
import { AddressSearch } from "../index";
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
    // const { dto } = this.state;
    const { landInfoData } = this.props;
    if (!landInfoData || landInfoData === undefined || landInfoData.isEmpty()) {
      return
    }
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
    }
    //토지대장
    {	
      document.querySelector('#tdPosesnSeCodeNm').innerHTML = landInfoData.get("posesnSeCodeNm");
      document.querySelector('#tdOwnshipChgCauseCodeNm').innerHTML = landInfoData.get("ownshipChgCauseCodeNm");
      document.querySelector('#tdOwnshipChgDe').innerHTML = landInfoData.get("ownshipChgDe");
      document.querySelector('#tdCnrsPsnCo').innerHTML = landInfoData.get("cnrsPsnCo");
      const cnrsPsnCo = landInfoData.get("mnnmSlno");//지번
      const pnu = landInfoData.get("pnu");//pnu
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
      document.querySelector('#td지번주소').innerHTML = analysisTradeInfo.get("지번주소");
    }
    document.querySelector('#imgMap').src = landInfoData.get("analysisTradeInfo").get("mapUrl");//도로접면
  }

  render() {
      return (
        <div className="div-main">
          <div><AddressSearch searchCallback={ this.searchCallback } /></div>
          <div className="div-land-info-container-row">
            <ul className="div-land-info-item">
              <li className="div-land-info-li_item">
                <div>
                  <table className="tbd">
                  <tbody>
                    <tr>
                      <th className="cell_header">지번주소</th>
                      <td  id="td지번주소" className="cell_content"></td>
                    </tr>
                    <tr>
                      <th className="cell_header">도로명주소</th>
                      <td id="" className="cell_content"></td>
                    </tr>
                    <tr>
                      <th className="cell_header">소유구분</th>
                      <td id="tdPosesnSeCodeNm" className="cell_content"> </td>
                    </tr>
                    <tr>
                      <th className="cell_header">소유권변동일</th>
                      <td id="tdOwnshipChgDe" className="cell_content"> </td>
                    </tr>
                    <tr>
                      <th className="cell_header">소유권변동원인</th>
                      <td id="tdOwnshipChgCauseCodeNm" className="cell_content"> </td>
                    </tr>
                    <tr>
                      <th className="cell_header">공유원수</th>
                      <td id="tdCnrsPsnCo" className="cell_content"> </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li className="div-land-info-li_item">
                <div>
                  <table className="tbd">
                  <tbody>
                    <tr>
                      <th className="cell_header">지목</th>
                      <th className="cell_header">면적</th>
                      <th className="cell_header">형상</th>
                      <th className="cell_header">고저</th>
                      <th className="cell_header">도로접면</th>
                    </tr>
                    <tr>
                      <td id="tdLndcgrCodeNm" className="cell_content"></td>
                      <td id="tdLndpclAr" className="cell_content"></td>
                      <td id="tdTpgrphFrmCodeNm" className="cell_content"></td>
                      <td id="tdTpgrphHgCode" className="cell_content"></td>
                      <td id="tdRoadSideCodeNm" className="cell_content"></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li className="div-land-info-li_item">
                <div>
                  <table className="tbd">
                  <tbody>
                    <tr>
                      <th className="cell_header">건물명</th>
                      <td id="tdBldNm" className="cell_content"></td>
                    </tr>
                    <tr>
                      <th className="cell_header">주용도명</th>
                      <td id="tdMainPurpsCdNm" className="cell_content"></td>
                    </tr>
                    <tr>
                      <th className="cell_header">기타용도</th>
                      <td id="tdEtcPurps" className="cell_content"></td>
                    </tr>
                    <tr>
                      <th className="cell_header">구조명</th>
                      <td id="tdStrctCdNm" className="cell_content"></td>
                    </tr>
                    <tr>
                      <th className="cell_header">건축면적</th>
                      <td id="tdArchArea" className="cell_content"></td>
                    </tr>
                    <tr>
                      <th className="cell_header">높이</th>
                      <td id="tdHeit" className="cell_content"></td>
                    </tr>
                    <tr>
                      <th className="cell_header">연면적</th>
                      <td id="tdTotArea" className="cell_content"></td>
                    </tr>
                    <tr>
                      <th className="cell_header">호수</th>
                      <td id="tdHoCnt" className="cell_content"></td>
                    </tr>
                    
                    <tr>
                      <th className="cell_header">가구수</th>
                      <td id="tdFmlyCnt" className="cell_content"></td>
                    </tr>
                    
                    <tr>
                      <th className="cell_header">세대수</th>
                      <td id="tdHhldCnt" className="cell_content"></td>
                    </tr>
                    
                    <tr>
                      <th className="cell_header">건폐율</th>
                      <td id="tdBcRat" className="cell_content"></td>
                    </tr>
                    
                    <tr>
                      <th className="cell_header">용적율</th>
                      <td id="tdVlRat" className="cell_content"></td>
                    </tr>
                    
                    <tr>
                      <th className="cell_header">사용승인일자</th>
                      <td id="tdUseAprDay" className="cell_content"></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            </ul>

            <ul className="div-land-info-item">
              <li className="div-land-info-li_item">
                <div>
                  <img id="imgMap" src="http://api.vworld.kr/req/image?service=image&version=2.0&request=getmap&key=808A7C96-6AD4-369B-B03D-EAEBA6AA700E&format=png&basemap=GRAPHIC&center=126.978275264,37.566642192&crs=epsg:4326&zoom=16&size=700,370&&marker=point:126.9760222 37.5682154|label:A|size:16|color:red&marker=point:126.9808716 37.5678752|label:B|size:16|color:red&marker=point:126.9804424 37.5650008|label:C|size:16|color:red&marker=point:126.9770736 37.5668037|label:D|size:16|color:red" />
                </div>
                
              </li>
              <li className="div-land-info-li_item">
                <div>
                  <table className="tbd">
                  <tbody>
                    <tr>
                      <th className="cell_header">기호</th>
                      <th className="cell_header">지번</th>
                      <th className="cell_header">매매가격</th>
                    </tr>
                    <tr>
                      <td className="cell_content">A</td>
                      <td className="cell_content">서울 광진구 능동 135-27</td>
                      <td className="cell_content">234,000,000,000</td>
                    </tr>
                    <tr>
                      <td className="cell_content">B</td>
                      <td className="cell_content"></td>
                      <td className="cell_content"></td>
                    </tr>
                    <tr>
                      <td className="cell_content">C</td>
                      <td className="cell_content"></td>
                      <td className="cell_content"></td>
                    </tr>
                    <tr>
                      <td className="cell_content">D</td>
                      <td className="cell_content"></td>
                      <td className="cell_content"></td>
                    </tr>
                    <tr>
                      <td className="cell_content">E</td>
                      <td className="cell_content"></td>
                      <td className="cell_content"></td>
                    </tr>
                    <tr>
                      <td className="cell_content">F</td>
                      <td className="cell_content"></td>
                      <td className="cell_content"></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            </ul>
          </div>
          <div>Footer</div>
        </div>   
      );
  }
}
export default LandInfoView;
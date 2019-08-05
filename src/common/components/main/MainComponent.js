import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router';
import CountUp from 'react-countup';
import { AddressSearch } from '../../../common';
import customTheme from '../../../styles/agz/main_suggest_thema.css';

import config from '../../../config';
const duration=5;
class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedSuggestion: null,
      isRedirect: false,
      landCnt: 0,
      buildCnt: 0,
      tradeCnt: 0,
    }
  }

   //우편번호 검색이 끝났을 때 사용자가 선택한 정보를 받아올 콜백함수
   onComplete  = async (selectedSuggestion) => {    
    
    // state.search 값 초기화
    this.setState({
      selectedSuggestion: selectedSuggestion,
      isRedirect: false,
    });
  }
  onSearchClick = async (selectedSuggestion) => { 
    this.setState({
      isRedirect: true,
    });
  }

  componentDidMount() {
    this.getInfoCount();
  }

  getInfoCount() {
    
    const url = `${config.mainSummryService}`;
    fetch(url)
          .then(res =>res.text())
          .then((data) => {     
            console.log(data);
            const dataArr = data.split(',');            
            this.setState({
              landCnt: parseInt(dataArr[0],10),
              buildCnt: parseInt(dataArr[1],10),
              tradeCnt: parseInt(dataArr[2],10)
            });
          })
          .catch(console.log);  
  }
  render() {
    //주소검색이 정상적으로 된 경우 주택정보 검색 화면으로 Redirect 한다.
    if(this.state.isRedirect === true) {
      const {selectedSuggestion} = this.state;
      return <Redirect to={{
        pathname: "/mpa",
        state: { selectedSuggestion : selectedSuggestion }
      }} push={true}/>;
    }
    return (
      <Fragment>
        <div className="illust-main" />
        <div className="wrap-content-main">
          <div className="div-home-search wrap-searchbox">
            <div className="searchbox">
                <AddressSearch onComplete={this.onComplete} onSearchClick={this.onSearchClick} theme={this.customTheme}/>
            </div>
          </div>
          <p className="box-summary">
              <span className="summary">
                토지정보&nbsp;
                <CountUp className="num" start={1} end={this.state.landCnt}
                  duration={duration} useEasing={true} separator="," redraw={true}/>
                건
              </span>
              <span className="summary">
                건물정보&nbsp;
                <CountUp className="num" start={1} end={this.state.buildCnt}
                  duration={duration} useEasing={true} separator="," redraw={true}/>
                건
              </span>
              { <span className="summary">
                거래정보&nbsp;
                <CountUp className="num" start={1} end={this.state.tradeCnt}
                  duration={duration} useEasing={true} separator="," redraw={true}/>
                건
              </span> }
            </p>
        </div>
      </Fragment>
    );
  }
}
export default MainComponent;
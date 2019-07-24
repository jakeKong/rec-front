import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router';
import CountUp from 'react-countup';
import { AddressSearch } from '../../../common';
import customTheme from '../../../styles/agz/main_suggest_thema.css';

const duration=5;
class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedSuggestion: null,
      isRedirect: false,
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
                거래정보&nbsp;
                <CountUp className="num" start={1} end={102864}
                  duration={duration} useEasing={true} separator="," redraw={true}/>
                건
              </span>
              <span className="summary">
                시세정보&nbsp;
                <CountUp className="num" start={1} end={114152}
                  duration={duration} useEasing={true} separator="," redraw={true}/>
                건
              </span>
            </p>
        </div>
      </Fragment>
    );
  }
}
export default MainComponent;
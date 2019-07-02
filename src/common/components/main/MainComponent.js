import React, { Component, Fragment } from 'react';

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <Fragment>
        <div className="illust_main">
          삽화가 들어갈자리입니다.
        </div>
        <div className="wrap-content">
          <div className="wrap-search">
            <div className="searchbox">
              <input type="text" placeholder="주소를 입력하세요." />
              <button>주소검색</button>
            </div>
            <p className="box-summary">
              <span className="summary">
                거래정보
                <span className="num"> 102,864 </span>
                건
              </span>
              <span className="summary">
                시세정보
                <span className="num"> 114,152 </span>
                건
              </span>
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default MainComponent;
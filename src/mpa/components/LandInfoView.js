import React, { Component, Fragment } from 'react';
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
    const { basicLandInfo } = this.props;
    if (!basicLandInfo || basicLandInfo === undefined || basicLandInfo.isEmpty()) {
      return
    }
    
    // let list =[];
    // basicLandInfo.forEach(e => {
    //   // push Value type is JSON
    //   list.push({
    //     //순번	
    //     rnum: e.get("rnum"),
    //     //지능형건축물등급
    //     itgBldGrade: e.get("itgBldGrade"),   
    //     //지능형건축물인증점수     
    //     itgBldCert: e.get("itgBldCert"),
    //     //생성일자
    //     crtnDay: e.get("crtnDay"),
    //     //새주소법정동코드
    //     naBjdongCd: e.get("naBjdongCd"),
    //     //새주소지상지하코드
    //     naUgrndCd: e.get("naUgrndCd"),
    //     //새주소본번
    //     naMainBun: e.get("naMainBun"),
    //     //새주소부번
    //     naSubBun: e.get("naSubBun"),
    //     //대지면적(㎡)
    //     platArea: e.get("platArea"),
    //     //건축면적(㎡)
    //     archArea: e.get("archArea"),
    //     //건폐율(%)	
    //     bcRat: e.get("bcRat")

    //   })
    // })

  }

  render() {
      return (
        
        <div className="div-land-info-wrapper">
          <div className="div-land-info-search">
            <h1>2-Column Layout</h1>
          </div>
          <div className="div-land-info-left-content">
            <h2>Content</h2>        
          </div>
          <div className="div-land-info-right-content">
            <h2>Sidebar</h2>
            <ul>
              <li>Lorem</li>
              <li>Ipsum</li>
              <li>Dolor</li>
            </ul>
          </div>
          <div className="div-land-info-footer">
            <p>Copyright</p>
          </div>
        </div>        
      );
  }
}
export default LandInfoView;
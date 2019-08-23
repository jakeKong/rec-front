import React, { Component } from 'react';

import { Dialog } from 'primereact/dialog';
import storage from '../../common/storage';

class LandInfoResultPop extends Component {

  constructor(props) {
    super(props);
    this.state ={

    }
  }

  componentDidMount() {
    document.querySelector('#lbEstate').innerHTML = "부동산";
    document.querySelector('#lbMngNo').innerHTML = "주문번호";
    document.querySelector('#lbUsedPoint').innerHTML = "차감포인트";
    document.querySelector('#lbBalancePoint').innerHTML = "차감 후 잔여포인트";
    document.querySelector('#lbComment').innerHTML = "메모";
    document.querySelector('#lbDownload').innerHTML = "다운로드";

    const { result } = this.props;
    if (result !== undefined) {
      if (storage.get('loggedInfo')) {
        document.querySelector('#lbEstateResult').innerHTML = result.jibunAddr;
        document.querySelector('#lbMngNoResult').innerHTML = result.mngNo;
        document.querySelector('#lbUsedPointResult').innerHTML = result.usedPoint;
        document.querySelector('#lbBalancePointResult').innerHTML = result.balancePoint;
        document.querySelector('#lbComment').innerHTML = result.comment;
        
        document.querySelector('#lbDownload').addEventListener('click', function() {
          // result.downloadPdfUrl
          window.open(result.downloadPdfUrl);
        })
      }
    }
  }

  close() {
    const { popupClose } = this.props;
    popupClose();
  }

  render() {

    const popupFooter = (
      <div>
        <button onClick={() => this.close()}>확인</button>
      </div>
    );

    const { visiblility, popupClose } = this.props;
    console.log('test');
    console.log(visiblility);
    
    return (
      <Dialog header="조회 결과" footer={popupFooter} style={{width: '500px'}} modal={true} visible={ visiblility } onHide={() => popupClose()}>
        <div className="div-register-popup-board">
          <div className="default-column">
            <label id="lbEstate" className="label-flex-30-left"/>
            <label id="lbEstateResult" className="label-flex-70-left"/>
          </div>
          <div className="default-column">
            <label id="lbMngNo" className="label-flex-30-left"/>
            <label id="lbMngNoResult" className="label-flex-70-left"/>
          </div>
          <div className="default-column">
            <label id="lbUsedPoint" className="label-flex-30-left"/>
            <label id="lbUsedPointResult" className="label-flex-70-left"/>
          </div>
          <div className="default-column">
            <label id="lbBalancePoint" className="label-flex-30-left"/>
            <label id="lbBalancePointResult" className="label-flex-70-left"/>
          </div>
          <div className="default-column">
            <label id="lbComment" className="label-flex-30-left"/>
            <label id="lbCommentResult" className="label-flex-70-left"/>
          </div>
          <div className="default-column">
            <label id="lbDownload" className="label-flex-30-left"/>
            <button id="btnDownloadPdf"/>
          </div>
        </div>
      </Dialog>
    );
  }
}
export default LandInfoResultPop ;


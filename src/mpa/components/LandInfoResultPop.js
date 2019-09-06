import React, { Component } from 'react';

import { Dialog } from 'primereact/dialog';
import {InputTextarea} from 'primereact/inputtextarea';
import storage from '../../common/storage';
import { comma } from '../../common/utils';

import config from '../../config';

class LandInfoResultPop extends Component {

  constructor(props) {
    super(props);
    this.state ={
      mpaPopVisiblility: false
    }
    this.mpaClose = this.mpaClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.result !== undefined) {
      this.setState({mpaPopVisiblility : true});
      if (storage.get('loggedInfo')) {
        document.querySelector('#lbEstateResult').innerHTML = nextProps.result.jibunAddr;
        document.querySelector('#lbMngNoResult').innerHTML = nextProps.result.mngNo;
        document.querySelector('#lbUsedPointResult').innerHTML = nextProps.result.usedPoint;
        document.querySelector('#lbBalancePointResult').innerHTML = comma(nextProps.result.balancePoint)+'P';
        document.querySelector('#taCommentResult').value = nextProps.result.comment;
        
        let refreshPdfUrl = nextProps.result.downloadPdfUrl;
        const replaceEvent = () => {
          if (refreshPdfUrl !== undefined) {
            window.open(config.pdfUrl+'/'+nextProps.result.downloadPdfUrl);
          } else {
            window.alert('PDF정보가 존재하지 않습니다.\n관리자에게 문의해주세요.');
          }
        }
        const divDownload = document.querySelector('.div-mpa-download-btn-layout')
        if (divDownload.childNodes.length !== 0) {
          divDownload.removeChild(divDownload.childNodes[0])
        }
        const btnDownload = document.createElement('button');
        btnDownload.className = 'button-mpa-result-pdf-download'
        btnDownload.textContent = 'PDF 다운';
        btnDownload.addEventListener('click', () => replaceEvent())
        divDownload.appendChild(btnDownload);
      }
    }
  }

  componentDidMount() {
    document.querySelector('#lbEstate').innerHTML = "부동산";
    document.querySelector('#lbMngNo').innerHTML = "주문번호";
    document.querySelector('#lbUsedPoint').innerHTML = "차감포인트";
    document.querySelector('#lbBalancePoint').innerHTML = "차감 후 잔여포인트";
    document.querySelector('#lbComment').innerHTML = "메모";
    document.querySelector('#lbDownload').innerHTML = "다운로드";
  }

  mpaClose() {
    const { resetResult } = this.props;
    this.setState({mpaPopVisiblility: false});
    resetResult();
  }

  render() {

    const mpaPopupFooter = (
      <div>
        <button onClick={() => this.mpaClose()}>확인</button>
      </div>
    );

    return (
      <Dialog header="조회 결과" footer={mpaPopupFooter} style={{width: '500px'}} visible={ this.state.mpaPopVisiblility } onHide={() => this.mpaClose()}>
        <div className="div-mpa-result-popup-board">
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
            <label id="lbComment"/>
          </div>
          <div className="default-column">
            <InputTextarea readOnly autoResize={true} id="taCommentResult"/>
          </div>
          <div className="default-column">
            <label id="lbDownload" className="label-flex-30-left"/>
            <div className='div-mpa-download-btn-layout'>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
export default LandInfoResultPop ;


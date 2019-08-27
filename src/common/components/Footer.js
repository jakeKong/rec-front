import React, { Fragment, Component } from 'react';
// import algozip from '../../styles/agz/algozip_w.png';
import main_illu from '../../styles/agz/image/main_illu_3x.png';

import {Dialog} from 'primereact/dialog';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        intro: false,
        // notice: false,
        termsofservice: false,
        privacy: false,
        liability: false,
        copyright: false
      },
    }
  }

  componentDidMount() {
    // 이용약관
    let termsOfService = require('../file/termsOfService.txt')
    // 개인정보 처리방침
    let personalInformationCollectionAgreement = require('../file/personalInformationCollectionAgreement.txt')
    // 책임한계와 법적고지
    let liabilityLegalNotice = require('../file/liabilityLegalNotice.txt')
    // 저작권 정책
    let copyrightPolicy = require('../file/copyrightPolicy.txt')

    fetch(termsOfService).then(r => r.text()).then(text => {
      document.querySelector('#taInfoTermsofservice').value = text;  
    }).catch(err => {
      console.log(err);
    })
    fetch(personalInformationCollectionAgreement).then(r => r.text()).then(text => {
      document.querySelector('#taInfoPrivacy').value = text;  
    }).catch(err => {
      console.log(err);
    })
    fetch(liabilityLegalNotice).then(r => r.text()).then(text => {
      document.querySelector('#taInfoLiability').value = text;  
    }).catch(err => {
      console.log(err);
    })
    fetch(copyrightPolicy).then(r => r.text()).then(text => {
      document.querySelector('#taInfoCopyright').value = text;  
    }).catch(err => {
      console.log(err);
    })
    
  }

  infoIntro() {
    this.setState({intro: true})
  }
  infoIntroClose() {
    this.setState({intro: false})
  }

  infoTermsofservice() {
    this.setState({termsofservice: true})
  }
  infoTermsofserviceClose() {
    this.setState({termsofservice: false})
  }

  infoPrivacy() {
    this.setState({privacy: true})
  }
  infoPrivacyClose() {
    this.setState({privacy: false})
  }

  infoLiability() {
    this.setState({liability: true})
  }
  infoLiabilityClose() {
    this.setState({liability: false})
  }

  infoCopyright() {
    this.setState({copyright: true})
  }
  infoCopyrightClose() {
    this.setState({copyright: false})
  }

  render() {
    return(
      <Fragment>
        <div className="footer_new">
          <div className="width-ful">
            <div className="footer-layer1">
              <a href='#1' onClick={() => this.infoIntro()}>알고집 소개</a>
              <a href="/bms/notice">공지사항</a>
              <a href='#3' onClick={() => this.infoTermsofservice()}>이용약관</a>
              <a href='#4' onClick={() => this.infoPrivacy()}>개인정보 처리방침</a>
              <a href='#5' onClick={() => this.infoLiability()}>책임한계와 법적고지</a>
              <a href='#6' onClick={() => this.infoCopyright()}>저작권 정책</a>
            </div>
            <div className="footer-layer2">
              <div className="footer-content">
                <a href="/"><img src={main_illu} style={{margin:0, display:'inline-block', width:100, height:80}} alt=""></img></a>
                <address>
                  주식회사 크로스워크 | 주소 : 서울특별시 성동구 성수동1가 685-418<br/>
                  전화 : 070-5180-1794 | 팩스 : 0303-3440-0228<br/>
                  통신판매신고 : 제 2019-서울성동-01463호<br/>
                  COPYRIGHT 2019 BY CROSSWALK CO.LTD. ALL RIGHTS RESERVED<br/>
                </address>
              </div>
            </div>
          </div>
        </div>
        <Dialog header="알고집 소개" visible={this.state.intro} onHide={() => this.infoIntroClose()}>
          <textarea id="taInfoIntro" rows="20" cols="100" readOnly />
        </Dialog>
        <Dialog header="이용약관" visible={this.state.termsofservice} onHide={() => this.infoTermsofserviceClose()}>
          <textarea id="taInfoTermsofservice" rows="20" cols="100" readOnly />
        </Dialog>
        <Dialog header="개인정보 처리방침" visible={this.state.privacy} onHide={() => this.infoPrivacyClose()}>
          <textarea id="taInfoPrivacy" rows="20" cols="100" readOnly />
        </Dialog>
        <Dialog header="책임한계와 법적고지" visible={this.state.liability} onHide={() => this.infoLiabilityClose()}>
          <textarea id="taInfoLiability" rows="20" cols="100" readOnly />
        </Dialog>
        <Dialog header="저작권 정책" visible={this.state.copyright} onHide={() => this.infoCopyrightClose()}>
          <textarea id="taInfoCopyright" rows="20" cols="100" readOnly />
        </Dialog>
      </Fragment>
    );
  }
};

export default Footer;
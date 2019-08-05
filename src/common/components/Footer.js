import React from 'react';
// import algozip from '../../styles/agz/algozip_w.png';
import main_illu from '../../styles/agz/image/main_illu_3x.png';

const Footer = () => (
  <div className="footer_new">
    <div className="width-ful">
      <div className="footer-layer1">
        <a href="/info/intro">크로스워크 소개</a>
        <a href="/info/notice">공지사항</a>
        <a href="/info/termsofservice">이용약관</a>
        <a href="/info/privacy">개인정보 처리방침</a>
        <a href="/info/liability">책임한계와 법적고지</a>
        <a href="/info/copyright">저작권 정책</a>
      </div>
      <div className="footer-layer2">
        <div className="footer-content">
          <a href="/"><img src={main_illu} style={{margin:0, display:'inline-block', width:100, height:80}}></img></a>
          <address>
            주식회사 크로스워크 | 대표 : 한창훈 | 주소 : 서울특별시 성동구 성수동1가 685-418<br/>
            전화 : 070-000-0000 | 팩스 : 0303-000-0000<br/>
            통신판매신고 : <br/>
            COPYRIGHT 2019 BY CROSSWALK CO.LTD. ALL RIGHTS RESERVED<br/>
          </address>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
import React from 'react';

const Footer = () => (
  <div className="footer_new">
    <div className="width-ful">
      <div className="footer-layer1">
        <a href="https://www.coupang.com/np/jobs">인재채용</a>
        <a href="https://wing.coupang.com/vendor/joining/welcome?inflow=WEB_FOOTER_B">입점 / 제휴문의</a>
        <a href="https://csmessenger.coupang.com/cs-center/notice/main">공지사항</a>
        <a href="https://csmessenger.coupang.com/cs-center/voc/main">고객의 소리</a>
        <a href="/np/policies/terms">이용약관</a>
        <a href="/np/policies/privacy"><b>개인정보 처리방침</b></a>
        <a href="/np/safety">신뢰관리센터</a>
        <a href="https://partners.coupang.com/">제휴마케팅</a>
        <a href="/np/policies/commercial">광고정책</a>
      </div>
      <div className="footer-layer2">
        <h1><a href="/" title="Algozip">Algozip</a></h1>
        <div className="footer-content">
          <address>
            쿠팡(주) | 대표이사 : 김범석,고명주,정보람<br/>
            서울시 송파구 송파대로 570 <br/>
            사업자 등록번호 : 120-88-00767 <br/>
            통신판매업신고 : 2017-서울송파-0680<br/>
            <a href="http://www.ftc.go.kr/info/bizinfo/communicationViewPopup.jsp?wrkr_no=1208800767" className="licensee" title="사업자정보 확인">사업자정보 확인 &gt;</a>
          </address>
          <div className="contact-info">
            <a href="http://cs.coupang.com/customerCenter/home" className="call-center" title="365 고객센터">
              <strong>365고객센터</strong> | 전자금융거래분쟁처리담당<br/>
              <em>1577-7011</em>
              서울특별시 금천구 두산로 70 B, 24층<br/>
              <span className="contact-fax">Fax : 02-3441-7011 | email : help@coupang.com</span>
            </a>
          </div>
          <p className="safe-service">
            <strong>우리은행 채무지급보증 안내</strong><br/>
            <span>
                당사는 고객님이 현금 결제한 금액에 대해<br/>우리은행과 채무지급보증 계약을 체결하여<br/>안전거래를 보장하고 있습니다.<br/>
            </span>
            <a href="http://cs.coupang.com/customerCenter/home" id="serviceCheck" className="service-check" title="서비스 가입사실 확인">서비스 가입사실 확인</a>
          </p>
        </div>
      </div>
      <div className="footer-layer3 slide-unit">
        <div className="slide-area">
          <ul className="award-list">
            <li><a href="https://csmessenger.coupang.com/cs-center/notice/main?id=2345" className="award-link3" title="정보보호 관리체계 ISMS 인증획득">정보보호 관리체계 ISMS 인증획득</a></li>
            <li><a href="https://csmessenger.coupang.com/cs-center/notice/main?id=2344" className="award-link4" title="개인정보보호 관리체계 PIMS 인증획득">개인정보보호 관리체계 PIMS 인증획득</a></li>
            <li><a href="https://csmessenger.coupang.com/cs-center/notice/main?id=2473" className="award-link5" title="정보보안 국제표준 ISO27001 인증획득">정보보안 국제표준 ISO27001 인증획득</a></li>
            <li><a href="https://www.eprivacy.or.kr:40018/seal/mark.jsp?mark=e&amp;code=2018-R029" className="award-link13" title="개인정보우수사이트 ePRIVACY인증획득">개인정보우수사이트 ePRIVACY인증획득</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-layer4">
        <div className="coupang-copyright">
          <p className="info">개별 판매자가 등록한 마켓플레이스(오픈마켓) 상품에 대한 광고, 상품주문, 배송 및 환불의 의무와 책임은 각 판매자가 부담하고,<br/> 이에 대하여 쿠팡은 통신판매중개자로서 통신판매의 당사자가 아니므로 일체 책임을 지지 않습니다. <br/> 쿠팡은 소비자 보호와 안전거래를 위해 신뢰관리센터(CM112@coupang.com)를 운영하고 있습니다.</p>
          <ul className="sns-link">
            <li><a href="https://www.facebook.com/Coupang.korea"  className="facebook" title="쿠팡 페이스북">쿠팡 페이스북</a></li>
            <li><a href="http://blog.coupang.com"  className="blog" title="쿠팡 블로그">쿠팡 블로그</a></li>
            <li><a href="https://www.instagram.com/coupang"  className="instagram" title="쿠팡 인스타그램">쿠팡 인스타그램</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
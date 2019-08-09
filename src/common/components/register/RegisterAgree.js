import React, { Component, Fragment } from 'react';

import '@vaadin/vaadin-checkbox'
import '@vaadin/vaadin-button';

class RegisterAgree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTermsOfService: false,
      isPersonalInformationCollectionAgreement: false
    }
    this.isTotalAgreeCheckEvent = this.isTotalAgreeCheckEvent.bind(this);
  }

  isTotalAgreeCheckEvent(boolean) {
    this.setState({isTermsOfService : boolean});
    this.setState({isPersonalInformationCollectionAgreement : boolean});
  }

  componentDidMount() {
    // 이용약관 동의
    document.querySelector('#lbTermsOfService').innerHTML = '이용약관';
    // const taTermsOfService = document.querySelector('#taTermsOfService');
    // taTermsOfService.value = '이용약관 내용 ---- 테스트\nsadf\ndsfan\nsadfnasdf\nasdfnasdf\nasdfn\nandfasd\nnas\nfn\ns\nfn\ns\nfn\ns\nf'
    // // taTermsOfService.value = termsOfServiceFile;
    // taTermsOfService.className = 'vaadin-text-area-register-agree';
    document.querySelector('#lbTermsOfServiceAgree').innerHTML = '이용악관을 확인하였으며 동의합니다. <span style="color:blue">(필수)</span> ';
    const cbxTermsOfServiceAgree = document.querySelector('#cbxTermsOfServiceAgree');
    cbxTermsOfServiceAgree.innerHTML = '동의함';

    // 개인정보 수집 이용동의
    document.querySelector('#lbPersonalInformationCollectionAgreement').innerHTML = '개인정보 취급방침';
    // const taPersonalInformationCollectionAgreement = document.querySelector('#taPersonalInformationCollectionAgreement');
    // taPersonalInformationCollectionAgreement.value = '테스트';
    // taPersonalInformationCollectionAgreement.className = 'vaadin-text-area-register-agree';
    document.querySelector('#lbPersonalInformationCollectionAgreementAgree').innerHTML = '개인정보 수집에 대한 약관을 확인하였으며 동의합니다. <span style="color:blue">(필수)</span>';
    const cbxPersonalInformationCollectionAgreement = document.querySelector('#cbxPersonalInformationCollectionAgreement');
    cbxPersonalInformationCollectionAgreement.innerHTML = '동의함';

    const isTotalAgreeCheckEvent = this.isTotalAgreeCheckEvent;
    // 하단 전체동의 및 확인
    document.querySelector('#lbTotalAgree').innerHTML = '위 내용을 모두 확인하였으며 전체 동의합니다.'
    const cbxTotalAgree = document.querySelector('#cbxTotalAgree');
    customElements.whenDefined('vaadin-checkbox').then(function() {
      const options = Array.from(document.querySelectorAll('vaadin-checkbox[value]'));
      cbxTotalAgree.innerHTML = '모두 동의함';
      cbxTotalAgree.addEventListener('change', function() {
        options.forEach(e => {
          e.checked = cbxTotalAgree.checked;
        })
        isTotalAgreeCheckEvent(cbxTotalAgree.checked);
      })
      const syncState = function() {
        const isChecked = function(cb) {
          return cb.checked;
        };
        cbxTotalAgree.checked = options.every(isChecked);
        cbxTotalAgree.indeterminate = options.some(isChecked) && !options.every(isChecked);
        isTotalAgreeCheckEvent(cbxTotalAgree.checked);
      };
  
      options.forEach(function(option) {
        option.addEventListener('change', syncState);
      });
      syncState();
    })

    const { goCommonRegisterCallback } = this.props;

    const btnCommonRegister = document.querySelector('#btnCommonRegister');
    btnCommonRegister.textContent = '일반 회원가입';
    btnCommonRegister.className = 'vaadin-button-register-agree-common'
    btnCommonRegister.addEventListener('click', function() {
      if (cbxTotalAgree.checked) {
        // 일반 회원가입 요청 이벤트
        goCommonRegisterCallback();
      } else {
        window.alert('동의하지 않은 항목이 있습니다.\n동의 후 다시 시도해주세요')
      }
    })

    let naverLoginRegister = new window.naver.LoginWithNaverId({
      clientId: "nwXOVGpHJOzfV1oBeUqn",
      // clientSecret = 'hr1p7IcsN7';
      callbackUrl: "http://algozip.co.kr/naver/reg/pop",
      isPopup: true, /* 팝업을 통한 연동처리 여부 */
      loginButton: {color: "white", type: 3, height: 60} /* 로그인 버튼의 타입을 지정 */
    })
    naverLoginRegister.init();

    // const btnNaverRegister = document.querySelector('#btnNaverRegister')
    // btnNaverRegister.textContent = '네이버로 회원가입';
    // btnNaverRegister.className = 'vaadin-button-register-agree-naver'
    // btnNaverRegister.addEventListener('click', function() {
    //   if (cbxTotalAgree.checked) {
    //     // 네이버 회원가입 요청 이벤트
    //     goNaverRegisterCallback();
    //   } else {
    //     window.alert('동의하지 않은 항목이 있습니다.\n동의 후 다시 시도해주세요')
    //   }
    // })
  }

  render() {
    return (
      <Fragment>
        <div className="div-register-agree">
          <div className="div-register-agree-box">
            <label id="lbTermsOfService" className="label-register-agree-sub-title"/>
            {/* <vaadin-text-area id="taTermsOfService" readonly/> */}
            <textarea id="taTermsOfService" rows="10" cols="100" readOnly>
            이용약관

제 1 조 (목적)
① 본 약관은 주식회사 크로스워크(이하 "회사"라 합니다)이 제공하는 ALGOZIP(알고집)서비스(이하 "서비스"라 합니다)를 회원이 이용함에 있어 필요한 "회사"와 회원간의 권리, 의무 및 기타 제반 사항을 정함을 목적으로 합니다.
② 본 약관은 "서비스" 관련 인터넷 홈페이지(http://www.algozip.co.kr, 이하 "홈페이지"라 합니다)에 게시하는 방법으로 공시합니다. 

제 2 조(약관의 효력 및 변경)
① 본 약관은 "홈페이지", 기타 "회사"가 게시하여 공시하거나 기타 다른 방법으로 "회원"에게 공지함으로써 효력을 발생합니다.
② "회사"는 필요하다고 인정하는 경우에는 본 약관을 변경할 수 있으며 또한 법률 또는 정부의 명령, 지시, 권고나 법원의 판결 또는 별도 서비스 사업자의 관련 정책 변경 등으로 인한 필요에 따라 "서비스"의 전부 또는 일부를 변경 또는 중지할 수 있습니다. 본 약관이 변경되거나 "서비스"가 변경되는 경우에는 지체 없이 변경 사유를 명시하여 제23조 제2항과 같은 방법으로 그 적용일자 7일 전부터 공시 또는 공지합니다. 단, 이용자에게 불리하게 약관 또는 "서비스"의 내용을 변경하는 경우에는 이를 약관변경 30일 전에 공지합니다.
③ "회사"가 전항에 따라 개정약관을 공지 또는 통지하면서 "회원"에게는 30일 기간 내에 의사표시를 하지 않으면 의사표시가 표명된 것으로 본다는 뜻을 명확하게 고지 또는 통지하였음에도 "회원"이 명시적으로 거부의 의사표시를 하지 아니한 경우 "회원"이 개정약관에 동의한 것으로 봅니다. "회원"은 변경된 "서비스" 또는 약관 사항에 동의하지 않을 경우, "서비스" 이용을 중단하거나 또는 "서비스" 이용에 대한 해지를 할 수 있습니다. 

제 3 조(약관 외 준칙)
본 약관에 명시되지 않은 사항에 대해서는 전기통신사업법 및 기타 관계법령과 "회사"가 정하여 공지한 세부이용지침 등의 규정에 의합니다. 

제 4 조(용어의 정의)
① 본 약관에서 사용하는 용어의 정의는 다음과 같습니다. 
1."서비스"(ALGOZIP(알고집)서비스)라 함은 구현되는 단말기(PC, 휴대형단말기 등의 각종 유무선 장치를 포함)와 상관없이 "회원"이 이용할 수 있는 부동산 정보제공 서비스 (부동산 시장가격, 실거래가 사례 및 각종 통계정보, 부동산 매물정보 등) 의 일체를 서비스를 의미합니다.
2."회원"이란 “회사”에 개인정보를 제공하고 회원가입 및 인증을 마친 자로서 회사가 제공하는 유무료 서비스를 이용할 수 있는 자를 말합니다.
3. "비회원"이란 회원으로 가입하지 않고 회사가 제공하는 “서비스”의 일부만을 이용할 수 있는 자를 말합니다.
② 본 약관에서 사용하는 용어의 정의는 제1항에서 정하는 것을 제외하고는 관계 법령, 상관례 등에서 정하는 바에 의합니다.

제 5 조(이용계약의 체결)
① "서비스"를 이용하고자 하는 개인 또는 법인사업자는 "관리자"를 통하여 본 약관에 동의하고, "회사"에 "회원" 가입 신청 및 "서비스" 이용 신청을 하게 되며, "회사"가 이를 승낙함으로써 이용계약이 체결됩니다.
② "서비스"는 제1항에 따라 이용계약이 체결된 때부터 개시됩니다. 단, 일부 "서비스"의 경우에는 사전 공지한 일자부터 "서비스"를 제공할 수 있습니다.
③ "회사"는 다음 각 호에 해당하는 "회원" 가입 신청 및 "서비스" 이용 신청에 대하여는 이를 승낙하지 아니합니다.
1.실명이 아니거나, 타인 또는 타사업자의 명의(성명, 주민등록번호, 사업자 등록번호, 법인등록번호 등)를 이용하여 신청한 경우
2.이용 신청서 또는 계약서의 내용을 허위로 기재하였거나 허위의 서류를 첨부하여 신청한 경우
3.회원 등록 사항을 누락하거나 오기하여 신청한 경우
4.만 19세 미만의 미성년자(청소년/아동)가 신청한 경우
5.신용정보의 이용과 촉진에 관한 법률에 의한 신용불량자로 등록되어 있는 경우
6.이용 신청자가 "서비스" 이용 조건을 충족하지 못하고 있거나, 기술상 "서비스" 제공이 불가능한 경우
7.법령, 공공질서 또는 미풍양속을 저해할 우려가 있거나 저해할 목적으로 신청한 경우
8.기타 "회사"가 정하여 사전 공지한 신청 요건이 충족되지 아니한 경우

④ "회원" 가입 후에도 "회사"가 공지하는 요건 및 절차에 따라 "서비스" 이용의 일부가 제한되거나, 사용하는 단말기의 변경 등에 따라 "회원"의 자격 또는 "서비스" 이용 범위, 이용대가 등이 변경 또는 제한될 수 있습니다.

제 6 조(회원정보의 변경)
① 회원은 회원정보관리 메뉴를 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한 아이디(ID)는 수정이 불가능 합니다.
② 제1항에 따라 등록된 "회원정보"가 부정확할 경우 "회사"는 "서비스"의 전부 또는 일부의 제공을 거절할 수 있으며, "회원정보"가 부정확하거나 "회원" 또는 "관리자"가 변경사항의 제공 또는 등록을 소홀히 함으로 인해 "회원"에게 발생한 손해에 대해서는 "회사"가 책임지지 아니합니다.

제 7 조(회원의 ID및 비밀번호 관리에 대한 의무)
① 회원의 ID와 비밀번호에 관한 관리책임은 회원에게 있으며, 이를 제 3자가 이용하도록 하여서는 안됩니다. 회원의 고의과실로 인해 발생하는 모든 불이익에 대한 책임은 회원이 부담합니다.
② 회원은 ID 및 비밀번호가 도용되거나 제 3자가 사용하고 있음을 인지한 경우, 즉시 본인의 비밀번호를 수정하는 등의 조치를 취하여야 하며, 즉시 회사에 통보하여 회사의 안내에 따라야 합니다.

제 8 조("서비스"의 이용)
① "프로그램"을 설치하거나 "서비스"에 로그인하는 회원은 "프로그램"의 자동 버전 체크, 자동 업데이트 등의 부가적 기능의 이용에 동의하는 것으로 보며, 동 기능의 이용에 동의하지 않는 "회원"은 사전에 설정을 변경하거나 "서비스"의 이용을 중단함으로써 동 기능의 이용을 거절할 수 있습니다. 
② "회원"이 "서비스"를 사용함에 있어 "회사"가 아닌 제3자를 통하여 다운로드 받아 설치한 프로그램 등으로 인하여 발생하는 모든 손해에 대하여 "회사"는 책임을 부담하지 않습니다. "회원"은 "회사"가 운영하는 "홈페이지" 등의 공식 다운로드 경로가 아닌 다른 경로를 통하여 배포된 프로그램이나 패치 프로그램에는 "회사"가 허용하지 않는 프로그램의 변경, 가공 요소가 포함되었을 가능성이 있으므로 "회원"은 회사가 제공하는 경로를 통하여 "프로그램"을 다운로드 받아야 합니다.
③ "회사"는 "서비스" 내의 개별서비스에 대한 별도의 약관을 둘 수 있으며, 개별서비스에서 별도로 적용되는 약관에 대한 동의는 회원이 개별서비스를 최초로 이용할 경우 별도의 동의 절차를 거치게 됩니다.

제 9 조("서비스" 제공 내용 및 이용요금)
① "회사"는 다음 각 호와 같이 "서비스"를 제공합니다.
1."회원"의 관심 지번을 입력하여, 시세 및 부가 정보를 조회하는 서비스
2. “회원”별 개인별 맞춤 서비스 
3.상기 각 호의 서비스를 위하여 실시간으로 정보를 조회, 입력/활용하기 위해 "회원"에게 제공되는 Application 서비스
② "회사"는 제1항의 "서비스" 외에 ALGOZIP(알고집)의 목적에 맞는 별도의 서비스를 추가로 제공하거나 기존 서비스를 변경할 수 있습니다.
③ "회원"이 "서비스"를 이용하는 대가로 "회사"는 "회원"에게 "서비스" 이용요금을 부과하며, "회원"은 지정된 방식으로 이를 납부합니다.
④ "회사"는 "서비스" 내의 개별서비스에 대한 별도의 약관을 둘 수 있으며, 개별서비스에서 별도로 적용되는 약관에 대한 동의는 회원이 개별서비스를 최초로 이용할 경우 별도의 동의 절차를 거치게 됩니다.
⑤ 회사가 제공하는 부동산 가격산정 서비스는 서비스 시점에 개발된 최선의 기술을 적용하여 추정한 통계적 예측값으로서 실제 거래금액을 담보하는 것이 아닙니다. 이 정보는 『감정평가 및 감정평가사에 관한 법률』상 ‘감정평가’가 아니며, 이 정보를 활용하여 금융기관의 대출 등에 활용할 수 없습니다.
⑥ 회사가 수집하여 이용자에게 제공하는 국토교통부 실거래 자료 등의 공공 데이터의 정확성 및 신뢰성에 대해서는 어떠한 보증도 하지 않으며, 정보의 오류로 인해 발생하는 모든 직접, 파생적, 징벌적, 부수적인 손해에 대해 책임을 지지 않습니다. 회사는 인터넷 사이트 및 모바일 어플리케이션을 통해 제공되는 정보의 정확도를 높이기 위해 최선의 노력을 다합니다.


제 10 조(요금 청구 및 납입) 보완필요
① "회사"는 "서비스" 이용과 관련하여 이용자가 납부하여야 할 요금은 이용료 안내에 게재한 바에 따릅니다. 이용료에 관한 상세한 내용은 유료서비스 이용계약 체결 시 제공되는 안내화면에서 공지하거나 기타 회사가 적절하다고 판단하는 방법으로 공지합니다
② 요금 등은 서비스 별로 정하는 바에 따라 선납제를 기본으로 하며 필요에 따라 회사와 별도 계약을 통하여 후납 할 수 있습니다.

제 11 조(이용계약의 해지)
① "회원"이 "서비스" 이용계약의 해지를 희망하는 경우 "서비스" 관련 홈페이지, 유선 또는 별도 방법으로 정해진 내용과 절차에 따라 "서비스" 이용계약의 해지를 신청하여야 하며, "회사"가 이를 확인함으로써 "서비스" 이용계약 해지의 효력이 발생합니다.
② "회원"에게 제14조에 규정한 직권 해지 사유가 발생하거나, 회원이 제19조 제2항에 규정한 회원의 의무를 이행하지 않을 경우, "회사"는 본 약관 및 "회사"가 정하는 바에 따라 "서비스"에 대한 이용계약을 해지할 수 있습니다.
③ "회원"이 "회사"가 고지한 이용요금을 납부하지 않을 경우, "회사"는 "서비스" 이용계약을 해지할 수 있습니다.
④ 이용계약의 해지는 "회원"의 채무 이행 의무 또는 "회사"의 손해배상청구권 행사에 영향을 미치지 않습니다.

제 12 조("서비스"의 제공시간)
① "서비스"의 제공은 연중무휴 1일 24시간을 원칙으로 합니다. 다만 "회사"의 업무상이나 기술상의 이유로 "서비스"가 일시 중지 또는 중단될 수 있고, 또한 운영상의 목적을 위하여 "회사"가 정한 기간에는 "서비스"가 일시 중지 또는 중단될 수 있습니다. 이러한 경우 "회사"는 사전 또는 사후에 이를 공지합니다.
② "회사"는 "서비스"를 일정 범위로 분할하여 각 범위 별로 제공 가능한 시간을 별도로 정할 수 있으며, 이 경우 그 내용을 사전에 공지합니다. 

제 13 조("서비스" 이용의 일시 중지 또는 중단)
① "회사"는 다음 각 호의 사유 또는 업무상 및 기술상의 문제가 발생하는 경우 그 해결을 위하여 필요한 기간 동안, "서비스"의 운영 목적상으로 필요한 경우에는 "회사"가 정한 기간 동안 "서비스"의 전부 또는 일부를 일시 중지 또는 중단할 수 있습니다.
1."서비스"용 설비의 보수 등으로 인한 부득이한 경우 
2.회원이 "회사"의 영업활동을 방해하는 경우 
3.회원의 서버 등 "서비스" 이용을 위한 회원의 장비 등에 문제가 발생한 경우
4.정전, 제반 설비의 장애 또는 이용량의 폭주 등으로 정상적인 "서비스" 제공에 지장이 있는 경우
5.기타 천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우 
② 제1항에 의한 "서비스"의 일시 중지 또는 중단의 경우 "회사"는 회원에게 사전 공지합니다. 다만, "회사"가 통제할 수 없는 사유로 인하여 사전 공지가 불가능한 경우에는 사후에 공지합니다.
③ "회사"는 본 조에 의한 "서비스" 중단으로 발생하는 문제에 대해서는 어떠한 책임도 지지 않습니다. 

제 14 조("서비스" 이용의 제한, 정지 및 직권 해지)
① "회사"는 회원이 다음 각 호에 해당하는 경우 사전 통지 후에 회원의 "서비스" 이용을 제한 또는 정지시킬 수 있고, 동일 행위가 반복되거나 "회사"가 지정한 기간 내에 그 사유가 시정되지 않을 때에는 직권 해지를 할 수 있습니다.
1.본 약관에 규정된 회원의 의무를 이행하지 아니한 경우 
2.정보통신설비의 오작동이나 정보 등의 파괴를 유발시키는 컴퓨터 바이러스 프로그램 등을 유포하는 경우
3."회사", 다른 "회원" 또는 제3자의 지적재산권 기타 권리를 침해하는 경우
4.방송통신심의위원회 등 외부기관의 시정요구가 있거나 불법선거운동과 관련하여 선거관리위원회의 유권해석을 받은 경우
5.타인의 이용자ID, 비밀번호 기타 개인정보를 부정하게 사용하는 경우
6."서비스"를 이용하여 얻은 정보를 "회사"의 사전 승낙 없이 복제 또는 유통시키거나 상업적으로 이용하는 경우
7.전기통신 관련법령 등 관계법령에 위반하는 행위를 하는 경우
8."회사"의 "서비스" 운영을 고의로 방해하는 경우
9.가입한 이름이 실명이 아닌 경우
10.동일 "회원"이 각기 다른 ID로 이중등록을 한 경우
11.공공질서 및 미풍양속에 저해되는 내용을 고의로 유포시킨 경우
12.타인의 명예를 손상시키거나 불이익을 주는 행위를 한 경우
13.본 약관을 포함하여 기타 "회사"가 정한 이용조건에 위반한 경우 
② "회사"가 제1항에 따라 직권 해지할 경우, "회원"에게 이를 통지하고 직권 해지 전 30일간의 소명기회를 부여합니다.
③ ②항에도 불구하고 "회사"는 "회원"이 제14조("서비스" 이용의 제한, 정지 및 직권 해지)에서 정한 행위를 하였을 경우 해당 조항에 따라 사전통지 없이 계약을 해제, 해지하거나 또는 기간을 정하여 서비스이용을 제한할 수 있습니다.
④ "회사"가 제3항에 의해 환급이 발생할 경우, "회원"은 "회사"가 정한 환불정책에 따라 해당하는 금액을 환급받을 수 있습니다.

제 15 조("서비스"이용의 취소 및 이용요금 정산) 보완필요
① "회원"의 사정으로 "서비스"가입 후 납부한 금액에 해당하는 포인트를 전혀 사용하지 않고, 14일 이내에 해지를 요구하는 경우, "회사"는 "회원"에게 별도의 이용요금을 청구하지 않고 이용자가 반환을 요청한 시점으로부터 익월 말일까지 이용자가 결제한 은행계좌로 반환요청 요금을 반환합니다. 단, 요금 반환 시 결제수수료를 차감할 수 있습니다..
② "회원"의 사정으로 "서비스"가입 후 일부 포인트를 사용한 후 반환을 요청하는 경우 회사는 이용자가 반환을 요청한 시점으로부터 익월 말일까지 이용자가 결제한 은행계좌로 반환요청 요금을 반환합니다. 단, 요금반환은 반환요청 금액이 최소5000원 이상인 경우에만 가능하며 요금 반환 시 결제수수료를 차감할 수 있습니다.
③ 다음 각 호의 내용은 환불 금액에서 제외합니다. 
1. 설치 및 교육에 따른 부대비용
2. 건별 구매한 조회권 구입비용

제 16 조(정보의 제공 등)
① "회사"는 "서비스"를 운영함에 있어 영리목적의 광고성 정보를 포함한 각종 정보를 "서비스" 화면에 게시하거나 "회원"의 SMS, 음성 사서함, 이메일 또는 서신우편 등의 방법으로 회원에게 제공할 수 있습니다.
② "회원"은 제1항에 정한 정보의 수신을 원하지 않을 경우 관련법령 또는 "회사"가 정한 방법과 절차에 따라 당해 정보의 수신을 거부할 수 있습니다. 단, "서비스" 이용 확인 등을 위하여 "회사"가 "회원"에게 정보를 전달하여야 할 필요가 있는 경우에는 그러하지 않습니다.

제 17 조(지적재산권 등)
① "회원"은 "서비스"를 이용하여 얻은 정보를 가공, 판매하거나 "서비스"에 게시된 자료를 영리 목적으로 이용 또는 제3자에게 이용하게 할 수 없으며, "서비스" 내에 게시된 정보 및 게시물의 저작권, 프로그램저작권, 초상권 등 지적재산권을 포함한 각종 권리는 관련법령에 따라 보호받습니다
② "회원"이 "서비스" 이용과 관련하여 제3자의 저작권, 프로그램저작권 등의 지적재산권이나 각종 권리를 침해하였음을 이유로 "회사"와 제3자간에 손해배상청구 등의 분쟁이 발생하는 경우 "회원"은 "회사"를 면책시켜야 하며, "회원"은 그로 인해 "회사"에 발생한 모든 손해를 배상하여야 합니다.

제 18 조("회사"의 권리 의무)
① "회사"는 본 약관이 정하는 바에 따라 "서비스"를 제공하기 위해 최선을 다합니다.
② "회사"는 "회원"의 "서비스" 이용요금의 미납 정보, 기타 "서비스" 관련 정보의 제공을 위하여 "회원"의 휴대전화번호로 SMS를 전송하거나 이메일, 우편물 등을 보낼 수 있습니다.
③ "회사"는 "서비스"와 관련한 "회원"의 불만사항이 접수되는 경우 이를 신속하게 처리하여야 하며, 신속한 처리가 곤란한 경우 그 사유와 처리 일정을 "서비스" 화면에 게시하거나 SMS, 이메일 등을 통하여 동 "회원"에게 통지합니다.

제 19 조('회원'의 권리 의무)
① "회원"은 본 약관이 정하는 바에 따라 "서비스"를 이용하며, "서비스" 이용요금을 납부할 의무가 있습니다. 
② "회원"은 "서비스" 이용 시 다음 각 호의 행위를 하여서는 아니 됩니다.
1."회원" 가입 신청 또는 등록정보 변경 시 허위 사실을 기재하거나, 부정하게 사용하는 행위
2."서비스"를 이용하여 얻은 정보를 "회사"의 사전 동의 없이 복제 또는 유통시키거나 상업적으로 이용하는 행위
3.타인의 명예를 손상시키거나 불이익을 주는 행위
4."회사" 또는 제3자의 저작권 및 기타 권리를 침해하는 행위
5.서비스"와 관련된 설비의 오동작이나 정보 등의 파괴 또는 혼란을 유발시키는 컴퓨터 바이러스 감염 자료를 등록 또는 유포하는 행위
6."서비스" 운영을 고의로 방해하거나 "서비스"의 안정적 운영을 방해할 수 있는 정보 또는 수신자의 명시적인 수신거부의사에 반하여 광고성 정보를 전송하는 행위
7.타인으로 가장하는 행위 및 타인과의 관계를 허위로 명시하는 행위
8.다른 "회원"의 개인정보를 수집, 저장, 공개하는 행위
9.자기 또는 타인에게 재산상의 이익을 주거나 타인에게 손해를 가할 목적으로 허위의 정보를 유통시키는 행위
10.기타 불법적이거나 부당한 행위
③ "회원"은 관련법령, 본 약관의 규정, "서비스"의 세부이용지침 및 "회사"가 통지하거나 "서비스" 상에 공지한 사항 등을 준수하여야 하며, 기타 "회사"의 업무에 방해되는 행위를 하여서는 아니 됩니다.

제 20 조("회원"의 개인정보 보호)
"회사"는 관련법령이 정하는 바에 따라서 "회원"의 개인정보를 보호하기 위하여 노력합니다.

제 21 조(개인정보의 수집, 이용 및 활용)
① "회사"의 원활한 "서비스" 운영과 "회원"의 최적화된 "서비스" 이용(및 요금 정산을 포함) 등을 위하여 "회사"는 "서비스" 이용에 필요한 정보 (이름, 상호, 사업자등록번호, 법인등록번호, 전화번호, 전자우편주소 등)를 수집 및 활용할 수 있으며, "회원"은 이에 동의합니다.
② "회사"는 "회원"이 제공한 개인정보를 다음 각 호의 경우를 제외하고, "회원"의 사전 동의 없이 "서비스" 운영 이외의 목적으로 이용하지 아니합니다.
1.통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제3자에게 제공하는 경우
2.관계법령에 의하여 정해진 절차와 방법에 따른 관계기관의 요구가 있는 경우
③ "회사"는 "회원"의 개인정보를 당해 "회원"이 "서비스"의 "회원"으로 가입되어 있는 기간에 한하여 보유하고 이를 활용하며, "서비스" 해지의 경우 당해 "회원"으로부터 제공받은 개인정보를 지체 없이 파기합니다. 단, 관련법령에 따라 필요한 경우는 예외로 합니다.
④ "회사"는 "서비스" 제공과 관련하여 "회원" 전체 또는 일부의 개인정보에 대한 통계자료를 작성하기 위하여 "회원"의 Desk Top PC, 태블릿 PC, 스마트폰 등의 단말기에 대해 쿠키를 전송할 수 있습니다. 이 경우 "회원"은 쿠키의 수신을 거부하거나 쿠키의 수신에 대하여 경고하도록 컴퓨터 브라우저의 설정을 변경할 수 있으며, 쿠키의 수신에 대한 설정변경에 의해 "서비스" 이용이 변경되는 것은 "회원"의 책임입니다.

제 22조 (개인정보의 처리 및 관리의 위탁)
① "회사"는 개인정보의 수집, 취급 및 관리 등의 업무(이하 "업무"라 합니다)를 스스로 수행함을 원칙으로 하나, "서비스" 제공을 위하여 필요한 경우 "업무"의 일부 또는 전부를 "회사"가 선정한 자에 위탁할 수 있습니다.
② "회원"은 언제든지 "회사"가 가지고 있는 자신의 개인정보에 대한 열람 또는 자신의 개인정보를 이용하거나 제3자에게 제공한 내역을 요구할 수 있고, 자신의 개인정보에 오류가 있는 경우 그 정정을 요구할 수 있으며, "회사"는 이에 대해 지체 없이 필요한 조치를 취할 의무를 집니다. "회원"이 오류의 정정을 요구한 경우 "회사"는 그 오류를 정정할 때까지 당해 개인정보를 이용하지 않습니다.
③ "회원"은 언제든지 개인정보의 제공 및 활용에 대한 동의를 철회할 수 있으며, "회사"는 이에 대해 지체 없이 필요한 조치를 취할 의무를 집니다.

제 23조("회원"에 대한 통지 및 공지)
① "회원"에 대한 통지를 하는 경우 "회사"는 회원이 등록한 이메일 주소 또는 SMS 등으로 할 수 있습니다.
② "회사"는 불특정 다수 "회원"에 대한 통지의 경우 "서비스" 관련 홈페이지 또는 "서비스" 내의 메뉴 등에 공지함으로써 개별 통지에 갈음할 수 있습니다.

제 24조 (양도금지)
"회원"은 "회원" 가입에 따른 계약상의 지위 또는 권리/의무의 전부 또는 일부를 제3자에게 양도, 위임하거나 담보제공 등의 목적으로 사용할 수 없습니다.

제 25조 (손해배상)
① "회사"가 제공하는 "서비스"로 인하여 "회원"에게 손해가 발생한 경우 그러한 손해가 "회사"의 고의 또는 과실로 인한 것일 때, 손해에 대한 책임은 해당 "회사"가 부담하며, 그 책임의 범위는 "서비스" 이용과 관련된 통상손해로 합니다.
② "회원"이 본 약관의 규정을 위반함으로 인하여 "회사"에 손해가 발생하게 되는 경우, 본 약관을 위반한 "회원"은 "회사"에 발생한 손해를 배상하여야 합니다.
③ "회원"이 "서비스"를 이용함에 있어 행한 불법행위나 본 약관 위반행위로 인하여 "회사"와 당해 "회원" 이외의 제3자 간에 손해배상청구 또는 소송을 비롯한 각종 분쟁이 발생하는 경우, 당해 "회원"은 자신의 책임과 비용으로 "회사"를 면책시켜야 하며, 당해 "회원"은 그로 인하여 "회사"에 발생한 모든 손해를 배상하여야 합니다.

제 26조 (면책사항)
① "회사"는 천재지변 또는 이에 준하는 불가항력으로 인하여 "서비스"를 제공할 수 없는 경우에는 "서비스" 제공에 관한 책임이 면제됩니다.
② "회사"는 "회원"의 귀책사유로 인한 "서비스"의 이용 장애에 대하여 책임을 지지 않습니다.
③ "회사"는 "회원"이 "서비스"를 이용함으로써 기대하는 수익을 얻지 못한 것에 대하여 책임을 지지 않으며, 그 밖에 "서비스"를 통하여 얻은 자료로 인한 손해 등에 대하여도 책임을 지지 않습니다.
④ "회사"는 "회사"가 직접 제공하지 아니하는 정보의 신뢰도 및 정확성 등 내용에 대하여는 책임을 지지 않습니다.
⑤ "회사"는 "회원" 상호간 또는 "회원"과 제3자 상호간에 "서비스"를 매개로 발생한 분쟁에 대해서는 개입할 의무가 없으며 이로 인한 손해를 배상할 책임이 없습니다.

제 27조 (분쟁의 해결 및 관할법원)
① "서비스" 이용과 관련하여 "회사"와 "회원" 간에 분쟁이 발생한 경우, "회사"와 "회원"은 분쟁의 해결을 위해 성실히 협의합니다.
② 제1항의 협의에서도 불구하고 분쟁이 해결되지 않아 일방 당사자가 법원에 소를 제기하는 경우, 제1심 관할법원은 "회사"의 관할법원으로 합니다.
부칙
(시행일) 본 약관은 2019년 08월 01일부터 시행합니다. 

            </textarea>
            {/* <iframe id="frameTermsOfService" src={termsOfService} width='0' height='0'></iframe> */}
            <div className="div-register-agree-box-check">
              <label id="lbTermsOfServiceAgree" className="label-register-agree-column"/>
              <vaadin-checkbox id="cbxTermsOfServiceAgree" value="cbxTermsOfServiceAgree"/>
            </div>
          </div>

          <div className="div-register-agree-box">
            <label id="lbPersonalInformationCollectionAgreement" className="label-register-agree-sub-title"/>
            {/* <vaadin-text-area id="taPersonalInformationCollectionAgreement" readonly/> */}
            <textarea id="taPersonalInformationCollectionAgreement" rows="10" cols="100" readOnly>
            개인정보 취급방침
㈜크로스워크 (이하 "회사"라 함) 는 「신용정보의 이용 및 보호에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「개인정보 보호법」, 「통신비밀보호법」 등 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보취급방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.

본 개인정보취급방침은 회사가 제공하는 제반 서비스 이용에 적용되며 다음과 같은 내용을 담고 있습니다.
1. 개인정보의 수집
2. 개인정보의 이용목적
3. 개인정보의 보유 및 이용기간
4. 개인정보의 파기
5. 개인정보의 제공
6. 이용자의 권리보호
7. 개인정보의 기술적/관리적 보호대책
8. 개인정보관리책임자 및 담당부서의 연락처
9. 링크 사이트에 대한 책임
10. 쿠키의 운용 및 거부
11. 고지의 의무

1. 개인정보의 수집
① 회사가 이용자의 개인정보를 수집하는 경우에는 아래의 원칙을 준수하고 있으며, 반드시 사전에 이용자에게 해당 사실을 알리고 동의를 구합니다.
가. 서비스 제공에 필요한 최소한의 개인정보를 수집합니다.
- 필수정보의 수집: 해당 서비스의 본질적 기능을 수행하기 위한 정보를 필수항목으로 수집합니다.
- 선택정보의 수집: 이용자에게 특화된 서비스를 제공하기 위해 최소한의 정보를 추가 수집하는 경우, 선택항목으로 수집합니다. 다만, 선택항목을 입력하지 않는 경우에도 다른 서비스 이용 제한은 없습니다.

나. 민감 정보를 수집하지 않습니다.
- 회사는 이용자의 소중한 인권을 침해할 우려가 있는 민감한 정보(인종, 사상 및 신조, 정치적 성향이나 범죄기록, 의료정보 등)를 수집하지 않습니다. 단, 법령에서 민감 정보의 처리를 요구하거나 허용하는 경우에는 반드시 이용자에게 해당 사실을 알리고 사전 동의를 구하도록 합니다.
② 회사가 수집하는 개인정보 항목은 아래와 같습니다.
[개인정보 수집항목]
수집시점	개인정보 수집항목	수집근거
일반회원가입	필수항목: 회사코드, 아이디, 비밀번호, 회사명, 사업자등록번호, 담당자명, 연락처, 이메일	이용자의 동의
자동생성정보	IP, 쿠키, 방문 일시, 서비스 이용기록, 기기정보, 불량 이용기록 등 서비스 이용 과정에서 자동으로 생성되어 수집되는 정보	이용자의 선택(거부조치 미적용)
③ 회사는 다음과 같은 방법으로 이용자의 개인정보를 수집합니다 
가. 홈페이지, 서면양식, 팩스, 전화, 고객센터, 이메일, 협력회사로부터의 제공, 생성정보 수집 툴을 통한 수집
나. 자동생성정보는 생성정보 수집 툴을 통해 수집합니다. 
④ 회사는 개인정보의 수집•이용에 법정대리인의 동의가 필요한 만 14세 미만 아동의 개인정보는 원칙적으로 수집하지 않습니다. 단, 법정대리인의 동의를 얻은 경우에는 만 14세 미만 이용자의 개인정보를 수집•이용할 수 있습니다. 

2. 개인정보의 이용목적
회사는 이용자의 소중한 개인정보를 다음과 같은 목적으로만 이용하며, 목적이 변경될 경우에는 사전에 이용자의 동의를 구합니다. 
① 이용자 식별, 가입의사 확인 및 회원제 서비스 제공
② 다양한 서비스 제공, 문의사항 또는 불만 처리, 공지사항 전달
③ 이용자와 약속한 서비스 제공, 유료 서비스 구매 및 이용 시 요금 정산
④ 신규 서비스 출시 및 이벤트 행사 시 정보전달, 마케팅 및 광고 등에 활용
⑤ 서비스 이용기록과 접속빈도 분석, 서비스 이용에 대한 통계, 맞춤형 서비스 제공, 홈페이지 접속 • 이용 유지, 서비스 개선에 활용.
3. 개인정보의 보유 및 이용기간
① 이용자의 개인정보는 개인정보의 수집 및 이용목적 달성을 위해 이용기간에만 제한적으로 이용하고 있습니다. 다만, 관계법령에 의해 보관해야 하는 정보는 법령이 정한 기간 동안 보관합니다.
[관계법령에 따른 개인정보의 보관]
회사는 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 아래와 같이 관계법령에서 정한 일정한 기간 동안 개인정보를 보관합니다
개인정보	보존근거	보존기간
서비스 이용 관련 기록(접속IP정보, 접속기기정보)	통신비밀보호법	3개월
표시/광고에 관한 기록	전자상거래 등에서의 소비자보호에 관한 법률	6개월
계약 또는 청약철회 등에 관한 기록	전자상거래 등에서의 소비자보호에 관한 법률	5년
대금결제 및 재화 등의 공급에 관한 기록	전자상거래 등에서의 소비자보호에 관한 법률	5년
소비자의 불만 또는 분쟁처리에 관한 기록	전자상거래 등에서의 소비자보호에 관한 법률	3년
전자금융 거래에 관한 기록	전자금융거래법	5년
② 회원에서 탈퇴한 후의 민원처리를 위하여 내부지침에 따라 회원 탈퇴 후 1년 간 CI/DI, 성명, 생년월일, 내/외국인구분, 성별, 연락처 정보를 보관합니다. 

4. 개인정보의 파기
이용자의 개인정보는 개인정보의 수집•이용목적이 달성되면 해당 정보를 지체 없이 파기합니다. 다만, 관계 법령에 의해 개인정보를 보관해야 하는 경우에는 기존 저장 공간과 구분된 별도의 저장공간에 옮겨서 정해진 기간 동안 저장한 후 파기합니다. 이 때 별도 저장되는 개인정보는 법령에 의한 경우가 아니고서는 절대 다른 용도로 이용되지 않습니다.
전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적인 방법을 이용하여 완전하게 삭제하고, 종이로 출력된 개인정보는 분쇄하거나 소각하여 파기합니다. 

5. 개인정보의 제공
① 약속한 서비스를 제공하기 위해 다음과 같은 업무를 위탁하고 있습니다.
이용자에게 약속한 서비스를 제공하는 데에 반드시 필요한 업무 중 일부를 외부 업체로 하여금 수행하도록 개인정보를 위탁하고 있습니다. 그리고 위탁 받은 업체가 개인정보보호 관계 법령을 위반하지 않도록 관리•감독하고 있습니다.
[개인정보위탁업체]
위탁업체	위탁업무내용	위탁개인정보 항목
타스	SMS, SMTP 메일 발신 서비스 제공	이메일
② 다양한 서비스를 제공하기 위해 다음과 같이 개인정보를 제 3자에게 제공하고 있습니다.특정 서비스 이용에 필요한 목적을 위해 최소한의 개인정보를 제3자에게 제공하고 있습니다. 개인정보를 제 3자에게 제공해야 하는 경우에는 반드시 사전에 이용자에게 해당 사실을 알리고 동의를 구합니다. 해당 서비스의 이용을 원치 않는 경우, 개인정보 제 3자 제공 동의를 거부할 수 있으며, 동의를 거부하더라도 다른 서비스 이용에 영향을 미치지 않습니다. 다만, 아래의 경우에는 예외로 하고 있습니다. 
가. 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우
나. 이용자가 사전에 동의한 경우 
[제3자 정보제공업체]
위탁업체	위탁업무내용	위탁개인정보 항목
타스	SMS, SMTP 메일 발신 서비스 제공	이메일
※ 위 사항은 각각의 특정 서비스가 결합된 제휴서비스만 해당합니다. 따라서, 해당 서비스 이용을 원치 않는 고객은 동의를 거부할 수 있으며, 본 동의를 거부하더라도 다른 서비스 이용에 영향을 미치지 않습니다. 

6. 이용자의 권리 보호
회사는 이용자의 권리를 다음과 같이 보호하고 있습니다. 
① 이용자 및 법정 대리인은 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있습니다. 개인정보 조회와 수정은 ‘회원정보변경’ 메뉴에서 본인확인 절차를 거친 후 직접 진행할 수 있습니다.
② 언제든지 개인정보 제공에 관한 동의철회/가입해지 요청을 할 수 있습니다. 동의철회/가입 해지를 원하시는 경우, "회원탈퇴" 메뉴에서 본인확인 절차를 거친 후 탈퇴를 진행하시면 됩니다. 다만, 회원탈퇴를 하신 경우, 서비스의 일부 또는 전부 이용이 어려울 수 있습니다.
③ 이용자가 개인정보의 오류에 대한 정정을 요청한 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3 자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 합니다.
④ 회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 "3. 개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.

7. 개인정보의 기술적/관리적 보호 대책
회사는 이용자들의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적 대책을 강구하고 있습니다. 
① 내부관리계획의 수립 및 시행
개인정보내부관리계획규정 등을 수립하고 시행하고 있습니다.
② 개인정보의 암호화 
개인정보처리시스템에서의 ID, 비밀번호 및 고유식별번호는 암호화되어 관리되고 있습니다.
③ 해킹 등에 대비한 기술적 대책 
해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신•점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.
④ 개인정보처리시스템 접근 제한 
개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단접근을 통제하고 있습니다.
⑤ 개인정보문서에 대한 안전성 확보 조치
원칙적으로 개인정보문서는 그 취급을 제한하고 있으며, 업무 수행 상 불가피하게 취급하는 개인정보문서는 분실, 도난, 유출, 변조, 훼손되지 아니하도록 안전성 확보 조치를 다하고 있습니다.
⑥ 개인정보 취급 직원의 최소화 및 교육 
개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있으며, 정기적으로 교육을 실시하고 있습니다.

8. 개인정보관리책임자 및 담당부서의 연락처
회사는 이용자의 개인정보가 훼손되거나 침해되지 않도록 최선을 다하고 있으며, 법령상 또는 계약상 의무를 위반하여 사고가 발생한 경우에는 개인정보보호 책임자로서 모든 책임을 집니다. 다만, 회사가 개인정보 보호를 위해 법률 상 요구되는 기술적, 물리적, 관리적 조치를 다하였음에도 불구하고, 이용자 본인의 부주의나 회사가 관리하지 않는 영역에서의 사고 등 회사의 귀책에 기인하지 않은 손해에 대해서는 책임을 지지 않습니다.
① 개인정보관리(보호) 책임자 
개인정보책임자	직급	소속
최성무	CTO	개발팀
② 담당부서 연락처 
가. 주소: 서울특별시 
나. Tel: 
다. Email: 
③ 기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다. 
가. 개인정보침해신고센터 (privacy.kisa.or.kr, 국번없이 118)
나. 대검찰청 과학수사부 사이버수사과 (cybercid.spo.go.kr)
9. 링크 사이트에 대한 책임
회사는 이용자에게 다른 웹사이트에 대한 링크를 제공할 수 있습니다. 다만, 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본 "개인정보취급방침"이 적용되지 않습니다. 
10. 쿠키의 운용 및 거부
회사는 쿠키(Cookie)를 설치•운영하고 있고, 이용자는 이를 거부할 수 있습니다.
쿠키는 이용자에게 보다 빠르고 편리한 웹사이트 사용을 지원하고, 맞춤형 서비스를 제공하기 위해 사용됩니다. 
① 쿠키의 정의 
쿠키란 웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에 보내는 아주 작은 텍스트 파일로서 이용자의 컴퓨터에 저장됩니다. 이후 이용자가 웹 사이트에 방문할 경우 웹 사이트 서버는 이용자의 하드 디스크에 저장되어 있는 쿠키의 내용을 읽어 이용자의 환경설정을 유지하고, 맞춤화된 서비스를 제공하게 됩니다. 
② 쿠키 사용목적 
쿠키를 통해 이용자가 선호하는 설정 등을 저장하여 이용자에게 보다 빠른 웹 환경을 지원하며, 편리한 이용을 위한 서비스 개선에 활용합니다. 쿠키를 통해 이용자는 보다 손쉽게 회사가 제공하는 서비스를 이용할 수 있게 됩니다.
또한 회사는 여러 서비스의 접속빈도, 방문시간, 각종 이벤트 참여도, 방문횟수 등을 분석하여 이용자의 취향과 관심분야를 파악합니다. 이를 바탕으로 광고를 포함한 개인 맞춤형 서비스를 제공합니다. 
③ 쿠키 설치/운영 및 거부 
이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수도 있습니다.
다만, 쿠키 설치를 거부할 경우 웹 사용이 불편해지며, 로그인이 필요한 일부 서비스 이용에 어려움이 있을 수 있습니다. 
④ 설정 방법의 예 
가. Internet Explorer의 경우 
웹 브라우저 상단의 도구 메뉴 > 인터넷 옵션 > 개인정보 > 설정
나. Chrome의 경우 
웹 브라우저 우측의 설정 메뉴 > 화면 하단의 고급 설정 표시 > 개인정보의 콘텐츠 설정 버튼 > 쿠키
다. 브라우저의 버전 및 종류에 따라 설정방법에 차이가 있을 수 있습니다. 보다 자세한 설명은 해당 브라우저의 도움말을 이용하시기 바랍니다. 

11. 고지의 의무
회사는 위 내용에 대한 추가, 삭제, 수정이 있을 경우에는 시행일로부터 최소 7일 전에 공지사항 등을 통해 이용자에게 설명 드립니다. 다만, 이용자의 소중한 권리 또는 의무와 관련된 중요한 내용의 변경은 최소 30일 전에 알려드립니다. 
개인정보취급방침 시행일자: (시행일) 본 약관은 2018년 11월 01일부터 시행합니다.


            </textarea>
            <div className="div-register-agree-box-check">
              <label id="lbPersonalInformationCollectionAgreementAgree" className="label-register-agree-column"/>
              <vaadin-checkbox id="cbxPersonalInformationCollectionAgreement" value="cbxPersonalInformationCollectionAgreement"/>
            </div>
          </div>

          <div className="div-register-agree-total">
            <label id="lbTotalAgree" className="label-register-agree-total"/>
            <vaadin-checkbox id="cbxTotalAgree"/>
          </div>
          <div className="div-register-agree-button">
            <vaadin-button id="btnCommonRegister"/>
            {/* <vaadin-button id="btnNaverRegister"/> */}
            <div id="naverIdLogin"></div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default RegisterAgree;
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productManageActions from "../../oms/modules/ProductManageModule";
import * as changePointHistoryActions from "../../oms/modules/ChangePointHistoryModule";
import * as paymentActions from "../modules/PaymentModule";
import * as userManageActions from "../../scm/modules/UserModule";
import { PaymentProductListGrid, PaymentComplete } from "../index";

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-notification';

import { removeComma } from '../../common/utils';

class PaymentContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      search: {
        productCd: null,
        productNm: null,
        productPoint: null
      },
      productDto: {
        productSid: null,
        productCd: null,
        productNm: null,
        productPoint: null,
        pointCash: null
      },
      selectList: [],
      totalPay: 0,
      totalPoint: 0
    };
  }

  // 그리드의 선택 시 선택한 컬럼의 값을 선택목록에 저장
  selectCallback = async (selectDto) => {
    this.setState({productDto: selectDto});
    const { productDto } = this.state;
    const lbTotalPayCommit = document.querySelector('#lbTotalPayCommit');
    const naverPayBtn = document.querySelector('#naverPayBtn');
    lbTotalPayCommit.hidden = false;
    
    if (productDto === undefined) {
      naverPayBtn.hidden = true;
      document.querySelector('#lbSelectPay').innerHTML = "0";
      document.querySelector('#lbSelectPoint').innerHTML = "0";
      lbTotalPayCommit.innerHTML ="선택된 상품이 없습니다. 상품을 선택해주세요."
    } else {
      naverPayBtn.hidden = false;
      document.querySelector('#lbSelectPay').innerHTML = productDto.pointCash;
      document.querySelector('#lbSelectPoint').innerHTML = productDto.productPoint;
      lbTotalPayCommit.innerHTML ="※ 충전되는 포인트는 <strong>"+productDto.productPoint+"P</strong>이며 결제 시 부가세 10%를 포함한 <strong>"+productDto.pointCash+"원</strong>이 결제 됩니다."
    }
  }

  /* 2019-06-04 : 다중선택 미사용으로 인한 비활성화
  selectCallback = async (selectDto) => {
    const { selectList } = this.state;
    selectList.push(selectDto.pointCash, selectDto.productPoint, selectDto.productSid)
    this.setState({selectList})
    const lbTotalPayCommit = document.querySelector('#lbTotalPayCommit');
    const naverPayBtn = document.querySelector('#naverPayBtn');
    lbTotalPayCommit.hidden = false;
    naverPayBtn.hidden = false;
    document.querySelector('#lbSelectPay').innerHTML = selectDto.pointCash;
    document.querySelector('#lbSelectPoint').innerHTML = selectDto.productPoint;
    if (selectList.length > 1) {
      let totalPayValue = 0;
      let totalPointValue = 0;
      for (let index=0; index<selectList.length; index+=3) {
        totalPayValue += selectList[index];
        document.querySelector('#lbTotalPay').innerHTML = totalPayValue;
      }
      for (let index=0; index<selectList.length; index+=3) {
        totalPointValue += selectList[index+1];
        document.querySelector('#lbChargePoint').innerHTML = totalPointValue;
      }
      this.setState({totalPay: totalPayValue})
      this.setState({totalPoint: totalPointValue})
      lbTotalPayCommit.innerHTML ="※ 충전되는 포인트는 <strong>"+totalPointValue+"P</strong>이며 결제 시 부가세 10%를 포함한 <strong>"+totalPayValue+"원</strong>이 결제 됩니다."
    }
  }
  */

  // 그리드의 선택 취소 했을때 선택목록에 저장되어있는 값 중 선택취소한 컬럼의 값을 찾아 목록에서 제거
  /* 2019-06-04 : 다중선택 미사용으로 인한 비활성화
  deselectCallback = async (selectDto) => {
    const { selectList } = this.state;

    const itemToFind = selectList.find(function(item) {
      return item === selectDto.productSid
    });
    const idx = selectList.indexOf(itemToFind);
    if (idx > -1) selectList.splice(idx, 1)

    const itemToFind2 = selectList.find(function(item) {
      return item === selectDto.pointCash
    });
    const idx2 = selectList.indexOf(itemToFind2);
    if (idx2 > -1) selectList.splice(idx2, 1)

    const itemToFind3 = selectList.find(function(item) {
      return item === selectDto.productPoint
    });
    const idx3 = selectList.indexOf(itemToFind3);
    if (idx3 > -1) selectList.splice(idx3, 1)

    this.setState({selectList})
    const lbTotalPayCommit = document.querySelector('#lbTotalPayCommit');
    const naverPayBtn = document.querySelector('#naverPayBtn');
    if (selectList.length !== 0) {
      document.querySelector('#lbSelectPay').innerHTML = selectList[selectList.length-3];
      document.querySelector('#lbSelectPoint').innerHTML = selectList[selectList.length-2];
      if (selectList.length > 1) {
        let totalPayValue = 0;
        let totalPointValue = 0;
        for (let index=0; index<selectList.length; index+=3) {
          totalPayValue += selectList[index];
          document.querySelector('#lbTotalPay').innerHTML = totalPayValue;
        }
        for (let index=0; index<selectList.length; index+=3) {
          totalPointValue += selectList[index+1];
          document.querySelector('#lbChargePoint').innerHTML = totalPointValue;
        }
        this.setState({totalPay: totalPayValue})
        this.setState({totalPoint: totalPointValue})
        lbTotalPayCommit.innerHTML ="※ 충전되는 포인트는 <strong>"+totalPointValue+"P</strong>이며 결제 시 부가세 10%를 포함한 <strong>"+totalPayValue+"원</strong>이 결제 됩니다."
      }
    } else {
      document.querySelector('#lbSelectPay').innerHTML = "0";
      document.querySelector('#lbSelectPoint').innerHTML = "0";
      document.querySelector('#lbChargePoint').innerHTML = "0";
      document.querySelector('#lbTotalPay').innerHTML = "0";
      lbTotalPayCommit.hidden = true;
      naverPayBtn.hidden = true;
    }
  }
  */

  getProductList = async (search) => {
    const { ProductManageModule } = this.props;
    try {
      await ProductManageModule.getProductList(search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  paymentApprovalRequest = async (paymentId) => {
    const { PaymentModule } = this.props;
    try {
      await PaymentModule.paymentApprovalRequest(paymentId)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // --- response값 임시 설정 (결제승인 결과값 가져오기)
  getSamplePaymentRequest = async (totalPay, totalPoint) => {
    const { PaymentModule } = this.props;
    try {
      await PaymentModule.getSamplePaymentRequest(totalPay, totalPoint)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  addOrderHistory = async (email, dto) => {
    const { OrderHistoryModule } = this.props;
    try {
      await OrderHistoryModule.addOrderHistory(email, dto)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  addChangePointHistory = async (email, dto) => {
    const { ChangePointHistoryModule } = this.props;
    try {
      await ChangePointHistoryModule.addChangePointHistory(email, dto)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 네이버페이 결제 창 호출
  openNaverPay = async () => {
    /* 2019-06-04 : 다중선택 미사용으로 인한 비활성화
    const { totalPay, totalPoint } = this.state;
    if (totalPay < 1000) {
      const nfNotAllowPayment = document.createElement('vaadin-notification');
      nfNotAllowPayment.renderer = function(root) {
        root.textContent = '선택한 금액이 1000원 이상이어야 결제가 가능합니다.'
      } 
      document.body.appendChild(nfNotAllowPayment);
      nfNotAllowPayment.position = 'middle';
      nfNotAllowPayment.duration = 2000;
      nfNotAllowPayment.opened = true;
      return;
    }
    */
   const { productDto } = this.state;
   if (productDto.pointCash < 1000) {
     const nfNotAllowPayment = document.createElement('vaadin-notification');
     nfNotAllowPayment.renderer = function(root) {
       root.textContent = '선택한 금액이 1,000원 이상이어야 결제가 가능합니다.'
     } 
     document.body.appendChild(nfNotAllowPayment);
     nfNotAllowPayment.position = 'middle';
     nfNotAllowPayment.duration = 2000;
     nfNotAllowPayment.opened = true;
     return;
   }
   if (productDto.pointCash === undefined) {
    const nfNotAllowPayment = document.createElement('vaadin-notification');
    nfNotAllowPayment.renderer = function(root) {
      root.textContent = '선택한 상품이 없습니다. 상품을 선택해주세요'
    } 
    document.body.appendChild(nfNotAllowPayment);
    nfNotAllowPayment.position = 'middle';
    nfNotAllowPayment.duration = 2000;
    nfNotAllowPayment.opened = true;
    return;
   }

    // --- response값 임시 설정 (결제승인 결과값 가져오기)
    // const getSamplePaymentRequest = this.getSamplePaymentRequest;

    // 결제 요청 시 사용하는 함수
    const paymentApprovalRequest = this.paymentApprovalRequest;

    const oPay = window.Naver.Pay.create({
      // "mode" : "production", // developer or production
      "mode" : "developer", // developer or production
      "payType" : "normal", // normal or recurrent
      "openType": "layer",
      "clientId": "u86j4ripEt8LRfPGzQ8", // clientId
      // "clientId": "dQPaTGkl7UD9gyUVttF3", // clientId
      "onAuthorize" : function(oData) {
        /*
        layer 타입을 사용했을 때 페이지 전환 없이 구현이 가능하도록 지원되며, 그 외의 경우는 returnUrl 로 참조 정보와 함께 redirect 됩니다.
        oData 객체에는 결제 인증 결과와 전달한 returnUrl 정보가 함께 전달되며,
        이 정보는 이후 승인 요청 처리를 위한 정보 (resultCode, resultMessage, returnUrl, paymentId, reserveId 등) 입니다.
        전달되는 값은 https://developer.pay.naver.com/docs/v2/api#payments-payments_window 의 성공 & 실패 응답 값을 참조해주세요.
        */
        if(oData.resultCode === "Success") {
          // 네이버페이 결제 승인 요청 처리
          if (oData.paymentId !== undefined) {
            // 결제 요청 이벤트
            paymentApprovalRequest(oData.paymentId);

            // --- response값 임시 설정 (결제승인 결과값 가져오기)
            /* 2019-06-04 : 다중선택 미사용으로 인한 비활성화
            getSamplePaymentRequest(totalPay, totalPoint);
            */
          //  getSamplePaymentRequest(productDto.pointCash, productDto.productPoint);
          }
        } else {
          // 필요 시 oData.resultMessage 에 따라 적절한 사용자 안내 처리
          /* TEST CODE */
          const nfNPayFailure = document.createElement('vaadin-notification');
          nfNPayFailure.renderer = function(root) {
            root.textContent = '결제 실패.'
          } 
          document.body.appendChild(nfNPayFailure);
          nfNPayFailure.position = 'middle';
          nfNPayFailure.duration = 2000;
          nfNPayFailure.opened = true;

          window.history.replaceState(null, null, window.location.href);
          window.onpopstate = function () { };
        }
      }
    });

    // 결제창 오픈
    oPay.open({
      "merchantUserKey": "partner-userkey",
      "merchantPayKey": "partner-orderkey",
      /* 2019-06-04 : 다중선택 미사용으로 인한 비활성화
      "productName": totalPoint+'포인트',
      "totalPayAmount": totalPay,
      "taxScopeAmount": (totalPay*0.9),
      "taxExScopeAmount": (totalPay*0.1),
      */
      "productName": productDto.productPoint+'포인트',
      "totalPayAmount": removeComma(productDto.pointCash),
      "taxScopeAmount": (removeComma(productDto.pointCash)*0.9),
      "taxExScopeAmount": (removeComma(productDto.pointCash)*0.1),
      "productCount": 1,
      "returnUrl": "http://localhost:3000/#/payment/product",
      // "returnUrl": "https://localhost:3000/#/payment/product",
      "productItems": [{
        "categoryType": "ETC",
        "categoryId" : "ETC",
        "uid" : "1234",
        "name" : "test",
        "payReferrer" : "ETC",
        "count" : 1
      }]
    });

    // 네이버페이 결제 창 노출 시 뒤로가기 비활성화
    if (oPay) {
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
        window.history.go(1);
      };
    }
  }

  updateUserByBalancePointIncrease = async (email, increasePoint) => {
    const { UserManageModule } = this.props;
    try {
      await UserManageModule.updateUserByBalancePointIncrease(email, increasePoint)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 마운트 이전 권한 체크
  componentWillMount() {
    // 관리자 권한 체크 필요
  }

  // 마운트 직후 한번 (rendering 이전, 마운트 이후의 작업)
  componentDidMount() {
    const { search } = this.state;
    const { productList } = this.props;
    if (!productList || productList === undefined || productList === null) {
      this.getProductList(search);
    }
    document.querySelector('#lbSelectPayName').innerHTML = "선택금액 : ";
    document.querySelector('#lbSelectPay').innerHTML = "0";
    document.querySelector('#lbSelectPaySubName').innerHTML = "원 (VAT 별도)";

    document.querySelector('#lbSelectPointName').innerHTML = "선택 포인트 : ";
    document.querySelector('#lbSelectPoint').innerHTML = "0";
    document.querySelector('#lbSelectPointSubName').innerHTML = "P";

    /* 2019-06-04 : 다중선택 미사용으로 인한 비활성화
    document.querySelector('#lbChargePointName').innerHTML = "충전 포인트 : ";
    document.querySelector('#lbChargePoint').innerHTML = "0";
    document.querySelector('#lbChargePointSubName').innerHTML = "P";

    document.querySelector('#lbTotalPayName').innerHTML = "총 구매금액 : ";
    document.querySelector('#lbTotalPay').innerHTML = "0";
    document.querySelector('#lbTotalPaySubName').innerHTML = "원 (부가세 10% 포함)";
    */

    // console.log(window.naver.NaverPayButton)
    // SDK 추가 사용 필요
    // window.naver.NaverPayButton.apply({
    //   BUTTON_KEY: "네이버에서 전달받은 버튼생성키",
    //   TYPE: "naver_btn_chk", //버튼 스타일
    //   COLOR: 1, //버튼 색상타입
    //   COUNT: 1, // 네이버페이버튼 + 찜하기버튼 모두 출력 여부
    //   ENABLE: "Y", //네이버페이 활성여부(재고부족 등에는 N으로 비활성처리)
    //   EMBED_ID: "naverPay", //네이버페이 버튼 UI가 부착될 HTML element의 ID
    // })

    const openNaverPay = this.openNaverPay;
    const naverPayBtn = document.querySelector('#naverPayBtn');
    naverPayBtn.textContent = "Pay 결제하기"
    naverPayBtn.type = "smallWhite"
    naverPayBtn.addEventListener('click', function() {
      // 네이버페이 결제 창 호출
      openNaverPay();
    });
  }

  render() {
    const { productDto } = this.state;
    const { productList, pending, error, success } = this.props;
    const { paymentRequest, paymentPending, paymentError, paymentSuccess } = this.props;
    const { email } = this.props;
    
    const getSamplePaymentRequest = this.getSamplePaymentRequest;
    let successPay = false;
    if (paymentRequest !== null && paymentRequest !== undefined) {
      // console.log(paymentRequest._root.entries[0][1]);
      if (paymentRequest.code !== 'Success') {
        if (paymentRequest.code === 'Fail') {
          // PG, 은행 및 기타 오류 발생 시 오류 상세 원인이 message 필드로 전달됩니다 
          // 결제 실패 사유를 인지할 수 있도록 Alert 등을 통한 안내가 필요합니다
          window.confirm('결제에 실패하였습니다. \n확인 후 다시 시도해주세요.\n' + paymentRequest.message);
          // alert 사용 필요
        } else if (paymentRequest.code === 'InvalidMerchant') {
          // 유효하지 않은 가맹점인 경우
          window.confirm('유효하지 않은 가맹점입니다. \n확인 후 다시 시도해주세요.\n' + paymentRequest.message);
        } else if (paymentRequest.code === 'TimeExpired') {
          //	결제 승인 가능 시간 초과 시 (10분 초과시)
          window.confirm('결제시간이 초과되었습니다. \n다시 시도해주세요.\n' + paymentRequest.message);
        } else if (paymentRequest.code === 'AlreadyOnGoing') {
          // 해당 결제번호로 결제가 이미 진행 중일 때
          window.confirm('해당 상품에 대한 결제가 진행중입니다. \n확인 후 다시 시도해주세요.\n' + paymentRequest.message);
        } else if (paymentRequest.code === 'AlreadyComplete') {
          // 해당 결제번호로 이미 결제가 완료되었을 때
          window.confirm('이미 결제처리가 완료되었습니다. \n확인 후 다시 시도해주세요.\n' + paymentRequest.message);
        } else if (paymentRequest.code === 'OwnerAuthFail') {
          // 본인 카드 인증 오류 시
          window.confirm('카드 인증이 실패하였습니다. \n확인 후 다시 시도해주세요.\n' + paymentRequest.message);
        } else {
          // 알수없는 오류 (샘플값 가져오기)
          const check = window.confirm('결제요청에 실패하였습니다. \n샘플 테스트를 진행하시겠습니까?\n' + paymentRequest.message);
          if (check === true) {
            getSamplePaymentRequest(removeComma(productDto.pointCash), removeComma(productDto.productPoint));
          }
        }
      } else {
        successPay = true;
        // 포인트 변동내역에 추가 
        let dto = {
          changeDt: new Date(),
          paymentCash: paymentRequest.body.detail.totalPayAmount,
          changeType: 'PAYMENT_ADD',
          changePoint: removeComma(productDto.productPoint),
          // 계정별 현재 잔여포인트에서 차감해야함
          currentBalPoint: 97500+removeComma(productDto.productPoint),
          paymentNo: 'P'+paymentRequest.body.detail.tradeConfirmYmdt+new Date().getTime(),
          activated: true
        }
        this.addChangePointHistory(email, dto);
        // 사용자 포인트 추가 이벤트
        this.updateUserByBalancePointIncrease(email, removeComma(productDto.productPoint))
      }
    }

    return (
      <Fragment>
        {successPay === false ? 
        <div>
          <div className="div-main">
            { pending && <div className="boxLoading"/> }
            { error && <h1>Server Error!</h1> }
            { success && <PaymentProductListGrid productList={ productList } selectCallback={ this.selectCallback } deselectCallback={ this.deselectCallback } />}
            <div className="receipt" hidden={!productList}>
              <div className="div-inline">
                <label id="lbSelectPayName" className="label"/>
                <label id="lbSelectPay" className="amount cash"/>
                <label id="lbSelectPaySubName" className="label-currency"/>
              </div>
              <div className="div-inline">
                <label id="lbSelectPointName" className="label"/>
                <label id="lbSelectPoint" className="amount point"/>
                <label id="lbSelectPointSubName" className="label-currency"/>
              </div>
              {/* // 2019-06-04 : 다중선택 미사용으로 인한 비활성화
              <div className="div-inline">
                <label id="lbChargePointName"/>
                <label id="lbChargePoint"/>
                <label id="lbChargePointSubName"/>
              </div>
              <div className="div-inline">
                <label id="lbTotalPayName"/>
                <label id="lbTotalPay"/>
                <label id="lbTotalPaySubName"/>
              </div> */}
            </div>
            <label id="lbTotalPayCommit" className="desc-purchase" hidden />
          </div>
          <div className="align-center-text wrap-btn-naverpay">
            <div id="naverPay" />
            <button id="naverPayBtn" hidden/>
          </div>
        </div>
        :
        <div>
          <div className="div-main">
            { paymentPending && <div className="boxLoading"/> }
            { paymentError && <h1>Server Error!</h1> }
            { paymentSuccess && paymentRequest ? <PaymentComplete paymentRequest={paymentRequest} /> : null }
          </div>
        </div>
        }
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    productList: state.product.productList,
    pending: state.product.pending,
    error: state.product.error,
    success: state.product.success,
    complete: state.product.complete,

    paymentRequest: state.payment.paymentRequest,
    paymentPending: state.payment.pending,
    paymentError: state.payment.error,
    paymentSuccess: state.payment.success,

    email: 'yieon@test.com'
  }),
  dispatch => ({
    ProductManageModule: bindActionCreators(productManageActions, dispatch),
    ChangePointHistoryModule: bindActionCreators(changePointHistoryActions, dispatch),
    PaymentModule: bindActionCreators(paymentActions, dispatch),
    UserManageModule: bindActionCreators(userManageActions, dispatch)
  })
)(PaymentContainer);
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productManageActions from "../../oms/modules/ProductManageModule";
import * as changePointHistoryActions from "../../oms/modules/ChangePointHistoryModule";
import * as paymentActions from "../modules/PaymentModule";
import * as userManageActions from "../../scm/modules/UserModule";
import { PaymentProductListGrid, PaymentComplete } from "../index";

import axios from 'axios';
import config from '../../config';

import '@vaadin/vaadin-notification';

import { removeComma } from '../../common/utils';

//ImPort 페이결제 라이브러리
let IMP = null;
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
      totalPay: 0,
      totalPoint: 0,
      successPay: false,
      purchaseResult: null
    };
    //ImPort 페이 결제를 위한 라이브러리 로딩    
    IMP = window.IMP;
  }

  // 그리드의 선택 시 선택한 컬럼의 값을 선택목록에 저장
  selectCallback = async (selectDto) => {
    this.setState({productDto: selectDto});
    const lbTotalPayCommit = document.querySelector('#lbTotalPayCommit');
    const iamportPayBtn = document.querySelector('#iamportPayBtn');
    lbTotalPayCommit.hidden = false;
    
    if (selectDto === undefined || selectDto === null) {
      iamportPayBtn.hidden = true;
      document.querySelector('#lbSelectPay').innerHTML = "0";
      document.querySelector('#lbSelectPoint').innerHTML = "0";
      lbTotalPayCommit.innerHTML ="선택된 상품이 없습니다. 상품을 선택해주세요."
    } else {
      iamportPayBtn.hidden = false;
      document.querySelector('#lbSelectPay').innerHTML = selectDto.pointCash;
      document.querySelector('#lbSelectPoint').innerHTML = selectDto.productPoint;
      lbTotalPayCommit.innerHTML ="※ 충전되는 포인트는 <strong>"+selectDto.productPoint+"P</strong>이며 결제 시 부가세 10%를 포함한 <strong>"+selectDto.pointCash+"원</strong>이 결제 됩니다."
    }
  }

  getProductList = async (search) => {
    const { ProductManageModule } = this.props;
    try {
      await ProductManageModule.getProductList(search)
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

  // 아임포트 결제 창 호출
  openIamPortPay = () => {
    const { productDto, purchaseResult } = this.state;
    const { email } = this.props
    //결제 번호 생성. 생성 실패시 오류  메시지 팝업
    let merchantUid = null;
    axios({
      method: 'GET',
      url: `${config.commonService}/ukey/perchas`,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
      }
    }).then(response => {
      merchantUid = response.data;
      console.log('MerchantUid Generate!')
      console.log(merchantUid)
      if (merchantUid === undefined || merchantUid === null || merchantUid === '') {
        const nfNotAllowPayment = document.createElement('vaadin-notification');
        nfNotAllowPayment.renderer = function(root) {
          root.textContent = '결제번호 생성에 실패하였습니다. 잠시 후 다시 시도해 주십시오.'
        } 
        document.body.appendChild(nfNotAllowPayment);
        nfNotAllowPayment.position = 'middle';
        nfNotAllowPayment.duration = 2000;
        nfNotAllowPayment.opened = true;
        window.setTimeout(function() {
          nfNotAllowPayment.remove();
        }, 2000)
        return;
      } else {
        //구매 상품 명칭 생생성
        const itemName = "ALGO "+productDto.pointCash+" 포인트 구매";
        //결제 모듈 초기화
        IMP.init(config.iamportpayMemberId);
        // IMP.request_pay(param, callback) 호출
        IMP.request_pay({ // param
          pg: "kcp.A52CY",
          pay_method: "card",
          merchant_uid: merchantUid,
          name: itemName,
          amount: productDto.pointCash,
          buyer_email: "gildong@gmail.com",
          buyer_name: "홍길동",
          buyer_tel: "010-4242-4242",
          buyer_addr: "서울특별시 강남구 신사동",
          buyer_postcode: "01181",
          // 가맹점 임의 지정 데이터 : add1. 포인트 정보 
          custom_data: {
            point: productDto.productPoint
          }
        }, rsp => { // callback
          if (rsp.success === true) {
            this.setState({successPay: true})
            this.setState({purchaseResult: rsp})

            // 카드사 승인번호 : rsp.apply_num

            // 포인트 변동내역에 추가 
            let dto = {
              changeDt: new Date(rsp.paid_at*1000),
              paymentCash: rsp.paid_amount,
              changeType: 'PAYMENT_ADD',
              changePoint: removeComma(rsp.custom_data.point),
              // 계정별 현재 잔여포인트에서 차감해야함 (로그인 기능 구현 이후 작업 필요)
              currentBalPoint: 100000 + removeComma(rsp.custom_data.point),
              paymentNo: rsp.merchant_uid,
              activated: true
            }
            this.addChangePointHistory(email, dto);
            // 사용자 포인트 추가 이벤트
            this.updateUserByBalancePointIncrease(email, removeComma(rsp.custom_data.point))
  
          } else {
            if (rsp.error_code === 'F1002') {
              window.confirm('결제에 실패하였습니다. \n' + rsp.error_msg);
              return;
            } else {
              window.confirm('결제에 실패하였습니다. \n' + rsp.error_msg);
              return;
            }
          }
        });
      }
    });
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

    const iamportPayBtn = document.querySelector('#iamportPayBtn');
    iamportPayBtn.textContent = "Pay 결제하기"
    iamportPayBtn.type = "smallWhite"    
    
    const openIamPortPay = this.openIamPortPay;
    iamportPayBtn.addEventListener('click', function() {
      // ImPort 페이 결제 창 호출
      openIamPortPay();
    });
  }

  render() {
    const { successPay, purchaseResult } = this.state;
    const { productList, pending, error, success } = this.props;
    const { paymentRequest, paymentPending, paymentError, paymentSuccess } = this.props;
    
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
            </div>
            <label id="lbTotalPayCommit" className="desc-purchase" hidden />
          </div>
          <div className="align-center-text wrap-btn-iamportpay">
            <div id="iamportPay" />
            <button id="iamportPayBtn" hidden/>
          </div>
        </div>
        :
        <div>
          <div className="div-main">
            {/* { paymentPending && <div className="boxLoading"/> }
            { paymentError && <h1>Server Error!</h1> } */}
            { purchaseResult !== null ? <PaymentComplete purchaseResult={purchaseResult} /> : null }
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
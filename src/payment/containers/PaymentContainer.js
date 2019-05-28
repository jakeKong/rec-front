import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productManageActions from "../../oms/modules/ProductManageModule";
import { PaymentProductListGrid } from "../index";

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-notification';

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
        cashRatio: null
      },
      selectList: [],
      totalPay: 0,
      totalPoint: 0
    };
  }

  // 그리드의 체크박스 선택 시 선택한 컬럼의 값을 선택목록에 저장
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

  // 그리드의 체크박스 선택 취소 했을때 선택목록에 저장되어있는 값 중 선택취소한 컬럼의 값을 찾아 목록에서 제거
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
      document.querySelector('#lbChargePoint').innerHTML = "0";
      document.querySelector('#lbTotalPay').innerHTML = "0";
      lbTotalPayCommit.hidden = true;
      naverPayBtn.hidden = true;
    }
  }  

  productDtoCallback = async (productDtoChild) => {
    this.setState({productDto : productDtoChild});
  }

  getProductList = async (search) => {
    const { ProductManageModule } = this.props;
    try {
      await ProductManageModule.getProductList(search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 네이버페이 결제 창 호출
  openNaverPay = async () => {
    const { totalPay, totalPoint } = this.state;

    const oPay = window.Naver.Pay.create({
      "mode" : "production", // development or production
      // "mode" : "development", // development chrome 미적용 문제 - 2019-05-28
      "payType" : "normal", // normal or recurrent
      "openType": "layer",
      "clientId": "u86j4ripEt8LRfPGzQ8" // clientId
    });

    oPay.open({
      "merchantUserKey": "partner-userkey",
      "merchantPayKey": "partnder-orderkey",
      "productName": totalPoint+'포인트',
      "totalPayAmount": totalPay,
      "taxScopeAmount": (totalPay*0.9),
      "taxExScopeAmount": (totalPay*0.1),
      "productCount": 1,
      "returnUrl": "http://localhost:3000/#/payment/product",
      "productItems": [{
        "categoryType": "ETC",
        "categoryId" : "ETC",
        "uid" : "1234",
        "name" : "test",
        "payReferrer" : "ETC",
        "count" : 1
      }, {
        "categoryType": "ETC",
        "categoryId" : "ETC",
        "uid" : "4567",
        "name" : "test2",
        "payReferrer" : "ETC",
        "count" : 2
      }]
    });
  }

  // 마운트 이전 권한 체크
  componentWillMount() {
    // 관리자 권한 체크 필요
  }

  // 마운트 직후 한번 (rendering 이전, 마운트 이후의 작업)
  componentDidMount() {
    const { search } = this.state;
    const { productList } = this.props;
    if (!productList || productList === undefined || productList.isEmpty()) {
      this.getProductList(search);
    }

    document.querySelector('#lbSelectPayName').innerHTML = "선택금액 : ";
    document.querySelector('#lbSelectPay').innerHTML = "0";
    document.querySelector('#lbSelectPaySubName').innerHTML = "원 (VAT 별도)";

    document.querySelector('#lbSelectPointName').innerHTML = "선택 포인트 : ";
    document.querySelector('#lbSelectPoint').innerHTML = "0";
    document.querySelector('#lbSelectPointSubName').innerHTML = "P";

    document.querySelector('#lbChargePointName').innerHTML = "충전 포인트 : ";
    document.querySelector('#lbChargePoint').innerHTML = "0";
    document.querySelector('#lbChargePointSubName').innerHTML = "P";

    document.querySelector('#lbTotalPayName').innerHTML = "총 구매금액 : ";
    document.querySelector('#lbTotalPay').innerHTML = "0";
    document.querySelector('#lbTotalPaySubName').innerHTML = "원 (부가세 10% 포함)";

    // console.log(window.naver.NaverPayButton)
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
    naverPayBtn.textContent = "네이버페이 결제"
    naverPayBtn.type = "smallWhite"
    naverPayBtn.addEventListener('click', function() {
      // 네이버페이 결제 창 호출
      openNaverPay();
    });

  }

  render() {
    const { productList, pending, error, success } = this.props;
    return (
      <Fragment>
        <div>
          <div className="div-main">
            { pending && "Loading..." }
            { error && <h1>Server Error!</h1> }
            { success && <PaymentProductListGrid productList={ productList } productDtoCallback={ this.productDtoCallback } selectCallback={ this.selectCallback } deselectCallback={ this.deselectCallback } />}
            <div className="div-select-total-payment">
              <div className="div-inline">
                <label id="lbSelectPayName"/>
                <label id="lbSelectPay"/>
                <label id="lbSelectPaySubName"/>
              </div>
              <div className="div-inline">
                <label id="lbSelectPointName"/>
                <label id="lbSelectPoint"/>
                <label id="lbSelectPointSubName"/>
              </div>
              <div className="div-inline">
                <label id="lbChargePointName"/>
                <label id="lbChargePoint"/>
                <label id="lbChargePointSubName"/>
              </div>
              <div className="div-inline">
                <label id="lbTotalPayName"/>
                <label id="lbTotalPay"/>
                <label id="lbTotalPaySubName"/>
              </div>
            </div>
            <label id="lbTotalPayCommit" hidden />
          </div>
          <div className="div-sub-main-center">
            <div id="naverPay" />
            <button id="naverPayBtn" hidden/>
          </div>
        </div>
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
    complete: state.product.complete
  }),
  dispatch => ({
    ProductManageModule: bindActionCreators(productManageActions, dispatch)
  })
)(PaymentContainer);
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productManageActions from "../modules/ProductManageModule";
import { ProductManageGrid, ProductManageSearch, ProductRegister } from "../index";

import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-notification';

class ProductManageContainer extends Component {

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
        // cashRatio: null
      },
      popupOpened: false
    };
    this.popupOpenStateEvent = this.popupOpenStateEvent.bind(this);
  }

  /* callback method
  -> searchComponent로부터 parameter를 전달받을 경우 현재 컴포넌트의 state.search에 전달받은 parameter값을 세팅하고
     rerendering을 위한 변경된 값으로의 REST API를 호출한다. 
       -> 호출 후 state.search값 초기화
  */
  searchCallback = async (dataSearchChild) => {
    this.setState({search: dataSearchChild});

    const { search } = this.state;
    this.getProductList(search);
    // state.search 값 초기화
    this.setState({search: {
      productCd: null,
      productNm: null,
      productPoint: null
    }});
  }

  addCallback = async (dataDtoChild) => {
    this.setState({productDto: dataDtoChild});

    const { productDto, search } = this.state;
    // 상품 추가완료 이후 상품목록 갱신을 위한 default search 파라미터 추가
    this.addProduct(productDto, search);
    // state.dto 값 초기화
    this.setState({productDto: {
      productSid: null,
      productCd: null,
      productNm: null,
      productPoint: null,
      pointCash: null
      // cashRatio: null
    }});
  }

  updateCallback = async (dataDtoChild) => {
    this.setState({productDto: dataDtoChild});

    const { productDto, search } = this.state;
    // 상품 수정완료 이후 상품목록 갱신을 위한 default search 파라미터 추가
    this.updateProduct(productDto, search);
    // state.dto 값 초기화
    this.setState({productDto: {
      productSid: null,
      productCd: null,
      productNm: null,
      productPoint: null,
      pointCash: null
      // cashRatio: null
    }});
  }

  deleteCallback = async (productSid) => {
    const { search } = this.state;
    this.deleteProduct(productSid, search);

    // const { complete } = this.props;
    // if ( complete ) {
    //   const nfDeleteComplete = document.createElement('vaadin-notification');
    //   nfDeleteComplete.renderer = function(root) {
    //     root.textContent = '삭제가 정상적으로 완료되었습니다.'
    //   }
      
    //   document.body.appendChild(nfDeleteComplete);
    //   nfDeleteComplete.position = 'middle';
    //   nfDeleteComplete.duration = 3000;
    //   nfDeleteComplete.opened = true;
    // } else {
    //   const nfDeleteComplete = document.createElement('vaadin-notification');
    //   nfDeleteComplete.renderer = function(root) {
    //     root.textContent = '삭제 실패. 다시 시도해주세요.'
    //   }
      
    //   document.body.appendChild(nfDeleteComplete);
    //   nfDeleteComplete.position = 'middle';
    //   nfDeleteComplete.duration = 3000;
    //   nfDeleteComplete.opened = true;
    // }

  }

  popupClose = async (dataClickChild) => {
    this.setState({popupOpened: dataClickChild});
    this.setState({productDto: {
      productSid: null,
      productCd: null,
      productNm: null,
      productPoint: null,
      pointCash: null
      // cashRatio: null
    }});
  }

  popupOpenStateEvent() {
    this.setState({popupOpened: true});
  }

  productDtoCallback = async (productDtoChild) => {
    this.setState({productDto : productDtoChild});
    this.popupOpenStateEvent();
  }

  getProductList = async (search) => {
    const { ProductManageModule } = this.props;
    try {
      await ProductManageModule.getProductList(search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  addProduct = async (productDto, search) => {
    const { ProductManageModule } = this.props;
    try {
      await ProductManageModule.addProduct(productDto, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  updateProduct = async (productDto, search) => {
    const { ProductManageModule } = this.props;
    try {
      await ProductManageModule.updateProduct(productDto, search)
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  deleteProduct = async (productSid, search) => {
    const { ProductManageModule } = this.props;
    try {
      await ProductManageModule.deleteProduct(productSid, search)
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
    if (!productList || productList === undefined || productList.isEmpty()) {
      this.getProductList(search);
    }

    const popupOpenStateEvent = this.popupOpenStateEvent;
    const btnRegister = document.querySelector('#btnRegister');
    btnRegister.innerHTML = "상품 등록";
    btnRegister.addEventListener('click', function() {
      popupOpenStateEvent();
    })
  }

  popupAddAndUpdateCheckOpenEvent(productDto, popupOpened) {
    if (productDto !== null && productDto !== undefined) {
      if (productDto.productSid !== null && productDto.productSid !== undefined) {
        return <ProductRegister updateCallback={ this.updateCallback } productDto={ productDto } popupOpened={ popupOpened } popupClose={ this.popupClose }/>
      } else {
        return <ProductRegister addCallback={ this.addCallback } popupOpened={ popupOpened } popupClose={ this.popupClose }/>
      }
    }
  }

  render() {
    const { productDto, popupOpened } = this.state;
    const { productList, pending, error, success } = this.props;
    return (
      <Fragment>
        <div className="div-search">
          <ProductManageSearch searchCallback={ this.searchCallback } />
        </div>
        <div className="div-main">
          { pending && <div className="boxLoading"/> }
          { error && <h1>Server Error!</h1> }
          { success && <ProductManageGrid productList={ productList } productDtoCallback={ this.productDtoCallback } deleteCallback={ this.deleteCallback } />}
        </div>
        <div className="div-sub-main" hidden={!success}>
          <vaadin-button id="btnRegister"/>
        </div>
        {/* <ProductRegister addCallback={ this.addCallback } updateCallback={ this.updateCallback } productDto={ productDto } popupOpened={ popupOpened } popupClose={ this.popupClose }/> */}
        { productDto && popupOpened === true &&
            <script>
              {this.popupAddAndUpdateCheckOpenEvent(productDto, popupOpened)};
            </script>
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
    complete: state.product.complete
  }),
  dispatch => ({
    ProductManageModule: bindActionCreators(productManageActions, dispatch)
  })
)(ProductManageContainer);
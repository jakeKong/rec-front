import React, { Component, Fragment } from 'react';

// rc-menu
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
// import 'rc-menu/assets/index.css';
import '../../styles/custom-rc-menu.scss';

class RCMenu extends Component {

  handleClick(info) {
    window.location.href = `${info.key}`;
  }

  menuSessionCheckActivatedChangeEvent = (session) => {
    if (session === true) {
      return (
        <Fragment>
          <Menu onClick={this.handleClick} mode="horizontal" openAnimation="slide-up" style={{ margin: 0 }} className="wrap-nav width-full align-center">
            <MenuItem key="/#/">홈</MenuItem>
            <MenuItem key="/#/bms/notice">공지사항</MenuItem>
            <SubMenu title={ <span className="submenu-title-wrapper">블로그</span> } key="blog">
              <MenuItem key="/#/blog/tyle">타일뉴스</MenuItem> 
            </SubMenu>
            <SubMenu title={ <span className="submenu-title-wrapper">주택정보</span> } key="housing">
              <MenuItem key="/#/mpa">주택정보 조회</MenuItem> 
            </SubMenu>
            <MenuItem key="/#/bms/question">문의사항</MenuItem>
            <SubMenu title={ <span className="submenu-title-wrapper">마이페이지</span> } key="mypage">
              <MenuItem key="/#/payment/product">상품구매</MenuItem>
              <MenuItem key="/#/oms/order/history/email">주문내역 조회</MenuItem>
              <MenuItem key="/#/oms/changepoint/history/email">포인트 변동내역 조회</MenuItem>
              <MenuItem key="/#/payment/history">결제내역 조회</MenuItem>
            </SubMenu>
            <SubMenu title={ <span className="submenu-title-wrapper">운영관리</span> } key="operation">
              <MenuItem key="/#/oms/order/history">주문내역 관리</MenuItem>
              <MenuItem key="/#/oms/changepoint/history">포인트 변동내역 관리</MenuItem>
              <MenuItem key="/#/oms/product">상품관리</MenuItem>
            </SubMenu>
            <SubMenu title={ <span className="submenu-title-wrapper">게시글관리</span> } key="board">
              <MenuItem key="/#/bms/notice/manage">공지사항 관리</MenuItem>
              <MenuItem key="/#/bms/question/manage">문의사항 관리</MenuItem>
              <MenuItem key="/#/blog/tyle/manage">타일뉴스 관리</MenuItem>
            </SubMenu>
            <SubMenu title={ <span className="submenu-title-wrapper">시스템관리</span> } key="system">
              <MenuItem key="/#/scm/user/manage">사용자 관리</MenuItem>
            </SubMenu>
          </Menu>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Menu onClick={this.handleClick} mode="horizontal" openAnimation="slide-up" style={{ margin: 0 }} className="wrap-nav width-full align-center">
            <MenuItem key="/#/">홈</MenuItem>
            <MenuItem key="/#/bms/notice">공지사항</MenuItem>
            <SubMenu title={ <span className="submenu-title-wrapper">블로그</span> } key="blog">
              <MenuItem key="/#/blog/tyle">타일뉴스</MenuItem> 
            </SubMenu>
            <SubMenu title={ <span className="submenu-title-wrapper">주택정보</span> } key="housing">
              <MenuItem key="/#/mpa">주택정보 조회</MenuItem> 
            </SubMenu>
            <MenuItem key="/#/bms/question">문의사항</MenuItem>
            <SubMenu title={ <span className="submenu-title-wrapper">마이페이지</span> } key="mypage">
              <MenuItem key="/#/payment/product">상품구매</MenuItem>
              <MenuItem key="/#/oms/order/history/email">주문내역 조회</MenuItem>
              <MenuItem key="/#/oms/changepoint/history/email">포인트 변동내역 조회</MenuItem>
              <MenuItem key="/#/payment/history">결제내역 조회</MenuItem>
            </SubMenu>
          </Menu>
        </Fragment>
      );
    }
  }

  render() {
    const { loginSession } = this.props;
    return this.menuSessionCheckActivatedChangeEvent(loginSession);
    // return (
    //   <Fragment>
    //     <Menu onClick={this.handleClick} mode="horizontal" openAnimation="slide-up" style={{ margin: 0 }} className="wrap-nav width-full align-center">
    //       <MenuItem key="/#/">홈</MenuItem>
    //       <MenuItem key="/#/bms/notice">공지사항</MenuItem>
    //       <SubMenu title={ <span className="submenu-title-wrapper">블로그</span> } key="blog">
    //         <MenuItem key="/#/blog/tyle">타일뉴스</MenuItem> 
    //       </SubMenu>
    //       <SubMenu title={ <span className="submenu-title-wrapper">주택정보</span> } key="housing">
    //         <MenuItem key="/#/mpa">주택정보 조회</MenuItem> 
    //         {/* <MenuItem key="/#/mpa/apartment">주택정보 아파트 조회</MenuItem>
    //         <MenuItem key="/#/mpa/villa">주택정보 빌라 조회</MenuItem>
    //         <MenuItem key="/#/mpa/housing">주택정보 주택 조회</MenuItem>
    //         <MenuItem key="/#/mpa/officetels">주택정보 오피스텔 조회</MenuItem>
    //         <MenuItem key="/#/mpa/sellAndResidence">주택정보 분양/입주권 조회</MenuItem>
    //         <MenuItem key="/#/mpa/commercial">주택정보 상업/업무용 조회</MenuItem>
    //         <MenuItem key="/#/mpa/land">주택정보 토지 조회</MenuItem> */}
    //       </SubMenu>
    //       <MenuItem key="/#/bms/question">문의사항</MenuItem>
    //       <SubMenu title={ <span className="submenu-title-wrapper">마이페이지</span> } key="mypage">
    //         <MenuItem key="/#/payment/product">상품구매</MenuItem>
    //         <MenuItem key="/#/oms/order/history/email">주문내역 조회</MenuItem>
    //         <MenuItem key="/#/oms/changepoint/history/email">포인트 변동내역 조회</MenuItem>
    //         <MenuItem key="/#/payment/history">결제내역 조회</MenuItem>
    //       </SubMenu>
    //       <SubMenu title={ <span className="submenu-title-wrapper">운영관리</span> } key="operation">
    //         <MenuItem key="/#/oms/order/history">주문내역 관리</MenuItem>
    //         <MenuItem key="/#/oms/changepoint/history">포인트 변동내역 관리</MenuItem>
    //         <MenuItem key="/#/oms/product">상품관리</MenuItem>
    //       </SubMenu>
    //       <SubMenu title={ <span className="submenu-title-wrapper">게시글관리</span> } key="board">
    //         <MenuItem key="/#/bms/notice/manage">공지사항 관리</MenuItem>
    //         <MenuItem key="/#/bms/question/manage">문의사항 관리</MenuItem>
    //         <MenuItem key="/#/blog/tyle/manage">타일뉴스 관리</MenuItem>
    //       </SubMenu>
    //       <SubMenu title={ <span className="submenu-title-wrapper">시스템관리</span> } key="system">
    //         <MenuItem key="/#/scm/user/manage">사용자 관리</MenuItem>
    //       </SubMenu>
    //     </Menu>
    //   </Fragment>
    // );
    
  }
}

export default RCMenu;

/* example
<Menu onClick={this.handleClick} selectedKeys={['/#/']}>
<SubMenu title={ <span className="submenu-title-wrapper">offset sub menu 2</span> } key="4">
    <MenuItem key="4-1">inner inner</MenuItem>
    <Divider/>
    <SubMenu
      key="4-2"
      title={<span className="submenu-title-wrapper">sub menu 1</span>}
    >
      <SubMenu title={<span className="submenu-title-wrapper">sub 4-2-0</span>} key="4-2-0">
        <MenuItem key="4-2-0-1">inner inner</MenuItem>
        <MenuItem key="4-2-0-2">inner inner2</MenuItem>
      </SubMenu>
      <MenuItem key="4-2-1">inn</MenuItem>
      <SubMenu title={<span className="submenu-title-wrapper">sub menu 4</span>} key="4-2-2">
        <MenuItem key="4-2-2-1">inner inner</MenuItem>
        <MenuItem key="4-2-2-2">inner inner2</MenuItem>
      </SubMenu>
      <SubMenu title={<span className="submenu-title-wrapper">sub menu 3</span>} key="4-2-3">
        <MenuItem key="4-2-3-1">inner inner</MenuItem>
        <MenuItem key="4-2-3-2">inner inner2</MenuItem>
      </SubMenu>
    </SubMenu>
  </SubMenu>
</Menu> */
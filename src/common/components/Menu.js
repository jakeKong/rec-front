import React, { Component, Fragment } from 'react';

// rc-menu
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
// import 'rc-menu/assets/index.css';
import '../../styles/custom-rc-menu.scss';

import storage from '../storage';

class RCMenu extends Component {

  handleClick(info) {
    window.location.href = `${info.key}`;
  }

  menuSessionCheckActivatedChangeEvent = (loggedInfo) => {
    if (loggedInfo) {
      if (loggedInfo.assignedRoles.indexOf('ROLE_ADMIN') !== -1) {
        // -1이 아니면 해당 권한(인덱스)이 존재
        return (
          <Fragment>
            <Menu onClick={this.handleClick} mode="horizontal" openAnimation="slide-up" style={{ margin: 0 }} className="wrap-nav width-full align-center">
              <MenuItem key="/">홈</MenuItem>
              {/* <MenuItem key="/bms/notice">공지사항</MenuItem> */}
              <SubMenu title={ <span className="submenu-title-wrapper">블로그</span> } key="blog">
                <MenuItem key="/blog/tyle">타일뉴스</MenuItem> 
              </SubMenu>
              <SubMenu title={ <span className="submenu-title-wrapper">부동산 시세</span> } key="housing">
                <MenuItem key="/mpa">단독/다가구</MenuItem> 
              </SubMenu>
              <MenuItem key="/bms/question">문의사항</MenuItem>
              <MenuItem key="/payment/product">상품구매</MenuItem>
              <SubMenu title={ <span className="submenu-title-wrapper">운영관리</span> } key="operation">
                <MenuItem key="/oms/order/history">주문내역 관리</MenuItem>
                <MenuItem key="/oms/changepoint/history">포인트 변동내역 관리</MenuItem>
                <MenuItem key="/oms/product">상품관리</MenuItem>
              </SubMenu>
              <SubMenu title={ <span className="submenu-title-wrapper">게시글관리</span> } key="board">
                <MenuItem key="/bms/notice/manage">공지사항 관리</MenuItem>
                <MenuItem key="/bms/question/manage">문의사항 관리</MenuItem>
                <MenuItem key="/blog/tyle/manage">타일뉴스 관리</MenuItem>
              </SubMenu>
              <SubMenu title={ <span className="submenu-title-wrapper">시스템관리</span> } key="system">
                <MenuItem key="/scm/user/manage">사용자 관리</MenuItem>
              </SubMenu>
            </Menu>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <Menu onClick={this.handleClick} mode="horizontal" openAnimation="slide-up" style={{ margin: 0 }} className="wrap-nav width-full align-center">
              <MenuItem key="/">홈</MenuItem>
              {/* <MenuItem key="/bms/notice">공지사항</MenuItem> */}
              <SubMenu title={ <span className="submenu-title-wrapper">블로그</span> } key="blog">
                <MenuItem key="/blog/tyle">타일뉴스</MenuItem> 
              </SubMenu>
              <SubMenu title={ <span className="submenu-title-wrapper">부동산 시세</span> } key="housing">
                <MenuItem key="/mpa">단독/다가구</MenuItem> 
              </SubMenu>
              <MenuItem key="/bms/question">문의사항</MenuItem>
              <SubMenu title={ <span className="submenu-title-wrapper">마이페이지</span> } key="mypage">
                <MenuItem key="/user/details">회원정보</MenuItem>
                <MenuItem key="/oms/order/history/email">주문내역</MenuItem>
                <MenuItem key="/oms/changepoint/history/email">포인트 변동내역</MenuItem>
                <MenuItem key="/payment/product">상품구매</MenuItem>
              </SubMenu>
            </Menu>
          </Fragment>
        );
      }
    } else {
      return (
        <Fragment>
          <Menu onClick={this.handleClick} mode="horizontal" openAnimation="slide-up" style={{ margin: 0 }} className="wrap-nav width-full align-center">
            <MenuItem key="/">홈</MenuItem>
            {/* <MenuItem key="/bms/notice">공지사항</MenuItem> */}
            <SubMenu title={ <span className="submenu-title-wrapper">블로그</span> } key="blog">
              <MenuItem key="/blog/tyle">타일뉴스</MenuItem> 
            </SubMenu>
            <SubMenu title={ <span className="submenu-title-wrapper">부동산 시세</span> } key="housing">
              <MenuItem key="/mpa">단독/다가구</MenuItem> 
            </SubMenu>
            {/* <MenuItem key="/#/bms/question">문의사항</MenuItem> */}
          </Menu>
        </Fragment>
      );
    }
  }

  render() {
    const loggedInfo = storage.get('loggedInfo');
    return this.menuSessionCheckActivatedChangeEvent(loggedInfo);
  }
}

export default RCMenu;
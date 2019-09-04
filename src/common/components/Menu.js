import React, { Component, Fragment } from 'react';

// rc-menu
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
// import 'rc-menu/assets/index.css';
import '../../styles/commons/custom-rc-menu.scss';

import storage from '../storage';

class RCMenu extends Component {

  handleClick(info) {
    window.location.href = `${info.key}`;
  }

  menuSessionCheckActivatedChangeEvent = (loggedInfo) => {
    if (loggedInfo) {
      return (
        <Fragment>
          <Menu onClick={this.handleClick} mode="horizontal" openAnimation="slide-up" style={{ margin: 0 }} className="wrap-nav width-full align-center">
            <MenuItem key="/">홈</MenuItem>
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
              <MenuItem key="/payment/product">포인트 충전</MenuItem>
            </SubMenu>
          </Menu>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Menu onClick={this.handleClick} mode="horizontal" openAnimation="slide-up" style={{ margin: 0 }} className="wrap-nav width-full align-center">
            <MenuItem key="/">홈</MenuItem>
            <SubMenu title={ <span className="submenu-title-wrapper">블로그</span> } key="blog">
              <MenuItem key="/blog/tyle">타일뉴스</MenuItem> 
            </SubMenu>
            <SubMenu title={ <span className="submenu-title-wrapper">부동산 시세</span> } key="housing">
              <MenuItem key="/mpa">단독/다가구</MenuItem> 
            </SubMenu>
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
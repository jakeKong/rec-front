import React, { Component } from 'react';
import Menu from './Menu';

// vaadin component 변경 필요
class Header extends Component {
  render() {
    return (
      <div className="header">
        <Menu />
        <label>부동산 커뮤니티</label>
      </div>
    );
  }
}

export default Header;
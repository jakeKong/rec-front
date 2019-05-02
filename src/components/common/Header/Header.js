import React, { Component } from 'react';
import Menu from './Menu';

import '@vaadin/vaadin-ordered-layout';


// vaadin component 변경 필요
class Header extends Component {
  render() {
    return (
      <vaadin-horizontal-layout theme="spacing">
        <Menu />
        <label>부동산 커뮤니티</label>
      </vaadin-horizontal-layout>
    );
  }
}

export default Header;
import React, { Component } from "react";
import { MainComponent } from "../index";

import * as popup from '../popupUtil';

class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    popup.openWin('div_betatest_popup');
  }

  render() {
    return (
      <MainComponent/ >
    );
  }
}

export default MainContainer;
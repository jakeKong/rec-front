import React, { Component, Fragment } from "react";
import { NoticeRegister } from "../index";

import '@vaadin/vaadin-ordered-layout';

class NoticeRegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <Fragment>
        <div className="section-notice-upload">
          <div className="div-main">
            <NoticeRegister/>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default NoticeRegisterContainer;
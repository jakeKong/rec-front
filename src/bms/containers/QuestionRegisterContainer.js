import React, { Component, Fragment } from "react";
import { QuestionRegister } from "../index";

class QuestionRegisterContainer extends Component {

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
        <div>
          <div className="div-main">
            <QuestionRegister />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default QuestionRegisterContainer;
import React, { Component } from "react";
import { QuestionDetail } from "../index";

import storage from '../../common/storage';
import { getQuestion } from '../api/questionAxios'

class QuestionDetailContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: undefined
    }
  }

  componentDidMount() {
    const { questionSid } = this.props;
    if (questionSid !== undefined) {
      getQuestion(questionSid).then(res => {
        if (storage.get('loggedInfo')) {
          if (storage.get('loggedInfo').assignedRoles.indexOf('ROLE_ADMIN') === -1) {
            if (res.data !== undefined) {
              if (res.data.email !== storage.get('loggedInfo').email) {
                window.alert('해당 페이지에 접근 할 수 없습니다.');
                window.location.href = '/bms/question';
              }
            }
          }
        }
        this.setState({question: res.data});
      }).catch(err => {
        console.log(err);
        window.alert('접근 실패')
      });
    }
    // this.getQuestion(questionSid);

  }

  // // 문의사항 조회
  // getQuestion = async (questionSid) => {
  //   const { QuestionModule } = this.props;
  //   try {
  //     await QuestionModule.getQuestion(questionSid)
  //   } catch (e) {
  //     console.log("error log : " + e);
  //   }
  // }

  render() {
    const { question } = this.state;
    return (
      <div>
        <div className="div-main">
          { question !== undefined && <QuestionDetail question={question} email={storage.get('loggedInfo').email}/> }
        </div>
      </div>
    );
  }
}

export default QuestionDetailContainer;
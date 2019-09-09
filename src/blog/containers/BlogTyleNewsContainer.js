import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as blogTyleNewsActions from "../modules/BlogTyleNewsModule";
import { BlogTyleNews } from "../index";

class BlogTyleNewsContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  // 블로그 목록 조회
  getBlogTylenewsList = async () => {
    const { BlogTyleNewsModule } = this.props;
    try {
      await BlogTyleNewsModule.getBlogTylenewsList();
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  // 마운트 직후 한번 (rendering 이전 마운트 이후의 작업)
  componentDidMount() {
    const { blogTyleNewsList } = this.props;
    if (blogTyleNewsList === null || blogTyleNewsList === undefined) {
      this.getBlogTylenewsList();
    }
  }

  render() {
    // eslint-disable-next-line
    const { blogTyleNewsList, pending, error, success } = this.props;
    return (
      <Fragment>
        <div className="tilenews agz-scroll">
          { pending && <div className="boxLoading"/> }
          { error && <h1>Server Error!</h1> }
          { success && <BlogTyleNews blogTyleNewsList={blogTyleNewsList}/> }
        </div>
      </Fragment>
    );
  }
}

// 모듈 연결
export default connect(
  state => ({
    blogTyleNewsList: state.blog.blogTyleNewsList,
    pending: state.blog.pending,
    error: state.blog.error,
    success: state.blog.success,
  }),
  // 등록된 액션 디스패치 등록
  dispatch => ({
    BlogTyleNewsModule: bindActionCreators(blogTyleNewsActions, dispatch)
  })
)(BlogTyleNewsContainer);
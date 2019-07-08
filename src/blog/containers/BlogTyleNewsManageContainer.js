import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as blogTyleNewsActions from "../modules/BlogTyleNewsModule";
import { BlogTyleNewsGrid, BlogTyleNewsSearch, BlogTyleNewsRegister } from "../index";

class BlogTyleNewsManageContainer extends Component {

  // state set을 위한 초기 생성자
  constructor(props) {
    super(props);
    this.state = {
      blog: {
        sid: null,
        img: null,
        link: null,
        title: null,
        subTitle: null,
        writer: null,
        writeDt: null,
        visibility: false
      },
      search: {
        tylenewsTitle: null,
        tylenewsSubtitle: null,
        tylenewsWriter: null,
        fromDt: null,
        toDt: null,
        tylenewsVisibility: null
      },
      popupOpened: false
    }
    this.popupOpenStateEvent = this.popupOpenStateEvent.bind(this);
  }

  searchCallback = async (dataSearchChild) => {
    this.setState({search: dataSearchChild});

    const { search } = this.state;
    this.getBlogTylenewsListBySpec(search);
    // state.search 값 초기화
    this.setState({search: {
      tylenewsTitle: null,
      tylenewsSubtitle: null,
      tylenewsWriter: null,
      fromDt: null,
      toDt: null,
      tylenewsVisibility: null
    }});
  }

  popupClose = async (dataClickChild) => {
    this.setState({popupOpened: dataClickChild});
    this.setState({blog: {
      sid: null,
      img: null,
      link: null,
      title: null,
      subTitle: null,
      writer: null,
      writeDt: null,
      visibility: false
    }});
  }

  popupOpenStateEvent() {
    this.setState({popupOpened: true});
  }

  getBlogTylenewsListBySpec = async (search) => {
    const { BlogTyleNewsModule } = this.props;
    try {
      await BlogTyleNewsModule.getBlogTylenewsListBySpec(search);
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  updateBlogTylenewsVisibility = async (tylenewsSid, tylenewsVisibility) => {
    const { BlogTyleNewsModule } = this.props;
    try {
      await BlogTyleNewsModule.updateBlogTylenewsVisibility(tylenewsSid, tylenewsVisibility);
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  updateVisibilityCallback = async (tylenewsSid, tylenewsVisibility) => {
    this.updateBlogTylenewsVisibility(tylenewsSid, tylenewsVisibility);
  }

  blogDtoCallback = async (blogDtoChild) => {
    this.setState({blog : blogDtoChild});
    this.popupOpenStateEvent();
  }

  addBlogTylenews = async (blog) => {
    const { BlogTyleNewsModule } = this.props;
    try {
      await BlogTyleNewsModule.addBlogTylenews(blog);
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  updateBlogTylenews = async (tylenewsSid, blog) => {
    const { BlogTyleNewsModule } = this.props;
    try {
      await BlogTyleNewsModule.updateBlogTylenews(tylenewsSid, blog);
    } catch (e) {
      console.log("error log : " + e);
    }
  }

  addCallback = async(dto) => {
    console.log(dto)
    this.setState({ blog : dto });
    this.addBlogTylenews(this.state.blog)
  }

  updateCallback = async(tylenewsSid, dto) => {
    this.setState({ blog : dto });
    this.updateBlogTylenews(tylenewsSid, this.state.blog)
  }

  // 마운트 직후 한번 (rendering 이전 마운트 이후의 작업)
  componentDidMount() {
    const { blogTyleNewsList } = this.props;
    if (blogTyleNewsList === null || blogTyleNewsList === undefined) {
      const {search} = this.state;
      this.getBlogTylenewsListBySpec(search);
    }

    const popupOpenStateEvent = this.popupOpenStateEvent;
    const btnRegister = document.querySelector('#btnRegister');
    btnRegister.innerHTML = "등록";
    btnRegister.addEventListener('click', function() {
      popupOpenStateEvent();
    })
  }

  popupAddAndUpdateCheckOpenEvent(blog, popupOpened) {
    if (blog !== null && blog !== undefined) {
      if (blog.sid !== null && blog.sid !== undefined) {
        return <BlogTyleNewsRegister updateCallback={ this.updateCallback } blog={ blog } popupOpened={ popupOpened } popupClose={ this.popupClose }/>
      } else {
        return <BlogTyleNewsRegister addCallback={ this.addCallback } popupOpened={ popupOpened } popupClose={ this.popupClose }/>
      }
    }
  }

  render() {
    const { blog, popupOpened } = this.state;
    // eslint-disable-next-line
    const { blogTyleNewsList, pending, error, success } = this.props;
    return (
      <Fragment>
        <div className="div-search">
          <BlogTyleNewsSearch searchCallback={this.searchCallback} />
        </div>
        <div className="div-main">
          { pending && <div className="boxLoading"/> }
          { error && <h1>Server Error!</h1> }
          { success && <BlogTyleNewsGrid blogTyleNewsList={blogTyleNewsList} blogDtoCallback={this.blogDtoCallback} updateVisibilityCallback={this.updateVisibilityCallback}/> }
        </div>
        <div className="div-sub-main" hidden={!success}>
          <vaadin-button id="btnRegister"/>
        </div>
        { blog && popupOpened === true &&
          <script>
            {this.popupAddAndUpdateCheckOpenEvent(blog, popupOpened)};
          </script>
        }
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    blogTyleNewsList: state.blog.blogTyleNewsList,
    pending: state.blog.pending,
    error: state.blog.error,
    success: state.blog.success,
  }),
  dispatch => ({
    BlogTyleNewsModule: bindActionCreators(blogTyleNewsActions, dispatch)
  })
)(BlogTyleNewsManageContainer);
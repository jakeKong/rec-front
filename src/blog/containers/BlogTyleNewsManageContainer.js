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
      selectList: [],
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

  deleteBlogTylenewsByList = async (list) => {
    const { BlogTyleNewsModule } = this.props;
    try {
      await BlogTyleNewsModule.deleteBlogTylenewsByList(list)
    } catch (e) {
      console.log("error log : " + e);
    }
    const { selectList } = this.state;
    selectList.splice(0, selectList.length)
    this.setState({selectList});
  }

  // 그리드의 체크박스 선택 시 선택한 컬럼의 값을 선택목록에 저장
  selectCallback = async (selectDto) => {
    const { selectList } = this.state;
    selectList.push(selectDto.sid)
    this.setState({selectList})
  }

  // 그리드의 체크박스 선택 취소 했을때 선택목록에 저장되어있는 값 중 선택취소한 컬럼의 값을 찾아 목록에서 제거
  deselectCallback = async (selectDto) => {
    const { selectList } = this.state;
    const itemToFind = selectList.find(function(item) {
      return item === selectDto.sid
    });
    const idx = selectList.indexOf(itemToFind);
    if (idx > -1) selectList.splice(idx, 1)
    this.setState({selectList})
  }

  addCallback = async(dto) => {
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

    const { selectList } = this.state;
    const deleteBlogTylenewsByList = this.deleteBlogTylenewsByList;
    const btnSelectDelete = document.querySelector('#btnSelectDelete');
    btnSelectDelete.innerHTML = '선택삭제';
    btnSelectDelete.addEventListener('click', function() {
      if (selectList.length > 0) {
        const check = window.confirm('선택한 항목을 삭제 하시겠습니까?');
        if (check === true) {
          deleteBlogTylenewsByList(selectList);
        }
      } else {
        const nfNotfoundSelectColumn = document.createElement('vaadin-notification');
        nfNotfoundSelectColumn.renderer = function(root) {
          root.textContent = '선택된 항목이 존재하지 않습니다.'
        }
        document.body.appendChild(nfNotfoundSelectColumn);
        nfNotfoundSelectColumn.position = 'middle';
        nfNotfoundSelectColumn.duration = 2000;
        nfNotfoundSelectColumn.opened = true;
        window.setTimeout(function() {
          nfNotfoundSelectColumn.remove();
        }, 2000)
      }
    });

    
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
          { success && <BlogTyleNewsGrid blogTyleNewsList={blogTyleNewsList} blogDtoCallback={this.blogDtoCallback} updateVisibilityCallback={this.updateVisibilityCallback} selectCallback={ this.selectCallback } deselectCallback={ this.deselectCallback }/> }
        </div>
        <div className="div-sub-main" hidden={!success}>
          <vaadin-button id="btnSelectDelete" theme="error" />
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
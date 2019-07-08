import React, { Component } from 'react';

// component
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';

class BlogTyleNews extends Component {

  constructor(props) {
      super(props);
      this.state ={

      }
  }

  componentDidMount() {

    const { blogTyleNewsList } = this.props;
    if (!blogTyleNewsList || blogTyleNewsList === null || blogTyleNewsList === undefined) {
      return;
    }

    const divBlogWrapper = document.querySelector('#div-blog-wrapper');
    divBlogWrapper.className = 'div-blog-wrapper';
    const divBlogColumns = document.createElement('div');
    divBlogColumns.className = 'div-blog-colums';

    blogTyleNewsList.reverse().forEach(e => {
      if (e.get('tylenewsVisibility') === true) {
        const divBlogCard = document.createElement('div');
        divBlogCard.className = 'div-blog-card';
  
        const image = document.createElement('img');
        // 블로그 이미지
        image.src = e.get('tylenewsImg');
  
        const divBlogCardTitle = document.createElement('div');
        divBlogCardTitle.className = 'div-blog-card-title';
        const pTitle = document.createElement('p');
        // 블로그 타이틀 제목
        pTitle.innerHTML = e.get('tylenewsTitle');
        // 연결된 블로그 링크 호출 이벤트
        pTitle.addEventListener('click', function() {
          window.open(e.get('link'));
        })
        divBlogCardTitle.appendChild(pTitle);
  
        const divBlogCardSubTitle = document.createElement('div');
        divBlogCardSubTitle.className = 'div-blog-card-sub-title';
        const pSubTitle = document.createElement('p');
        // 블로그 서브타이틀(분류)
        pSubTitle.innerHTML = 'SRD/'+e.get('tylenewsSubtitle');
        divBlogCardSubTitle.appendChild(pSubTitle);
  
        divBlogCard.appendChild(image)
        divBlogCard.appendChild(divBlogCardTitle)
        divBlogCard.appendChild(divBlogCardSubTitle)
        divBlogColumns.appendChild(divBlogCard)
      }
    })

    divBlogWrapper.appendChild(divBlogColumns);
  }

  render() {
    return (
      <div id="div-blog-wrapper" />
    );
  }
}
export default BlogTyleNews ;
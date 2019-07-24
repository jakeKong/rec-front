import React, { Component, Fragment } from 'react';

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
    let list = [];
    blogTyleNewsList.forEach(e => {
      if (e.get('tylenewsVisibility') === true) {
        list.push({
          // tylenewsSid: e.get('tylenewsSid'),
          tylenewsImg: e.get('tylenewsImg'),
          tylenewsLink: e.get('tylenewsLink'),
          tylenewsSubtitle: e.get('tylenewsSubtitle'),
          tylenewsTitle: e.get('tylenewsTitle'),
          tylenewsWriteDt: e.get('tylenewsWriteDt'),
          tylenewsVisibility: e.get('tylenewsVisibility')
        })
      }
    })
    const pagesControl = document.querySelector('#pages');
    let pages;
    let items;
    updateItemsFromPage(1);
    // pageController
    function updateItemsFromPage(page) {
      if (page === undefined) {
        return;
      }
  
      if (!pages) {
        pages = Array.apply(null, {length: Math.ceil(list.length / 6)}).map(function(item, index) {
          return index + 1;
        });
        const prevBtn = window.document.createElement('vaadin-button');
        prevBtn.className = 'btn prev';
        prevBtn.textContent = '<';
        prevBtn.addEventListener('click', function() {
          const selectedPage = parseInt(pagesControl.querySelector('[selected]').textContent);
          updateItemsFromPage(selectedPage - 1);
        });
        pagesControl.appendChild(prevBtn);

        pages.forEach(function(pageNumber) {
          const pageBtn = window.document.createElement('vaadin-button');
          pageBtn.textContent = pageNumber;
          pageBtn.className = 'btn number';
          pageBtn.addEventListener('click', function(e) {
            updateItemsFromPage(parseInt(e.target.textContent));
          });
          if (pageNumber === page) {
            pageBtn.setAttribute('selected', true);
          }
          pagesControl.appendChild(pageBtn);
        });

        const nextBtn = window.document.createElement('vaadin-button');
        nextBtn.textContent = '>';
        nextBtn.className = 'btn next';
        nextBtn.addEventListener('click', function() {
          const selectedPage = parseInt(pagesControl.querySelector('[selected]').textContent);
          updateItemsFromPage(selectedPage + 1);
        });
        pagesControl.appendChild(nextBtn);
      }
      const buttons = Array.from(pagesControl.children);
      buttons.forEach(function(btn, index) {
        if (parseInt(btn.textContent) === page) {
          btn.setAttribute('selected', true);
        } else {
          btn.removeAttribute('selected');
        }
        if (index === 0) {
          if (page === 1) {
            btn.setAttribute('disabled', '');
          } else {
            btn.removeAttribute('disabled');
          }
        }
        if (index === buttons.length - 1) {
          if (page === pages.length) {
            btn.setAttribute('disabled', '');
          } else {
            btn.removeAttribute('disabled');
          }
        }
      });

      var start = (page - 1) * 6;
      var end = page * 6;
      items = list.sort((prev, next) => new Date(prev.tylenewsWriteDt).getTime() > new Date(next.tylenewsWriteDt).getTime() ? 1 : -1).reverse().slice(start, end);

      const divBlogWrapper = document.querySelector('#div-blog-wrapper');
      divBlogWrapper.className = 'wrap-card-news';
      const divBlogColumns = document.createElement('div');
      divBlogColumns.className = 'masonry';
      if (divBlogWrapper.childNodes.length !== 0) {
        for (let i=0; i<divBlogWrapper.childNodes.length; i++) {
          divBlogWrapper.removeChild(divBlogWrapper.childNodes[i]);
        }
      }
      items.forEach(e => {
        if (e.tylenewsVisibility === true) {
          const divBlogCard = document.createElement('div');
          divBlogCard.className = 'card';
    
          const image = document.createElement('img');
          // 블로그 이미지
          image.className = 'image';
          if (e.tylenewsImg === "" || e.tylenewsImg === null) {
            image.src = 'http://srd.iptime.org:8006/web/rec/api/file/files/downloadFile/61561aa0-a44c-463a-aa5a-118236815330';
          } else {
            image.src = e.tylenewsImg;
          }
          const divBlogCardTitle = document.createElement('div');
          divBlogCardTitle.className = 'title';
          const pTitle = document.createElement('p');
          // 블로그 타이틀 제목
          pTitle.innerHTML = e.tylenewsTitle;
          // 연결된 블로그 링크 호출 이벤트
          pTitle.addEventListener('click', function() {
            window.open(e.tylenewsLink);
          })
          divBlogCardTitle.appendChild(pTitle);
    
          const divBlogCardSubTitle = document.createElement('div');
          divBlogCardSubTitle.className = 'subtitle';
          const pSubTitle = document.createElement('p');
          // 블로그 서브타이틀(분류)
          pSubTitle.innerHTML = 'SRD/'+e.tylenewsSubtitle;
          divBlogCardSubTitle.appendChild(pSubTitle);
    
          divBlogCard.appendChild(image)
          divBlogCard.appendChild(divBlogCardTitle)
          divBlogCard.appendChild(divBlogCardSubTitle)
          divBlogColumns.appendChild(divBlogCard)
        }
      })
      divBlogWrapper.appendChild(divBlogColumns);
    }
  }

  render() {
    return (
      <Fragment>
        <div id="div-blog-wrapper" />
        <div id="pages" className="pagination"/>
      </Fragment>
    );
  }
}
export default BlogTyleNews ;
import React, { Component, Fragment } from 'react';

// component
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';

import default_image from '../../styles/agz/image/blog_default_image.jpg';

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
      }
      const pagesControl = document.querySelector('#pages');
      const pagination = document.createElement('div');
      pagination.className="pagination";
      if (pagesControl.childNodes.length !== 0) {
        pagesControl.removeChild(pagesControl.childNodes[0])
      }
      pagesControl.appendChild(pagination);
      const prevBtn = window.document.createElement('vaadin-button');
      prevBtn.textContent = '<';
      prevBtn.className = 'btn prev';
      prevBtn.addEventListener('click', function() {
        const selectedPage = parseInt(pagination.querySelector('[selected]').textContent);
        updateItemsFromPage(selectedPage - 1);
      });
      pagination.appendChild(prevBtn);

      // default page value = 1
      if (page-2 < 1) {
        for (let p=0; p<5; p++) {
          if (pages[p] !== undefined) {
            const pageBtn = window.document.createElement('vaadin-button');
            pageBtn.textContent = pages[p];
            pageBtn.className = 'btn number';
            pageBtn.addEventListener('click', function(e) {
              updateItemsFromPage(parseInt(e.target.textContent));
            });
            if (pages[p] === page) {
              pageBtn.setAttribute('selected', true);
            }
            pagination.appendChild(pageBtn);
          }
        }
      } else if (page+2 > pages.length){
        for (let p=pages.length-5; p<pages.length; p++) {
          if (pages[p] !== undefined) {
            const pageBtn = window.document.createElement('vaadin-button');
            pageBtn.textContent = pages[p];
            pageBtn.className = 'btn number';
            pageBtn.addEventListener('click', function(e) {
              updateItemsFromPage(parseInt(e.target.textContent));
            });
            if (pages[p] === page) {
              pageBtn.setAttribute('selected', true);
            }
            pagination.appendChild(pageBtn);
          }
        }
      } else {
        for (let p=page-3; p<page+2; p++) {
          if (pages[p] !== undefined) {
            const pageBtn = window.document.createElement('vaadin-button');
            pageBtn.textContent = pages[p];
            pageBtn.className = 'btn number';
            pageBtn.addEventListener('click', function(e) {
              updateItemsFromPage(parseInt(e.target.textContent));
            });
            if (pages[p] === page) {
              pageBtn.setAttribute('selected', true);
            }
            pagination.appendChild(pageBtn);
          }
        }
      }

      const nextBtn = window.document.createElement('vaadin-button');
      nextBtn.textContent = '>';
      nextBtn.className = 'btn next';
      nextBtn.addEventListener('click', function() {
        const selectedPage = parseInt(pagination.querySelector('[selected]').textContent);
        updateItemsFromPage(selectedPage + 1);
      });
      pagination.appendChild(nextBtn);

      const buttons = Array.from(pagination.children);
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
            // image.src = 'http://algozip.co.kr:8006/web/rec/api/file/files/downloadFile/61561aa0-a44c-463a-aa5a-118236815330';
            image.src = default_image;
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
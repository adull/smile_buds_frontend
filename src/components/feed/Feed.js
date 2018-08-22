import React, { Component } from 'react';
import TextPost from './post/TextPost.js';
import ImagePost from './post/ImagePost.js';

class Feed extends Component {
  constructor() {
    super();
    this.state = {
      postsReceived: 0,
      postsArr: []
    }
    this.isBottom = this.isBottom.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.debounce = this.debounce.bind(this);
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= (window.innerHeight);
  }

  debounce(func, wait, immediate) {
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  };


  getPosts() {
    let thisObj = this;
    fetch('/get-feed-posts/' + this.props.value  + '/' + this.state.postsReceived, {
      credentials: 'include',
    })
    .then(function(response) {
      console.log(response);
      if(response.ok ) {
        return response.json();
      }
    })
    .then(function(json) {
      if(json) {
        thisObj.setState({
          postsReceived: thisObj.state.postsReceived + json.length,
          postsArr: thisObj.state.postsArr.concat(json)
        })
      }
    })
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
    this.getPosts();
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  trackScrolling = this.debounce(function() {
    let feed = this.refs.feed;
    if(feed) {
      if (this.isBottom(feed)) {
        this.getPosts();
      }  
    }
  }, 500)


  render() {
    var elements = [];
    let postsArr = this.state.postsArr;
    for (var i = 0; i < postsArr.length; i++) {
      let postItem = this.state.postsArr[i];
      let image = postItem.image;
      if(image === 0 ) {
        elements.push(
            <TextPost key={postItem.id} metadata={postItem} />
        );
      }
      else if(image === 1) {
        elements.push(
          <ImagePost key={postItem.id} metadata={postItem} />
        );
      }
    }
    return(
      <div className="feed" ref="feed">
        {elements}
      </div>
    )
  }
}

export default Feed;

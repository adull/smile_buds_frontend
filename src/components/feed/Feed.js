import React, { Component } from 'react';
import TextPost from './post/TextPost.js';
import ImagePost from './post/ImagePost.js';

class Feed extends Component {
  constructor() {
    super();
    this.state = {
      postsReceived: 0,
      postsArr: [],
      loading: false,
      fakeFeed: false
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
    // console.log(this.state.getPostsArr);
    this.setState({
      loading: true
    })
    let thisObj = this;
    fetch('/api/get-feed-posts/' + this.props.value  + '/' + this.state.postsReceived, {
      credentials: 'include',
    })
    .then(function(response) {
      // if(response.ok ) {
        return response.json();
      // }
    })
    .then(function(json) {
      if(json) {
        // console.log(json);
        if(json.fake_feed === true) {
          thisObj.setState({
            fakeFeed: true
          })
          return;
        }
        let newPosts = 0;
        let jsonOriginalPosts = []
        for(var i = 0; i < json.length; i ++) {
          if(!(thisObj.state.postsArr.includes(json[i]))) {
            newPosts++;
            jsonOriginalPosts.push(json[i]);
          }
        }
        thisObj.setState({
          postsReceived: thisObj.state.postsReceived + json.length,
          postsArr: thisObj.state.postsArr.concat(json),
          loading: false
        })
      }
    })
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
    // console.log("this.getPosts();")
    this.getPosts();
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  componentWillReceiveProps(props) {
    let thisObj = this;
    if(props.newPost !== '' && props.newPost !== undefined) {
      // console.log(props.newPost);
      fetch('/api/get-feed-post/' + props.newPost, {
        credentials: 'include'
      })
      .then(function(response) {
        // console.log(response)
        return response.json();
      })
      .then(function(json) {
        // console.log(json)
        if(json.error_reason) {
        }
        else {
          // console.log(thisObj.state.postsArr)
          let jsonArr = []
          jsonArr.push(json)
          thisObj.setState({
            postsReceived: thisObj.state.postsReceived + json.length,
            postsArr: jsonArr.concat(thisObj.state.postsArr)
          })
          // console.log(thisObj.state.postsArr)
        }
      })
    }
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
    if(this.state.fakeFeed === true) {
      return null;
    }
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
        { this.state.loading ? <div className="uploading"></div> : null }
      </div>
    )
  }
}

export default Feed;

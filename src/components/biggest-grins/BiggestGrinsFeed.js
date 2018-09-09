import React, { Component } from 'react';
import TextPost from '../feed/post/TextPost.js';
import ImagePost from '../feed/post/ImagePost.js';

class BiggestGrinsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postsSeen: 0,
      allPostHashes: props.posts,
      postsLoaded: [],
      sortBy: props.sortBy
    }
    this.isBottom = this.isBottom.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.debounce = this.debounce.bind(this);
    this.getPosts = this.getPosts.bind(this);
  }

  isBottom(el) {
    // console.log("hello")
    return el.getBoundingClientRect().bottom <= (window.innerHeight);
  }

  trackScrolling = this.debounce(function() {
    let feed = this.refs.feed;
    if(feed) {
      if (this.isBottom(feed)) {
        console.log("fire");
        this.getPosts();
      }
    }
  }, 500)

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
    console.log("call get posts")
    let hashesToRequest = [];
    let postsSeen = this.state.postsSeen;
    let allPostHashes = this.state.allPostHashes;
    for(var i = postsSeen; i < postsSeen + 10; i ++) {
      hashesToRequest.push(allPostHashes[i].post_hash)
    }
    // console.log(hashesToRequest);
    let postHashes = new FormData();
    postHashes.append("hashes", hashesToRequest);
    fetch('/api/get-specific-posts', {
      credentials: 'include',
      method: 'POST',
      body: postHashes
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if(response) {
        // console.log(response);
        // this.setState({
        //   // postsSeen: this.state.postsSeen + response.length,
        //   postsLoaded: response
        // })
        let postsLoaded = response;
        //ordering by most grins
        let hashesToRequest = [];
        let postsSeen = this.state.postsSeen;
        let allPostHashes = this.state.allPostHashes;
        for(var i = postsSeen; i < postsSeen + 10; i ++) {
          hashesToRequest.push(allPostHashes[i].post_hash)
        }
        // console.log(postsLoaded); // <-- the posts
        // console.log(hashesToRequest); // <-- the order

        for (var i = 0; i < postsLoaded.length; i ++) {
          postsLoaded[i].position = hashesToRequest.indexOf(postsLoaded[i].hash);
        }
        postsLoaded.sort(function(a, b){
          return a.position-b.position
        })
        this.setState({
          postsSeen: this.state.postsSeen + response.length,
          postsLoaded: this.state.postsLoaded.concat(postsLoaded)
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

  componentWillReceiveProps(props) {
    console.log("receive props")
    // this.getPosts();
  }

  render() {
    let postsLoaded = this.state.postsLoaded;

    var elements = [];
    for(var i = 0; i < postsLoaded.length; i ++) {
      let postItem = postsLoaded[i];
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

export default BiggestGrinsFeed;

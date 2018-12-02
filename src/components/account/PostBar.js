import React, { Component } from 'react';
import PostButton from './PostButton.js';

class PostBar extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      feedName: props.feedName,
      newPost: props.newPost
    }
  }
  render() {
    return(
      <div className="post-bar">
        <PostButton value="new-post" feedName={this.state.feedName} newPost={this.state.newPost}/>
        <PostButton value="funny-photo" feedName={this.state.feedName} newPost={this.state.newPost}/>
      </div>
    );
  }
}

export default PostBar;

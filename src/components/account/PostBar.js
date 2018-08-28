import React, { Component } from 'react';
import PostButton from './PostButton.js';

class PostBar extends Component {
  render() {
    return(
      <div className="post-bar">
        <PostButton value="new-post" newPost={this.props.newPost}/>
        <PostButton value="funny-photo" newPost={this.props.newPost}/>
      </div>
    );
  }
}

export default PostBar;

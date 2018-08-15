import React, { Component } from 'react';
import PostButton from './PostButton.js';

class PostBar extends Component {
  render() {
    return(
      <div className="post-bar">
        <PostButton value="new-post" />
        <PostButton value="funny-photo" />
      </div>
    );
  }
}

export default PostBar;

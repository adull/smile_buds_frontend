import React, { Component } from 'react';
import PostButton from './PostButton.js';

class PostBar extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return(
      <div className="post-bar">
        <PostButton value="new-post" feedName="smile-feed" newPost={this.props.newPost}/>
        <PostButton value="funny-photo" feedName="smile-feed" newPost={this.props.newPost}/>
      </div>
    );
  }
}

export default PostBar;

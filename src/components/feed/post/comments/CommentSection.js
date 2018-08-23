import React, { Component } from 'react';
import Comments from './Comments.js';
import WriteComment from './WriteComment.js';

class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: props.hash
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      hash: props.hash
    })
  }

  render() {
    console.log(this.state.hash);
    return(
      <div className="comment-section">
        <Comments hash={this.state.hash} />
        <WriteComment hash={this.state.hash} />
      </div>
    )
  }
}

export default CommentSection

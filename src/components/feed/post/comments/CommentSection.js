import React, { Component } from 'react';
import Comments from './Comments.js';
import WriteComment from './WriteComment.js';

class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: props.hash
    }
    this.rerender = this.rerender.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      hash: props.hash
    })
  }

  rerender() {
    this.setState({
      hash: this.state.hash
    })
  }

  render() {
    return(
      <div className="comment-section">
        <Comments hash={this.state.hash} />
        <WriteComment commentPosted={this.rerender} hash={this.state.hash} />
      </div>
    )
  }
}

export default CommentSection

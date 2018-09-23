import React, { Component } from 'react';
import Comment from './Comment.js'

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: props.hash,
      comments: [],
      commentGrins: []
    }
    this.getComments = this.getComments.bind(this);
  }

  componentWillMount() {
    if(this.state.hash === undefined) {
      return;
    }
    else {
      this.getComments();
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      hash: props.hash
    })
    if(this.state.hash === undefined) {
      return;
    }
    else {
      this.getComments();
    }
  }

  getComments() {
    let thisObj = this;
    // console.log("query - " + this.state.hash)
    fetch('/api/get-comments/' + this.state.hash, {
      credentials: 'include'
    })
    .then(function(response) {
      if(response) {
        return response.json();
      }
    })
    .then(function(json) {
      // console.log(json);
      if(json) {
        console.log(json.commentGrins);
        thisObj.setState({
          comments: json.commentResults,
          commentGrins: json.commentGrins
        })
      }
    })
  }

  render() {
    let comments = this.state.comments;
    let commentGrins = this.state.commentGrins;
    let commentsArr = [];
    for(let i = 0; i < comments.length; i ++ ) {
      commentsArr.push(
        <Comment key={i} metadata={comments[i]} grins={commentGrins} refresh={this.getComments} />
      )
    }
    return(
      <div className="comments">
        {commentsArr}
      </div>
    );
  }
}

export default Comments;

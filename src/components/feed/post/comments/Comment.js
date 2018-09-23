import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DeleteComment from './DeleteComment.js';
import CommentGrinSection from './CommentGrinSection.js';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      metadata: props.metadata,
      grins: props.grins
    }
    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment() {
    this.setState({
      show: false
    })
  }

  componentWillReceiveProps(props) {
    grins: props.grins
  }

  render() {
    console.log(this.state.grins);
    if(this.state.show) {
      return(
        <div className="comment-wrapper">
          <div className="comment">
            <a href={'/user/' + this.state.metadata.commenter_identifier} >
              <div className="commenter">
                <div className="commenter-picture">
                  <img src={"/api/get-profile-picture/" + (this.state.metadata.commenter_identifier || 'a')} />
                </div>
                <div className="commenter-name">
                  {this.state.metadata.commenter_name}
                </div>
              </div>
            </a>
            <div className="comment-message">
              {this.state.metadata.comment}
            </div>
          </div>
          <CommentGrinSection id={this.state.metadata.id} grins={this.state.grins} refresh={this.props.refresh}/>
          {this.state.metadata.deletePermission ? <DeleteComment clicked={this.deleteComment} commentID={this.state.metadata.id} onClick={this.deleteComment}/> : null}
        </div>
      );
    }
    else {
      return null;
    }
  }
}

export default Comment;

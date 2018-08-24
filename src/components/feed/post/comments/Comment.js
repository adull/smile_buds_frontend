import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: props.metadata
    }
  }
  render() {
    return(
      <div className="comment">
        <Link to={'/user/' + this.state.metadata.commenter_identifier} >
          <div className="commenter">
            <div className="commenter-picture">
              <img src={"/get-profile-picture/" + this.state.metadata.commenter_identifier} />
            </div>
            <div className="commenter-name">
              {this.state.metadata.commenter_name}
            </div>
          </div>
        </Link>
        <div className="comment-message">
          {this.state.metadata.comment}
        </div>
      </div>
    )
  }
}

export default Comment;

import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class CommentGrinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userID: props.data.user_id,
      userIdentifier: props.data.grinner_identifier,
      userName: props.data.grinner_name
    }
  }

  render() {
    return(
      <div className="grinner">
        <a href={"/user/" + this.state.userIdentifier} >
          <img className="grinner-pic" src={"/api/get-profile-picture/" + (this.state.userIdentifier || 'a')} />
          <div className="grinner-name">
            {this.state.userName}
          </div>
        </a>
      </div>
    )
  }
}

export default CommentGrinner;

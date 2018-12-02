import React, { Component } from 'react';
import UserFeedEdit from './UserFeedEdit.js'

class UserFeedHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedName: props.feedName,
      description: props.description,
      adminURL: props.adminURL,
      adminName: props.adminName,
      adminPrivilege: props.adminPrivilege
    }
  }

  componentWillReceiveProps(props) {
    console.log(props)
    this.setState({
      feedName: props.feedName,
      description: props.description,
      adminURL: props.adminURL,
      adminName: props.adminName,
      adminPrivilege: props.adminPrivilege
    })
  }

  render() {
    return(
      <div className="user-feed-header">
        <div className="user-feed-header-title user-feed-header-child">
          {"Welcome to the "}
           <span className="wavy-underline">
            {this.state.feedName}
          </span>
          {" " + "feed!"}
        </div>
        <div className="user-feed-header-description user-feed-header-child">
          {this.state.description}
        </div>
        <div className="user-feed-header-admin user-feed-header-child">
          Created by <a href={"/user/" + this.state.adminURL}>{this.state.adminName}</a>
        </div>
        <UserFeedEdit feedName={this.state.feedName} adminPrivilege={this.state.adminPrivilege} />
      </div>
    );
  }
}

export default UserFeedHeader;

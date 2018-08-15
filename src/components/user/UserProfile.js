import React, { Component } from 'react';
import Header from '../header/Header.js';
import Feed from '../feed/Feed.js';
import Sidebar from '../sidebar/Sidebar.js';
import UserHeader from './UserHeader.js';

class UserProfile extends Component {
  render() {
    return (
      <div className="body">
        <UserHeader loggedIn={this.props.loggedIn} user={this.props.user} />
        <div className="feed-section">
          <Sidebar addBalloon={this.props.addBalloon}/>
          <div className="feed">
            <Feed value={this.props.user} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;

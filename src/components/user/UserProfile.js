import React, { Component } from 'react';
import Header from '../header/Header.js';
import Feed from '../feed/Feed.js';
import Sidebar from '../sidebar/Sidebar.js';
import UserHeader from './UserHeader.js';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      user: props.user
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      loggedIn: props.loggedIn
    })
  }
  render() {
    console.log(this.state.loggedIn);
    return (
      <div className="body">
        <UserHeader loggedIn={this.state.loggedIn} user={this.state.user} />
        <div className="feed-section">
          <Sidebar addBalloon={this.props.addBalloon} loggedIn={this.state.loggedIn}/>
          <div className="feed-wrapper">
            <Feed value={this.state.user} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;

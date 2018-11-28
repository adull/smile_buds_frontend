import React, { Component } from 'react';
import Header from '../header/Header.js';
import Feed from '../feed/Feed.js';
import Sidebar from '../sidebar/Sidebar.js';
import UserHeader from './UserHeader.js';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      isAdmin: props.isAdmin,
      loggedIn: props.loggedIn,
      user: props.user
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      isAdmin: props.isAdmin,
      loggedIn: props.loggedIn
    })
  }
  render() {
    console.log(this.state.isAdmin);
    return (
      <div className="body">
        <UserHeader loggedIn={this.state.loggedIn} user={this.state.user} isAdmin={this.state.isAdmin}/>
        <div className="feed-section">
          <Sidebar addBalloon={this.props.addBalloon} loggedIn={this.state.loggedIn}/>
          <div className="feed-wrapper">
            <Feed feedName="" value={this.state.user} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;

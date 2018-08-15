import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar.js';
import Feed from '../feed/Feed.js';
// import AccountLoggedIn from '../account/AccountLoggedIn.js'
import Account from '../account/Account.js';
import UserProfile from '../user/UserProfile.js';

class Body extends Component {
  render() {
      return(
        <div className="body">
          <div className="account-section">
            <Account login={this.props.login} logout={this.props.logout} value="no-user"/>
          </div>
          <div className="feed-section">
            <Sidebar addBalloon={this.props.addBalloon} loggedIn={this.props.loggedIn}/>
            <div className="feed-wrapper">
              <Feed value="all"/>
            </div>
          </div>
        </div>
      )
  }
}

export default Body;

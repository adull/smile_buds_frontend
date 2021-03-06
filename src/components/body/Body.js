import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar.js';
import Feed from '../feed/Feed.js';
import Account from '../account/Account.js';
import UserProfile from '../user/UserProfile.js';

class Body extends Component {
  constructor() {
    super();
    this.state = {
      newPost: ''
    }
    this.newPost = this.newPost.bind(this);
  }

  newPost(hash) {
    // console.log("newpost in high order function")
    // console.log(hash)
    this.setState({
      newPost: hash
    })
  }
  render() {
      return(
        <div className="body">
          <div className="account-section">
            <Account login={this.props.login} logout={this.props.logout} value="no-user" newPost={this.newPost} feedName="smile-feed"/>
          </div>
          <div className="feed-section">
            <Sidebar addBalloon={this.props.addBalloon} loggedIn={this.props.loggedIn}/>
            <div className="feed-wrapper">
              <Feed value="all" feedName="smile-feed" newPost={this.state.newPost}/>
            </div>
          </div>
        </div>
      )
  }
}

export default Body;

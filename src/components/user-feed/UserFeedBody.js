import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar.js';
import Feed from '../feed/Feed.js';
import Account from '../account/Account.js';
import UserProfile from '../user/UserProfile.js';

class UserFeedBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPost: '',
      feedName: props.feedName,
    }
    this.newPost = this.newPost.bind(this);
  }

  newPost(hash) {
    this.setState({
      newPost: hash
    })
  }

  render() {
    console.log("inside userfeedbody")
    console.log(this.props.feedName)
    return(
      <div className="body user-feed-body">
        <div className="account-section">
          <Account login={this.props.login} logout={this.props.logout} value="no-user" newPost={this.newPost} feedName={this.state.feedName}/>
        </div>
        <div className="feed-section">
          <Sidebar addBalloon={this.props.addBalloon} loggedIn={this.props.loggedIn}/>
          <div className="feed-wrapper">
            <Feed value="all" feedName={this.props.feedName} newPost={this.state.newPost}/>
          </div>
        </div>
      </div>
    )
  }
}

export default UserFeedBody;

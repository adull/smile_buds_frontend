import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar.js';
import Feed from '../feed/Feed.js';
import Account from '../account/Account.js';
import UserFeedHeader from './UserFeedHeader.js'

class UserFeedBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPost: '',
      feedName: props.feedName,
      description: ''
    }
    this.newPost = this.newPost.bind(this);
  }

  newPost(hash) {
    this.setState({
      newPost: hash
    })
  }

  componentWillMount() {
    fetch('/api/get-user-feed/' + this.state.feedName, {
      credentials: 'include'
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response);
      this.setState({
        description: response[0].description,
        adminURL: response[0].admin,
        adminName: response[0].admin_name,
        adminPrivilege: response[0].admin_privilege
      })
    })
  }

  render() {
    return(
      <div className="body user-feed-body">
        <div className="account-section">
          <Account login={this.props.login} logout={this.props.logout} value="no-user" newPost={this.newPost} feedName={this.state.feedName}/>
        </div>
        <div className="feed-section">
          <Sidebar addBalloon={this.props.addBalloon} loggedIn={this.props.loggedIn}/>
          <div className="feed-wrapper">
            <UserFeedHeader feedName={this.state.feedName} description={this.state.description} adminURL={this.state.adminURL} adminName={this.state.adminName} adminPrivilege={this.state.adminPrivilege}/>
            <Feed value="all" feedName={this.state.feedName} newPost={this.state.newPost}/>
          </div>
        </div>
      </div>
    )
  }
}

export default UserFeedBody;

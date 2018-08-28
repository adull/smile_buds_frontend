import React, { Component } from 'react';
import ProfilePicture from './ProfilePicture.js';
import Greeting from './Greeting.js';
// import Search from './Search.js'
import Logout from './Logout.js';
import PostBar from './PostBar.js';

class AccountLoggedIn extends Component {
  render() {
    return(
      <div className="account">
        <div className="account-picture">
          <ProfilePicture identifier={this.props.identifier} />
        </div>
        <div className="account-right">
          <div className="account-right-top">
            <Greeting name={this.props.name}/>
            <Logout logout={this.props.logout}/>
          </div>
          <div className="account-right-bottom">
            <PostBar newPost={this.props.newPost}/>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountLoggedIn;

import React, { Component } from 'react';
import ProfilePicture from './ProfilePicture.js';
import Greeting from './Greeting.js';
// import Search from './Search.js'
import Logout from './Logout.js';
import PostBar from './PostBar.js';
import {Link} from 'react-router-dom';

class AccountLoggedIn extends Component {
  render() {
    return(
      <div className="account">
        <div className="account-picture">
          <Link to={"/user/" +this.props.identifier}>
            <ProfilePicture identifier={this.props.identifier} />
          </Link>
        </div>
        <div className="account-right">
          <div className="account-right-top">
            <Greeting name={this.props.name} identifier={this.props.identifier}/>
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

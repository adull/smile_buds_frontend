import React, { Component } from 'react';
import Header from '../../components/header/Header.js';
import UserProfile from '../../components/user/UserProfile.js';
import Balloons from '../../components/balloons/Balloons.js';

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      balloonAmt: 0,
      loggedIn: false
    }
    this.addBalloon = this.addBalloon.bind(this);
  }

  componentWillMount() {
    let thisObj = this;
    fetch('/get-self', {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json) {
        if(json.signedIn === false) {
          thisObj.setState({
            loggedIn: false
          })
        }
        else {
          thisObj.setState({
            loggedIn: true
          })
        }
      }
    })
  }

  addBalloon() {
    this.setState({
      balloonAmt: this.state.balloonAmt + 1
    })
  }

  render() {
    var pathName = this.props.location.pathname;
    var userIdentifier = pathName.substr(pathName.lastIndexOf('/') + 1);
    return (
      <div>
        <Header />
        <UserProfile addBalloon={this.addBalloon} loggedIn={this.state.loggedIn} user={userIdentifier}/>
        <Balloons balloonAmt={this.state.balloonAmt}/>
      </div>
    );
  }
}

export default UserPage;

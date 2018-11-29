import React, { Component } from 'react';
import Header from '../../components/header/Header.js';
import UserFeedBody from '../../components/user-feed/UserFeedBody.js';
import Balloons from '../../components/balloons/Balloons.js';

class FeedPage extends Component {
  constructor() {
    super();
    this.state = {
      balloonAmt: 0,
      loggedIn: false,
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.addBalloon = this.addBalloon.bind(this);
  }

  componentWillMount() {
    let thisObj = this;
    fetch('/api/get-self', {
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

  login() {
    this.setState({
      loggedIn: true
    })
  }

  logout() {
    this.setState({
      loggedIn: false
    })
  }

  componentWillReceiveProps(props) {
    this.setState({
      loggedIn: props.loggedIn
    });
  }

  render() {
    var pathName = this.props.location.pathname;
    var feedName = pathName.substr(pathName.lastIndexOf('/') + 1);
    return (
      <div>
        <Header loggedIn={this.state.loggedIn}/>
        <UserFeedBody feedName={feedName} addBalloon={this.addBalloon} loggedIn={this.state.loggedIn} login={this.login} logout={this.logout}/>
        <Balloons balloonAmt={this.state.balloonAmt}/>
      </div>
    );
  }
}

export default FeedPage;

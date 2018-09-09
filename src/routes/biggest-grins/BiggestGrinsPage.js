import React, { Component } from 'react';
import Header from '../../components/header/Header.js';
import BiggestGrins from '../../components/biggest-grins/BiggestGrins.js';
import Balloons from '../../components/balloons/Balloons.js';

class BiggestGrinsPage extends Component {
  constructor(props) {
    super(props);
    var pathName = props.location.pathname;
    var sortBy = pathName.substr(pathName.lastIndexOf('/') + 1);
    this.state = {
      balloonAmt: 0,
      loggedIn: false,
      sortBy: sortBy
    }
    this.addBalloon = this.addBalloon.bind(this);
  }

  componentWillMount() {
    let thisObj = this;
    fetch('/api/get-self', {
      credentials: 'include'
    })
    .then(function(response) {
      // if(response.ok) {
        return response.json();
      // }
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
    return (
      <div>
        <Header loggedIn={this.state.loggedIn}/>
        <BiggestGrins addBalloon={this.addBalloon} loggedIn={this.state.loggedIn} sortBy={this.state.sortBy}/>
        <Balloons balloonAmt={this.state.balloonAmt}/>
      </div>
    )
  }
}

export default BiggestGrinsPage;

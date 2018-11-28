import React, { Component } from 'react';
import Header from '../../components/header/Header.js';
import CoolLinksRoot from '../../components/cool-links/CoolLinksRoot.js';
import Balloons from '../../components/balloons/Balloons.js';

class CoolLinksPage extends Component {
  constructor() {
    super();
    this.state = {
      balloonAmt: 0,
      loggedIn: false
    }
  }

  addBalloon() {
    this.setState({
      balloonAmt: this.state.balloonAmt + 1
    })
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

  render() {
    return (
      <div>
        <Header loggedIn={this.state.loggedIn}/>
        <CoolLinksRoot />
        <Balloons balloonAmt={this.state.balloonAmt}/>
      </div>
    )
  }
}

export default CoolLinksPage;

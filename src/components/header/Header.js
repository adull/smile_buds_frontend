import React, { Component } from 'react';
import Notifications from '../notifications/Notifications.js';
import {Link} from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: props.loggedIn
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      loggedIn: props.loggedIn
    })
  }

  render() {
    return(
      <header>
        <a href="/" className="smile-buddies">
          <img src={ require('./spooky_buds.png') } alt="Smile buds" />
        </a>
        <div className="header-text">
          <img className="lol" src={ require('./smile_buds.png') } alt="Smile buds" />
          <div className="header-text-title">
            <i>Spookybuddies</i>
          </div>
          <div className="header-text-subtitle">
            <img className="subtitle-img" src={ require('./we_laugh.png') } alt="We Laugh So Much Here!" />
          </div>
        </div>
        <Notifications loggedIn={this.state.loggedIn}/>
      </header>
    );
  }
}

export default Header;

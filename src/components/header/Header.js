import React, { Component } from 'react';
import Notifications from '../notifications/Notifications.js';

class Header extends Component {
  render() {
    console.log("render header")
    return(
      <header>
        <div className="smile-buddies">
          <img src={ require('./smile_buds.png') } alt="Smile buds" />
        </div>
        <div className="header-text">
          <div className="header-text-title">
            <i>Smilebuddies</i>
          </div>
          <div className="header-text-subtitle">
            <img className="subtitle-img" src={ require('./we_laugh.png') } alt="We Laugh So Much Here!" />
          </div>
        </div>
        <Notifications />
      </header>
    );
  }
}

export default Header;

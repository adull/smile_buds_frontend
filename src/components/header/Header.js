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
        <Link to="/" className="smile-buddies">
          <img src={ require('./smile_buds.png') } alt="Smile buds" />
        </Link>
        <div className="header-text">
          <div className="header-text-title">
            <i>Smilebuddies</i>
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

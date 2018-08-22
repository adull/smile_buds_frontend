import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import Modal from '../modal/Modal.js';
import Messaging from '../messaging/Messaging.js';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      loggedIn: props.loggedIn
    };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      loggedIn: props.loggedIn
    })
  }

  render() {
    return(
      <div className="sidebar">
        <div className="sidebar-options-wrapper">
          <Link to="/" className="sidebar-option">
            <div className="option-image">
              <img src={ require('./star.png') } alt="Star" />
            </div>
            <div className="option-title">
              Smile Feed
            </div>
          </Link>
          <div onClick={this.toggleModal} className="sidebar-option">
            <div className="option-image">
              <img src={ require('./chat.png') } alt="Chat" />
            </div>
            <div className="option-title">
              Messages
            </div>
            <Modal className="messaging-modal" show={this.state.isOpen} onClose={this.toggleModal}>
              <Messaging mobileView="buddies" loggedIn={this.state.loggedIn}/>
            </Modal>
          </div>
          <Link to="/" className="sidebar-option">
            <div className="option-image">
              <img src={ require('./diamong.png') } alt="Diamond" />
            </div>
            <div className="option-title">
              Bouncy Balls
            </div>
          </Link>
          <div onClick={this.props.addBalloon} className="sidebar-option">
            <div className="option-image">
              <img src={ require('./umbrella.png') } alt="Umbrella" />
            </div>
            <div className="option-title">
              Balloons
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;

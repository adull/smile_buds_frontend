import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Search from '../search/Search.js';
import Modal from '../modal/Modal.js';
import Messaging from '../messaging/Messaging.js';
import CreateNewFeed from '../create-new-feed/CreateNewFeed.js';
import UserFeeds from './UserFeeds.js';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messengerIsOpen: false,
      aboutIsOpen: false,
      searchIsOpen: false,
      createNewFeedIsOpen: false,
      loggedIn: props.loggedIn
    };
  }

  toggleAboutModal = () => {
    this.setState({
      aboutIsOpen: !this.state.aboutIsOpen
    });
  }

  toggleMessengerModal = () => {
    this.setState({
      messengerIsOpen: !this.state.messengerIsOpen
    });
  }

  toggleSearchModal = () => {
    this.setState({
      searchIsOpen: !this.state.searchIsOpen
    })
  }

  toggleCreateNewFeedModal = () => {
    this.setState({
      createNewFeedIsOpen: !this.state.createNewFeedIsOpen
    })
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
          <a href="/" className="sidebar-option">
            <div className="option-image">
              <img src={ require('./star.png') } alt="Star" />
            </div>
            <div className="option-title">
              Smile Feed
            </div>
          </a>
          <div onClick={this.toggleSearchModal} className="sidebar-option">
            <div className="option-image">
              <img src={ require('./paw.png') } alt="Paw" />
            </div>
            <div className="option-title">
              Search Users
            </div>
            <Modal className="search-modal" show={this.state.searchIsOpen} onClose={this.toggleSearchModal}>
              <Search />
            </Modal>
          </div>
          <div onClick={this.toggleMessengerModal} className="sidebar-option">
            <div className="option-image">
              <img src={ require('./chat.png') } alt="Chat" />
            </div>
            <div className="option-title">
              Messages
            </div>
            <Modal className="messaging-modal" show={this.state.messengerIsOpen} onClose={this.toggleMessengerModal}>
              <Messaging mobileView="buddies" loggedIn={this.state.loggedIn}/>
            </Modal>
          </div>
          <div onClick={this.props.addBalloon} className="sidebar-option">
            <div className="option-image">
              <img src={ require('./umbrella.png') } alt="Umbrella" />
            </div>
            <div className="option-title">
              Ghosts
            </div>
          </div>
          <div onClick={this.toggleAboutModal} className="sidebar-option">
            <div className="option-image">
              <img src={ require('./diamong.png') } alt="Diamond" />
            </div>
            <div className="option-title">
              About
            </div>
            <Modal className="modal" show={this.state.aboutIsOpen} onClose={this.toggleAboutModal}>
              <div className="modal-content">
                <div className="modal-title">
                  Watch <a href="http://www.adultswim.com/videos/infomercials/dayworld" target="_blank">Dayworld</a> on Adult Swim.
                  <br /><br />
                  Developed by <a href="http://abdelrazaq.com" target="_blank">Adlai Abdelrazaq</a>
                </div>
              </div>
            </Modal>
          </div>
          <div onClick={this.toggleCreateNewFeedModal} className="sidebar-option">
            <div className="option-image">
              <img src={ require('./star.png') } alt="Star" />
            </div>
            <div className="option-title">
              New Feed
            </div>
            <Modal className="create-new-feed" show={this.state.createNewFeedIsOpen} onClose={this.toggleCreateNewFeedModal}>
              <CreateNewFeed creationSuccess={this.toggleCreateNewFeedModal}/>
            </Modal>
          </div>
          <UserFeeds />
        </div>
      </div>
    );
  }
}

export default Sidebar;

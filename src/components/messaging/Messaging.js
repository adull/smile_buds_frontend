import React, { Component } from 'react';
import MessageBuddies from './MessageBuddies.js';
import MessagingZone from './MessagingZone.js';

import LoginOrSignup from '../account/LoginOrSignup.js'

class Messaging extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // mobileView: 'buddies',
      mobileView: props.mobileView,
      modalIsOpen: false,
      loggedIn: props.loggedIn,
      messaging: props.messaging,
      buddyPicture: '',
      buddyName: '',
      // showMessagingZone: true
    }
    this.messagingUser = this.messagingUser.bind(this);
    this.rerender = this.rerender.bind(this);
    this.setToViewMessages = this.setToViewMessages.bind(this);
    this.setToViewMessageBuddies = this.setToViewMessageBuddies.bind(this);
    // this.hideMessagingZone = this.hideMessagingZone.bind(this);
  }

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  messagingUser(userid, buddyPicture, buddyName) {
    this.setState({
      mobileView: 'messages',
      messaging: userid,
      buddyPicture: buddyPicture,
      buddyName: buddyName
    })
  }

  // hideMessagingZone() {
  //   this.setState({
  //     showMessagingZone: false
  //   })
  // }

  rerender() {
    this.setState({
      mobileView: this.state.mobileView,
      messaging: this.state.messaging,
      buddyPicture: this.state.buddyPicture,
      buddyName: this.state.buddyName
    })
  }

  setToViewMessageBuddies() {
    this.setState({
      mobileView: 'buddies'
    })
  }

  setToViewMessages() {
    this.setState({
      mobileView: 'messages'
    })
  }

  componentWillReceiveProps(props) {
    this.setState({
      logginedIn: props.loggedIn
    })
  }

  render() {
    if(this.state.loggedIn === true) {
      return(
        <div className="messaging">
          <MessageBuddies mobileView={this.state.mobileView} changeView={this.setToViewMessages} setMessaging={this.messagingUser} messaging={this.state.messaging} />
          <MessagingZone mobileView={this.state.mobileView} changeView={this.setToViewMessageBuddies} success={this.rerender} messaging={this.state.messaging} messagingImage={this.state.buddyPicture} messagingName={this.state.buddyName}/>
        </div>
      )
    }
    else {
      return(
        <LoginOrSignup />
      )
    }
  }
}

export default Messaging;

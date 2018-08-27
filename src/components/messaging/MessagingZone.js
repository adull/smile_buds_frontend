import React, { Component } from 'react';
import MessagingZoneHeader from './MessagingZoneHeader.js';
import DisplayMessages from './DisplayMessages.js';
import ComposeMessage from './ComposeMessage.js';
import NotCurrentlyMessaging from './NotCurrentlyMessaging.js';

class MessagingZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileView: props.mobileView,
      buddyPicture: props.buddyPicture,
      buddyName: props.buddyName,
      messaging: props.messaging,
      messages: []
    }
    this.getMessages = this.getMessages.bind(this);
    if(this.state.messaging) {
      this.getMessages(this.state.messaging);
    }
  }

  getMessages(userid) {
    fetch('/api/get-messages/' + userid, {
      credentials: 'include'
    })
    .then(res => res.json())
    .catch(error => console.error("error: ", error))
    .then(response => {
      if(response) {
        this.setState({
          messaging: userid,
          messages: response
        })
      }
    })
    // this.props.success();
  }

  componentWillReceiveProps(props) {
    this.getMessages(props.messaging)
    this.setState({
      mobileView: props.mobileView,
      buddyPicture: props.messagingImage,
      buddyName: props.messagingName
    })
  }

  render() {
    let mobileView = "mobile-visible"
    if(this.state.mobileView === 'buddies') {
      mobileView = "mobile-invisible";
    }
    if(this.state.messaging) {
      return(
        <div className={"messaging-zone " + mobileView}>
          <div className="messaging-zone-scroll">
            <div className="back" onClick={this.props.changeView}>Back</div>
            <MessagingZoneHeader buddyPicture={this.state.buddyPicture} buddyName={this.state.buddyName} messaging={this.state.messaging} />
            <DisplayMessages messaging={this.state.messaging}/>
          </div>
          <div className="messaging-zone-compose">
            <ComposeMessage sendSuccess={this.props.success} messaging={this.state.messaging} />
          </div>
        </div>
      )
    }
    else {
      return(
        <NotCurrentlyMessaging />
      )
    }

  }
}

export default MessagingZone;

import React, {Component} from 'react';
import MessageBuddy from './MessageBuddy';
import NoMessageBuddies from './NoMessageBuddies.js';

class MessageBuddies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileView: props.mobileView,
      messageBuddies: []
    }
    this.getMessageBuddies = this.getMessageBuddies.bind(this);
    this.getMessageBuddies();
  }

  componentWillReceiveProps(props) {
    this.setState({
      mobileView: props.mobileView
    })
  }

  getMessageBuddies() {
    let thisObj = this;
    fetch('/api/get-message-buddies', {
      credentials: 'include'
    })
    .then(res => res.json())
    .catch(error => console.error('Error: ', error))
    .then(response => {
      if(response) {
        this.setState({
          messageBuddies: response
        })
      }
    })
  }

  render() {
    let mobileView = "mobile-visible"
    if(this.state.mobileView === 'messages') {
      mobileView = "mobile-invisible";
    }

    var elements = [];
    let messageBuddies = this.state.messageBuddies;
    for(var i = 0; i < messageBuddies.length; i ++) {
      let messageBuddy = messageBuddies[i];
      if(this.props.messaging === messageBuddy.them) {
      }
      elements.push(
        <MessageBuddy key={messageBuddy.id} metadata={messageBuddy} select={this.props.setMessaging} active={this.props.messaging === messageBuddy.them}/>
      );
    }
    if(elements.length > 0) {
      return (
        <div className={"message-buddies " + mobileView}>
          <h6 className="message-buddies-title">
            Friends to Message
          </h6>
          {elements}
        </div>
      )
    }
    else {
      return(
        <NoMessageBuddies />
      )
    }
  }
}

export default MessageBuddies;

import React, { Component } from 'react';

class NoMessageBuddies extends Component {
  render() {
    return(
      <div className="no-message-buddies">
        You don’t have any buddies to message. &#x2639; Go to a Buddy’s profile to send them a message!
      </div>
    )
  }
}

export default NoMessageBuddies;

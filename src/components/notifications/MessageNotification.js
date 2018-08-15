import React, {Component} from 'react';
import Notification from './Notification.js';

class MessageNotification extends Notification {
  constructor(props) {
    super(props);
    this.state = {
      fromName: props.metadata.notification_from_name,
      fromID: props.metadata.notification_from_id,
      type: props.metadata.notification_type
    }
  }
  render() {
    return(
      <div className={"notification " + this.state.type + "-notification"}>
        {this.state.fromName} sent you a message!
      </div>
    )
  }
}

export default MessageNotification;

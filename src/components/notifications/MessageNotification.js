import React, {Component} from 'react';
import Notification from './Notification.js';

class MessageNotification extends Notification {
  constructor(props) {
    super(props);
    this.state = {
      fromName: props.metadata.notification_from_name,
      fromID: props.metadata.notification_from_id,
      type: props.metadata.notification_type,
      messengerModalIsOpen: false
    }

    this.messagingNotificationClick = this.messagingNotificationClick.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
  }

  messagingNotificationClick() {
    // this.removeNotification();
    this.props.setMessaging(this.state.fromID);
    this.props.toggleMessaging();
  }

  removeNotification() {
    let thisObj = this;
    console.log("clicked on a message notification");
    fetch('/remove-message-notification/' + this.state.fromID, {
      credentials: 'include'
    })
    .then(res => res.json())
    .catch(error => console.error("error: ", error))
    .then(response => {
      if(response.ok) {
        thisObj.props.getNotifications;
      }
    })
  }

  render() {
    return(
      <div onClick={this.messagingNotificationClick} className={"notification " + this.state.type + "-notification"}>
        {this.state.fromName} sent you a message!
      </div>
    )
  }
}

export default MessageNotification;

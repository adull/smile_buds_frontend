import React, {Component} from 'react';
import Notification from './Notification.js';
import Modal from '../modal/Modal.js';
import Messaging from '../messaging/Messaging.js';

class MessageNotification extends Notification {
  constructor(props) {
    super(props);
    this.state = {
      fromName: props.metadata.notification_from_name,
      fromID: props.metadata.notification_from_id,
      type: props.metadata.notification_type,
      messengerModalIsOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.messagingNotificationClick = this.messagingNotificationClick.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
  }

  toggleModal = () => {
    this.setState({
      messengerModalIsOpen: !this.state.messengerModalIsOpen
    });
  }

  messagingNotificationClick() {
    this.toggleModal();
    this.removeNotification();
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
      <div>
        <div onClick={this.messagingNotificationClick} className={"notification " + this.state.type + "-notification"}>
          {this.state.fromName} sent you a message!
        </div>
        <Modal className="messaging-modal" show={this.state.messengerModalIsOpen}
               onClose={this.toggleModal}
               >
            <Messaging loggedIn={this.props.loggedIn} messaging={this.state.id}/>
        </Modal>
      </div>
    )
  }
}

export default MessageNotification;

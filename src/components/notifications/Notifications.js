import React, {Component} from 'react';
import NotificationsNumber from './NotificationsNumber.js';
import NotificationBox from './NotificationBox.js';
import Modal from '../modal/Modal.js';
import Messaging from '../messaging/Messaging.js';

class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      notificationBoxIsOpen: false,
      messengerModalIsOpen: false,
      notificationsArr: [],
      notificationsNum: 0,
      messaging: -1
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleNotificationBox = this.toggleNotificationBox.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.setMessaging = this.setMessaging.bind(this);
  }

  toggleModal = () => {
    this.setState({
      messengerModalIsOpen: !(this.state.messengerModalIsOpen)
    });
  }

  getNotifications() {
    fetch('/get-notifications', {
      credentials: 'include'
    })
    .then(res => res.json())
    .catch(error => console.error("error: ", error))
    .then(response => {
      if(response) {
        this.setState({
          notificationsArr: response,
          notificationsNum: response.length
        })
      }
      else {
        this.setState({
          notificationsArr: [],
          notificationsNum: 0
        })
      }
    })
  }

  componentWillReceiveProps(props) {
    fetch('/get-notifications', {
      credentials: 'include'
    })
    .then(res => res.json())
    .catch(error => console.error("error: ", error))
    .then(response => {
      if(response) {
        this.setState({
          notificationsArr: response,
          notificationsNum: response.length,
          loggedIn: props.loggedIn
        })
      }
      else {
        this.setState({
          notificationsArr: [],
          notificationsNum: 0,
          loggedIn: props.loggedIn
        })
      }
    })
  }

  toggleNotificationBox() {
    this.setState({
      notificationBoxIsOpen: !(this.state.notificationBoxIsOpen)
    })
  }

  setMessaging(id) {
    this.setState({
      messaging: id
    });
  }

  render() {
    return(
      <div className="notification-wrapper">
        <div onClick={this.toggleNotificationBox} className="notifications">
          <NotificationsNumber number={this.state.notificationsNum} />
          <img className="notifications-smile" src={ require('./smile.png') } alt="Smile" />
        </div>
        <NotificationBox notifications={this.state.notificationsArr}
                        getNotifications={this.getNotifications}
                        setMessaging={this.setMessaging}
                        toggleMessaging={this.toggleModal}
                        show={this.state.notificationBoxIsOpen}
                        onClose={this.toggleNotificationBox} />
        <Modal className="messaging-modal" show={this.state.messengerModalIsOpen}
               onClose={this.toggleModal}
               >
            <Messaging mobileView="messages" loggedIn={this.props.loggedIn} messaging={this.state.messaging}/>
        </Modal>
      </div>
    )
  }
}

export default Notifications;

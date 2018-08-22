import React, {Component} from 'react';
import NotificationsNumber from './NotificationsNumber.js';
import NotificationBox from './NotificationBox.js';

class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      notificationBoxIsOpen: false,
      notificationsArr: [],
      notificationsNum: 0
    }
    this.toggleNotificationBox = this.toggleNotificationBox.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
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

  componentWillReceiveProps() {
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

  toggleNotificationBox() {
    this.setState({
      notificationBoxIsOpen: !(this.state.notificationBoxIsOpen)
    })
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
                        show={this.state.notificationBoxIsOpen}
                        onClose={this.toggleNotificationBox}/>
      </div>
    )
  }
}

export default Notifications;

import React, {Component} from 'react';
import PostNotification from './PostNotification.js';
import MessageNotification from './MessageNotification.js';
import CommentNotification from './CommentNotification.js'


class NotificationBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: props.notifications
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      notifications: props.notifications
    })
  }

  render() {
    if(!this.props.show) {
      return null;
    }
    var elements = [];
    let notifications = this.state.notifications;
    if(notifications.success === "no-user") {
      return null;
    }
    for(let i = 0; i < notifications.length; i ++) {
      let notification = notifications[i];
      if(notification.notification_type === "post") {
        elements.push(
          <PostNotification key={notification.id} metadata={notification} getNotifications={this.props.getNotifications} />
        )
      }
      else if(notification.notification_type === "message") {
        elements.push(
          <MessageNotification setMessaging={this.props.setMessaging} toggleMessaging={this.props.toggleMessaging} key={notification.id} metadata={notification} getNotifications={this.props.getNotifications} />
        )
      }
      else if(notification.notification_type === "comment") {
        elements.push(
          <CommentNotification key={notification.id} metadata={notification} getNotifications={this.props.getNotifications} />
        )
      }
    }
    // console.log(elements);
    if(elements.length > 0) {
      return(
        <div className="notifications-box" onClick={this.props.onClose}>
          {elements}
        </div>
      )
    }
    else {
      return(
        <div className="notifications-box" onClick={this.props.onClose}>
          <div className="notifications-box-caught-up">You’re all caught up, Smile Buddy!</div>
        </div>
      )
    }
  }
}

export default NotificationBox;

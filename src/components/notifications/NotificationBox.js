import React, {Component} from 'react';
import PostNotification from './PostNotification.js';
import MessageNotification from './MessageNotification.js';


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
    // console.log(notifications);
    for(let i = 0; i < notifications.length; i ++) {
      let notification = notifications[i];
      if(notification.notification_type === "post") {
        elements.push(
          <PostNotification key={notification.id} metadata={notification} />
        )
      }
      else if(notification.notification_type === "message") {
        elements.push(
          <MessageNotification key={notification.id} metadata={notification} />
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
          Youre all caught up, Smile Buddy!
        </div>
      )
    }
  }
}

export default NotificationBox;

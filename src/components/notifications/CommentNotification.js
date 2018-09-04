import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Notification from './Notification.js';

class CommentNotification extends Notification {
  constructor(props) {
    super(props);
    this.state = {
      fromName: props.metadata.notification_from_name,
      fromID: props.metadata.notification_from_id,
      type: props.metadata.notification_type,
      post: props.metadata.post_hash
    }
    this.removeNotification = this.removeNotification.bind(this);
  }

  removeNotification() {
    let thisObj = this;
    // console.log("clicked on a comment notification");
    fetch('/api/remove-comment-notification/' + this.state.post, {
      credentials: 'include'
    })
    .then(res => res.json())
    .catch(error => console.error("error: ", error))
    .then(response => {
      // if(response.ok) {
        thisObj.props.getNotifications;
      // }
    })
  }

  render() {
    // console.log("render comment notification")
    return(
      <a href={"/post/" + this.state.post} className={"notification " + this.state.type + "-notification"}>
        <div onClick={this.removeNotification}>
          {this.state.fromName} commented on a post!
        </div>
      </a>
    )
  }
}

export default CommentNotification;

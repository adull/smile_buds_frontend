import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Notification from './Notification.js';

class PostNotification extends Notification {
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
    console.log("clicked on a post notification");
    fetch('/remove-post-notification/' + this.state.post, {
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
      <Link to={"/post/" + this.state.post} >
        <div onClick={this.removeNotification} className={"notification " + this.state.type + "-notification"}>
          {this.state.fromName} liked your post!
        </div>
      </Link>
    )
  }
}

export default PostNotification;

import React, {Component} from 'react';
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
  }
  render() {
    return(
      <div className={"notification " + this.state.type + "-notification"}>
        {this.state.fromName} liked your post!
      </div>
    )
  }
}

export default PostNotification;

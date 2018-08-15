import React, {Component} from 'react';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromName: props.metadata.notification_from_name,
      fromID: props.metadata.notification_from_id,
      type: props.metadata.notification_type
    }
  }
}

export default Notification;

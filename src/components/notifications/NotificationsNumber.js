import React, {Component} from 'react';

class NotificationsNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      number: props.number
    })
  }
  render() {
    if(this.state.number > 0) {
      return(
        <div className="notifications-number">{this.state.number}</div>
      )
    }
    else {
      return null;
    }
  }
}

export default NotificationsNumber;

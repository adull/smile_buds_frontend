import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      them: props.metadata.them,
      sender: props.metadata.sender,
      receiver: props.metadata.receiver,
      message: props.metadata.message
    }
  }

  render() {
    return(
      <div className={"message " + ((this.state.them) ? "from-them":"from-me")}>
        {((this.state.them) ? "Them: ":"Me: ") + this.state.message}
      </div>
    )
  }
}

export default Message;

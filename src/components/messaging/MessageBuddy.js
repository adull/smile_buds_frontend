import React, {Component} from 'react';

class MessageBuddy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
      // buddyPicture: '/get-profile-picture/' + props.metadata.identifier,
      // buddyName: props.metadata.first_name,
      buddyId: props.metadata.them,
      messagePreview: props.metadata.message_preview,
      buddyPicture: '',
      buddyName: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    fetch('/api/get-user/userid/' + this.props.metadata.them, {
      credentials: 'include'
    })
    .then(res => res.json())
    .catch(error => console.error("Error: ", error))
    .then(response => {
      if(response) {
        this.setState({
          buddyPicture: response.identifier,
          buddyName: response.first_name
        })
      }
    })
  }

  handleClick() {
    let meta = this.state;
    this.props.select(meta.buddyId, meta.buddyPicture, meta.buddyName);
  }

  render() {
    return (
      <div className={"message-buddy " + (this.props.active ? 'active':'not-active')} onClick={this.handleClick}>
        <div className="message-buddy-left">
          <img className="message-buddy-picture" src={'/api/get-profile-picture/' + this.state.buddyPicture} alt={this.state.buddyName}/>
        </div>
        <div className="message-buddy-right">
          <div className="message-buddy-name">{this.state.buddyName} says...</div>
          <div className="message-preview">“{this.state.messagePreview}”</div>
        </div>
      </div>
    );
  }
}

export default MessageBuddy;

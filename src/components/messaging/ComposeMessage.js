import React, {Component} from 'react';

class ComposeMessage extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    let thisObj = this;
    event.preventDefault();
    const {message} = this.state;

    fetch('/api/send-message/' + this.props.messaging, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({message}),
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .catch(error => console.error('Error: ', error))
    .then(response => {
      if(response) {
        if(response.success) {
          // console.log(this.refs.messageInput)
          this.refs.messageInput.value = '';
          thisObj.props.sendSuccess(thisObj.props.messaging);
        }
      }
    })

  }

  render() {
    return(
      <form className="send-message-form" onSubmit={this.handleSubmit}>
        <input className="send-message-form-input" ref="messageInput" name="message" id="message" type="text" value={this.state.value} onChange={this.handleInputChange} placeholder={"Send a message to your buddy!"} autoComplete="off" required />
        <input className="round-btn" type="submit" value="↝" />
      </form>
    )
  }
}

export default ComposeMessage;

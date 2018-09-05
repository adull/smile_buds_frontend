import React, {Component} from 'react';
import Message from './Message.js';

class DisplayMessages extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props)
    this.state = {
      messaging: this.props.messaging,
      messages: []
    }
    this.arraysAreTheSame = this.arraysAreTheSame.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  arraysAreTheSame(array1, array2) {
    let truth = (array1.length === array2.length)
    return truth;
  }

  getMessages(messaging) {
    fetch('/api/get-messages/' + messaging, {
      credentials: 'include'
    })
    .then(res => res.json())
    .catch(error => console.error("error: ", error))
    .then(response => {
      if(response) {
        if(this.arraysAreTheSame(this.state.messages, response)) {
        }
        else {
          this.setState({
            messages: response
          })
        }
      }
    })
  }

  componentWillReceiveProps(props) {
    this.getMessages(props.messaging);
  }

  componentDidMount() {
    this.getMessages(this.props.messaging);
  }

  render() {
    var elements = [];
    let messages = this.state.messages;
    for(var i = 0; i < messages.length; i ++) {
      let message = messages[i];
      elements.push(
        <Message key={message.id} metadata={message} />
      )
    }
    return elements;
  }
}

export default DisplayMessages;

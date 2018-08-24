import React, {Component} from 'react';
import Modal from '../../../modal/Modal.js';
import LoginOrSignup from '../../../account/LoginOrSignup.js'

class WriteComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      hash: props.hash,
      comment: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      hash: props.hash
    })
  }

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  handleInputChange(event) {
    console.log(event.target.value);
    this.setState({
      comment: event.target.value
    })
  }

  handleSubmit(event) {
    let thisObj = this;
    event.preventDefault();

    fetch('/write-comment/' + this.state.hash, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .catch(error => console.error('Error: ', error))
    .then(response => {
      if(response) {
        if(response.success) {
          // console.log(this.refs.messageInput)
          this.refs.commentInput.value = '';
        }
        else if(response.reason) {
          if(response.reason === "not-logged-in") {
            this.setState({
              modalIsOpen: true
            })
          }
        }
      }
    })
  }

  render() {
    return(
      <div className="write-comment-wrapper">
        <form className="write-comment" onSubmit={this.handleSubmit}>
          <input className="comment-input" ref="commentInput"  name="comment" id="comment" type="text" value={this.state.comment} onChange={this.handleInputChange} placeholder={"Write a comment!"} autoComplete="off" required />
          <input className="round-btn send-btn" type="submit" value="↝" />
        </form>
        <Modal show={this.state.modalIsOpen} onClose={this.toggleModal}>
          <LoginOrSignup />
        </Modal>
      </div>
    )
  }
}

export default WriteComment;

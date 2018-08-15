import React, { Component } from 'react';
import Modal from '../modal/Modal.js';
import LoginForm from '../account/LoginForm.js'
import SignupForm from '../account/SignupForm.js'

class AccountButton extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let buttonText;
    if(this.props.value === "login") {
      buttonText = "Log in!"
      return (
        <div>
          <button onClick={this.toggleModal} className="round-btn">{buttonText}</button>

          <Modal show={this.state.isOpen}
                 onClose={this.toggleModal}
                 >
              <LoginForm close={this.toggleModal} loginSuccess={this.props.loginSuccess}/>
          </Modal>
        </div>
      )
    }
    if(this.props.value === "signup") {
      buttonText = "Sign up!"
      return (
        <div>
          <button onClick={this.toggleModal} className="round-btn">{buttonText}</button>

          <Modal show={this.state.isOpen}
                 onClose={this.toggleModal}
                 >
              <SignupForm close={this.toggleModal} signupSuccess={this.props.signupSuccess}/>
          </Modal>
        </div>
      )
    }
  }
}

export default AccountButton;

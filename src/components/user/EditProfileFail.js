import React, { Component } from 'react';

class EditProfileFail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      errorType: props.errorType,
      errorMessage: ''
    }
    this.createErrorMessage = this.createErrorMessage.bind(this);
  }

  componentWillReceiveProps(props) {
    if(props.errorType !== '') {
      this.createErrorMessage(props.errorType);
    }
    this.setState({
      show: props.show,
      errorType: props.errorType
    })
  }

  createErrorMessage(errorType) {
    if(errorType === "diffPasswords") {
      var message = "Passwords do not match";
      this.setState({
        errorMessage: message
      })
    }
    else if(errorType === "fileSize") {
      var message = "File is too big!";
      this.setState({
        errorMessage: message
      })
    }
    else if(errorType === "emailExists") {
      var message = "An account with that email already exists!";
      this.setState({
        errorMessage: message
      })
    }
    else {
      var message = "An error occured! Try again";
      this.setState({
        errorMessage: message
      })
    }
  }

  render() {
    if(this.state.show === true) {
      return(
        <div className="edit-fail">
          {this.state.errorMessage}
        </div>
      )
    }
    else {
      return null;
    }
  }
}

export default EditProfileFail;

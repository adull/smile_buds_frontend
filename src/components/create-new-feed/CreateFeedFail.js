import React, { Component } from 'react';

class CreateFeedFail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      errorType: props.errorType,
      errorMessage: ''
    }
    this.createErrorMessage = this.createErrorMessage.bind(this);
  }

  createErrorMessage(errorType) {
    if(errorType === "name-exists") {
      this.setState({
        errorMessage: "A feed with this name already exists"
      })
    }
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

  render() {
    if(this.state.show === true) {
      return(
        <div className="create-feed-fail">
          {this.state.errorMessage}
        </div>
      )
    }
    else {
      return null;
    }
  }
}

export default CreateFeedFail;

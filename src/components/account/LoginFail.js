import React, { Component } from 'react';

class LoginFail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      show: props.show
    })
  }
  render() {
    if(this.state.show) {
      return(
        <div className="login-fail">
          Incorrect password
        </div>
      )
    }
    else {
      return null;
    }
  }
}

export default LoginFail;

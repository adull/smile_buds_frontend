import React, {Component} from 'react';
import AccountButton from './AccountButton.js';
import LoginForm from './LoginForm.js';
import SignupForm from './SignupForm.js';

class LoginOrSignup extends Component {
  constructor() {
    super();
    this.state = {
      loggingIn: false,
      signingUp: false,
      showDefault: true
    }
    this.loggingIn = this.loggingIn.bind(this);
    this.signingUp = this.signingUp.bind(this);
  }

  loggingIn() {
    console.log("trigger logging in")
    this.setState({
      loggingIn: true,
      signingUp: false,
      showDefault: false
    })
  }

  signingUp() {
    console.log("trigger signing up")
    this.setState({
      loggingIn: false,
      signingUp: true,
      showDefault: false
    })
  }

  render() {
    return(
      <div className="login-or-signup">
        <div className="login-or-signup-title">
          {"Login or signup to complete this action."}
        </div>
      </div>
    )
  }
}

export default LoginOrSignup;

import React, { Component } from 'react';
import Header from '../../components/header/Header.js';
import ForgotPasswordForm from '../../components/forgot-password/ForgotPasswordForm.js';

class ForgotPasswordPage extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }
  componentWillMount() {
    let thisObj = this;
    fetch('/api/get-self', {
      credentials: 'include'
    })
    .then(function(response) {
      // if(response.ok) {
        return response.json();
      // }
    })
    .then(function(json) {
      if(json) {
        if(json.signedIn === false) {
          thisObj.setState({
            loggedIn: false
          })
        }
        else {
          thisObj.setState({
            loggedIn: true
          })
        }
      }
    })
  }

  render() {
    if(this.state.loggedIn) {
      return(
        <a href="/" className="text-blue-arial">
          You’re already signed in, silly!
        </a>
      );
    }
    else {
      return (
        <div>
          <Header loggedIn={false}/>
          <div className="forgot-password">
            <ForgotPasswordForm />
          </div>
        </div>
      );
    }

  }
}

export default ForgotPasswordPage;

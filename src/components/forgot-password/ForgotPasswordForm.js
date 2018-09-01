import React, { Component } from 'react';

class ForgotPasswordForm extends Component {
  constructor() {
    super();
    this.state = {
      success: false,
      failure: false,
      email: ''
    }
    this.success = this.success.bind(this);
    this.failure = this.failure.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  success() {
    this.setState({
      success: true
    })
  }

  failure() {
    this.setState({
      failure: true
    })
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value});
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {success, failure, email} = this.state;
    console.log({email});
    fetch('/api/forgot', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({success, failure, email}),
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if(response) {
        if(response.success === false) {
          this.failure();
        }
        if(response.success === true) {
          this.success();
        }
      }
    });

  }

  render() {
    return(
      <div className="forgot-password-body">
        <div className="forgot-password-title text-blue-arial">
          Enter your email to get an email with a new password
        </div>
        <form className="smile-buds-form" onSubmit={this.handleSubmit}>
          <label htmlFor="email">
            Email:
            <input name="email" id="email" type="email" value={this.state.value} onChange={this.handleInputChange} required/>
          </label>
          <div className="submit-options">
           <input className="round-btn" type="submit" value="Submit!" />
         </div>
        </form>
        <div className="forgot-password-response">
          {this.state.failure ?
            <div className="forgot-password-failure">
              Something went wrong. Email may not be registered on SmileBuddies.
            </div>
            : null
          }
          {this.state.success ?
            <div className="forgot-password-success">
              Success! An email was sent to you containing your new password.<br />
              <a href="/">Return to homepage</a>
            </div>
            : null
          }
        </div>
      </div>
    )
  }
}

export default ForgotPasswordForm;

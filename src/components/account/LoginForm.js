import React, { Component } from 'react';
import LoginFail from './LoginFail.js'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginFail: false
    };

    this.loginFailure = this.loginFailure.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loginFailure() {
    console.log("trigger loginfail")
    this.setState({
      loginFail: true
    })
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.email === undefined || this.state.password === undefined) {
      this.loginFailure();
    }
    else {
      const {email, password} = this.state;
      fetch('/api/signin', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type':'application/json'}
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {

        if(response.success === false) {
          console.log("response is failure")
          this.loginFailure();
        }
        if(response.success) {
          this.props.loginSuccess();
          this.props.close();
        }
      });
    }
  }


  render() {
    return(
      <div className="modal-content">
        <div className="modal-title text-blue-arial">Log In!</div>
        <form className="smile-buds-form login-form" onSubmit={this.handleSubmit}>
           <label htmlFor="email">
             Email:
             <input name="email" id="email" type="email" value={this.state.value} onChange={this.handleInputChange} required/>
           </label>
           <label htmlFor="password">
             Password:
             <input name="password" id="password" type="password" value={this.state.value} onChange={this.handleInputChange} required/>
           </label>
           <LoginFail show={this.state.loginFail} />
           <div className="submit-options">
            <input className="round-btn" type="submit" value="Log In!" />
            <button className="round-btn" onClick={this.props.close} >Do not Log in</button>
          </div>
         </form>
       </div>
     );
   }
}

export default LoginForm;

import React, { Component } from 'react';
import AccountButton from './AccountButton.js';

class AccountNotLoggedIn extends Component {
  render() {
    return(
      <div className="account-no-user">
        <div className="account-top">
          <div className="cta text-blue-arial">Log in or sign up!</div>
        </div>
        <div className="account-bottom">
          <AccountButton value="login" loginSuccess = {this.props.login}/>
          <AccountButton value="signup" signupSuccess = {this.props.login}/>
        </div>
      </div>
    )
  }
}

export default AccountNotLoggedIn;

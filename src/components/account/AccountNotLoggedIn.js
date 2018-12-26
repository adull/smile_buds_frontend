import React, { Component } from 'react';
import AccountButton from './AccountButton.js';

class AccountNotLoggedIn extends Component {
  render() {
    return(
      <div className="account-no-user">
        <div className="account-top">
          <div className="cta text-blue-arial">Log in to smart smiling!</div>
          <div className="cta-small text-blue-arial-small">No new users are being accepted at this time, feel free to scroll through and enjoy the smiles that we have had!</div>
        </div>
        <div className="account-bottom">
          <AccountButton value="login" loginSuccess = {this.props.login}/>
        </div>
      </div>
    )
  }
}

export default AccountNotLoggedIn;

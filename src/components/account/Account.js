import React, { Component } from 'react';
import AccountNotLoggedIn from './AccountNotLoggedIn.js';
import AccountLoggedIn from './AccountLoggedIn.js';

class Account extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: '',
      userid: -1,
      useridentifier: ''
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    let thisBouttaLogin = this;
    fetch('/api/get-self', {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json) {
        thisBouttaLogin.setState({
          isLoggedIn: true,
          user: json.first_name,
          userid: json.userid,
          useridentifier: json.identifier
        })
        thisBouttaLogin.props.login();
      }
      else {
        thisBouttaLogin.setState({
          isLoggedIn: false,
          user: '',
          userid: -1,
          useridentifier: ''
        })
      }
    })
  }

  logout() {
    let thisBouttaLogout = this;
    fetch('/api/logout', {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      thisBouttaLogout.setState({
        isLoggedIn: false,
        user: '',
        userId: ''
      })
      thisBouttaLogout.props.logout();
    })
  }
  componentWillMount() {
    // console.log("h???")
    let thisObj = this;
    fetch('/api/get-self', {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json();
    })
    .catch(error => console.error('Error: ', error))
    .then(function(json) {
      if(json) {
        if(json.signedIn === false) {
          thisObj.setState({
            isLoggedIn: false,
            user: '',
            userid: -1,
            useridentifier: ''
          })
        }
        else {
          thisObj.setState({
            isLoggedIn: true,
            user: json.first_name,
            userid: json.userid,
            useridentifier: json.identifier
          })
        }
      }

    })
  }

  render() {
    // console.log(this.state);
    if(this.state.isLoggedIn === false) {
      return(
        <AccountNotLoggedIn value="no-user" login={this.login} />
      );
    }
    else {
      return(
        <AccountLoggedIn name={this.state.user} identifier={this.state.useridentifier} logout={this.logout}/>
      );
    }
  }
}

export default Account;

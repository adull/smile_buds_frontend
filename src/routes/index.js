import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import HomePage from './home/HomePage';
import UserPage from './user/UserPage';
import PostPage from './post/PostPage';
import ForgotPasswordPage from './forgot-password/ForgotPasswordPage';
import CoolLinksPage from './cool-links/CoolLinksPage';

import Balloons from '../components/balloons/Balloons.js';

class AppController extends React.Component {
  constructor() {
    super();
    this.state = {
      balloonAmt: 0
    }
    this.addBalloon = this.addBalloon.bind(this);
  }

  addBalloon() {
    this.setState({
      balloonAmt: this.state.balloonAmt + 1
    })
  }

  render() {
    return(
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/user/:userHash" component={UserPage} />
            <Route path="/post/:post" component={PostPage} />
            <Route exact path="/forgot-password" component={ForgotPasswordPage} />
            <Route exact path="/cool-links" component={CoolLinksPage} />
          </Switch>
        </BrowserRouter>
        <Balloons balloonAmt={this.state.balloonAmt}/>
      </div>

    )
  }
}

export default AppController;

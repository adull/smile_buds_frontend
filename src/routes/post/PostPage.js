import React, {Component} from 'react';
import Header from '../../components/header/Header.js';
import PostPageBody from '../../components/post-page/PostPageBody.js';
import Balloons from '../../components/balloons/Balloons.js';

class PostPage extends Component {
  constructor() {
    super();
    this.state = {
      balloonAmt: 0,
      loggedIn: false
    }
    this.addBalloon = this.addBalloon.bind(this);
  }
  componentWillMount() {
    let thisObj = this;
    fetch('/api/get-self', {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json();
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

  addBalloon() {
    this.setState({
      balloonAmt: this.state.balloonAmt + 1
    })
  }

  render() {
    var pathName = this.props.location.pathname;
    var userIdentifier = pathName.substr(pathName.lastIndexOf('/') + 1);
    console.log(userIdentifier);
    return(
      <div>
        <Header loggedIn={this.state.loggedIn}/>
        <PostPageBody addBalloon={this.addBalloon} loggedIn={this.state.loggedIn} postHash={userIdentifier}/>
        <Balloons balloonAmt={this.state.balloonAmt}/>
      </div>
    )
  }
}

export default PostPage;

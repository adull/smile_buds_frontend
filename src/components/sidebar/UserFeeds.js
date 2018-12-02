import React, { Component } from 'react';
import UserFeed from './UserFeed.js';

class UserFeeds extends Component {
  constructor() {
    super();
    this.state = {
      feeds: []
    }
  }

  componentWillMount() {
    fetch('/api/get-user-feeds', {
      credentials: 'include'
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      // console.log(response);
      this.setState({
        feeds: response
      })
    })
  }

  render() {
    let feeds = this.state.feeds;
    console.log(feeds)
    let feedsArr = [];

    for(var i = 1; i < feeds.length; i ++) {
      feedsArr.push(
        <UserFeed key={i} metadata={feeds[i]} />
      )
    }
    return(
      <div className="user-feeds">
        {feedsArr}
      </div>
    );
  }
}

export default UserFeeds;

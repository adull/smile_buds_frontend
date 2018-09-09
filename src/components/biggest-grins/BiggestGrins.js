import React, { Component } from 'react';
import BiggestGrinsHeader from './biggest-grins-header/BiggestGrinsHeader.js'
import Sidebar from '../sidebar/Sidebar.js';
import BiggestGrinsFeed from './BiggestGrinsFeed.js'

class BiggestGrins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      loading: true,
      sortBy: props.sortBy,
      posts: []
    }
    this.changeSortBy = this.changeSortBy.bind(this);
  }

  componentWillMount() {
    let thisObj = this;
    fetch('/api/get-biggest-grins/' + thisObj.state.sortBy, {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {
      if(json) {
        console.log(json);
        thisObj.setState({
          loading: false,
          posts: json
        })
      }
    })
  }

  changeSortBy(sortBy) {
    console.log("change sort by");
    console.log(sortBy)
    let thisObj = this;
    this.setState({
      sortBy: sortBy
    })
    fetch('/api/get-biggest-grins/' + thisObj.state.sortBy, {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {
      if(json) {
        console.log(json);
        thisObj.setState({
          loading: false,
          posts: json
        })
      }
    })
  }

  render() {
    if(this.state.loading === true) {
      return(
        <div className="body">
          <div className="uploading" />
        </div>
      )
    }
    else {
      console.log("re render dis!")
      return(
        <div className="body">
          <BiggestGrinsHeader sortBy={this.state.sortBy} changeSortBy={this.changeSortBy} />
          <div className="feed-section">
            <Sidebar addBalloon={this.props.addBalloon} loggedIn={this.state.loggedIn}/>
            <div className="feed-wrapper">
              <BiggestGrinsFeed sortBy={this.state.sortBy} posts={this.state.posts} />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default BiggestGrins;

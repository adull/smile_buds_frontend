import React, {Component} from 'react';
import Sidebar from '../sidebar/Sidebar.js';
import TextPost from '../feed/post/TextPost.js';
import ImagePost from '../feed/post/ImagePost.js';


class PostPageBody extends Component {
  constructor(props) {
    super(props);
    // console.log(props.loggedIn)
    this.state = {
      loggedIn: props.loggedIn,
      postHash: props.postHash,
      postExists: true,
      metadata: null
    }
  }
  componentWillMount() {
    let thisObj = this;
    fetch('/api/get-feed-post/' + this.state.postHash, {
      credentials: 'include',
    })
    .then(function(response) {
      if(response) {
        // if(response.ok) {
          return response.json();
        // }
      }
    })
    .then(function(json) {
      if(json) {
        if(json.error_reason === "no-post") {
          thisObj.setState({
            postExists: false
          })
        }
        // console.log(json);
        thisObj.setState({
          metadata: json
        })
      }
    })
  }

  componentWillReceiveProps(props) {
    // console.log(props)
    this.setState({
      loggedIn: props.loggedIn,
      postHash: props.postHash
    })
  }

  render() {
    let element = [];
    let metadata = this.state.metadata;
    if(this.state.postExists) {
      if(metadata) {
        let image = metadata.image;
        if(image === 0) {
          element.push(
            <TextPost key={metadata.id} metadata={metadata} />
          );
        }
        else if(image === 1) {
          element.push(
            <ImagePost key={metadata.id} metadata={metadata} />
          );
        }
        return(
          <div className="body">
            <div className="feed-section">
              <Sidebar addBalloon={this.props.addBalloon} loggedIn={this.state.loggedIn}/>
              <div className="feed-wrapper">
                <div className="feed">
                  {element}
                </div>
              </div>
            </div>
          </div>
        )
      }
      else {
        return null;
      }
    }
    else {
      return(
        <div className="body">
          <div className="feed-section">
            <Sidebar addBalloon={this.props.addBalloon} loggedIn={this.state.loggedIn}/>
            <div className="feed-wrapper">
              <div className="feed">
                <div className="feed-error">
                  The post couldn’t be found! It was likely deleted. Smile!
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default PostPageBody;

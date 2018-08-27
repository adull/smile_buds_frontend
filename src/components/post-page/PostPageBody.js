import React, {Component} from 'react';
import Sidebar from '../sidebar/Sidebar.js';
import TextPost from '../feed/post/TextPost.js';
import ImagePost from '../feed/post/ImagePost.js';


class PostPageBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      postHash: props.postHash,
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
        if(response.ok) {
          return response.json();
        }
      }
    })
    .then(function(json) {
      if(json) {
        // console.log(json);
        thisObj.setState({
          metadata: json
        })
      }
    })
  }
  render() {
    let element = [];
    let metadata = this.state.metadata;
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
}

export default PostPageBody;

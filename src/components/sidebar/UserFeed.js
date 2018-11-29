import React, { Component } from 'react';


class UserFeed extends Component {
  constructor(props) {
    super();
    this.state = {
      image: props.metadata.image,
      name: props.metadata.feedName,
      description: props.metadata.description
    }
  }

  render() {
    return(
      <a href={"/feed/" + this.state.name} className="sidebar-option">
        <div className="option-image">
          <img src={ require('./halloween-' + this.state.image + '.png') } alt={this.state.image} />
        </div>
        <div className="option-title">
          {this.state.name}
        </div>
      </a>
    )
  }
}

export default UserFeed;

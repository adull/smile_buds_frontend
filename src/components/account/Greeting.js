import React, { Component } from 'react';

class Greeting extends Component {

  render() {
    return(
      <div className="greeting-text text-blue-arial">
        Smile, {this.props.name}
      </div>
    );
  }
}

export default Greeting

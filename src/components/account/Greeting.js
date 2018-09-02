import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Greeting extends Component {

  render() {
    return(
      <div className="greeting-text text-blue-arial">
        Smile, <a href={"/user/" +this.props.identifier}> {this.props.name}</a>!
      </div>
    );
  }
}

export default Greeting

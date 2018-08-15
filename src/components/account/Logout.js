import React, {Component} from 'react';

class Logout extends Component {
  render() {
    return(
      <button className="round-btn" onClick={this.props.logout}>Log out</button>
    );
  }
}

export default Logout;

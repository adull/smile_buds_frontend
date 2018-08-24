import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Grinner extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      userID: props.data.user_id,
      userIdentifier: props.data.user_identifier,
      userName: props.data.user_name
    }
  }

  render() {
    return(
      <div className="grinner">
        <Link to={"/user/" + this.state.userIdentifier} >
          <img className="grinner-pic" src={"/get-profile-picture/" + this.state.userIdentifier} />
          <div className="grinner-name">
            {this.state.userName}
          </div>
        </Link>
      </div>
    )
  }
}

export default Grinner;

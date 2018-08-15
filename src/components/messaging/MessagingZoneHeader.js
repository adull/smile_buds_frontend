import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MessagingZoneHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buddyPicture: props.buddyPicture,
      buddyName: props.buddyName
    }
    if(this.state.buddyPicture === undefined || this.state.buddyName === undefined) {
      // console.log("this is what should trigger")
      // console.log(props.messaging);
      fetch('/get-user/userid/' + props.messaging, {
        credentials: 'include'
      })
      .then(res => res.json())
      .catch(error => console.error("Error: ", error))
      .then(response => {
        if(response) {
          this.setState({
            buddyPicture: response.identifier,
            buddyName: response.first_name
          })
        }
      })
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      buddyPicture: props.buddyPicture,
      buddyName: props.buddyName
    })
  }

  render() {
    return(
      <div className="messaging-header">
        <Link to={'/user/' + this.state.buddyPicture}>
          <img src={'/get-profile-picture/' + this.state.buddyPicture} alt={this.state.buddyName}/>
        </Link>
        <Link to={'/user/' + this.state.buddyPicture}>
          <span className="messaging-header-name">{this.state.buddyName}</span>
        </Link>
      </div>
    )
  }
}

export default MessagingZoneHeader;

import React, { Component } from 'react';

class ProfilePicture extends Component {
  render() {
    let identifier = this.props.identifier;
    let url = '/get-profile-picture/' + identifier
    return(
      <img src={url} alt="Profile" />
    );
  }
}

export default ProfilePicture;

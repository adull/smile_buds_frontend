import React, { Component } from 'react';

class ProfilePicture extends Component {
  render() {
    let identifier = this.props.identifier;
    if(identifier === undefined || identifier === '') {
      identifier = 'a';
    }
    let url = '/api/get-profile-picture/' + identifier
    return(
      <img src={url} alt="Profile" />
    );
  }
}

export default ProfilePicture;

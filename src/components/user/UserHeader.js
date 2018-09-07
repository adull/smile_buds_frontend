import React, { Component } from 'react';
import Modal from '../modal/Modal.js';
import Messaging from '../messaging/Messaging.js';
import EditProfile from './EditProfile.js';

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

class UserHeader extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      userID: props.user,
      userIdentifier: '',
      name: '',
      id: -1,
      love_amount: 0,
      hobby: '',
      hash: '',
      isMe: false,
      isAdmin: props.isAdmin,
      messengerModalIsOpen: false,
      editModalIsOpen: false,
      deleteModalIsOpen: false,
      fakeUser: false
    }
    this.deleteUser = this.deleteUser.bind(this);
    console.log(this.deleteUser)
    // console.log(this)
  }

  toggleMessengerModal = () => {
    this.setState({
      messengerModalIsOpen: !this.state.messengerModalIsOpen
    });
  }

  toggleEditModal = () => {
    this.setState({
      editModalIsOpen: !this.state.editModalIsOpen
    });
  }

  toggleDeleteModal = () => {
    this.setState({
      deleteModalIsOpen: !this.state.deleteModalIsOpen
    });
  }

  deleteUser() {
    fetch('/api/delete-account/' + this.state.userIdentifier, {
      credentials: 'include',
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('/delete-account/' + this.state.userIdentifier);
      if(response.success === true) {
        console.log("booya")
        this.setState({
          fakeUser: true
        })
      }
    })
  }

  componentWillMount() {
    let thisObj = this;
    fetch('/api/get-user/identifier/' + this.props.user, {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      // console.log(json);
      if(json.fake_user) {
        thisObj.setState({
          fakeUser: true
        })
      }
      thisObj.setState({
        name: json.first_name,
        id: json.id,
        userIdentifier: json.identifier,
        love_amount: pad(json.love_amount, 4),
        hobby: json.hobby,
        hash: thisObj.props.user,
        isMe: json.isMe
      })
    })
  }

  componentWillReceiveProps(props) {
    this.setState({
      isAdmin: props.isAdmin
    })
  }

  render() {
    console.log(this.state.isAdmin);
    if(this.state.fakeUser === true) {
      return null;
    }
    return(
      <div className="user-header">
        <div className="user-header-item user-header-image">
          <img src={'/api/get-profile-picture/' + this.state.hash} alt={this.state.name} />
        </div>
        <div className="user-header-item user-header-name">
          <span className="user-header-item-identifier">Name:</span> <span className="user-header-item-value">{this.state.name}</span>
        </div>
        <div className="user-header-item user-header-hobby">
          <span className="user-header-item-identifier">Hobby:</span> <span className="user-header-item-value">{toTitleCase(this.state.hobby)}</span>
        </div>
        <div className="user-header-item user-header-love">
          <span className="user-header-item-identifier">Loves you</span> <span className="user-header-item-value">{this.state.love_amount}</span> <span className="user-header-item-identifier">much.</span>
        </div>
        <div className="user-header-button-section">
          {this.state.isMe ? (
            <button onClick={this.toggleEditModal} className="user-profile-header-btn round-btn">Edit my profile</button>
          ) : (
            <button onClick={this.toggleMessengerModal} className="user-profile-header-btn round-btn">{"Message " + this.state.name}</button>
          )}
          {this.state.isAdmin ? (
            <button onClick={this.toggleDeleteModal} className="user-profile-header-btn delete-btn">Delete This Profile</button>
          ) : (
            null
          )}
        </div>
        <Modal className="messaging-modal" show={this.state.messengerModalIsOpen}
               onClose={this.toggleMessengerModal}
               >
            <Messaging mobileView="messages" loggedIn={this.props.loggedIn} messaging={this.state.id}/>
        </Modal>
        <Modal className="edit-modal" show={this.state.editModalIsOpen}
               onClose={this.toggleEditModal}
               >
            <EditProfile id={this.state.id} userIdentifier={this.state.userIdentifier} close={this.toggleEditModal}/>
        </Modal>
        <Modal className="delete-modal" show={this.state.deleteModalIsOpen}
               onClose={this.toggleDeleteModal}
               >
            <button onClick={this.deleteUser} className="delete-btn">Delete user</button>
        </Modal>
      </div>
    )
  }
}

export default UserHeader;

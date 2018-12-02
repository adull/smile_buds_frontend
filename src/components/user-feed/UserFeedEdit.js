import React, { Component } from 'react';
import UserFeedEditForm from './UserFeedEditForm.js';
import Modal from '../modal/Modal.js'

class UserFeedEdit extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      feedName: props.feedName,
      editPrivilege: props.adminPrivilege,
      editModalIsOpen: false
    }
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  toggleEditModal = () => {
    this.setState({
      editModalIsOpen: !(this.state.editModalIsOpen)
    });
  }

  componentWillReceiveProps(props) {
    console.log(props);
    this.setState({
      editPrivilege: props.adminPrivilege
    })
  }

  render() {
    console.log(this.state.editPrivilege);
    if(this.state.editPrivilege === true) {
      return (
        <div className="user-feed-edit">
          <button className="edit-btn" onClick={this.toggleEditModal}>
            Edit feed
          </button>
          <Modal className="user-feed-edit-modal" show={this.state.editModalIsOpen}>
            <UserFeedEditForm feedName={this.state.feedName} close={this.toggleEditModal} />
          </Modal>
        </div>
      )
    }
    else {
      return null;
    }
  }
}

export default UserFeedEdit;

import React, { Component } from 'react';
import UserFeedEdit from './UserFeedEdit.js';
import Modal from '../../modal/Modal.js'

class UserFeedEditButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedName: props.feedName,
      editingName: true,
      editingDescription: false,
      editingImage: false,
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
    this.setState({
      editPrivilege: props.adminPrivilege
    })
  }

  render() {
    if(this.state.editPrivilege === true) {
      return (
        <div className="user-feed-edit">
          <button className="edit-btn" onClick={this.toggleEditModal}>
            Edit feed
          </button>
          <Modal className="user-feed-edit-modal" show={this.state.editModalIsOpen} onClose={this.toggleEditModal}>
            <UserFeedEdit feedName={this.state.feedName} close={this.toggleEditModal} />
          </Modal>
        </div>
      )
    }
    else {
      return null;
    }
  }
}

export default UserFeedEditButton;

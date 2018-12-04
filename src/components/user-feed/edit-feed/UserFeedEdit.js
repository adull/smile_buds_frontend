import React, { Component } from 'react';
import UserFeedEditForm from './UserFeedEditForm.js'

class UserFeedEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedName: props.feedName,
      description: undefined,
      editFail: false,
      editingName: false,
      editingDescription: true,
      editingPicture: false,
      editingImage: false
    }
    this.editFailure = this.editFailure.bind(this);
    this.editName = this.editName.bind(this);
    this.editDescription = this.editDescription.bind(this);
    this.editImage = this.editImage.bind(this);
  }

  editFailure() {
    this.setState({
      editFail: true
    })
  }

  editName() {
    this.setState({
      editingName: true,
      editingDescription: false,
      editingImage: false
    })
  }

  editDescription() {
    this.setState({
      editingName: false,
      editingDescription: true,
      editingImage: false
    })
  }

  editImage() {
    this.setState({
      editingName: false,
      editingDescription: false,
      editingImage: true
    })
  }

  render() {
    return(
      <div className="modal-content">
        <div className="modal-title text-blue-arial">
          Edit your Feed!
        </div>
        <div className="edit-controller">
          <div className="edit-controller-options">
            <div className="edit-controller-option" onClick={this.editDescription}>
              Edit Feed Description
            </div>
            <div className="edit-controller-option" onClick={this.editImage}>
              Edit Feed Image
            </div>
          </div>
          <UserFeedEditForm editingName={this.state.editingName}
                            editingDescription={this.state.editingDescription}
                            editingImage={this.state.editingImage}
                            feedName={this.state.feedName}
                            close={this.props.close}/>
        </div>
      </div>
    )
  }
}

export default UserFeedEdit;

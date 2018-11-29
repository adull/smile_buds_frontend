import React, { Component } from 'react';
import Modal from '../modal/Modal.js';
import TextPostForm from '../post/TextPostForm.js';
import ImagePostForm from '../post/ImagePostForm.js';

class PostButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      feedName: props.feedName
    };
    this.postSuccess = this.postSuccess.bind(this);
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  postSuccess(hash) {
    this.toggleModal();
    this.props.newPost(hash);
  }

  render() {
    let buttonText;
    if(this.props.value === 'new-post') {
      buttonText = "New Post!"
      return (
        <div className="account-post">
          <button onClick={this.toggleModal} className="round-btn">{buttonText}</button>
          <Modal show={this.state.isOpen}
                 onClose={this.toggleModal}
                 >
              <TextPostForm feedName={this.state.feedName} postSuccess={this.postSuccess} />
          </Modal>
        </div>
      );
    }
    else if(this.props.value === 'funny-photo') {
      buttonText = "Funny Photo!"
      return (
        <div className="account-post">
          <button onClick={this.toggleModal} className="round-btn">{buttonText}</button>
          <Modal show={this.state.isOpen}
                 onClose={this.toggleModal}
                 >
              <ImagePostForm feedName={this.state.feedName} postSuccess={this.postSuccess} />
          </Modal>
        </div>
      );
    }

  }
}

export default PostButton;

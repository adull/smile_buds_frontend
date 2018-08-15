import React, { Component } from 'react';
import Modal from '../modal/Modal.js';
import TextPostForm from '../post/TextPostForm.js';
import ImagePostForm from '../post/ImagePostForm.js';

class PostButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
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
              <TextPostForm close={this.toggleModal} />
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
              <ImagePostForm close={this.toggleModal} />
          </Modal>
        </div>
      );
    }

  }
}

export default PostButton;

import React, {Component} from 'react';
import Modal from '../../modal/Modal.js';

class DeletePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.delete,
      hash: props.hash
    }

    this.onDelete = this.onDelete.bind(this);
  }

  toggleDeleteModal = () => {
    this.setState({
      deleteModalIsOpen: !this.state.deleteModalIsOpen
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      deleteModalIsOpen: false,
      show: props.show,
      hash: props.hash
    })
  }

  onDelete() {
    let thisObj = this;
    fetch('/api/delete-post/' + this.state.hash, {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      thisObj.props.clicked();
    })
  }

  render() {
    if(this.state.show) {
      return(
        <div className="delete-btn-wrapper">
          <button onClick={this.toggleDeleteModal} className="delete-btn">
            Delete Post
          </button>
          <Modal className="delete-modal" show={this.state.deleteModalIsOpen}
                 onClose={this.toggleDeleteModal}
                 >
              <button onClick={this.onDelete} className="delete-btn">Delete post</button>
          </Modal>
        </div>

      )
    }
    else{
      return null;
    }
  }
}

export default DeletePost;

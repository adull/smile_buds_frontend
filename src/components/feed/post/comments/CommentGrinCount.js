import React, { Component } from 'react';
import Modal from '../../../modal/Modal.js';
import CommentGrinners from './CommentGrinners.js';

class CommentGrinCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numGrins: props.numGrins,
      grinList: props.grinList,
      commentGrinnersModalIsOpen: false,
    }
    this.toggleCommentGrinnersModal = this.toggleCommentGrinnersModal.bind(this);
  }

  toggleCommentGrinnersModal = () => {
    this.setState({
      commentGrinnersModalIsOpen: !this.state.commentGrinnersModalIsOpen
    })
  }

  componentWillReceiveProps(props) {
    this.setState({
      numGrins: props.numGrins,
      grinList: props.grinList
    })
  }

  render() {
    if(this.state.numGrins > 0) {
      return(
        <div>
          <div onClick={this.toggleCommentGrinnersModal} className="comment-grin-count">
            {this.state.numGrins}
          </div>
          <Modal show={this.state.commentGrinnersModalIsOpen} onClose={this.toggleCommentGrinnersModal} className="grinner-list-modal">
            <div className="grinner-list-title">Grinners</div>
            <CommentGrinners grinList={this.state.grinList}/>
          </Modal>
        </div>
      )
    }
    else {
      return null;
    }
  }
}

export default CommentGrinCount;

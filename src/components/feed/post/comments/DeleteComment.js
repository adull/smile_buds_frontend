import React, {Component} from 'react';

class DeleteComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.delete,
      id: props.commentID
    }
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    let thisObj = this;
    fetch('/api/delete-comment/' + this.state.id, {
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
    return (
      <div onClick={this.onDelete} className="delete-comment">
        ✕
      </div>
    );
  }
}

export default DeleteComment

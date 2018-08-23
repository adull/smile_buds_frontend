import React, {Component} from 'react';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: props.metadata
    }
  }
  render() {
    console.log(this.state.metadata)
    return(
      <div className="comment">
        {this.state.metadata.comment}
      </div>
    )
  }
}

export default Comment;

import React, {Component} from 'react';

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.delete,
      hash: props.hash
    }

    this.onDelete = this.onDelete.bind(this);
    // this.fuckMe = this.fuckMe.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      show: props.show,
      hash: props.hash
    })
  }

  onDelete() {
    console.log("boutta fetch")
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
        <button onClick={this.onDelete} className="delete-btn">
          Delete Post
        </button>
      )
    }
    else{
      return null;
    }
  }
}

export default Delete;

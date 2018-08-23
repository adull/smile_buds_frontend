import React, {Component} from 'react';

class WriteComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: props.hash,
      comment: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      hash: props.hash
    })
  }

  handleInputChange(event) {
    console.log(event.target.value);
    this.setState({
      comment: event.target.value
    })
  }

  handleSubmit(event) {
    let thisObj = this;
    event.preventDefault();

    fetch('/write-comment/' + this.state.hash, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .catch(error => console.error('Error: ', error))
    .then(response => {
      if(response) {
        if(response.success) {
          // console.log(this.refs.messageInput)
          this.refs.commentInput.value = '';
        }
      }
    })
  }

  render() {
    return(
      <form className="write-comment" onSubmit={this.handleSubmit}>
        <input className="comment-input" ref="commentInput"  name="comment" id="comment" type="text" value={this.state.comment} onChange={this.handleInputChange} placeholder={"Write a comment!"} autoComplete="off" required />
        <input className="round-btn" type="submit" value="↝" />
      </form>
    )
  }
}

export default WriteComment;

import React, {Component} from 'react';

class TextPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      message: '',
      reason: '',
      feedName: props.feedName,
      uploading: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      uploading: true
    })
    const {subject, message, reason} = this.state;
    console.log(this.state.feedName);
    fetch('/api/text-post/' + this.state.feedName, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({subject, message, reason}),
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      // console.log('Success:', response);
      if(response.success) {
        // console.log(response);
        this.setState({
          uploading: false
        })
        this.props.postSuccess(response.hash);
      }
    });
  }

  render() {
    return(
      <div className="modal-content">
        <div className="modal-title text-blue-arial">New Post</div>
        <form className="smile-buds-form" onSubmit={this.handleSubmit}>
          <label htmlFor="subject">
            Subject:
            <input name="subject" id="subject" type="text" value={this.state.value} onChange={this.handleInputChange} maxLength="255" autoComplete="off" required/>
          </label>
          <label htmlFor="message">
            Status Message:
            <textarea name="message" id="message" value={this.state.value} onChange={this.handleInputChange} maxLength="1000" required/>
          </label>
          <label htmlFor="reason">
            Reason for Post:
            <input name="reason" id="reason" type="text" value={this.state.value} onChange={this.handleInputChange} maxLength="255" autoComplete="off" required/>
          </label>
          { this.state.uploading ? <div className="uploading"></div> : null }
          <div className="submit-options">
           <input className="round-btn" type="submit" value="Post It!" />
           <button className="round-btn" onClick={this.props.onClose} >Do not post</button>
         </div>
        </form>
      </div>
    )
  }
}

export default TextPostForm;

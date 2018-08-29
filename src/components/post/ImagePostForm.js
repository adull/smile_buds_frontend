import React, {Component} from 'react';
import PostFail from './PostFail.js'

class ImagePostForm extends Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      message: '',
      reason: '',
      error: false,
      error_type: '',
      uploading: false
    };

    this.fileInput = React.createRef();
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
    // const {subject, message, reason} = this.state;
    let data = new FormData();
    data.append("subject", this.state.subject);
    data.append("message", this.state.message);
    data.append("reason", this.state.reason);
    data.append("image", this.fileInput.current.files[0]);

    fetch('/api/image-post', {
      credentials: 'include',
      method: 'POST',
      body: data,
      // headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('Success:', response);
      if(response) {
        if(response.error_reason) {
          if(response.error_reason === "file-size") {
            this.setState({
              error: true,
              error_type: "fileSize",
              uploading: false
            })
          }
        }
        if(response.success) {
          this.setState({
            uploading: false
          })
          // this.props.close();
          this.props.postSuccess(response.hash);
        }
      }
    });
  }

  render() {
    return(
      <div className="modal-content">
        <div className="modal-title text-blue-arial">
          New Post
        </div>
        <form className="smile-buds-form" onSubmit={this.handleSubmit} encType="multipart/formdata">
          <label htmlFor="subject">
            Subject:
            <input name="subject" id="subject" type="text" value={this.state.value} onChange={this.handleInputChange} required/>
          </label>
          <label htmlFor="message">
            Status Message:
            <textarea name="message" id="message" value={this.state.value} onChange={this.handleInputChange} required/>
          </label>
          <label htmlFor="reason">
            Reason for Post:
            <input name="reason" id="reason" type="text" value={this.state.value} onChange={this.handleInputChange} required/>
          </label>
          <label className="file-label" htmlFor="image">
            Upload a funny picture! (Hey, no files bigger than 5 MB now!)
            <input name="image" id="image" type ="file" accept="image/png, image/jpg, image/jpeg" ref={this.fileInput} required />
          </label>
          { this.state.uploading ? <div className="uploading"></div> : null }
          <PostFail show={this.state.error} errorType={this.state.error_type} />
          <div className="submit-options">
           <input className="round-btn" type="submit" value="Post It!" />
           <button className="round-btn" onClick={this.props.onClose} >Do not post</button>
         </div>
        </form>
      </div>
    )
  }
}

export default ImagePostForm;

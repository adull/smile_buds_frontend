import React, { Component } from 'react';
import EditProfileFail from './EditProfileFail.js';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: props.id,
      userIdentifier: props.identifier,
      hobby: '',
      password: '',
      password_repeat: '',
      email_notifications: -1,
      error: false,
      error_type: '',
      uploading: false
    };
    this.fileInput = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    let target = event.target;
    const value = target.value;
    this.setState({ [event.target.name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if(!(this.state.password === this.state.password_repeat)) {
      this.setState({
        error: true,
        error_type: 'diffPasswords'
      })
      return;
    }
    else {
      this.setState({
        uploading: true
      })
      var thisState = this.state;
      let data = new FormData();
      data.append("hobby", this.state.hobby);
      if(this.state.password != '') {
        data.append("password", this.state.password);
      }
      data.append("email_notifications", this.state.email_notifications);
      data.append("image", this.fileInput.current.files[0]);
      fetch('/api/edit-profile', {
        credentials: 'include',
        method: 'POST',
        body: data,
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if(response) {
          // console.log("there was a response")
          if(response.success) {
            // console.log("success");
            this.props.close();
          }
          else {
            if(response.reason) {
              if(response.reason === "file-size") {
                this.setState({
                  error: true,
                  error_type: "fileSize",
                  uploading: false
                })
              }
              if(response.reason === "email-exists") {
                this.setState({
                  error: true,
                  error_type: "emailExists",
                  uploading: false
                })
              }
            }
          }
        }
      });
    }
  }

  render() {
    return(
      <div className="modal-content">
        <div className="edit-modal-title">
          <div className="modal-title text-blue-arial">Edit Your Information!</div>
          <div className="text-blue-arial">Only the fields you edit will be updated.</div>
        </div>
        <form className="smile-buds-form" onSubmit={this.handleSubmit}>
          <label className="file-label" htmlFor="image">
            Upload a new pic of your face! (Hey, no files bigger than 5 MB now!)
            <input name="image" id="image" type ="file" accept="image/png, image/jpg, image/jpeg" ref={this.fileInput} />
          </label>
          <label htmlFor="hobby">
            Update Your Favorite Hobby:
            <select name="hobby" id="hobby" value={this.state.value} onChange={this.handleInputChange} >
             <option selected="true"  value="" disabled>--</option>
             <option value="Dancing">Dancing</option>
             <option value="Singing">Singing</option>
             <option value="Hang out with friends">Hang out with friends</option>
             <option value="Chatting">Chatting</option>
           </select>
          </label>
          <label htmlFor="password">
            Update your Password:
            <input name="password" id="password" type="password" value={this.state.value} onChange={this.handleInputChange}/>
          </label>
          <label htmlFor="password_repeat">
            Repeat your new Password:
            <input name="password_repeat" id="password_repeat" type="password" value={this.state.value} onChange={this.handleInputChange} />
          </label>
          <fieldset className="smile-buddies-fieldset">
            <legend>Allow SmileBuddies to send you emails</legend>
            <div className="email-notifications-options">
              <div>
                  <input type="radio" id="enable_emails" name="email_notifications" value={1} onChange={this.handleInputChange} />
                  <label htmlFor="email_notifications">Enable</label>
              </div>
              <div>
                    <input type="radio" id="disable_emails" name="email_notifications" value={0} onChange={this.handleInputChange} />
                  <label htmlFor="email_notifications">Disable</label>
              </div>
            </div>
          </fieldset>
          { this.state.uploading ? <div className="uploading"></div> : null }
          <EditProfileFail show={this.state.error} errorType={this.state.error_type} />
          <div className="submit-options">
           <input className="round-btn" type="submit" value="Update!" />
           <button className="round-btn" onClick={this.props.close} >Do not update</button>
         </div>
        </form>
      </div>
    )
  }
}

export default EditProfile;

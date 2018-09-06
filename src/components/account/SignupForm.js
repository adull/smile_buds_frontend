import React, { Component } from 'react';
import SignupFail from './SignupFail.js';

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      hobby: 'Dancing',
      email: '',
      password: '',
      password_repeat: '',
      email_notifications: false,
      age_minimum: false,
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
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [event.target.name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.age_minimum === false) {
      this.setState({
        error: true,
        error_type: 'ageMinimum'
      })
      return;
    }
    if(!(this.state.password === this.state.password_repeat)) {
      this.setState({
        error: true,
        error_type: 'diffPasswords'
      })
      return;
    }

    // if(!(this.state.password === this.state.password_repeat)) {
    //   this.setState({
    //     error: true,
    //     error_type: 'diffPasswords'
    //   })
    //   return;
    // }
    else {
      this.setState({
        uploading: true
      })
      var thisState = this.state;
      let data = new FormData();
      data.append("first_name", this.state.first_name);
      data.append("last_name", this.state.last_name);
      data.append("hobby", this.state.hobby);
      data.append("email", this.state.email);
      data.append("password", this.state.password);
      data.append("email_notifications", this.state.email_notifications);
      data.append("image", this.fileInput.current.files[0]);
      fetch('/api/signup', {
        credentials: 'include',
        method: 'POST',
        body: data,
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if(response) {
          if(response.success) {
            let thisEmail = thisState.email;
            let thisPass = thisState.password;
            const {email, password} = {email: thisEmail, password: thisPass};
            fetch('/api/signin', {
              credentials: 'include',
              method: 'POST',
              body: JSON.stringify({email, password}),
              headers: {'Content-Type':'application/json'}
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
              if(response.success) {
                this.setState({
                  uploading: false
                })
                this.props.signupSuccess();
                this.props.close();
              }
            });
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
        <div className="modal-title text-blue-arial">Sign Up!</div>
        <form className="smile-buds-form signup-form" onSubmit={this.handleSubmit}>
           <label htmlFor="first_name">
             First Name:
             <input name="first_name" id="first_name" type="text" value={this.state.value} onChange={this.handleInputChange} required/>
           </label>
           <label htmlFor="last_name">
             Last Name:
             <input name="last_name" id="last_name" type="text" value={this.state.value} onChange={this.handleInputChange} required/>
           </label>
           <label className="file-label" htmlFor="image">
             Upload a pic of your face! (Hey, no files bigger than 1 MB now!)
             <input name="image" id="image" type ="file" accept="image/png, image/jpg, image/jpeg" ref={this.fileInput} required />
           </label>
           <label htmlFor="hobby">
             Favorite Hobby:
             <select name="hobby" id="hobby" value={this.state.value} onChange={this.handleInputChange} required>
              <option defaultValue value="Dancing">Dancing</option>
              <option value="Singing">Singing</option>
              <option value="Hang out with friends">Hang out with friends</option>
              <option value="Chatting">Chatting</option>
            </select>
           </label>
           <label htmlFor="email">
             Email:
             <input name="email" id="email" type="email" value={this.state.value} onChange={this.handleInputChange} required/>
           </label>
           <label htmlFor="password">
             Choose a Password:
             <input name="password" id="password" type="password" value={this.state.value} onChange={this.handleInputChange} required/>
           </label>
           <label htmlFor="password_repeat">
             Repeat your Password:
             <input name="password_repeat" id="password_repeat" type="password" value={this.state.value} onChange={this.handleInputChange} required/>
           </label>
           <label htmlFor="email_notifications" className="checkbox">
             <input type="checkbox" name="email_notifications" id="email_notifications" value={this.state.email_notifications} onChange={this.handleInputChange} /><span>Allow SmileBuddies to send you emails letting you know how much your friends love you</span>
           </label>
           <label htmlFor="age_minimum" className="checkbox">
             <input type="checkbox" name="age_minimum" id="age_minimum" value={this.state.age_minimum} onChange={this.handleInputChange}/><span>I am 13 years of age or older</span>
           </label>

           { this.state.uploading ? <div className="uploading"></div> : null }
           <SignupFail show={this.state.error} errorType={this.state.error_type} />
           <div className="submit-options">
            <input className="round-btn" type="submit" value="Sign Up!" />
            <button className="round-btn" onClick={this.props.close} >Do not sign up</button>
          </div>
         </form>
       </div>
     );
   }
}

export default SignupForm;

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
      error: false,
      error_type: ''
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
    if(!(this.state.password === this.state.password_repeat)) {
      console.log("SET ERROR TO TRUE");
      this.setState({
        error: true,
        error_type: 'diffPasswords'
      })
      return;
    }
    else {
      console.log("file input: ")
      console.log(this.fileInput);
      console.log(this.fileInput.current);
      console.log(this.fileInput.current.files)
      console.log(this.fileInput.current.files[0]);
      var thisState = this.state;
      let data = new FormData();
      data.append("first_name", this.state.first_name);
      data.append("last_name", this.state.last_name);
      data.append("hobby", this.state.hobby);
      data.append("email", this.state.email);
      data.append("password", this.state.password);
      data.append("image", this.fileInput.current.files[0]);
      console.log(data);
      fetch('/signup', {
        credentials: 'include',
        method: 'POST',
        // body: JSON.stringify({first_name, last_name, hobby, email, password}),
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
            fetch('/signin', {
              credentials: 'include',
              method: 'POST',
              body: JSON.stringify({email, password}),
              headers: {'Content-Type':'application/json'}
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
              console.log(response);
              if(response.success) {
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
                  error_type: "fileSize"
                })
              }
              if(response.reason === "email-exists") {
                this.setState({
                  error: true,
                  error_type: "emailExists"
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
           <label htmlFor="image">
             Upload a pic of your face! (Hey, no files bigger than 5 MB now!)
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

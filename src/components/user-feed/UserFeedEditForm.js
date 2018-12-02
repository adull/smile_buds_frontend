import React, { Component } from 'react';

class UserFeedEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedName: props.feedName,
      description: undefined,
      editFail: false
    }
    this.editFailure = this.editFailure.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  editFailure() {
    this.setState({
      editFail: true
    })
  }

  handleInputChange(event) {
    let target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
       [event.target.name]: value
     });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.description === undefined) {
      this.editFailure();
    }
    else {
      const {description} = this.state;
      console.log({description});
      fetch('/api/edit-user-feed/' + this.state.feedName, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({description}),
        headers: {'Content-Type':'application/json'}
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if(response.success === false) {
          // console.log("response is failure")
          this.loginFailure();
        }
        if(response.success) {
          // this.props.editSuccess();
          this.props.close();
        }
      });
    }
  }

  render() {
    return(
      <div className="modal-content">
        <div className="modal-title text-blue-arial">
          Edit your Feed!
        </div>
        <form className="edit-feed-form" onSubmit={this.handleSubmit}>
          <label htmlFor="description">
            Description:
            <input name="description" id="description" type="text" value={this.state.value} onChange={this.handleInputChange} required/>
          </label>
          <div className="submit-options">
           <input className="round-btn" type="submit" value="Edit your Feed!" />
           <div className="round-btn" onClick={this.props.close} >Do not edit your feed</div>
         </div>
        </form>
      </div>
    )
  }
}

export default UserFeedEditForm;

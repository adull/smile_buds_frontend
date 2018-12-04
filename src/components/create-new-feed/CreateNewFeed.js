import React, { Component } from 'react';
import CreateFeedFail from './CreateFeedFail.js';

class CreateNewFeed extends Component {
  constructor() {
    super();
    this.state = {
      image: 'star',
      feed_name: '',
      description: '',
      error: false,
      error_type: ''
    }

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
    let data = new FormData();
    const {image, feed_name, description} = this.state;
    fetch('/api/new-feed', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({image, feed_name, description}),
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if(response) {
        // console.log("response!")
        if(response.success) {
          this.props.creationSuccess();
        }
        else {
          if(response.reason === 'name-exists') {
            this.setState({
              error: true,
              error_type: 'name-exists'
            })
          }
        }
      }
      else {
        console.log("no response");
      }
    })
  }

  render() {
    return(
      <div className="modal-content create-new-feed">
      <div className="modal-title text-blue-arial">Create a New Feed!</div>
        <form className="smile-buds-form" onSubmit={this.handleSubmit}>
          <label htmlFor="image">
            Sidebar Image:
            <div className="image-options">
              <span className="image-option">
                <input type="radio" name="image" id="star" value={"star"} checked={this.state.image === "star"} onChange={this.handleInputChange}/>
                <img src={ require('../sidebar/star.png') } alt="Star" />
              </span>
              <span className="image-option">
                <input type="radio" name="image" value={"paw"} checked={this.state.image === "paw"} onChange={this.handleInputChange}/>
                <img src={ require('../sidebar/paw.png') } alt="Paw" />
              </span>
              <span className="image-option">
                <input type="radio" name="image" value={"umbrella"} checked={this.state.image === "umbrella"} onChange={this.handleInputChange}/>
                <img src={ require('../sidebar/umbrella.png') } alt="Umbrella" />
              </span>
              <span className="image-option">
                <input type="radio" name="image" value={"diamond"} checked={this.state.image === "diamond"} onChange={this.handleInputChange}/>
                <img src={ require('../sidebar/diamong.png') } alt="Diamond" />
              </span>
            </div>
          </label>
          <label htmlFor="feed_name">
            Name of your new Feed!
            <input name="feed_name" id="feed_name" type="text" value={this.state.value} onChange={this.handleInputChange} required/>
          </label>
          <label htmlFor="description">
            Description of your new Feed!
            <input name="description" id="description" type="text" value={this.state.value} onChange={this.handleInputChange} required/>
          </label>
          <CreateFeedFail show={this.state.error} errorType={this.state.error_type} />
          <div className="submit-options">
            <input className="round-btn" type="submit" value="Create New Feed!" />
            <div className="round-btn" onClick={this.props.close} >Do not create new feed</div>
           </div>
        </form>
      </div>
    )
  }
}

export default CreateNewFeed;

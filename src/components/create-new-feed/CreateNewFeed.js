import React, { Component } from 'react';

class CreateNewFeed extends Component {
  constructor() {
    super();
    this.state = {
      image: 'star',
      feedName: '',
      description: ''
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
    const {image, feedName, description} = this.state;
    fetch('/api/new-feed', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({image, feedName, description}),
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if(response) {
        console.log("response!")
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
                <img src={ require('./halloween-star.png') } alt="Star" />
              </span>
              <span className="image-option">
                <input type="radio" name="image" value={"paw"} checked={this.state.image === "paw"} onChange={this.handleInputChange}/>
                <img src={ require('./halloween-paw.png') } alt="Paw" />
              </span>
              <span className="image-option">
                <input type="radio" name="image" value={"umbrella"} checked={this.state.image === "umbrella"} onChange={this.handleInputChange}/>
                <img src={ require('./halloween-umbrella.png') } alt="Umbrella" />
              </span>
              <span className="image-option">
                <input type="radio" name="image" value={"diamond"} checked={this.state.image === "diamond"} onChange={this.handleInputChange}/>
                <img src={ require('./halloween-diamong.png') } alt="Diamond" />
              </span>
            </div>
          </label>
          <label htmlFor="feedName">
            Name of your new Feed!
            <input name="feedName" id="feedName" type="text" value={this.state.value} onChange={this.handleInputChange} required/>
          </label>
          <label htmlFor="description">
            Description of your new Feed!
            <input name="description" id="description" type="text" value={this.state.value} onChange={this.handleInputChange} required/>
          </label>
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

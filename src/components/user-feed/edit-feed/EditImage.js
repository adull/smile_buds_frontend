import React, { Component } from 'react';
import Edit from './Edit.js';

class EditImage extends Edit {
  constructor(props) {
    super(props);
    this.state = {
      image: 'star',
      feed_name: '',
      description: '',
      show: props.show,
      property: props.property
    }
  }

  handleInputChange(event) {
    let target = event.target;
    const value = target.value;
    this.setState({
       [event.target.name]: value}
     );
  }

  render() {
    if(this.state.show) {
      return(
        <form className="smile-buds-form image" onSubmit={this.handleSubmit}>
        <label htmlFor="image">
          Edit Image:
          <div className="image-options">
            <span className="image-option">
              <input type="radio" name="image" id="star" value={"star"} checked={this.state.image === "star"} onChange={this.handleInputChange}/>
              <img src={ require('../../sidebar/star.png') } alt="Star" />
            </span>
            <span className="image-option">
              <input type="radio" name="image" value={"paw"} checked={this.state.image === "paw"} onChange={this.handleInputChange}/>
              <img src={ require('../../sidebar/paw.png') } alt="Paw" />
            </span>
            <span className="image-option">
              <input type="radio" name="image" value={"umbrella"} checked={this.state.image === "umbrella"} onChange={this.handleInputChange}/>
              <img src={ require('../../sidebar/umbrella.png') } alt="Umbrella" />
            </span>
            <span className="image-option">
              <input type="radio" name="image" value={"diamond"} checked={this.state.image === "diamond"} onChange={this.handleInputChange}/>
              <img src={ require('../../sidebar/diamong.png') } alt="Diamond" />
            </span>
          </div>
        </label>
        <div className="submit-options">
         <input className="round-btn" type="submit" value="Edit your Feed!" />
         <div className="round-btn" onClick={this.props.close} >Do not edit your feed</div>
        </div>
        </form>
      )
    }
    else {
      return null;
    }
  }
}

export default EditImage;

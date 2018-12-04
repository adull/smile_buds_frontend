import React, { Component } from 'react';
import Edit from './Edit.js';

class EditDescription extends Edit {
  constructor(props) {
    super(props);
    this.state = {
      property: props.property,
      show: props.show,
      feedName: props.feedName
    }
  }
  render() {
    if(this.state.show) {
      return(
        <form className="smile-buds-form description" onSubmit={this.handleSubmit}>
          <label htmlFor="description">
            Description:
            <input name="description" id="description" type="text" value={this.state.value} onChange={this.handleInputChange} required/>
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

export default EditDescription;

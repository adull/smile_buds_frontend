import React, { Component } from 'react';
import Edit from './Edit.js';

class EditName extends Edit {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show
    }
  }

  render() {
    if(this.state.show) {
      return(
        <form className="edit-feed-form name" onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            Name:
            <input name="name" id="name" type="text" value={this.state.value} onChange={this.handleInputChange} required/>
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

export default EditName;

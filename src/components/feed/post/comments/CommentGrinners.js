import React, { Component } from 'react';
import CommentGrinner from './CommentGrinner.js';

class CommentGrinners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grins: props.grinList,
      grinnerList: []
    }
  }

  componentWillMount() {
    for(var i = 0; i < this.state.grins.length; i ++) {
      this.state.grinnerList.push(
        <CommentGrinner key={i} data={this.state.grins[i]} />
      )
    }
  }

  render() {
    return(
      <div className="grinner-list">
        {this.state.grinnerList}
      </div>
    )
  }
}

export default CommentGrinners;

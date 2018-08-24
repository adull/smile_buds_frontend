import React, { Component } from 'react';
import Grinner from './Grinner.js'

class GrinnerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grins: props.grins,
      grinnerList: []
    }
  }

  componentWillMount() {
    for(let i = 0; i < this.state.grins.length; i ++) {
      this.state.grinnerList.push(
        <Grinner key={i} data={this.state.grins[i]} />
      )
    }
  }

  render(){
    return(
      <div className="grinner-list">
        {this.state.grinnerList}
      </div>
    )
  }
}

export default GrinnerList;

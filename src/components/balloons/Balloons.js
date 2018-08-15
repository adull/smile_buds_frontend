import React, { Component } from 'react';
import Balloon from './Balloon.js'

class Balloons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfBalloons: 0
    }
    this.randomColor = this.randomColor.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      numberOfBalloons: props.balloonAmt
    })
  }

  randomColor() {
    let colorArray = ['FF0000', '0000FF', '008000', 'FFC0CB', 'FF8000', 'FFFF00'];
    let color = colorArray[Math.floor(Math.random() * colorArray.length)];
    return color;

  }
  render() {
    let balloons = [];
    for(var i = 0; i < this.state.numberOfBalloons; i ++) {
      balloons.push(<Balloon key={i} color={this.randomColor()} />)
    }
    return(
      <div className="balloons">
        {balloons}
      </div>
    )
  }
}

export default Balloons;

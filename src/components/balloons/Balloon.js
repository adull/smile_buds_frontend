import React, { Component } from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';

class Balloon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      styles: {
        "top": "0%",
        "left": "0%"
      },
      color: props.color
    }
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    this.setState({
      styles: {
        "top": Math.floor(Math.random() * 71) + "%",
        "left": Math.floor(Math.random() * 81) + "%"
      }
    })
  }

  hide() {
    // console.log("hide")
    this.setState({
      show: false
    })
  }

  render() {
    if(this.state.show === true) {
      return(
        <SvgLoader onClick={this.hide} className="balloon" style={this.state.styles} fill={"#" + this.state.color} path={ require('./balloon.svg') }>
          <SvgProxy selector="#balloon" />
        </SvgLoader>
      )
    }
    else {
      return null;
    }
  }

}

export default Balloon;

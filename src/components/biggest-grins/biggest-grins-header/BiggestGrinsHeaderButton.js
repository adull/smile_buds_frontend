import React, {Component} from 'react';

class BiggestGrinsHeaderButton extends Component {
  constructor(props) {
    super(props);
    // console.log(props.value)
    this.state = {
      value: props.value
    }
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    this.props.onClick(this.state.value);
  }

  render() {
    return(
      <button onClick={this.buttonClick} className="round-btn-arial">{this.state.value}</button>
    );
  }
}

export default BiggestGrinsHeaderButton;

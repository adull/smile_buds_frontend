import React, {Component} from 'react';

class BiggestGrinsHeaderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }
  }

  render() {
    return(
      <button className="round-btn-arial">{this.state.value}</button>
    );
  }
}

export default BiggestGrinsHeaderButton;

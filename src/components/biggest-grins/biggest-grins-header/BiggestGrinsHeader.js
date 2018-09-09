import React, {Component} from 'react';
import BiggestGrinsHeaderButton from './BiggestGrinsHeaderButton.js';

class BiggestGrinsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: props.sortBy
    }
    this.sortByOnClick = this.sortByOnClick.bind(this);
  }

  sortByOnClick(value) {
    let possibleValues = ['day', 'week', 'month', 'year'];
    if (!possibleValues.includes(value)) {
      return;
    }
    else {
      this.props.changeSortBy(value);
    }
  }

  render() {
    return(
      <div className="biggest-grins-header">
        <div className="biggest-grins-header-title">
          Sort By:
        </div>
        <div className="biggest-grins-header-options">
          <BiggestGrinsHeaderButton onClick={this.sortByOnClick} value="day" />
          <BiggestGrinsHeaderButton onClick={this.sortByOnClick} value="week" />
          <BiggestGrinsHeaderButton onClick={this.sortByOnClick} value="month" />
          <BiggestGrinsHeaderButton onClick={this.sortByOnClick} value="all" />
        </div>
      </div>
    )
  }
}

export default BiggestGrinsHeader;

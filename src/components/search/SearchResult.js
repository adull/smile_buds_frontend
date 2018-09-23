import React, {Component} from 'react';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: props.data.id,
      userIdentifier: props.data.identifier,
      userName: props.data.first_name
    }
  }
  componentWillReceiveProps(props) {
    this.state = {
      userID: props.data.id,
      userIdentifier: props.data.identifier,
      userName: props.data.first_name
    }
  }
  render() {
    return(
      <div className="result">
        <a href={"/user/" + this.state.userIdentifier} >
          <img className="grinner-pic" src={"/api/get-profile-picture/" + (this.state.userIdentifier || 'a')} />
          <div className="grinner-name">
            {this.state.userName}
          </div>
        </a>
      </div>
    )
  }
}

export default SearchResult;

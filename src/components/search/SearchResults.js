import React, {Component} from 'react';
import SearchResult from './SearchResult.js'

class SearchResults extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      query: props.searchQuery,
      querySent: false,
      searchResults: props.searchResults,
    }
    // this.createResults = this.createResults.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      query: props.searchQuery,
      querySent: true,
      searchResults: props.searchResults
    })
  }

  render() {
    let elements = [];
    for(var i = 0; i < this.state.searchResults.length; i ++) {
      elements.push(
        <SearchResult key={i} data={this.state.searchResults[i]} />
      )
    }
    return(
      <div className="search-results">
        <div className="search-results-header">
          {this.state.querySent ? ( elements.length > 0 ? "Displaying users with a name similar to " + this.state.query: "There are no SmileBuddies with a name similar to " + this.state.query) : null}
        </div>
        {elements}
      </div>
    )
  }
}

export default SearchResults;

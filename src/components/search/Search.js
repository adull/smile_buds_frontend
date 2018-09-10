import React, {Component} from 'react';
import SearchInput from './SearchInput.js';
import SearchResults from './SearchResults.js';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      searchResults: []
    }
    this.updateSearchResults = this.updateSearchResults.bind(this);
  }

  updateSearchResults(query, results) {
    this.setState({
      query: query,
      searchResults: results
    })
  }

  render() {
    return(
      <div className="search">
        <div className="search-title">Search Users!</div>
        <SearchInput searchUser={this.searchUser} updateSearchResults={this.updateSearchResults}/>
        <SearchResults searchQuery={this.state.query} searchResults={this.state.searchResults}/>
      </div>
    )
  }
}

export default Search

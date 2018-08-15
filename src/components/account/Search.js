import React, { Component } from 'react';

class Search extends Component {
  render() {
    return(
      <div className="top-right">
        <input className="search-input" placeholder="Search"/>
        <button className="search-btn"></button>
        <span></span>
      </div>
    );
  }
}

export default Search;

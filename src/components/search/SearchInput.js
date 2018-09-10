import React, {Component} from 'react';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      searchQuery: '',
      loading: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    let thisObj = this;
    // console.log(thisObj);
    event.preventDefault();
    this.setState({
      loading: true
    })
    const {searchQuery} = this.state;
    // console.log({searchQuery});
    fetch('/api/search', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({searchQuery}),
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if(response) {
        thisObj.setState({
          loading: false
        })
        thisObj.props.updateSearchResults(searchQuery, response.results);
      }
      else {
        console.log("no response")
      }
    })
  }

  render() {
    return(
      <form className="search-input" onSubmit={this.handleSubmit}>
        <input name="searchQuery" id="searchQuery" type="text" value={this.state.value} onChange={this.handleInputChange} maxLength="255" autoComplete="off" required/>
        { this.state.loading ? <div className="uploading"></div> : null }
        <input className="round-btn send-btn" type="submit" value="↝" />
      </form>
    )
  }
}

export default SearchInput;

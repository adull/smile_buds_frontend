import React, { Component } from 'react';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedName: props.feedName,
      property: props.property,
      name: '',
      description: '',
      image: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      feedName: props.feedName,
      show: props.show
    })
    console.log(this.state)
  }

  handleInputChange(event) {
    let target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
       [event.target.name]: value
     });
  }

  handleSubmit(event) {
    console.log(this);
    // console.log(event.target.attr('class'))
    event.preventDefault();
    if(this.state.description === undefined) {
      this.editFailure();
    }
    else {
      const {feedName, name, description, image} = this.state;
      // console.log({description});
      console.log(this.state);
      console.log(this.state.feedName)
      fetch('/api/edit-user-feed/' + this.state.property + '/' + this.state.feedName, {
      // fetch('/api/edit-user-feed/' + feedProperty + '/' + this.state.feedName, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({feedName, name, description, image}),
        headers: {'Content-Type':'application/json'}
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if(response.success === false) {
          this.loginFailure();
        }
        if(response.success) {
          this.props.close();
        }
      });
    }
  }

  render() {
    return null;
  }
}

export default Edit;

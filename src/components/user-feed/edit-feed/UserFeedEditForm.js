import React, { Component } from 'react';
import EditDescription from './EditDescription.js';
import EditImage from './EditImage.js';

class UserFeedEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedName: props.feedName,
      showEditName: props.editingName,
      showEditDescription: props.editingDescription,
      showEditImage: props.editingImage
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      showEditName: props.editingName,
      showEditDescription: props.editingDescription,
      showEditImage: props.editingImage
    })
  }

  render() {
    return(
      <div className="user-feed-edit">
        <EditDescription show={this.state.showEditDescription} property="description" feedName={this.state.feedName} close={this.props.close}/>
        <EditImage show={this.state.showEditImage} property="image" feedName={this.state.feedName} close={this.props.close}/>
      </div>
    )
  }
}

export default UserFeedEditForm;

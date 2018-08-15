import React, { Component } from 'react';
import Modal from '../modal/Modal.js';
import Messaging from '../messaging/Messaging.js';

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

class UserHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: -1,
      love_amount: 0,
      hobby: '',
      hash: '',
      messengerModalIsOpen: false
    }
  }

  toggleModal = () => {
    this.setState({
      messengerModalIsOpen: !this.state.messengerModalIsOpen
    });
  }

  componentWillMount() {
    let thisObj = this;
    fetch('/get-user/identifier/' + this.props.user, {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      thisObj.setState({
        name: json.first_name,
        id: json.id,
        love_amount: 0,
        hobby: json.hobby,
        hash: thisObj.props.user
      })
    })
  }

  render() {
    console.log(this.props.user);
    return(
      <div className="user-header">
        <div className="user-header-item user-header-image">
          <img src={'/get-profile-picture/' + this.state.hash} alt={this.state.name} />
        </div>
        <div className="user-header-item user-header-name">
          <span className="user-header-item-identifier">Name:</span> <span className="user-header-item-value">{this.state.name}</span>
        </div>
        <div className="user-header-item user-header-hobby">
          <span className="user-header-item-identifier">Hobby:</span> <span className="user-header-item-value">{toTitleCase(this.state.hobby)}</span>
        </div>
        <div className="user-header-item user-header-love">
          <span className="user-header-item-identifier">Loves you</span> <span className="user-header-item-value">{this.state.love_amount}</span> <span className="user-header-item-identifier">much.</span>
        </div>
        <button onClick={this.toggleModal} className="round-btn">{"Message " + this.state.name}</button>
        <Modal className="messaging-modal" show={this.state.messengerModalIsOpen}
               onClose={this.toggleModal}
               >
            <Messaging loggedIn={this.props.loggedIn} messaging={this.state.id}/>
        </Modal>
      </div>
    )
  }
}

export default UserHeader;

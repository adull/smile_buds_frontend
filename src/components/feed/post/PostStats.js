import React, { Component } from 'react';
import Modal from '../../modal/Modal.js';
import GrinnerList from './GrinnerList.js';

class PostStats extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      postStatsModalIsOpen: false,
      grins: props.allGrins,
      postStats: props.stats
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      grins: props.allGrins,
      postStats: props.stats
    })
  }

  toggleModal = () => {
    this.setState({
      postStatsModalIsOpen: !this.state.postStatsModalIsOpen
    });
  }

  render() {
    return(
      <div className="post-stats-wrapper">
        <div onClick={this.toggleModal} className="post-stats">
          {this.state.postStats}
        </div>
        <Modal className="grinner-list-modal"
               show={this.state.postStatsModalIsOpen}
               onClose={this.toggleModal}
               >
          <div className="grinner-list-title">Grinners</div>
          <GrinnerList grins={this.state.grins}/>
        </Modal>
      </div>
    )
  }
}

export default PostStats;

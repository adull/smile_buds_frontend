import React, { Component } from 'react';
import CommentGrin from './CommentGrin.js';
import CommentGrinCount from './CommentGrinCount.js';

class CommentGrinSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentID: props.id,
      numGrins: 0,
      didIGrin: false,
      grinModalIsOpen: false,
      grins: props.grins,
      grinsForThisComment: []
    }
    this.toggleGrinModal = this.toggleGrinModal.bind(this);
    this.setGrins = this.setGrins.bind(this);
    this.increaseGrins = this.increaseGrins.bind(this)
    this.decreaseGrins = this.decreaseGrins.bind(this)
  }

  setGrins() {
    let commentID = this.state.commentID;
    let grins = this.state.grins;
    let grinCount = 0;
    let grinList = [];
    let didIGrin = false;
    for(var i = 0; i < grins.length; i ++) {
      if(grins[i].comment_id === commentID) {
        grinCount++;
        grinList.push(grins[i])
        if(grins[i].didIGrin === true) {
          didIGrin = true;
        }
      }
    }
    this.setState({
      numGrins: grinCount,
      grinsForThisComment: grinList,
      didIGrin: didIGrin
    })
  }

  componentWillMount() {
    this.setGrins();
  }

  toggleGrinModal = () => {
    this.setState({
      grinModalIsOpen: !this.state.grinModalIsOpen
    });
  }

  decreaseGrins() {
    this.setState({
      numGrins: this.state.numGrins - 1
    })
  }

  increaseGrins() {
    this.setState({
      numGrins: this.state.numGrins + 1
    })
  }

  render() {
    return (
      <div className="comment-grin-section">
        <CommentGrin ungrinAt={this.decreaseGrins} grinAt={this.increaseGrins} commentID={this.state.commentID} didIGrin={this.state.didIGrin}/>
        <CommentGrinCount numGrins={this.state.numGrins} grinList={this.state.grinsForThisComment}/>
      </div>
    )
  }
}

export default CommentGrinSection;

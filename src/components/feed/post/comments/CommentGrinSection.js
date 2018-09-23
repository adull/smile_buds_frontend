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
  }

  setGrins(commentID, grins) {
    // let commentID = this.state.commentID;
    // let grins = this.state.grins;
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
    this.setGrins(this.state.commentID, this.state.grins);
  }

  toggleGrinModal = () => {
    this.setState({
      grinModalIsOpen: !this.state.grinModalIsOpen
    });
  }

  componentWillReceiveProps(props) {
    this.setGrins(this.state.commentID, props.grins)
  }

  render() {
    return (
      <div className="comment-grin-section">
        <CommentGrin grinClick={this.props.refresh} commentID={this.state.commentID} didIGrin={this.state.didIGrin}/>
        <CommentGrinCount numGrins={this.state.numGrins} grinList={this.state.grinsForThisComment}/>
      </div>
    )
  }
}

export default CommentGrinSection;

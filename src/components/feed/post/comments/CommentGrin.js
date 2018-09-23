import React, { Component } from 'react';
import Modal from '../../../modal/Modal.js';
import LoginOrSignup from '../../../account/LoginOrSignup.js'


class CommentGrin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentID: props.commentID,
      didIGrin: props.didIGrin,
      signInModalIsOpen: false
    }
    // this.grinAt = this.grinAt.bind(this);
    this.grinClick = this.grinClick.bind(this);
    this.toggleSignInModal = this.toggleSignInModal.bind(this);
  }

  grinClick() {
    if(this.state.didIGrin === true) {
      fetch('/api/ungrin-at-comment/' + this.state.commentID, {
        credentials: 'include',
        method: 'POST'
      })
      .then(res=> res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if(response.success === true) {
          this.setState({
            didIGrin: false
          })
          // this.props.ungrinAt();
          this.props.grinClick();
        }
        else if(response.fail) {
          if(response.fail === "no-user") {
            this.toggleSignInModal();
          }
        }
      })
    }
    else {
      fetch('/api/grin-at-comment/' + this.state.commentID, {
        credentials: 'include',
        method: 'POST'
      })
      .then(res=> res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if(response.success === true) {
          this.setState({
            didIGrin: true
          })
          // this.props.grinAt();
          this.props.grinClick();
        }
        else if(response.fail) {
          if(response.fail === "no-user") {
            this.toggleSignInModal();
          }
        }
      })
    }
  }

  toggleSignInModal = () => {
    this.setState({
      signInModalIsOpen: !this.state.signInModalIsOpen
    });
  }

  render() {
    return(
      <div>
        <div onClick={this.grinClick} className={this.state.didIGrin ? "grinning comment-grin": "not-grinning comment-grin"}>
          <svg className="svg-smile" x="0px" y="0px" viewBox="0 0 72 72" enableBackground="new 0 0 72 72">
            <g className="smile">
              <g>
                <defs>
                  <polygon id="SVGID_1_" points="35.9,13.1 27.3,14.7 22,17.8 17.1,22.8 13.6,30.2 13.6,42.5 19.2,51.9 27.3,57.4 35.9,59.1
                    43.1,57.9 50.8,53.6 55.9,47.4 58.9,38.2 58.1,30.2 54.3,22.3 50.1,18 42.9,14.1 			"/>
                </defs>
                <use overflow="visible" fill="#FCEA2B"/>
                <clipPath id="SVGID_2_">
                  <use overflow="visible"/>
                </clipPath>
                <rect x="8.6" y="8.1" clipPath="url(#SVGID_2_)" fill="#FCEA2B" width="55.2" height="56"/>
              </g>
              <g>
                <circle className="face-color" fill="none" stroke="#FDE034" strokeMiterlimit="10" cx="35.9" cy="36.1" r="23"/>
                <circle fill="none" stroke="#84a4cb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" cx="35.9" cy="36.1" r="23"/>
                <circle fill="#84a4cb" stroke="#84a4cb" cx="44.1" cy="32" r="2.6"/>
                <circle fill="#84a4cb" stroke="#84a4cb" cx="26.8" cy="32" r="2.6"/>
                <path fill="none" stroke="#84a4cb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M45.7,44.9c-6.6,3.5-14,3.7-19.6,0"/>
              </g>
            </g>
          </svg>
        </div>
        <Modal show={this.state.signInModalIsOpen} onClose={this.toggleSignInModal}>
          <LoginOrSignup />
        </Modal>
      </div>
    )
  }
}

export default CommentGrin;

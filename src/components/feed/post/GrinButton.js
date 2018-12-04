import React, {Component} from 'react';
import Modal from '../../modal/Modal.js';
import LoginOrSignup from '../../account/LoginOrSignup.js'

class GrinButton extends Component {
  constructor() {
    super();
    this.state = {
      grinningAt: false,
      modalIsOpen: false
    };
    this.grinAt = this.grinAt.bind(this);
    this.ungrinAt = this.ungrinAt.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  // componentDidMount() {
  componentWillReceiveProps() {
    let thisObj = this;
    let hash = this.props.hash;
    if(hash !== undefined) {
      fetch('/api/did-i-grin-at/' + hash, {
        credentials: 'include'
      })
      .then(res => res.json())
      .catch(error => console.error('Error: ', error))
      .then(response => {
        if(response) {
          if(response.grinned === true) {
            this.setState({
              grinningAt: true
            })
          }
          else {
            this.setState({
              grinningAt: false
            })
          }
          return;
        }
        else {
        }
      })
    }
  }

  grinAt() {
    let thisObj = this;
    let hash = this.props.hash;
    fetch('/api/grin-at-post/' + hash, {
      credentials: 'include',
      method: 'POST'
    })
    .then(res => res.json())
    .catch(error => console.error('Error: ', error))
    .then(response => {
      if(response) {
        if(response.success) {
          thisObj.setState({
            grinningAt: true
          })
          thisObj.props.onGrin();
        }
        else {
          thisObj.setState({
            grinningAt: false
          })
          if(response.fail === "no-user") {
            thisObj.setState({
              modalIsOpen: true
            })
          }
        }
      }
    })
  }

  ungrinAt() {
    let thisObj = this;

    let hash = this.props.hash;
    fetch('/api/ungrin-at-post/' + hash, {
      credentials: 'include',
      method: 'POST'
    })
    .then(res => res.json())
    .catch(error => console.error('Error: ', error))
    .then(response => {
      if(response) {
        if(response.success) {
          thisObj.setState({
            grinningAt: false
          })
          thisObj.props.onGrin();
        }
        else {
          thisObj.setState({
            grinningAt: true
          })
        }
      }
    })
  }

  render() {
    if(this.state.grinningAt) {
      return (
        <div className="grin-section">
          <img onClick={this.ungrinAt} src={ require('./grin-icon.png') } alt="smile" />
          <button onClick={this.ungrinAt} className="grin-btn">Stop Grinning At This!</button>
          <Modal show={this.state.modalIsOpen} onClose={this.toggleModal}>
            <LoginOrSignup />
          </Modal>
        </div>
      )
    }
    else {
      return(
        <div className="grin-section" >
          <img onClick={this.grinAt} src={ require('./grin-icon.png') } alt="smile" />
          <button onClick={this.grinAt} className="grin-btn">Grin At!</button>
          <Modal show={this.state.modalIsOpen} onClose={this.toggleModal}>
            <LoginOrSignup />
          </Modal>
        </div>
      );
    }
  }
}

export default GrinButton

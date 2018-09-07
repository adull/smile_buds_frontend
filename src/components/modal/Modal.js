import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  stopClose(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  render() {
    if(!this.props.show) {
      return null;
    }
    return (
      <div className="modal-backdrop" onClick={this.props.onClose}>
        <div className={"modal " + this.props.className } onClick={(e) => this.stopClose(e)}>
        <span className="modal-close text-blue-arial" onClick={this.props.onClose}>
          [ x ]
        </span>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;

import React, { Component } from 'react';
import CoolLinksMobileCanvas from './CoolLinksMobileCanvas.js';
import CoolLinksMobileControls from './CoolLinksMobileControls.js';

class CoolLinksDesktop extends Component {
  constructor() {
    super();

  }
  render() {
    return(
      <div className="cool-links-mobile">
        <CoolLinksMobileCanvas />
        <CoolLinksMobileControls />
      </div>
    );
  }
}

export default CoolLinksDesktop;

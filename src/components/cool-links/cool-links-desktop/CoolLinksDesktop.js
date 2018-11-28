import React, { Component } from 'react';
import CoolLinksDesktopCanvas from './CoolLinksDesktopCanvas.js'
import CoolLinksDesktopControls from './CoolLinksDesktopControls.js'

class CoolLinksDesktop extends Component {
  constructor() {
    super();

  }
  render() {
    return(
      <div className="cool-links-desktop">
        <CoolLinksDesktopCanvas />
        <CoolLinksDesktopControls />
      </div>
    );
  }
}

export default CoolLinksDesktop;

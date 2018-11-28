import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar.js';
import Account from '../account/Account.js';

import CoolLinksMobile from './cool-links-mobile/CoolLinksMobile.js';
import CoolLinksDesktop from './cool-links-desktop/CoolLinksDesktop.js';

class CoolLinksRoot extends Component {
  constructor() {
    super();
    this.state = {
      device: ''
    }
  }

  componentWillMount() {
    let thisObj = this;
    fetch('/api/get-device', {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json) {
        console.log(json)
        thisObj.setState({
          device: json.type
        })
      }
    })
  }

  render() {
    if(this.state.device === 'phone') {
      return(
        <CoolLinksMobile />
      );
    }
    else if(this.state.device === 'desktop') {
      return(
        <CoolLinksDesktop />
      )
    }
    else {
      return(
        <div>WEIRD DEVICE GO AWAY</div>
      );
    }
  }
}

export default CoolLinksRoot;

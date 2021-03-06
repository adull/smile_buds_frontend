import React, {Component} from 'react';

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    })
}

class Post extends Component {
  constructor() {
    super();
    // let metadata = this.props.metadata;
    this.state = {
      poster_name: '',
      poster_identifier: '',
      love_amount: 0,
      subject: '',
      reason: '',
      image_url: '',
      message: '',
      allGrins: [],
      grins: 0,
      recent_grin: '',
      post_stats: '',
      delete: false,
      deleteContent: false
    }
    this.createGrinStats = this.createGrinStats.bind(this);
    this.didGrin = this.didGrin.bind(this);
  }

  createGrinStats(recentGrin, totalGrins) {
    if(totalGrins < 1) {
      return;
    }
    if(totalGrins === 1) {
      if(recentGrin) {
        return recentGrin + " grinned at this!";
      }
      else {
        return "1 person grinned at this!";
      }
    }
    else if( totalGrins === 2) {
      if(recentGrin) {
        return recentGrin + " and 1 other grinned at this!";
      }
      else {
        return totalGrins + " people grinned at this!";
      }
    }
    else if(totalGrins > 2) {
      if(recentGrin) {
        return (recentGrin + " and " + (totalGrins - 1) + " others grinned at this!");
      }
      else {
        return totalGrins + " people grinned at this!";
      }
    }

  }

  componentWillMount() {
    let thisObj = this;
    let posterId = this.props.metadata.poster_id;
    // fetch('/api/test', {
    //   credentials: 'include'
    // })
    // .then(function(response) {
    //   return response.json();
    // })
    // .then(function(json) {
    //   console.log(json);
    // })
    fetch('/api/get-user/userid/' + posterId, {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      thisObj.setState({
        love_amount: pad(json.love_amount, 4),
        poster_name: json.first_name,
        poster_identifier: json.identifier
      })
    })
    fetch('/api/get-grins/' + this.props.metadata.hash, {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var recentGrin = "";
      if(json.length > 0) {
        recentGrin = json[0].user_name;
      }
      // console.log(json);
      thisObj.setState({
        allGrins: json,
        // recent_grin: json[]
        grins: json.length,
        recent_grin: recentGrin,
        post_stats: thisObj.createGrinStats(recentGrin, json.length)
      })
    })
  }

  componentDidMount() {
    let metadata = this.props.metadata;
    this.setState ({
      hash: metadata.hash,
      subject: metadata.subject,
      reason: metadata.reason,
      message: urlify(metadata.message).replace(/(?:\r\n|\r|\n)/g, '<br>'),
      delete: metadata.deletePermission
    });
  }

  didGrin() {
    let thisObj = this;
    fetch('/api/get-grins/' + this.props.metadata.hash, {
      credentials: 'include'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var recentGrin = "";
      if(json.length > 0) {
        recentGrin = json[0].user_name;
      }
      thisObj.setState({
        allGrins: json,
        grins: json.length,
        recent_grin: recentGrin,
        post_stats: thisObj.createGrinStats(recentGrin, json.length)
      })
    })
  }
}

export default Post;

import React from 'react';
import {Link} from 'react-router-dom';
import Post from './Post.js';
import GrinButton from './GrinButton.js';
import PostStats from './PostStats.js';
import CommentSection from './comments/CommentSection.js';

class TextPost extends Post {
  render() {
    return(
      <div className="post">
        <div className="post-top">
          <div className="top-img">
            <Link to={"/user/" + this.state.poster_identifier} >
              <img src={"/api/get-profile-picture/" + this.state.poster_identifier} alt={this.state.poster_name} />
            </Link>
          </div>
          <div className="top-text">
            <Link to={"/user/" + this.state.poster_identifier} >
              <div className="text-name text-blue-arial">
                {this.state.poster_name}
              </div>
            </Link>
            <div className="text-love-val">
              loves you {this.state.love_amount} much
            </div>
            <div className="text-subject">
              Subject: {this.state.subject}
            </div>
            <div className="text-reason">
              Reason for Post: {this.state.reason}
            </div>
          </div>
        </div>
        <div className="post-bottom">
          <div className="post-content text-blue-arial">
            {this.state.message}
          </div>
          <div className="post-interaction">
            <GrinButton onGrin={this.didGrin} hash={this.state.hash} />
          </div>
          <PostStats stats={this.state.post_stats} allGrins={this.state.allGrins}/>
        </div>
        <CommentSection hash={this.state.hash} />
      </div>
    );
  }
}

export default TextPost;

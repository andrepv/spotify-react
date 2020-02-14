import React, { Component } from "react";
import PropTypes from "prop-types";
import AuthorList from "components/Common/AuthorList";

export default class TrackInfo extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.trackInfo.id !== this.props.trackInfo.id;
  }

  render() {
    const {image, name = "", authors = []} = this.props.trackInfo;
    return (
      <div className="player__song-info-wrapper">
        {image && <img className="track__cover-art-image" src={image} alt=""/>}
        <div className="player__song-info">
          <p className="track__title overflow-ellipsis">{name}</p>
          <p className="track__authors overflow-ellipsis">
            <AuthorList authors={authors}/>
          </p>
        </div>
      </div>
    );
  }
}

TrackInfo.propTypes = {
  trackInfo: PropTypes.object.isRequired,
};
import React, { Component } from "react";
import PropTypes from "prop-types";

import CoverImage from "./TrackCoverImage";
import TrackInfo from "./TrackInfo";
import MoreButton from "./buttons/MoreButton";
import LikeButton from "components/Common/LikeButton";
import playerAPI from "utils/playerAPI";

export default class Track extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.track.saved !== this.props.track.saved ||
      nextProps.track.isActive !== this.props.track.isActive ||
      nextProps.source.name !== this.props.source.name ||
      nextProps.track.name !== this.props.track.name
    );
  }

  addToSavedTracks = ()=> {
    playerAPI.addToSavedTracks(this.props.track);
  }

  removeFromSavedTracks = () => {
    playerAPI.removeFromSavedTracks(this.props.track.id);
  }

  render() {
    const {
      trackList,
      charts,
      source,
      track,
      removeTrackFromPlaylist,
    } = this.props;
    const trackContext = {name: source.name, tracks: trackList};
    return (
      <div className={`track space-sm ${track.isActive ? "track_active" : ""}`}>
        <CoverImage
          track={track}
          trackContext={trackContext}
        />
        <TrackInfo charts={charts} track={track}>
          <span className="track__extra-controls">
            <LikeButton
              like={this.addToSavedTracks}
              unlike={this.removeFromSavedTracks}
              isActive={track.saved}
            />
            <MoreButton
              isMyPlaylist={source.isMyPlaylist}
              track={track}
              removeTrackFromPlaylist={removeTrackFromPlaylist}
            />
          </span>
        </TrackInfo>
      </div>
    );
  }
}

Track.propTypes = {
  trackList: PropTypes.array.isRequired,
  source: PropTypes.object.isRequired,
  track: PropTypes.object.isRequired,
  removeTrackFromPlaylist: PropTypes.func,
  charts: PropTypes.bool,
};
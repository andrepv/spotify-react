import React, { Component } from "react";
import PropTypes from "prop-types";
import Tracks from "components/Common/Tracks";

export default class ChartTracks extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.tracks !== nextProps.tracks;
  }

  render() {
    const {tracks, playlistId} = this.props;
    const source = {name: `ChartTracks_${playlistId}`};
    return (
      <Tracks
        charts={true}
        trackList={tracks}
        source={source}
      />
    );
  }
}

ChartTracks.propTypes = {
  tracks: PropTypes.array.isRequired,
  playlistId: PropTypes.string.isRequired,
};
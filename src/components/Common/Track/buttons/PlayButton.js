import React, { Component } from "react";
import PropTypes from "prop-types";
import { Play } from "react-feather";

import playerAPI from "utils/playerAPI";

export default class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this)
  }

  play() {
    const {context, track} = this.props;
    if (track.isActive) {
      return playerAPI.resumeTrack();
    }
    playerAPI.playTrack(track, context);
  }

  render() {
    const {track} = this.props;
    if (track.preview_url) {
      return (
        <span
          onClick={this.play}
          className="track__icon"
        >
          <Play/>
        </span>
      );
    }
    return (
      <span className="track__icon disabled">
        <Play/>
      </span>
    );
  }
}

PlayButton.propTypes = {
  context: PropTypes.object.isRequired,
  track: PropTypes.object.isRequired,
};
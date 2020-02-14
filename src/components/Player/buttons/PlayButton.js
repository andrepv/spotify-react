import React, { Component } from "react";
import PropTypes from "prop-types";

import { ReactComponent as PlayIcon } from "images/Player/play.svg";
import { ReactComponent as PauseIcons} from "images/Player/pause.svg";

export default class PlayButton extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.trackPaused !== nextProps.trackPaused ||
      this.props.trackPlaying !== nextProps.trackPlaying
    );
  }

  play() {
    const {trackPaused, trackPlaying, resumeTrack} = this.props;
    if (trackPaused && trackPlaying) {
     resumeTrack();
    }
  }

  render() {
    const {trackPlaying, trackPaused, pauseTrack} = this.props;
    return (
      <button className="player__control-button">
        {!trackPlaying || trackPaused
          ?
          <span onClick={() => this.play()}>
            <PlayIcon/>
          </span>
          :
          <span onClick={pauseTrack}>
            <PauseIcons/>
          </span>
        }
      </button>
    );
  }
}

PlayButton.propTypes = {
  trackPaused: PropTypes.bool.isRequired,
  trackPlaying: PropTypes.bool.isRequired,
  resumeTrack: PropTypes.func.isRequired,
  pauseTrack: PropTypes.func.isRequired,
};
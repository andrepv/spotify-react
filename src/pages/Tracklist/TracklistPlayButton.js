import React, { Component } from "react";
import PropTypes from "prop-types";
import { Play, Pause } from "react-feather";

import { connectPlayer } from "containers/PlayerContainer";
import playerAPI from "utils/playerAPI";

class PlayButton extends Component {
  shouldComponentUpdate(nextProps) {
    const {disabled, trackList, player} = this.props;
    return (
      nextProps.disabled !== disabled ||
      nextProps.trackList.length !== trackList.length ||
      nextProps.player.context.name !== player.context.name ||
      nextProps.player.trackPaused !== player.trackPaused ||
      nextProps.player.trackPlaying !== player.trackPlaying
    );
  }

  play = () => {
    const {disabled, id, type, trackList, player} = this.props;
    const activeTracklistId = this.getActiveTracklistId();
    const firstAvailableTrackIndex = trackList.findIndex(track => {
      return track.preview_url;
    });
    if (disabled) {
      return;
    }
    if (activeTracklistId === id && player.trackPaused) {
      playerAPI.resumeTrack();
    } else {
      playerAPI.playTrack(
        trackList[firstAvailableTrackIndex],
        {
          name: `${type}_${id}`,
          tracks: trackList,
        }
      );
    }
  }

  renderPauseButton() {
    return (
      <span
        className="tracklist__play-btn flex-center"
        onClick={() => playerAPI.pauseTrack()}
      >
        <Pause /> Pause
      </span>
    );
  }

  renderPlayButton() {
    const {disabled} = this.props;
    return (
      <span
        className={`tracklist__play-btn flex-center ${
          disabled ? "tracklist__play-btn_disabled" : ""
        }`}
        onClick={this.play}
        >
          <Play /> Play
      </span>
    );
  }

  getActiveTracklistId = () => {
    const {context, trackPlaying} = this.props.player;
    const {type} = this.props;
    return (
      trackPlaying &&
      context.name.includes(type) &&
      context.name.split("_")[1]
    );
  }

  render() {
    const {id, player} = this.props;
    const activeTracklistId = this.getActiveTracklistId();
    return (
      <button>
        {
          activeTracklistId === id && !player.trackPaused
          ? this.renderPauseButton()
          : this.renderPlayButton()
        }
      </button>
    );
  }
}

PlayButton.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  trackList: PropTypes.array,
  player: PropTypes.object,
};

export default connectPlayer(PlayButton);
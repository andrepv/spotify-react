import React, { Component } from "react";
import { ReactComponent as PlayPrevious }
from "images/Player/play-previous.svg";

export default class PrevButton extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <button
        onClick={this.props.playPrevTrack}
        className="player__control-button"
      >
        <PlayPrevious/>
      </button>
    );
  }
}
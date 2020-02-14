import React, { Component } from "react";
import { ReactComponent as PlayNext } from "images/Player/play-next.svg";

export default class NextButton extends Component {
  shouldComponentUpdate(nextProps) {
    return false;
  }

  render() {
    return (
      <button
        onClick={this.props.playNextTrack}
        className="player__control-button"
      >
        <PlayNext/>
      </button>
    );
  }
}
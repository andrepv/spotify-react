import React, { Component } from "react";

import playerAPI from "utils/playerAPI";
import msToTime from "utils/msToTime";
import ProgressBarSlider from "./sliders/PlayerProgressBarSlider";
import { connectProgressBar } from "containers/ProgressBarContainer";

export class ProgressBar extends Component {
  render() {
    const {currentTime = 0} = this.props.progressBar;
    const duration = playerAPI.duration || 30;
    const timeLeft = duration - currentTime > 0 ? duration - currentTime : 0;
    return (
      <div className="player__progress">
        <span className="player__progress-time">
          {msToTime(currentTime * 1000)}
        </span>
        <ProgressBarSlider currentTime={currentTime}/>
        <span className="player__progress-time">
          {msToTime(timeLeft * 1000)}
        </span>
      </div>
    );
  }
}

export default connectProgressBar(ProgressBar);
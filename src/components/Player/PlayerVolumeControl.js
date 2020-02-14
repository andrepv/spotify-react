import React, { Component } from "react";
import { Volume1, Volume2, VolumeX } from "react-feather";
import VolumeSlider from "./sliders/PlayerVolumeSlider";

export default class VolumeControl extends Component {
  constructor(props) {
    super(props);
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.getVolumeRef = this.getVolumeRef.bind(this);
    this.state = {
      volume: 1,
      isTooltipActive: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.volume !== nextState.volume ||
      this.state.isTooltipActive !== nextState.isTooltipActive
    );
  }

  changeVolume = volume => {
    this.setState({
      volume: volume,
    });
  }

  getCurrentVolStatus = volume => {
    if (volume === 0) {
      return "mute";
    } else if (volume <= 0.5) {
      return "medium";
    }
    return "high";
  }

  toggleTooltip(e) {
    if (!this.state.isTooltipActive) {
      window.addEventListener("click", this.handleClickOutside);
    } else {
      window.removeEventListener("click", this.handleClickOutside);
    }
    this.setState({
      isTooltipActive: !this.state.isTooltipActive,
    });
  }

  getVolumeRef(el) {
    this.volumeBar = el;
  }

  handleClickOutside(e) {
    if (!this.volumeBar.contains(e.target)) {
      this.toggleTooltip();
    }
  }

  render() {
    const { volume, isTooltipActive } = this.state;
    const status = this.getCurrentVolStatus(volume);
    const statusIcons = {
      high : <Volume2 />,
      medium : <Volume1 />,
      mute: <VolumeX />,
    };
    return (
      <button
        className="player__volume-control"
        ref={this.getVolumeRef}
      >
        <span onClick={this.toggleTooltip}>
          {statusIcons[status]}
        </span>

        <div className={`player__tooltip ${
          isTooltipActive ? "player__tooltip_active" : ""
        }`}>
          {isTooltipActive &&
            <VolumeSlider
              onChange={this.changeVolume}
              initialVal={volume}
            />
          }
        </div>
      </button>
    );
  }
}
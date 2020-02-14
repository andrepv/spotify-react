import React, { Component } from "react";
import PropTypes from "prop-types";

import playerAPI from "utils/playerAPI";
import getCoords from "utils/getCoords";

export default class ProgressBarSlider extends Component {
  constructor(props) {
    super(props);
    this.sliderOnClick = this.sliderOnClick.bind(this);
    this.getSliderRef = this.getSliderRef.bind(this);
  }

  componentDidMount() {
    this.sliderWidth = this.slider.offsetWidth;
    this.thumbWidth = this.thumb.offsetWidth;
    this.rangeWidth = this.sliderWidth - this.thumbWidth;
  }

  getRatio(coord) {
    let ratio = coord / this.rangeWidth;
    if (ratio <= 0) {
      ratio = 0;
    } else if (ratio >= 1) {
      ratio = 1;
    }
    return ratio;
  }

  updateProgressBar(position) {
    this.thumb.style.left = `${position}px`;
    this.progressLine.style.width = `${position + this.thumbWidth / 2}px`;
  }

  updateTime(time) {
    playerAPI.currentTime = parseInt(time);
  }

  progressBarOnDrag = e => {
    if (!playerAPI.duration) {
      return;
    }

    const thumbCoords = getCoords(this.thumb);
    const sliderCoords = getCoords(this.slider);
    const shiftX = e.pageX - thumbCoords.left;

    let mouseCoord = e.pageX - sliderCoords.left - shiftX;
    let ratio = this.getRatio(mouseCoord);

    playerAPI.blockTimeUpdate = true;

    document.onmousemove = event => {
      let coords = event.pageX - sliderCoords.left - shiftX;
      ratio = this.getRatio(coords);
      this.updateProgressBar(ratio * this.rangeWidth);
    };

    document.onmouseup = () => {
      this.updateTime(ratio * playerAPI.duration);
      playerAPI.blockTimeUpdate = false;
      document.onmousemove = document.onmouseup = null;
    };
  }

  sliderOnClick(e) {
    if (e.target === this.thumb || !playerAPI.duration) {
      return;
    }
    const mouseCoord = e.pageX - getCoords(this.slider).left;
    let ratio = this.getRatio(mouseCoord);
    this.updateTime(ratio * playerAPI.duration);
  }

  getSliderRef(el) {
    this.slider = el;
  }

  render() {
    const {currentTime} = this.props;
    const duration = playerAPI.duration || 30;
    const progress = currentTime / duration * this.rangeWidth;
    return (
      <div
        className="player__progress-bar slider"
        onClick={this.sliderOnClick}
        ref={this.getSliderRef}
      >
        <div
          style={{width: `${progress + this.thumbWidth / 2}px`}}
          className="player__progress-bar-wrapper slider__wrapper"
          ref={el => (this.progressLine = el)}
        />
        <div
          className="player__progress-thumb slider__thumb"
          style={{left: `${progress}px`}}
          onMouseDown={this.progressBarOnDrag}
          ref={el => (this.thumb = el)}
        >
        </div>
      </div>
    );
  }
}

ProgressBarSlider.propTypes = {
  currentTime: PropTypes.number.isRequired,
};
import React, { Component } from "react";
import PropTypes from "prop-types";

import playerAPI from "utils/playerAPI";
import getCoords from "utils/getCoords";

export default class VolumeSlider extends Component {
  constructor(props) {
    super(props);
    this.sliderOnClick = this.sliderOnClick.bind(this);
    this.updateVolume = this.updateVolume.bind(this);
    this.getSliderRef = this.getSliderRef.bind(this);
    this.getThumbRef = this.getThumbRef.bind(this);
    this.getSliderWrapperRef = this.getSliderWrapperRef.bind(this);
  }

  componentDidMount() {
    this.sliderHeight = this.slider.offsetHeight;
    this.thumbHeight = this.thumb.offsetHeight;
    this.rangeHeight = this.sliderHeight - this.thumbHeight;
    this.updateVolume(this.props.initialVal);
  }

  getRatio(coord) {
    let ratio = coord / this.rangeHeight;
    if (ratio <= 0) {
      ratio = 0;
    } else if (ratio >= 1) {
      ratio = 1;
    }
    return ratio;
  }

  updateVolume(volume) {
    const position = volume * this.rangeHeight;
    playerAPI.currentVolume = volume;
    this.props.onChange(volume);

    this.thumb.style.top = `${this.rangeHeight - position}px`;
    this.sliderWrapper.style.height = `${position + this.thumbHeight / 2}px`;
  }

  sliderOnDrag = e => {
    const thumbCoords = getCoords(this.thumb);
    const sliderCoords = getCoords(this.slider);
    const shiftY = thumbCoords.bottom - e.pageY;

    document.onmousemove = event => {
      let mouseCoord = sliderCoords.bottom - event.pageY - shiftY;
      let ratio = this.getRatio(mouseCoord);
      this.updateVolume(ratio);
    };

    document.onmouseup = () => {
      document.onmousemove = document.onmouseup = null;
    };
  }

  sliderOnClick(e) {
    if (e.target === this.thumb) {
      return;
    }
    const sliderCoords = getCoords(this.slider);
    const mouseCoord = sliderCoords.bottom - e.pageY;
    const ratio = this.getRatio(mouseCoord);
    this.updateVolume(ratio);
  }

  getSliderRef(el) {
    this.slider = el;
  }

  getThumbRef(el) {
    this.thumb = el;
  }

  getSliderWrapperRef(el) {
    this.sliderWrapper = el;
  }

  render() {
    return (
      <div
        className="volume-slider slider"
        onClick={this.sliderOnClick}
        ref={this.getSliderRef}
      >
        <div
          className="volume-slider__wrapper slider__wrapper"
          ref={this.getSliderWrapperRef}
        />
        <div
          className="volume-slider__thumb slider__thumb"
          onMouseDown={this.sliderOnDrag}
          ref={this.getThumbRef}
        >
        </div>
      </div>
    );
  }
}

VolumeSlider.propTypes = {
  initialVal: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
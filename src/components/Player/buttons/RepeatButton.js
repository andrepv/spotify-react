import React, { Component } from "react";
import { Repeat } from "react-feather";
import PropTypes from "prop-types";

export default class RepeatButton extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.repeat !== this.props.repeat;
  }

  render() {
    const {repeat, toggleRepeat} = this.props;
    return (
      <button
        onClick={toggleRepeat}
        className={`player__repeat-button ${
          repeat ? "player__repeat-button_active" : ""
        }`}
      >
        <Repeat/>
      </button>
    );
  }
}

RepeatButton.propTypes = {
  repeat: PropTypes.bool.isRequired,
  toggleRepeat: PropTypes.func.isRequired,
};
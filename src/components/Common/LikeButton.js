import React, { Component } from "react";
import PropTypes from "prop-types";
import { Heart } from "react-feather";

export default class LikeButton extends Component {
  render() {
    const {unlike, like, isActive} = this.props;
    return (
      <button className='like-btn'>
        <Heart
          className={`${isActive ? "like-btn_active" : ""}`}
          onClick={isActive ? unlike : like}
        />
      </button>
    );
  }
}

LikeButton.propTypes = {
  unlike: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};
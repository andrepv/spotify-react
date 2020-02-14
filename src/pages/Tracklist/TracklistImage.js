import React, { Component } from "react";
import PropTypes from "prop-types";

import cd from "images/cd.png";
import EditableImage from "./TracklistEditableImage";

export default class Image extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.image !== this.props.image;
  }

  render() {
    const {image, uploadCoverImage, isEditableImage} = this.props;
    if (isEditableImage) {
      return (
        <EditableImage
          image={image}
          uploadCoverImage={uploadCoverImage}
        />
      );
    }
    return (
      <div
        className={`tracklist__cover-art bg-${!image ? "empty" : "center"}`}
        style={{ backgroundImage: `url(${image || cd})`}}
      ></div>
    );
  }
}

Image.propTypes = {
  isEditableImage: PropTypes.bool,
  image: PropTypes.string,
  uploadCoverImage: PropTypes.func,
};
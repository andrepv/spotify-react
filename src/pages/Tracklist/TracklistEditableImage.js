import React, { Component } from "react";
import PropTypes from "prop-types";

import alert from "components/Common/Alert/Alert";
import cd from "images/cd.png";

export default class EditableImage extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.image !== this.props.image;
  }

  uploadCoverImage = el => {
    if (!el.target.files.length) {
      return;
    }

    const image = el.target.files[0];
    const imageSize = image.size / 1024;
    const reader = new FileReader();
    reader.readAsDataURL(image);

    if (imageSize > 256) {
      alert.show("File size must under 256 KB");
      return;
    }

    reader.onload = () => {
      this.props.uploadCoverImage(reader.result);
    };
  }

  render() {
    const {image} = this.props;
    return (
      <div
        className={`tracklist__cover-art bg-${!image ? "empty" : "center"}`}
        style={{backgroundImage: `url(${image || cd})`}}
      >
        <button
          className="tracklist__upload-cover"
          onClick={() => this.uploadCoverInput.click()}
        >
          Change Cover Image
          <input
            ref={el => (this.uploadCoverInput = el)}
            type="file"
            className="tracklist__upload-cover-input"
            onChange={this.uploadCoverImage}
            accept="image/jpeg"
          />
        </button>
      </div>
    );
  }
}

EditableImage.propTypes = {
  image: PropTypes.string,
  uploadCoverImage: PropTypes.func.isRequired,
};
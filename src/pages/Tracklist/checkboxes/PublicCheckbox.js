import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PublicCheckbox extends Component {
  handleOnChange = () => {
    const {
      collaborative,
      changePlaylistDetails,
      isPublic,
    } = this.props;
    if (collaborative) {
      return;
    }
    changePlaylistDetails({
      public: !isPublic,
    });
  }

  handleOnClick = e => {
    if (this.props.collaborative) {
      e.target.checked = false;
    }
  }

  render() {
    const {collaborative, isPublic} = this.props;
    return (
      <React.Fragment>
        <input
          className={`checkbox ${collaborative ? "checkbox__disabled" : ""}`}
          type="checkbox"
          defaultChecked={isPublic}
          onChange={this.handleOnChange}
          onClick={this.handleOnClick}
        />
        <label>Public</label>
      </React.Fragment>
    );
  }
}

PublicCheckbox.propTypes = {
  isPublic: PropTypes.bool.isRequired,
  collaborative: PropTypes.bool.isRequired,
  changePlaylistDetails: PropTypes.func.isRequired,
};
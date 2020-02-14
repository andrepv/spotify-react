import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { ReactComponent as AddPlaylistIcon } from "images/addPlaylist.svg";

export default class NewPlaylistBlock extends Component {
  state = {
    newPlaylistPath: "",
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.newPlaylistPath &&
      prevState.newPlaylistPath === this.state.newPlaylistPath) {
      this.setState({
        newPlaylistPath: "",
      });
    }
  }

  setPath = id => {
    this.setState({
      newPlaylistPath: `/playlist/${id}`,
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.createPlaylist("New Playlist", this.setPath);
  }

  render() {
    const {isNewPlaylistOpen, renderContent} = this.props;
    if (this.state.newPlaylistPath && !isNewPlaylistOpen) {
      return (
        <Redirect
          push
          to={{
            pathname: this.state.newPlaylistPath,
            state: {
              modal: true,
              type: "playlist",
              newPlaylist: true,
            },
          }}
        />
      );
    }
    if (renderContent) {
      return renderContent(
        this.handleSubmit,
        <AddPlaylistIcon />
      );
    }
    return (
      <div className="add-playlist block">
        <div
          className="add-playlist__wrapper flex-center"
          onClick={this.handleSubmit}
        >
          <div>
            <div className="add-playlist__icon">
              <AddPlaylistIcon />
            </div>
            <h6 className="add-playlist__title">
              Create New Playlist
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

NewPlaylistBlock.propTypes = {
  createPlaylist: PropTypes.func.isRequired,
  isNewPlaylistOpen: PropTypes.bool.isRequired,
  renderContent: PropTypes.func,
};
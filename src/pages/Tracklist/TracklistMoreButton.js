import React, { Component } from "react";
import PropTypes from "prop-types";
import { MoreVertical, Trash } from "react-feather";

import PublicCheckbox from "./checkboxes/PublicCheckbox";
import CollaborativeCheckbox from "./checkboxes/CollaborativeCheckbox";
import ContextMenu from "components/Common/ContextMenu";
import OpenContextMenuButton from "components/Common/OpenContextMenuButton";

export default class MoreButton extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.isPublic !== this.props.isPublic ||
      nextProps.collaborative !== this.props.collaborative
    );
  }

  renderContextMenuOptions = navigateToPage => {
    const {isPublic, collaborative, changePlaylistDetails} = this.props;
    return (
      <ul>
        <li
          className="tracklist__more-item tracklist__remove"
          onClick={() => navigateToPage(2)}
        >
          <Trash /><span>Delete</span>
        </li>
        <li className="tracklist__public tracklist__more-item">
          <PublicCheckbox
            isPublic={isPublic}
            collaborative={collaborative}
            changePlaylistDetails={changePlaylistDetails}
          />
        </li>
        <li className="tracklist__collaborative tracklist__more-item">
          <CollaborativeCheckbox
            isPublic={isPublic}
            collaborative={collaborative}
            changePlaylistDetails={changePlaylistDetails}
          />
        </li>
      </ul>
    );
  }

  renderConfirm = navigateToPage => {
    return (
      <div className="cm-confirm">
        <h6 className="cm-confirm__title">
          Confirm to delete
        </h6>
        <p className="cm-confirm__description">
          Do you really want to delete?
        </p>
        <div
          onClick={() => this.props.unfollowPlaylist()}
          className="cm-confirm__btn cm-confirm__accept-btn btn"
        >
          Yes
        </div>
        <div
          onClick={() => navigateToPage(1)}
          className="cm-confirm__btn btn"
        >
          No
        </div>
      </div>
    );
  }

  renderContextMenuButton = toggleContextMenu => {
    return (
      <div
        onClick={toggleContextMenu}
        className="tracklist__more-btn flex-center"
      >
        <MoreVertical/>
      </div>
    );
  }

  renderContextMenu = () => {
    const renderContent = (currentPage, navigateToPage) => {
      const pagesContent = {
        1: this.renderContextMenuOptions(navigateToPage),
        2: this.renderConfirm(navigateToPage),
      };
      return pagesContent[currentPage];
    };
    return (
      <ContextMenu
        currentPageNum={1}
        totalPages={2}
        renderContent={renderContent}
      />
    );
  }

  render() {
    return (
      <OpenContextMenuButton
        renderContent={this.renderContextMenuButton}
        renderContextMenu={this.renderContextMenu}
      />
    );
  }
}

MoreButton.propTypes = {
  isPublic: PropTypes.bool.isRequired,
  collaborative: PropTypes.bool.isRequired,
  changePlaylistDetails: PropTypes.func.isRequired,
  unfollowPlaylist: PropTypes.func.isRequired,
};
import React, { Component } from "react";
import PropTypes from "prop-types";
import { MoreHorizontal, Plus } from "react-feather";

import ContextMenu from "components/Common/ContextMenu";
import OpenContextMenuButton from "components/Common/OpenContextMenuButton";
import ContextMenuOptions from "../contextMenu/ContextMenuOptions";
import ContextMenuPlaylists from "../contextMenu/ContextMenuPlaylists";

export default class MoreButton extends Component {
  constructor(props) {
    super(props);
    this.renderContextMenuButton = this.renderContextMenuButton.bind(this);
    this.renderContextMenu = this.renderContextMenu.bind(this);
  }

  renderContextMenuButton(toggleContextMenu) {
    if (this.props.isMyPlaylist) {
      return <MoreHorizontal onClick={toggleContextMenu}/>;
    }
    return <Plus onClick={toggleContextMenu} />;
  }

  renderContextMenu(closeContextMenu) {
    const {isMyPlaylist, track, removeTrackFromPlaylist} = this.props;
    const trackRef = this.button.closest(".track");
    const currentPageNum = isMyPlaylist ? 1 : 2;
    const totalPages = isMyPlaylist ? 2 : 1;
    const getOffsetTop = menuHeight => menuHeight < 150 ? -100 : -260;
    const removeTrack = () => {
      removeTrackFromPlaylist(track.key - 1);
      closeContextMenu();
    };
    const renderContent = (currentPage, navigateToPage) => {
      const pagesContent = {
        1: <ContextMenuOptions
             removeTrack={removeTrack}
             navigateToPage={navigateToPage}
           />,
        2: <ContextMenuPlaylists
             totalPages={totalPages}
             navigateToPage={navigateToPage}
             trackUri={track.uri}
             closeContextMenu={closeContextMenu}
           />,
      };
      return pagesContent[currentPage];
    };

    return (
      <ContextMenu
        currentPageNum={currentPageNum}
        totalPages={totalPages}
        containerRef={trackRef}
        defaultTop={17}
        getOffsetTop ={getOffsetTop}
        renderContent={renderContent}
      />
    );
  }

  render() {
    return (
      <span ref={el => (this.button = el)}>
        <OpenContextMenuButton
          renderContextMenu={this.renderContextMenu}
          renderContent={this.renderContextMenuButton}
        />
      </span>
    );
  }
}

MoreButton.propTypes = {
  isMyPlaylist: PropTypes.bool,
  track: PropTypes.object,
  removeTrackFromPlaylist: PropTypes.func,
};
import React from "react";
import PropTypes from "prop-types";

import { Plus, Trash } from "react-feather";

export default function ContextMenuOptions(props) {
  const {navigateToPage, removeTrack} = props;
  const navigateToNextPage = () => navigateToPage(2);
  return (
    <ul className="track__menu-items" >
      <li className="track__menu-item" onClick={navigateToNextPage}>
        <Plus className="track__menu-icon"/> Add Track To Playlist
      </li>
      <li className="track__menu-item" onClick={removeTrack}>
        <Trash className="track__menu-icon"/> Remove From This Playlist
      </li>
    </ul>
  );
}

ContextMenuOptions.propTypes = {
  navigateToPage: PropTypes.func.isRequired,
  removeTrack: PropTypes.func.isRequired,
};
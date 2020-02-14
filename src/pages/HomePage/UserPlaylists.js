import React, { Component } from "react";
import PropTypes from "prop-types";

import Carousel from "components/Common/Carousel";
import { PLAYLISTS } from "constants/RouteConstants";
import { USER_PLAYLISTS_LIMIT } from "constants/AppConstants";
import { connectUserPlaylists }
from "containers/Playlist/UserPlaylistsContainer";

export class UserPlaylists extends Component {
  componentDidMount() {
    const {playlists, loadUserPlaylists} = this.props;
    if (!playlists.items.length) {
      loadUserPlaylists();
    }
  }

  render() {
    const {pending, items, total} = this.props.playlists;
    const blockHeader = {
      title: "My Collection",
      description: "Playlists",
      link: PLAYLISTS,
    };
    const carouselItems = items.length > USER_PLAYLISTS_LIMIT
      ? items.slice(0, USER_PLAYLISTS_LIMIT)
      : items;
    if (!total) {
      return null;
    }
    return (
      <Carousel
        pending={pending}
        items={carouselItems}
        type='playlist'
        blockHeader={blockHeader}
      />
    );
  }
}

UserPlaylists.propTypes = {
  playlists: PropTypes.object.isRequired,
  loadUserPlaylists: PropTypes.func.isRequired,
};

export default connectUserPlaylists(UserPlaylists);
import React, { Component } from "react";
import PropTypes from "prop-types";

import Carousel from "components/Common/Carousel";
import { connectFeaturedPlaylists }
from "containers/Playlist/FeaturedPlaylistsContainer";

export class FeaturedPlaylists extends Component {
  componentDidMount() {
    const {playlists, loadFeaturedPlaylists} = this.props;
    if (!playlists.items.length) {
      loadFeaturedPlaylists();
    }
  }

  render() {
    const {pending, items, message} = this.props.playlists;
    const blockHeader = {
      title: "Featured Playlists",
      description: message,
    };
    return (
      <Carousel
        pending={pending}
        items={items}
        type='playlist'
        blockHeader={blockHeader}
      />
    );
  }
}

FeaturedPlaylists.propTypes = {
  playlists: PropTypes.object.isRequired,
  loadFeaturedPlaylists: PropTypes.func.isRequired,
};

export default connectFeaturedPlaylists(FeaturedPlaylists);
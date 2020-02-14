import React, { Component } from "react";
import PropTypes from "prop-types";

import Carousel from "components/Common/Carousel";
import { ALBUMS, ARTIST } from "constants/RouteConstants";
import { connectArtistAlbums } from "containers/Album/ArtistAlbumsContainer";

export class ArtistAlbums extends Component {
  componentDidMount() {
    this.props.loadAlbums(this.props.id);
  }

  componentDidUpdate(prevProps) {
    const {id, loadAlbums} = this.props;
    if (id !== prevProps.id) {
      loadAlbums(id);
    }
  }

  render() {
    const {pending, items, total} = this.props.albums;
    const blockHeader = {title: "Albums"};
    if (items.length < total) {
      blockHeader.link = `${ARTIST}/${this.props.id}${ALBUMS}`;
    }
    if (!total) {
      return null;
    }
    return (
      <Carousel
        pending={pending}
        items={items}
        type='album'
        blockHeader={blockHeader}
      />
    );
  }
}

ArtistAlbums.propTypes = {
  albums: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  loadAlbums: PropTypes.func.isRequired,
};

export default connectArtistAlbums(ArtistAlbums);
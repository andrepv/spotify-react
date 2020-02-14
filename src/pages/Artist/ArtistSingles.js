import React, { Component } from "react";
import PropTypes from "prop-types";

import { connectArtistSingles } from "containers/Album/ArtistSinglesContainer";
import { SINGLES, ARTIST } from "constants/RouteConstants";
import Carousel from "components/Common/Carousel";

export class ArtistSingles extends Component {
  componentDidMount() {
    this.props.loadSingles(this.props.id);
  }

  componentDidUpdate(prevProps) {
    const {id, loadSingles} = this.props;
    if (id !== prevProps.id) {
      loadSingles(id);
    }
  }

  render() {
    const {pending, items, total} = this.props.singles;
    const blockHeader = {title: "Singles"};
    if (items.length < total) {
      blockHeader.link = `${ARTIST}/${this.props.id}${SINGLES}`;
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

ArtistSingles.propTypes = {
  singles: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  loadSingles: PropTypes.func.isRequired,
};

export default connectArtistSingles(ArtistSingles);
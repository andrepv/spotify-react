import React, { Component } from "react";
import PropTypes from "prop-types";

import Carousel from "components/Common/Carousel";
import { NEW } from "constants/RouteConstants";
import { connectNewReleases } from "containers/Album/NewReleasesContainer";
import { NEW_RELEASES_LIMIT } from "constants/AppConstants";

export class NewReleases extends Component {
  componentDidMount() {
    const {newReleases, loadNewReleases} = this.props;
    if (!newReleases.items.length) {
      loadNewReleases();
    }
  }

  render() {
    const {pending, items} = this.props.newReleases;
    const blockHeader = {
      title: "Releases",
      description: "New",
      link: NEW,
    };
    const carouselItems = items.length > NEW_RELEASES_LIMIT
      ? items.slice(0, NEW_RELEASES_LIMIT)
      : items;
    return (
      <Carousel
        pending={pending}
        items={carouselItems}
        type='album'
        blockHeader={blockHeader}
      />
    );
  }
}

NewReleases.propTypes = {
  newReleases: PropTypes.object.isRequired,
  loadNewReleases: PropTypes.func.isRequired,
};

export default connectNewReleases(NewReleases);
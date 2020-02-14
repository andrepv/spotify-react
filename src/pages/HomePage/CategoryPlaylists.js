import React, {Component} from "react";
import PropTypes from "prop-types";

import Carousel from "components/Common/Carousel";
import { CATEGORY_PLAYLISTS } from "constants/RouteConstants";
import { connectCategoryPlaylists }
from "containers/Playlist/CategoryPlaylistsContainer";

export class CategoryPlaylists extends Component {
  componentDidMount() {
    this.props.loadRandomPlaylists();
  }

  render() {
    const {pending, items, categoryName, categoryId} = this.props.playlists;
    const blockHeader = {
      title: categoryName,
      description: "You May Like",
      link: `${CATEGORY_PLAYLISTS}/${categoryId}`,
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

CategoryPlaylists.propTypes = {
  playlists: PropTypes.object.isRequired,
  loadRandomPlaylists: PropTypes.func.isRequired,
};

export default connectCategoryPlaylists(CategoryPlaylists);
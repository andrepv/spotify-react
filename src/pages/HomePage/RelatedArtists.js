import React, { Component } from "react";
import PropTypes from "prop-types";

import BlockHeader from "components/Common/BlockHeader";
import Artist from "components/Common/Artist";
import { connectRelatedArtists }
from "containers/Artist/RelatedArtistsContainer";
import SkeletonArtists from "components/Skeleton/SkeletonArtists";
import "styles/Artist.scss";

export class RelatedArtists extends Component {
  componentDidMount() {
    const {artists, loadRelatedArtists} = this.props;
    if (!artists.items.length || !artists.artistName) {
      loadRelatedArtists();
    }
  }

  render() {
    const {pending, artistName, items} = this.props.artists;
    if (pending) {
      return (
        <SkeletonArtists
          containerClassName="related-artists"
          headerWithDescription={true}
          itemCount={12}
        />
      );
    }
    if (!artistName) {
      return null;
    }
    return (
      <section>
        <BlockHeader
          title={`More Like ${artistName}`}
          description='Recommendation'
        />
        <div className="artists artists_cols-6">
          {items.map(item => {
            return (
              <Artist
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

RelatedArtists.propTypes = {
  artists: PropTypes.object.isRequired,
  loadRelatedArtists: PropTypes.func.isRequired,
};

export default connectRelatedArtists(RelatedArtists);
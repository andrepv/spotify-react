import React, { Component } from "react";
import PropTypes from "prop-types";

import Artist from "components/Common/Artist";
import BlockHeader from "components/Common/BlockHeader";
import SkeletonArtists from "components/Skeleton/SkeletonArtists";
import { connectRelatedArtists }
from "containers/Artist/RelatedArtistsContainer";

export class RelatedArtists extends Component {
  componentDidMount() {
    this.props.loadRelatedArtists(this.props.id);
  }

  componentDidUpdate(prevProps) {
    const {id, loadRelatedArtists} = this.props;
    if (id !== prevProps.id) {
      loadRelatedArtists(id);
    }
  }

  render() {
    const {pending, items} = this.props.artists;
    if (pending) {
      return (
        <SkeletonArtists
          containerClassName="related-artists"
          headerWithDescription={true}
          itemCount={12}
        />
      );
    }
    if (!items.length) {
      return null;
    }
    return (
      <section>
        <BlockHeader title='Related Artists'/>
        <section className="artists artists_cols-6">
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
        </section>
      </section>
    );
  }
}

RelatedArtists.propTypes = {
  id: PropTypes.string.isRequired,
  artists: PropTypes.object.isRequired,
  loadRelatedArtists: PropTypes.func.isRequired,
};

export default connectRelatedArtists(RelatedArtists);
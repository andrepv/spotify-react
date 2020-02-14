import React, { Component } from "react";
import PropTypes from "prop-types";

import BlockHeader from "components/Common/BlockHeader";
import Tracks from "components/Common/Tracks";
import { connectTopTracks } from "containers/Tracks/TopTracksContainer";
import SkeletonTracks from "components/Skeleton/SkeletonTracks";
import InfiniteScroll from "components/Common/InfiniteScroll";

export class TopTracks extends Component {
  componentWillMount() {
    const tracks = this.props.tracks.items;
    const {chartsCountry, loadTopTracks} = this.props;
    if (!tracks.length || (tracks.length && chartsCountry !== "global")) {
      loadTopTracks();
    }
  }

  render() {
    const {pending, items, total, loadMorePending} = this.props.tracks;
    const loadMore = () => this.props.loadMore(items.length);
    const source = {name: "TopTracks"};
    if (pending) {
      return (
        <SkeletonTracks
          className="top-songs"
          itemCount={5}
          header={true}
          headerWithDescription={true}
        />
      );
    }
    return (
      <section className="top-songs">
        <BlockHeader
          title="Global Top 50"
          description="Hot Track"
        />
        <div
          className="top-songs__container custom-scrollbar"
          id="top-tracks-scrollParent"
        >
          <div className="top-songs__wrapper">
            <InfiniteScroll
              total={total}
              dataLength={items.length}
              loadData={loadMore}
              pending={loadMorePending}
              containerSelector="#top-tracks-scrollParent"
            >
              <Tracks
                trackList={items}
                source={source}
              />
            </InfiniteScroll>
          </div>
        </div>
      </section>
    );
  }
}

TopTracks.propTypes = {
  tracks: PropTypes.object.isRequired,
  loadTopTracks: PropTypes.func.isRequired,
  chartsCountry: PropTypes.string.isRequired,
};

export default connectTopTracks(TopTracks);
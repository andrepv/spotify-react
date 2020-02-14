import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import EmptyPage from "components/Common/Empty";
import BlockHeader from "components/Common/BlockHeader";
import Tracks from "components/Common/Tracks";
import InfiniteScroll from "components/Common/InfiniteScroll";
import SkeletonTracks from "components/Skeleton/SkeletonTracks";
import { CHARTS } from "constants/RouteConstants";
import { connectSavedTracks } from "containers/Tracks/SavedTracksContainer";

export class SavedTracks extends Component {
  componentDidMount() {
    const {tracks, loadMySavedTracks} = this.props;
    window.scrollTo(0, 0);
    if (!tracks.loaded) {
      loadMySavedTracks();
    }
  }

  renderEmptyPage() {
    return (
      <EmptyPage
        title="Your favourite songs will appear here"
        button={
          <Link
            className="empty-page__button flex-center"
            to={CHARTS}
          >
            Popular Songs
          </Link>
        }
      />
    );
  }

  render() {
    const {pending, loadMorePending, total, items, error, loaded} = this.props.tracks;
    const loadMore = () => this.props.loadMore(items.length);
    const source = {name: "LikedTracks"};
    if (pending || (error && !loaded)) {
      return <SkeletonTracks header={true}/>;
    }
    if (!total && loaded) {
      return this.renderEmptyPage();
    }
    return (
      <section>
        <BlockHeader title='Favorite Songs' />
        <div>
          <InfiniteScroll
            total={total}
            dataLength={items.length}
            loadData={loadMore}
            pending={loadMorePending}
          >
            <Tracks trackList={items} source={source} />
          </InfiniteScroll>
        </div>
      </section>
    );
  }
}

SavedTracks.propTypes = {
  tracks: PropTypes.object.isRequired,
  loadMySavedTracks: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
};

export default connectSavedTracks(SavedTracks);
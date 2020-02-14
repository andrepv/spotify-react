import React, { Component } from "react";
import PropTypes from "prop-types";

import BlockHeader from "components/Common/BlockHeader";
import Artist from "components/Common/Artist";
import InfiniteScroll from "components/Common/InfiniteScroll";
import SkeletonArtists from "components/Skeleton/SkeletonArtists";
import EmptyPage from "components/Common/Empty";
import SearchBtn from "components/Search/SearchBtn";
import { connectFollowedArtists }
from "containers/Artist/FollowedArtistsContainer";
import "styles/Artist.scss";

export class FollowedArtists extends Component {
  componentDidMount() {
    const {artists, loadArtists} = this.props;
    window.scrollTo(0, 0);
    if (!artists.loaded) {
      loadArtists();
    }
  }

  loadMore() {
    const {items} = this.props.artists;
    const lastArtistId = items[items.length - 1].id;
    this.props.loadMore(lastArtistId);
  }

  renderEmptyPage = () => {
    return (
      <EmptyPage
        title="Your favourite artists will appear here"
        button={
          <SearchBtn renderContent={(toggleSearch, icon) => {
            return (
              <button
                className="empty-page__button empty-page_artists flex-center"
                onClick={toggleSearch}
              >
                {icon} Search
              </button>
            );
          }}/>
        }
      />
    );
  }

  render() {
    const {total, loadMorePending, items, pending, error} = this.props.artists;
    const loadMore = () => this.loadMore(items.length);
    if (pending || error) {
      return <SkeletonArtists />;
    }
    if (!total) {
      return this.renderEmptyPage();
    }
    return (
      <section>
        <BlockHeader title="My Artists"/>
          <InfiniteScroll
            total={total}
            dataLength={items.length}
            loadData={loadMore}
            pending={loadMorePending}
          >
            <div className="artists">
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
          </InfiniteScroll>
      </section>
    );
  }
}

FollowedArtists.propTypes = {
  artists: PropTypes.object.isRequired,
  loadArtists: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
};

export default connectFollowedArtists(FollowedArtists);
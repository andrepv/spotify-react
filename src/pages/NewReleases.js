import React, { Component } from "react";
import PropTypes from "prop-types";

import Block from "components/Common/Block";
import BlockHeader from "components/Common/BlockHeader";
import InfiniteScroll from "components/Common/InfiniteScroll";
import SkeletonBlocks from "components/Skeleton/SkeletonBlocks";
import { connectNewReleases } from "containers/Album/NewReleasesContainer";

export class NewReleases extends Component {
  componentDidMount() {
    const {newReleases, loadNewReleases} = this.props;
    window.scrollTo(0, 0);
    if (!newReleases.items.length) {
      loadNewReleases();
    }
  }

  render() {
    const {pending, loadMorePending, total, items, error} = this.props.newReleases;
    const loadMore = () => this.props.loadMore(items.length);
    if (pending || error) {
      return <SkeletonBlocks />;
    }
    return (
      <section>
        <BlockHeader title='New Releases'/>
          <InfiniteScroll
            total={total}
            dataLength={items.length}
            loadData={loadMore}
            pending={loadMorePending}
          >
            <div className="blocks-container">
              {items.map((item, index) => {
                return (
                  <Block
                    key={item.id}
                    type="album"
                    id={item.id}
                    meta={item.meta}
                    name={item.name}
                    image={item.image}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
      </section>
    );
  }
}

NewReleases.propTypes = {
  newReleases: PropTypes.object.isRequired,
  loadNewReleases: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
};

export default connectNewReleases(NewReleases);
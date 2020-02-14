import React, { Component } from "react";
import PropTypes from "prop-types";

import Block from "components/Common/Block";
import BlockHeader from "components/Common/BlockHeader";
import InfiniteScroll from "components/Common/InfiniteScroll";
import SkeletonBlocks from "components/Skeleton/SkeletonBlocks";
import { connectArtistSingles } from "containers/Album/ArtistSinglesContainer";

export class ArtistSingles extends Component {
  componentDidMount() {
    this.props.loadSingles(this.props.id);
  }

  render() {
    const {id, loadMore} = this.props;
    const {pending, items, loadMorePending, total, error} = this.props.singles;
    const loadData = () => loadMore(id, items.length);
    if (pending || error) {
      return <SkeletonBlocks />;
    }
    return (
      <section>
        <BlockHeader title='Singles'/>
          <InfiniteScroll
            total={total}
            dataLength={items.length}
            loadData={loadData}
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

ArtistSingles.propTypes = {
  loadSingles: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
  singles: PropTypes.object.isRequired,
};

export default connectArtistSingles(ArtistSingles);
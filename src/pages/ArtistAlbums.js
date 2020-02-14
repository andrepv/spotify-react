import React, { Component } from "react";
import PropTypes from "prop-types";

import Block from "components/Common/Block";
import BlockHeader from "components/Common/BlockHeader";
import InfiniteScroll from "components/Common/InfiniteScroll";
import SkeletonBlocks from "components/Skeleton/SkeletonBlocks";
import { connectArtistAlbums } from "containers/Album/ArtistAlbumsContainer";

export class ArtistAlbums extends Component {
  componentDidMount() {
    this.props.loadAlbums(this.props.id);
  }

  render() {
    const {id, loadMore} = this.props;
    const {pending, items, loadMorePending, total, error} = this.props.albums;
    const loadData = () => loadMore(id, items.length);
    if (pending || error) {
      return <SkeletonBlocks />;
    }
    return (
      <section>
        <BlockHeader title='Albums'/>
          <InfiniteScroll
            total={total}
            dataLength={items.length}
            loadData={loadData}
            pending={loadMorePending}
          >
            <div className="blocks-container">
              {items.map(item => {
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

ArtistAlbums.propTypes = {
  loadAlbums: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
  albums: PropTypes.object.isRequired,
};

export default connectArtistAlbums(ArtistAlbums);
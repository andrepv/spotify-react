import React, {Component} from "react";
import PropTypes from "prop-types";

import Block from "components/Common/Block";
import BlockHeader from "components/Common/BlockHeader";
import InfiniteScroll from "components/Common/InfiniteScroll";
import SkeletonBlocks from "components/Skeleton/SkeletonBlocks";
import { connectCategoryPlaylists }
from "containers/Playlist/CategoryPlaylistsContainer";

export class CategoryPlaylists extends Component {
  componentDidMount() {
    const {loadPlaylists, match, playlists} = this.props;
    window.scrollTo(0, 0);
    if (match.params.id !== playlists.categoryId) {
      loadPlaylists({
        id: match.params.id,
      });
    }
  }

  render() {
    const {
      categoryName,
      total,
      loadMorePending,
      pending,
      items,
      error,
    } = this.props.playlists;
    const {id} = this.props.match.params;
    const loadMore = () => this.props.loadMore(id, items.length);
    if (pending || error) {
      return <SkeletonBlocks />;
    }
    return (
      <section>
        <BlockHeader title={categoryName}/>
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
                    type="playlist"
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

CategoryPlaylists.propTypes = {
  playlists: PropTypes.object.isRequired,
  loadPlaylists: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
};

export default connectCategoryPlaylists(CategoryPlaylists);
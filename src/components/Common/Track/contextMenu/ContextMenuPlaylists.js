import React, { Component } from "react";
import PropTypes from "prop-types";
import { ChevronLeft } from "react-feather";

import { connectUserPlaylists }
from "containers/Playlist/ListUserPlaylistsContainer";
import { ReactComponent as Loader } from "images/loader.svg";
import { USER_ID } from "constants/AppConstants";
import InfiniteScroll from "components/Common/InfiniteScroll";
import ContextMenuItems from "components/Common/ContextMenuItems";

export class ContextMenuPlaylists extends Component {
  state = {
    disableInfiniteScroll: false,
  }

  componentDidMount() {
    if (!this.props.playlists.loaded) {
      this.props.loadUserPlaylists();
    }
  }

  disableInfiniteScroll = val => {
    this.setState({
      disableInfiniteScroll: val,
    });
  }

  addTrack = playlist => {
    const {addTrackToPlaylist, trackUri, closeContextMenu} = this.props;
    addTrackToPlaylist(playlist.id, trackUri);
    closeContextMenu();
  }

  backOnFirstPage = () => {
    const {totalPages, navigateToPage} = this.props;
    if (totalPages > 1) {
      navigateToPage(1);
    }
  }

  render() {
    const userId = localStorage.getItem(USER_ID);
    const {totalPages, loadMore} = this.props;
    const {pending, items, total, loadMorePending} = this.props.playlists;

    const userPlaylists = pending
      ? [{ name: <div className="loader"><Loader /></div> }]
      : items.filter(playlist => {
         return playlist.ownerId === userId;
        });

    const loadData = () => loadMore(items.length);
    return (
      <div>
        <div
          className={`select__title ${totalPages === 1
            ? "select__title_not-active"
            : ""
          }`}
          onClick={this.backOnFirstPage}
        >
          {totalPages > 1 && <ChevronLeft />} Add to playlist
        </div>
        <InfiniteScroll
          total={total}
          dataLength={items.length}
          loadData={loadData}
          pending={loadMorePending}
          containerSelector=".select__inner.custom-scrollbar"
          disable={this.state.disableInfiniteScroll}
          hideLoader={true}
        >
          <ContextMenuItems
            items={userPlaylists}
            handler={this.addTrack}
            disableInfiniteScroll={this.disableInfiniteScroll}
            loadMorePending={loadMorePending}
            emptyMsg="Playlists not found"
          />
        </InfiniteScroll>
      </div>
    );
  }
}

export default connectUserPlaylists(ContextMenuPlaylists);

ContextMenuPlaylists.propTypes = {
  playlists: PropTypes.object.isRequired,
  addTrackToPlaylist: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  navigateToPage: PropTypes.func.isRequired,
  trackUri: PropTypes.string.isRequired,
  closeContextMenu: PropTypes.func.isRequired,
  loadUserPlaylists: PropTypes.func.isRequired
};
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Users } from "react-feather";

import PlayButton from "./Tracklist/TracklistPlayButton";
import MoreButton from "./Tracklist/TracklistMoreButton";
import Image from "./Tracklist/TracklistImage";
import Name from "./Tracklist/TracklistName";
import InfiniteScroll from "components/Common/InfiniteScroll";
import LikeButton from "components/Common/LikeButton";
import Tracks from "components/Common/Tracks";
import Page404 from "pages/Page404";
import { connectPlaylist } from "containers/Playlist/PlaylistContainer";
import { USER_ID } from "constants/AppConstants";
import { ReactComponent as Loader } from "images/loader.svg";

class Playlist extends Component {
  componentDidMount() {
    const {id, loadPlaylist} = this.props;
    loadPlaylist(id);
  }

  componentDidUpdate(prevProps) {
    const {id, loadPlaylist} = this.props;
    if (id !== prevProps.id) {
      loadPlaylist(id);
    }
  }

  removeTrackFromPlaylist = trackKey => {
    const {playlist, removeTracksFromPlaylist} = this.props;
    removeTracksFromPlaylist(playlist.id, trackKey, playlist.snapshotId);
  }

  followPlaylist = () => {
    const {playlist, id, followPlaylist} = this.props;
    followPlaylist(id, playlist);
  }

  unfollowPlaylist = () => {
    const {unfollowPlaylist, id} = this.props;
    unfollowPlaylist(id);
  }

  removePlaylist = () => {
    this.unfollowPlaylist();
    this.props.history.goBack();
  }

  changePlaylistDetails = data => {
    const {changePlaylistDetails, id} = this.props;
    changePlaylistDetails(id, data);
  }

  uploadCoverImage = file => {
    const {uploadCoverImage, id} = this.props;
    uploadCoverImage(id, file);
  }

  loadMore = () => {
    const {playlist, id, loadMoreTracks} = this.props;
    loadMoreTracks(id, playlist.items.length);
  }

  checkPlaylistOwner = () => {
    const authorId = this.props.playlist.authors.id;
    const userId = localStorage.getItem(USER_ID);
    return userId === authorId;
  }

  renderButtons = () => {
    const {id, playlist} = this.props;
    const isMyPlaylist = this.checkPlaylistOwner();
    return (
      <div className="tracklist__buttons">
        <PlayButton
          type="playlist"
          id={id}
          disabled={!playlist.isAvailableForPreview}
          trackList={playlist.items}
        />
        {isMyPlaylist
          ?
          <MoreButton
            collaborative={playlist.collaborative}
            isPublic={playlist.public}
            changePlaylistDetails={this.changePlaylistDetails}
            unfollowPlaylist={this.removePlaylist}
          />
          :
          <LikeButton
            isActive={playlist.isSaved}
            unlike={this.unfollowPlaylist}
            like={this.followPlaylist}
          />
        }
      </div>
    );
  }

  renderInfo = () => {
    const isMyPlaylist = this.checkPlaylistOwner();
    const {state} = this.props.history.location;
    const {name, followers, totalTracks} = this.props.playlist;
    return (
      <div className="tracklist__info">
        <Name
          name={name}
          isEditableName={isMyPlaylist}
          changeName={this.changePlaylistDetails}
          focus={Boolean(state && state.newPlaylist)}
        />
        <ul className="tracklist__additional-info">
          <li><Users/>{followers}</li>
          <li className="tracklist__dot">•</li>
          <li>
            {totalTracks === 1
              ? `${totalTracks} track`
              : `${totalTracks} tracks`
            }
          </li>
        </ul>
        {this.renderButtons()}
      </div>
    );
  }

  renderTracks = () => {
    const {id} = this.props;
    const isMyPlaylist = this.checkPlaylistOwner();
    const {totalTracks, items, loadMorePending} = this.props.playlist;
    const source = {name: `playlist_${id}`, isMyPlaylist};
    return (
      <div className="tracklist">
        <InfiniteScroll
          total={totalTracks}
          dataLength={items.length}
          loadData={this.loadMore}
          pending={loadMorePending}
          containerSelector='#tracklist-scroll-parent'
        >
          <Tracks
            trackList={items}
            removeTrackFromPlaylist={this.removeTrackFromPlaylist}
            source={source}
          />
        </InfiniteScroll>
      </div>
    );
  }

  render() {
    const {id, image, pending, error} = this.props.playlist;
    const isMyPlaylist = this.checkPlaylistOwner();
    if (pending || error) {
      return (
        <div className="tracklist__loader flex-center">
          <Loader />
        </div>
      );
    }
    if (!id) {
      return <Page404 />;
    }
    return (
      <div
        className="tracklist__container custom-scrollbar"
        id="tracklist-scroll-parent"
      >
        <header className="tracklist__header">
          <Image
            image={image}
            isEditableImage={isMyPlaylist}
            uploadCoverImage={this.uploadCoverImage}
          />
          {this.renderInfo()}
        </header>
        {this.renderTracks()}
      </div>
    );
  }
}

export default connectPlaylist(Playlist);

Playlist.propTypes = {
  id: PropTypes.string.isRequired,
  playlist: PropTypes.object.isRequired,
  loadPlaylist: PropTypes.func.isRequired,
  removeTracksFromPlaylist: PropTypes.func.isRequired,
  followPlaylist: PropTypes.func.isRequired,
  unfollowPlaylist: PropTypes.func.isRequired,
  changePlaylistDetails: PropTypes.func.isRequired,
  uploadCoverImage: PropTypes.func.isRequired,
  loadMoreTracks: PropTypes.func.isRequired,
};
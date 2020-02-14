import { connect } from "react-redux";

import { loadMorePlaylistTracks } from "actions/TrackActions";
import {
  loadPlaylist,
  followPlaylist,
  unfollowPlaylist,
  uploadCoverImage,
  changePlaylistDetails,
  removeTracksFromPlaylist,
} from "actions/PlaylistActions";

const mapStateToProps = store => {
  return {
    playlist: store.playlist,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPlaylist: playlistId => {
      dispatch(loadPlaylist(playlistId));
    },
    followPlaylist: (playlistId, playlist) => {
      dispatch(followPlaylist(playlistId, playlist));
    },
    unfollowPlaylist: playlistId => {
      dispatch(unfollowPlaylist(playlistId));
    },
    uploadCoverImage: (playlistId, image) => {
      dispatch(uploadCoverImage(playlistId, image));
    },
    changePlaylistDetails: (playlistId, data) => {
      dispatch(changePlaylistDetails(playlistId, data));
    },
    loadMoreTracks: (id, offset) => {
      dispatch(loadMorePlaylistTracks(id, offset));
    },
    removeTracksFromPlaylist: (playlistId, positions, snapshotId) => {
      dispatch(removeTracksFromPlaylist(playlistId, positions, snapshotId));
    },
  };
};

export const connectPlaylist = connect(
  mapStateToProps,
  mapDispatchToProps
);
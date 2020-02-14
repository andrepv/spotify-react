import { connect } from "react-redux";

import { USER_PLAYLISTS } from "constants/ActionConstants";
import {
  loadUserPlaylists,
  loadMoreUserPlaylists,
  createPlaylist,
} from "actions/PlaylistActions";

const mapStateToProps = store => {
  return {
    playlists: store.userPlaylists,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserPlaylists: () => {
      dispatch(loadUserPlaylists(USER_PLAYLISTS));
    },
    loadMore: offset => {
      dispatch(loadMoreUserPlaylists(USER_PLAYLISTS, offset));
    },
    createPlaylist: (playlistName, redirect) => {
      dispatch(createPlaylist(playlistName, redirect));
    },
  };
};

export const connectUserPlaylists = connect(
  mapStateToProps,
  mapDispatchToProps
);
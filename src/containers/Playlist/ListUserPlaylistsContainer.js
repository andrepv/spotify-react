import { connect } from "react-redux";
import { LIST_USER_PLAYLISTS } from "constants/ActionConstants";
import {
  loadUserPlaylists,
  loadMoreUserPlaylists,
  addTrackToPlaylist,
} from "actions/PlaylistActions";

const mapStateToProps = store => {
  return {
    playlists: store.listUserPlaylists,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserPlaylists: () => {
      dispatch(loadUserPlaylists(LIST_USER_PLAYLISTS));
    },
    loadMore: offset => {
      dispatch(loadMoreUserPlaylists(LIST_USER_PLAYLISTS, offset));
    },
    addTrackToPlaylist: (playlistId, trackUri) => {
      dispatch(addTrackToPlaylist(playlistId, trackUri));
    },
  };
};

export const connectUserPlaylists = connect(
  mapStateToProps,
  mapDispatchToProps
);
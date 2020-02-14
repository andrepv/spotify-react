import { connect } from "react-redux";
import {
  loadCategoryPlaylists,
  loadMoreCategoryPlaylists,
  loadRandomCategoryPlaylists,
} from "actions/PlaylistActions";

const mapStateToProps = store => {
  return {
    playlists: store.categoryPlaylists,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPlaylists: playlistId => {
      dispatch(loadCategoryPlaylists(playlistId));
    },
    loadRandomPlaylists: () => {
      dispatch(loadRandomCategoryPlaylists());
    },
    loadMore: (id, offset) => {
      dispatch(loadMoreCategoryPlaylists(id, offset));
    },
  };
};

export const connectCategoryPlaylists = connect(
  mapStateToProps,
  mapDispatchToProps
);
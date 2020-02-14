import { connect } from "react-redux";
import { loadFeaturedPlaylists } from "actions/PlaylistActions";

const mapStateToProps = store => {
  return {
    playlists: store.featuredPlaylists,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadFeaturedPlaylists: () => {
      dispatch(loadFeaturedPlaylists());
    },
  };
};

export const connectFeaturedPlaylists = connect(
  mapStateToProps,
  mapDispatchToProps
);
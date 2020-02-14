import { connect } from "react-redux";
import {
  loadFollowedArtists,
  loadMoreFollowedArtists,
} from "actions/ArtistActions";

const mapStateToProps = store => {
  return {
    artists: store.followedArtists,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadArtists: () => {
      dispatch(loadFollowedArtists());
    },
    loadMore: lastArtistId => {
      dispatch(loadMoreFollowedArtists(lastArtistId));
    },
  };
};

export const connectFollowedArtists = connect(
  mapStateToProps,
  mapDispatchToProps
);
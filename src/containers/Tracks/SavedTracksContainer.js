import { connect } from "react-redux";
import {
  loadMySavedTracks,
  loadMoreMySavedTracks,
} from "actions/TrackActions";

const mapStateToProps = store => {
  return {
    tracks: store.savedTracks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMySavedTracks: () => {
      dispatch(loadMySavedTracks());
    },
    loadMore: offset => {
      dispatch(loadMoreMySavedTracks(offset));
    },
  };
};

export const connectSavedTracks = connect(
  mapStateToProps,
  mapDispatchToProps
);
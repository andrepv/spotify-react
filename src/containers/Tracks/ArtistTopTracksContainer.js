import { connect } from "react-redux";
import { loadArtistTopTracks } from "actions/TrackActions";

const mapStateToProps = store => {
  return {
    tracks: store.artistTopTracks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadTopTracks: artistId => {
      dispatch(loadArtistTopTracks(artistId));
    },
  };
};

export const connectArtistTopTracks = connect(
  mapStateToProps,
  mapDispatchToProps
);
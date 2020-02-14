import { connect } from "react-redux";
import {
  loadArtist,
  followArtist,
  unfollowArtist,
} from "actions/ArtistActions";

const mapStateToProps = store => {
  return {
    artist: store.artist,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadArtist: artistId => {
      dispatch(loadArtist(artistId));
    },
    followArtist: artist => {
      dispatch(followArtist(artist));
    },
    unfollowArtist: artistId => {
      dispatch(unfollowArtist(artistId));
    },
  };
};

export const connectArtistHeader = connect(
  mapStateToProps,
  mapDispatchToProps
);
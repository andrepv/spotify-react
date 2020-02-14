import { connect } from "react-redux";
import {
  loadArtistSingles,
  loadMoreArtistSingles,
} from "actions/AlbumActions";

const mapStateToProps = store => {
  return {
    singles: store.artistSingles,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSingles: artistId => {
      dispatch(loadArtistSingles(artistId));
    },
    loadMore: (artistId, offset) => {
      dispatch(loadMoreArtistSingles(artistId, offset));
    },
  };
};

export const connectArtistSingles = connect(
  mapStateToProps,
  mapDispatchToProps
);
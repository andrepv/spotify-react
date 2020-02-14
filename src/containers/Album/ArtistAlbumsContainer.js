import { connect } from "react-redux";
import {
  loadArtistAlbums,
  loadMoreArtistAlbums,
} from "actions/AlbumActions";

const mapStateToProps = store => {
  return {
    albums: store.artistAlbums,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAlbums: artistId => {
      dispatch(loadArtistAlbums(artistId));
    },
    loadMore: (artistId, offset) => {
      dispatch(loadMoreArtistAlbums(artistId, offset));
    },
  };
};

export const connectArtistAlbums = connect(
  mapStateToProps,
  mapDispatchToProps
);
import { connect } from "react-redux";
import {
  loadAlbum,
  addToMySavedAlbums,
  removeFromMySavedAlbums,
} from "actions/AlbumActions";

const mapStateToProps = store => {
  return {
    album: store.album,
    tracks: store.album.items,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAlbum: albumId => {
      dispatch(loadAlbum(albumId));
    },
    addToMySavedAlbums: albumIds => {
      dispatch(addToMySavedAlbums([albumIds]));
    },
    removeFromMySavedAlbums: albumIds => {
      dispatch(removeFromMySavedAlbums([albumIds]));
    },
  };
};

export const connectAlbum = connect(
  mapStateToProps,
  mapDispatchToProps
);
import { connect } from "react-redux";
import { loadRelatedArtists } from "actions/ArtistActions";

const mapStateToProps = store => {
  return {
    artists: store.relatedArtists,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadRelatedArtists: artistId => {
      dispatch(loadRelatedArtists(artistId));
    },
  };
};

export const connectRelatedArtists = connect(
  mapStateToProps,
  mapDispatchToProps
);
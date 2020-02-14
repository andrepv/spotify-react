import { connect } from "react-redux";
import {
  loadNewReleases,
  loadMoreNewReleases,
} from "actions/AlbumActions";

const mapStateToProps = store => {
  return {
    newReleases: store.newReleases,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadNewReleases: () => {
      dispatch(loadNewReleases());
    },
    loadMore: offset => {
      dispatch(loadMoreNewReleases(offset));
    },
  };
};

export const connectNewReleases = connect(
  mapStateToProps,
  mapDispatchToProps
);
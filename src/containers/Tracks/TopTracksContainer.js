import { connect } from "react-redux";

import { filterByCountry } from "actions/ChartActions";
import { loadMoreTopTracks } from "actions/TrackActions";
import { TOP_50 } from "constants/PlaylistIds";

const mapStateToProps = store => {
  return {
    tracks: store.topTracks,
    chartsCountry: store.charts.country,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadTopTracks: () => {
      dispatch(
        filterByCountry({
          countryName: "global",
          playlistId: TOP_50.global,
        })
      );
    },
    loadMore: offset => {
      dispatch(loadMoreTopTracks(TOP_50.global, offset));
    },
  };
};

export const connectTopTracks = connect(
  mapStateToProps,
  mapDispatchToProps
);
import { connect } from "react-redux";

import { filterByCountry } from "actions/ChartActions";
import { TOP_50 } from "constants/PlaylistIds";
import { loadMoreTopTracks } from "actions/TrackActions";
import countries from "utils/getCountryList";

const mapStateToProps = store => {
  return {
    tracks: store.topTracks,
    charts: store.charts,
    countries: countries,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filterByCountry: (countryName = "global") => {
      const country = countryName.toLowerCase().split(" ").join("_");
      const playlistId = TOP_50[country];
      dispatch(
        filterByCountry({
          countryName,
          playlistId,
        })
      );
    },
    loadMore: (playlistId, offset) => {
      dispatch(loadMoreTopTracks(playlistId, offset));
    },
  };
};

export const connectCharts = connect(
  mapStateToProps,
  mapDispatchToProps
);
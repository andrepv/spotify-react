import makeActionCreator from "utils/makeActionCreator";
import { loadTopTracks } from "actions/TrackActions";
import { FILTER_BY_COUNTRY } from "constants/ActionConstants";

export function filterByCountry(data) {
  return dispatch => {
    const filter = makeActionCreator(FILTER_BY_COUNTRY, "payload");
    dispatch(filter(data));
    dispatch(loadTopTracks([data.playlistId]));
  };
}
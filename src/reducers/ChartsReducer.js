import { FILTER_BY_COUNTRY, TOP_TRACKS } from "constants/ActionConstants";
import { TOP_50 } from "constants/PlaylistIds";

const initialChartsState = {
  country: "global",
  playlistId: TOP_50.global,
  pending: false,
};

export default function charts(state = initialChartsState, action) {
  switch (action.type) {
    case FILTER_BY_COUNTRY:
      return {
        ...state,
        country: action.payload.countryName,
        playlistId: action.payload.playlistId,
      };
    case TOP_TRACKS.PENDING:
      return {
        ...state,
        pending: true,
      };
    case TOP_TRACKS.ERROR:
    case TOP_TRACKS.SUCCESS:
      return {
        ...state,
        pending: false,
      };
    default:
      return state;
  }
}
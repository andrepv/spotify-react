import {
  FILTER_BY_TYPE,
  SEARCH_RESULTS,
  RESET_SEARCH_RESULTS,
  TOGGLE_SEARCH,
} from "constants/ActionConstants";
import spotifyQuery from "utils/spotifyApi";
import makeActionCreator from "utils/makeActionCreator";
import transformResponse from "utils/transformResponse";

export const resetSearchResults = makeActionCreator(RESET_SEARCH_RESULTS);
export const toggleSearch = makeActionCreator(TOGGLE_SEARCH);
export const filterByType = makeActionCreator(FILTER_BY_TYPE, "payload");

export function loadSearchResults(query, type) {
  return async dispatch => {
    if (!query) {
      dispatch(resetSearchResults());
      return;
    }
    const pending = makeActionCreator(SEARCH_RESULTS.PENDING);
    const success = makeActionCreator(SEARCH_RESULTS.SUCCESS, "payload");
    const error = makeActionCreator(SEARCH_RESULTS.ERROR);
    try {
      dispatch(pending());
      const response = await spotifyQuery("search", [query, [type]]);
      let modifiedResponse;
      switch (type) {
        case "artist":
          modifiedResponse = transformResponse.artists(response.artists.items);
          break;
        case "album":
        case "playlist":
          modifiedResponse = type === "album"
              ? transformResponse.albums(response.albums.items)
              : transformResponse.playlists(response.playlists.items);
          break;
        case "track":
          const tracks = response.tracks.items;
          const trackIds = tracks.map(track => track.id);
          const savedTracks = await spotifyQuery(
            "containsMySavedTracks",
            [trackIds]
          );
          modifiedResponse = transformResponse.tracks(tracks, savedTracks);
          break;
        // no default
      }
      setTimeout(() => {
        dispatch(success(modifiedResponse));
      }, 800);
    } catch (e) {
      console.error(e);
      dispatch(error());
    }
  };
}
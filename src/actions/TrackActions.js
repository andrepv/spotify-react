import {
  PLAYLIST_TRACKS,
  ADD_TO_FAVORITE_TRACKS,
  REMOVE_FROM_FAVORITE_TRACKS,
  ARTIST_TOP_TRACKS,
  TOP_TRACKS,
  SAVED_TRACKS,
} from "constants/ActionConstants";
import {
  PLAYLIST_TRACKS_LIMIT,
  SAVED_TRACKS_LIMIT,
  TOP_TRACKS_LIMIT,
  MESSAGES,
} from "constants/AppConstants";
import makeActionCreator from "utils/makeActionCreator";
import transformResponse from "utils/transformResponse";
import spotifyQuery from "utils/spotifyApi";
import alert from "components/Common/Alert/Alert";

export function loadArtistTopTracks(artistId) {
  return async dispatch => {
    const pending = makeActionCreator(ARTIST_TOP_TRACKS.PENDING);
    const success = makeActionCreator(ARTIST_TOP_TRACKS.SUCCESS, "payload");
    const error = makeActionCreator(ARTIST_TOP_TRACKS.ERROR);
    try {
      dispatch(pending());
      const response = await spotifyQuery(
        "getArtistTopTracks",
        [artistId, "US"]
      );
      const tracks = response.tracks;
      const trackIds = tracks.map(track => track.id);
      const savedTracks = await spotifyQuery(
        "containsMySavedTracks",
        [trackIds]
      );
      dispatch(
        success({
          items: transformResponse.tracks(tracks, savedTracks),
        })
      );
    } catch (e) {
      console.error(e);
      if (e === MESSAGES.TOKEN_HAS_EXPIRED) {
        return;
      }
      dispatch(error());
    }
  };
}

export function loadMySavedTracks() {
  return async dispatch => {
    const pending = makeActionCreator(SAVED_TRACKS.PENDING);
    const success = makeActionCreator(SAVED_TRACKS.SUCCESS, "payload");
    const error = makeActionCreator(SAVED_TRACKS.ERROR, "payload");
    try {
      dispatch(pending());
      const response = await spotifyQuery(
        "getMySavedTracks",
        [{limit: SAVED_TRACKS_LIMIT}]
      );
      if (!response.items.length) {
        dispatch(error("no saved tracks"));
        return;
      }
      const trackIds = response.items.map(item => item.track.id);
      const savedTracks = await spotifyQuery(
        "containsMySavedTracks",
        [trackIds]
      );
      dispatch(
        success({
          items: transformResponse.tracks(response.items, savedTracks),
          total: response.total,
        })
      );
    } catch (e) {
      console.error(e);
      if (e === MESSAGES.TOKEN_HAS_EXPIRED) {
        return;
      }
      dispatch(error());
    }
  };
}

export function loadMoreMySavedTracks(offset) {
  return async dispatch => {
    const pending = makeActionCreator(SAVED_TRACKS.LOAD_MORE_PENDING);
    const success = makeActionCreator(
      SAVED_TRACKS.LOAD_MORE_SUCCESS,
      "payload"
    );
    const error = makeActionCreator(SAVED_TRACKS.LOAD_MORE_ERROR);
    try {
      dispatch(pending());
      const response = await spotifyQuery(
        "getMySavedTracks",
        [{limit: SAVED_TRACKS_LIMIT, offset}]
      );
      const trackIds = response.items.map(item => item.track.id);
      const savedTracks = await spotifyQuery(
        "containsMySavedTracks",
        [trackIds]
      );
      dispatch(
        success({
          items: transformResponse.tracks(response.items, savedTracks),
        })
      );
    } catch (e) {
      console.error(e);
      dispatch(error());
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function loadTopTracks(playlistId) {
  return async dispatch => {
    const pending = makeActionCreator(TOP_TRACKS.PENDING);
    const success = makeActionCreator(TOP_TRACKS.SUCCESS, "payload");
    const error = makeActionCreator(TOP_TRACKS.ERROR);
    try {
      dispatch(pending());
      const response = await spotifyQuery(
        "getPlaylistTracks",
        [playlistId, {limit: TOP_TRACKS_LIMIT}]
      );
      const tracks = response.items;
      const trackIds = tracks.map(item => item.track.id);
      const savedTracks = await spotifyQuery(
        "containsMySavedTracks",
        [trackIds]
      );
      dispatch(
        success({
          items: transformResponse.tracks(tracks, savedTracks),
          total: response.total,
        })
      );
    } catch (e) {
      console.error(e);
      if (e === MESSAGES.TOKEN_HAS_EXPIRED) {
        return;
      }
      dispatch(error());
    }
  };
}

export function loadMoreTopTracks(playlistId, offset) {
  return async dispatch => {
    const pending = makeActionCreator(TOP_TRACKS.LOAD_MORE_PENDING);
    const success = makeActionCreator(TOP_TRACKS.LOAD_MORE_SUCCESS, "payload");
    const error = makeActionCreator(TOP_TRACKS.LOAD_MORE_ERROR);
    try {
      dispatch(pending());
      const response = await spotifyQuery(
        "getPlaylistTracks",
        [playlistId, {limit: TOP_TRACKS_LIMIT, offset}]
      );
      const tracks = response.items;
      const trackIds = tracks.map(item => item.track.id);
      const savedTracks = await spotifyQuery(
        "containsMySavedTracks",
        [trackIds]
      );
      dispatch(
        success({
          items: transformResponse.tracks(tracks, savedTracks),
        })
      );
    } catch (e) {
      console.error(e);
      dispatch(error());
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function loadMorePlaylistTracks(playlistId, offset) {
  return async dispatch => {
    const pending = makeActionCreator(PLAYLIST_TRACKS.LOAD_MORE_PENDING);
    const success = makeActionCreator(
      PLAYLIST_TRACKS.LOAD_MORE_SUCCESS,
      "payload"
    );
    const error = makeActionCreator(PLAYLIST_TRACKS.LOAD_MORE_ERROR);
    try {
      dispatch(pending());
      const response = await spotifyQuery(
        "getPlaylistTracks",
        [playlistId, {limit: PLAYLIST_TRACKS_LIMIT, offset}]
      );
      const tracks = response.items;
      const trackIds = tracks.map(item => item.track.id);
      const savedTracks = await spotifyQuery(
        "containsMySavedTracks",
        [trackIds]
      );
      const isAvailableForPreview = Boolean(tracks.filter(item => {
        return Boolean(item.track.preview_url);
      }).length);
      dispatch(
        success({
          isAvailableForPreview,
          items: transformResponse.tracks(tracks, savedTracks),
        })
      );
    } catch (e) {
      console.error(e);
      dispatch(error());
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function addToFavoriteTracks(track) {
  return async dispatch => {
    const success = makeActionCreator(ADD_TO_FAVORITE_TRACKS, "payload");
    try {
      await spotifyQuery("addToMySavedTracks", [[track.id]]);
      dispatch(success({...track}));
      alert.show(MESSAGES.ADDED_TO_FAV_TRACKS);
    } catch (e) {
      console.error(e);
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function removeFromFavoriteTracks(trackId) {
  return async dispatch => {
    const success = makeActionCreator(REMOVE_FROM_FAVORITE_TRACKS, "payload");
    try {
      await spotifyQuery("removeFromMySavedTracks", [[trackId]]);
      dispatch(success({id: trackId}));
      alert.show(MESSAGES.REMOVED_FROM_FAV_TRACKS);
    } catch (e) {
      console.error(e);
      alert.show(MESSAGES.ERROR);
    }
  };
}
import {
  ALBUM,
  NEW_RELEASES,
  ARTIST_ALBUMS,
  ARTIST_SINGLES,
  ADD_TO_MY_SAVED_ALBUMS,
  REMOVE_FROM_MY_SAVED_ALBUMS,
} from "constants/ActionConstants";
import {
  NEW_RELEASES_LIMIT,
  ALBUM_TRACKS_LIMIT,
  ARTIST_ALBUMS_LIMIT,
  ARTIST_SINGLES_LIMIT,
  MESSAGES,
} from "constants/AppConstants";
import makeActionCreator from "utils/makeActionCreator";
import transformResponse from "utils/transformResponse";
import spotifyQuery from "utils/spotifyApi";
import alert from "components/Common/Alert/Alert";

export function loadAlbum(albumId) {
  return async dispatch => {
    const pending = makeActionCreator(ALBUM.PENDING);
    const success = makeActionCreator(ALBUM.SUCCESS, "payload");
    const error = makeActionCreator(ALBUM.ERROR);
    try {
      dispatch(pending());
      const album = await getAlbum(albumId);
      const albumTracks = await getAlbumTracks(album);
      dispatch(
        success({
          ...album,
          ...albumTracks,
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

async function getAlbum(albumId) {
  const album = await spotifyQuery("getAlbum", [albumId]);
  const isAlbumSaved = await spotifyQuery(
    "containsMySavedAlbums",
    [[albumId]]
  );
  return {
    ...album,
    isSaved: isAlbumSaved[0],
    artists: album.artists.map(artist => {
      return {
        name: artist.name,
        id: artist.id,
      };
    }),
    totalTracks: album.total_tracks === 1
      ? `${album.total_tracks} track`
      : `${album.total_tracks} tracks`,
  };
}

async function getAlbumTracks(album) {
  const response = await spotifyQuery(
    "getAlbumTracks",
    [album.id, {limit: ALBUM_TRACKS_LIMIT}]
  );
  const tracks = response.items.map(track => {
    return {...track, images: album.images};
  });
  const trackIds = tracks.map(track => track.id);
  const savedTracks = await spotifyQuery(
    "containsMySavedTracks",
    [trackIds]
  );
  const isAvailableForPreview = Boolean(tracks.filter(track => {
    return Boolean(track.preview_url);
  }).length);

  return {
    tracks: transformResponse.tracks(tracks, savedTracks),
    isAvailableForPreview,
  };
}

export function loadNewReleases() {
  return async dispatch => {
    const pending = makeActionCreator(NEW_RELEASES.PENDING);
    const success = makeActionCreator(NEW_RELEASES.SUCCESS, "payload");
    const error = makeActionCreator(NEW_RELEASES.ERROR);
    try {
      dispatch(pending());
      const response = await spotifyQuery(
        "getNewReleases",
        [{limit: NEW_RELEASES_LIMIT}]
      );
      dispatch(
        success({
          albums: transformResponse.albums(response.albums.items),
          total: response.albums.total,
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

export function loadMoreNewReleases(offset) {
  return async dispatch => {
    const pending = makeActionCreator(NEW_RELEASES.LOAD_MORE_PENDING);
    const success = makeActionCreator(
      NEW_RELEASES.LOAD_MORE_SUCCESS,
      "payload"
    );
    const error = makeActionCreator(NEW_RELEASES.LOAD_MORE_ERROR);
    try {
      dispatch(pending());
      const response = await spotifyQuery(
        "getNewReleases",
        [{limit: NEW_RELEASES_LIMIT, offset}]
      );
      dispatch(
        success(transformResponse.albums(response.albums.items))
      );
    } catch (e) {
      console.error(e);
      dispatch(error());
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function loadArtistAlbums(artistId) {
  return async dispatch => {
    const pending = makeActionCreator(ARTIST_ALBUMS.PENDING);
    const success = makeActionCreator(ARTIST_ALBUMS.SUCCESS, "payload");
    const error = makeActionCreator(ARTIST_ALBUMS.ERROR);
    try {
      dispatch(pending());
      const response = await spotifyQuery(
        "getArtistAlbums",
        [artistId,
        {
          limit: ARTIST_ALBUMS_LIMIT,
          country: "US",
          include_groups: "album",
        }]
      );
      dispatch(
        success({
          items: transformResponse.albums(response.items),
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

export function loadMoreArtistAlbums(artistId, offset) {
  return async dispatch => {
    const pending = makeActionCreator(ARTIST_ALBUMS.LOAD_MORE_PENDING);
    const success = makeActionCreator(
      ARTIST_ALBUMS.LOAD_MORE_SUCCESS,
      "payload"
    );
    const error = makeActionCreator(ARTIST_ALBUMS.LOAD_MORE_ERROR);
    try {
      dispatch(pending());
      const response = await spotifyQuery(
        "getArtistAlbums",
        [artistId,
        {
          limit: ARTIST_ALBUMS_LIMIT,
          offset,
          country: "US",
          include_groups: "album",
        }]
      );
      dispatch(
        success(transformResponse.albums(response.items))
      );
    } catch (e) {
      console.error(e);
      dispatch(error());
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function loadArtistSingles(artistId) {
  return async dispatch => {
    const pending = makeActionCreator(ARTIST_SINGLES.PENDING);
    const success = makeActionCreator(ARTIST_SINGLES.SUCCESS, "payload");
    const error = makeActionCreator(ARTIST_SINGLES.ERROR);
    try {
      dispatch(pending());
      const response = await spotifyQuery(
        "getArtistAlbums",
        [artistId,
        {
          include_groups: "single",
          country: "US",
          limit: ARTIST_SINGLES_LIMIT,
        }]
      );
      dispatch(
        success({
          items: transformResponse.albums(response.items),
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

export function loadMoreArtistSingles(artistId, offset) {
  return async dispatch => {
    const pending = makeActionCreator(ARTIST_SINGLES.LOAD_MORE_PENDING);
    const success = makeActionCreator(
      ARTIST_SINGLES.LOAD_MORE_SUCCESS,
      "payload"
    );
    const error = makeActionCreator(ARTIST_SINGLES.LOAD_MORE_ERROR);
    try {
      dispatch(pending());
      const response = await spotifyQuery(
        "getArtistAlbums",
        [artistId,
        {
          limit: ARTIST_SINGLES_LIMIT,
          offset,
          country: "US",
          include_groups: "single",
        }]
      );
      dispatch(
        success(transformResponse.albums(response.items))
      );
    } catch (e) {
      console.error(e);
      dispatch(error());
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function addToMySavedAlbums(albumIds) {
  return async dispatch => {
    const success = makeActionCreator(ADD_TO_MY_SAVED_ALBUMS);
    try {
      await spotifyQuery("addToMySavedAlbums", [albumIds]);
      dispatch(success());
      alert.show(MESSAGES.SAVED_TO_LIBRARY);
    } catch (e) {
      console.error(e);
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function removeFromMySavedAlbums(albumIds) {
  return async dispatch => {
    const success = makeActionCreator(REMOVE_FROM_MY_SAVED_ALBUMS);
    try {
      await spotifyQuery("removeFromMySavedAlbums", [albumIds]);
      dispatch(success());
      alert.show(MESSAGES.REMOVED_FROM_LIBRARY);
    } catch (e) {
      console.error(e);
      alert.show(MESSAGES.ERROR);
    }
  };
}
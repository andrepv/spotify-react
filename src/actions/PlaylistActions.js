import {
  USER_PLAYLISTS_LIMIT,
  USER_ID,
  CATEGORY_PLAYLISTS_LIMIT,
  PLAYLIST_TRACKS_LIMIT,
  MESSAGES,
} from "constants/AppConstants";
import {
  CATEGORY_PLAYLISTS,
  FEATURED_PLAYLISTS,
  PLAYLIST,
  ADD_TRACK_TO_PLAYLIST,
  REMOVE_TRACK_FROM_PLAYLIST,
  FOLLOW_PLAYLIST,
  UNFOLLOW_PLAYLIST,
  UPLOAD_PLAYLIST_COVER,
  CHANGE_PLAYLIST_DETAILS,
  CREATE_PLAYLIST,
} from "constants/ActionConstants";
import spotifyQuery from "utils/spotifyApi";
import makeActionCreator from "utils/makeActionCreator";
import transformResponse from "utils/transformResponse";
import changeNumFormat from "utils/changeNumFormat";
import alert from "components/Common/Alert/Alert";

export function loadFeaturedPlaylists() {
  return async dispatch => {
    const pending = makeActionCreator(FEATURED_PLAYLISTS.PENDING);
    const success = makeActionCreator(FEATURED_PLAYLISTS.SUCCESS, "payload");
    const error = makeActionCreator(FEATURED_PLAYLISTS.ERROR);
    try {
      dispatch(pending());
      const ftPlaylists = await spotifyQuery("getFeaturedPlaylists");
      dispatch(
        success({
          items: transformResponse.playlists(ftPlaylists.playlists.items),
          message: ftPlaylists.message,
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

export function loadUserPlaylists(constant) {
  return async dispatch => {
    const pending = makeActionCreator(constant.PENDING);
    const success = makeActionCreator(constant.SUCCESS, "payload");
    const error = makeActionCreator(constant.ERROR);
    try {
      dispatch(pending());
      const userPlaylists = await spotifyQuery(
        "getUserPlaylists",
        [{limit: USER_PLAYLISTS_LIMIT}]
      );
      dispatch(
        success({
          items: transformResponse.playlists(userPlaylists.items, true),
          total: userPlaylists.total,
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

export function loadMoreUserPlaylists(constant, offset) {
  return async dispatch => {
    const pending = makeActionCreator(constant.LOAD_MORE_PENDING);
    const success = makeActionCreator(constant.LOAD_MORE_SUCCESS, "payload");
    const error = makeActionCreator(constant.LOAD_MORE_ERROR);
    try {
      dispatch(pending());
      const userPlaylists = await spotifyQuery(
        "getUserPlaylists",
        [{limit: USER_PLAYLISTS_LIMIT, offset}]
      );
      dispatch(
        success({
          items: transformResponse.playlists(userPlaylists.items, true),
          total: userPlaylists.total,
        })
      );
    } catch (e) {
      console.error(e);
      dispatch(error());
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function loadPlaylist(playlistId) {
  return async dispatch => {
    const pending = makeActionCreator(PLAYLIST.PENDING);
    const success = makeActionCreator(PLAYLIST.SUCCESS, "payload");
    const error = makeActionCreator(PLAYLIST.ERROR);
    try {
      dispatch(pending());
      const playlist = await getPlaylist(playlistId);
      const playlistTracks = await getPlaylistTracks(playlistId);
      dispatch(
        success({
          ...playlist,
          ...playlistTracks,
        })
      );
    } catch (e) {
      console.error(e);
      if (e === MESSAGES.TOKEN_HAS_EXPIRED) {
       return;
      }
      dispatch(error());
      alert.show(MESSAGES.ERROR);
    }
  };
}

async function getPlaylist(playlistId) {
  const playlist = await spotifyQuery("getPlaylist", [playlistId]);
  const userId = localStorage.getItem(USER_ID);
  const areFollowingPlaylist = await spotifyQuery(
    "areFollowingPlaylist",
    [playlistId, [userId]]
  );
  return {
    ...playlist,
    followers: changeNumFormat(playlist.followers.total),
    saved: areFollowingPlaylist[0],
  };
}

async function getPlaylistTracks(playlistId) {
  const response = await spotifyQuery(
    "getPlaylistTracks",
    [playlistId, {limit: PLAYLIST_TRACKS_LIMIT}]
  );
  const tracks = response.items;
  const trackIds = tracks.map(item => item.track.id);
  let mySavedTracks = [];
  if (trackIds.length) {
    mySavedTracks = await spotifyQuery(
      "containsMySavedTracks",
      [trackIds]
    );
  }
  const isAvailableForPreview = Boolean(tracks.filter(item => {
    return Boolean(item.track.preview_url);
  }).length);
  return {
    isAvailableForPreview,
    items: transformResponse.tracks(tracks, mySavedTracks),
    total: response.total,
  };
}

export function loadRandomCategoryPlaylists() {
  return async dispatch => {
    const pending = makeActionCreator(CATEGORY_PLAYLISTS.PENDING);
    const success = makeActionCreator(CATEGORY_PLAYLISTS.SUCCESS, "payload");
    const error = makeActionCreator(CATEGORY_PLAYLISTS.ERROR);
    try {
      dispatch(pending());
      const randomCategory = await getRandomCategory();
      const categoryId = randomCategory.id;
      const categoryName = randomCategory.name;
      const categoryPlaylists = await spotifyQuery(
        "getCategoryPlaylists",
        [categoryId, {limit: CATEGORY_PLAYLISTS_LIMIT}]
      );
      dispatch(
        success({
          categoryName, categoryId,
          items: transformResponse.playlists(categoryPlaylists.playlists.items),
          total: categoryPlaylists.playlists.total,
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

export function loadCategoryPlaylists(category = "") {
  return async dispatch => {
    const pending = makeActionCreator(CATEGORY_PLAYLISTS.PENDING);
    const success = makeActionCreator(CATEGORY_PLAYLISTS.SUCCESS, "payload");
    const error = makeActionCreator(CATEGORY_PLAYLISTS.ERROR);
    try {
      dispatch(pending());
      const categoryById = await spotifyQuery(
        "getCategory",
        [category.id]
      );
      const categoryId = categoryById.id;
      const categoryName = categoryById.name;
      const categoryPlaylists = await spotifyQuery(
        "getCategoryPlaylists",
        [categoryId, {limit: CATEGORY_PLAYLISTS_LIMIT}]
      );
      dispatch(
        success({
          categoryName, categoryId,
          items: transformResponse.playlists(categoryPlaylists.playlists.items),
          total: categoryPlaylists.playlists.total,
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

async function getRandomCategory() {
  const response = await spotifyQuery("getCategories");
  const categoryIds = response.categories.items.map(item => {
    return item.id;
  });
  const randomNum = Math.floor(Math.random() * categoryIds.length);
  const categoryId = categoryIds[randomNum];
  const category = response.categories.items.find(item => {
    return item.id === categoryId;
  });
  return {
    name: category.name,
    id: categoryId,
  };
}

export function loadMoreCategoryPlaylists(id, offset) {
  return async dispatch => {
    const pending = makeActionCreator(CATEGORY_PLAYLISTS.LOAD_MORE_PENDING);
    const success = makeActionCreator(
      CATEGORY_PLAYLISTS.LOAD_MORE_SUCCESS,
      "payload"
    );
    const error = makeActionCreator(CATEGORY_PLAYLISTS.LOAD_MORE_ERROR);
    try {
      dispatch(pending());
      const categoryPlaylists = await spotifyQuery(
        "getCategoryPlaylists",
        [id, {offset, limit: CATEGORY_PLAYLISTS_LIMIT}]
      );
      dispatch(
        success({
          items: transformResponse.playlists(categoryPlaylists.playlists.items),
        })
      );
    } catch (e) {
      console.error(e);
      dispatch(error());
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function addTrackToPlaylist(playlistId, trackUris) {
  return async dispatch => {
    const success = makeActionCreator(ADD_TRACK_TO_PLAYLIST, "payload");
    try {
      await spotifyQuery("addTracksToPlaylist", [playlistId, [trackUris]]);
      dispatch(success(playlistId));
      alert.show(MESSAGES.ADDED_TO_PLAYLIST);
    } catch (e) {
      console.error(e);
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function removeTracksFromPlaylist(playlistId, positions, snapshot) {
  return async dispatch => {
    const success = makeActionCreator(REMOVE_TRACK_FROM_PLAYLIST, "payload");
    try {
      const response = await spotifyQuery(
        "removeTracksFromPlaylistInPositions",
        [playlistId, [positions], snapshot]
      );
      dispatch(
        success({
          snapshot_id: response.snapshot_id,
          position: positions,
          playlistId,
        })
      );
    } catch (e) {
      console.error(e);
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function followPlaylist(playlistId, playlist) {
  return async dispatch => {
    const success = makeActionCreator(FOLLOW_PLAYLIST, "payload");
    try {
      await spotifyQuery("followPlaylist", [playlistId]);
      dispatch(
        success({
          id: playlistId,
          image: playlist.image,
          meta: playlist.totalTracks === 1
                    ? `${playlist.totalTracks} track`
                    : `${playlist.totalTracks} tracks`,
          name: playlist.name,
          ownerId: playlist.playlistOwnerId,
        })
      );
      alert.show(MESSAGES.SAVED_TO_LIBRARY);
    } catch (e) {
      console.error(e);
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function unfollowPlaylist(playlistId) {
  return async dispatch => {
    const success = makeActionCreator(UNFOLLOW_PLAYLIST, "payload");
    try {
      await spotifyQuery("unfollowPlaylist", [playlistId]);
      dispatch(success(playlistId));
      alert.show(MESSAGES.REMOVED_FROM_LIBRARY);
    } catch (e) {
      console.error(e);
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function createPlaylist(playlistName, redirect) {
  return async dispatch => {
    const success = makeActionCreator(CREATE_PLAYLIST, "payload");
    try {
      const userId = localStorage.getItem(USER_ID);
      const playlist = await spotifyQuery(
        "createPlaylist",
        [userId, {name: playlistName}]
      );
      redirect(playlist.id);
      dispatch(
        success({
          id: playlist.id,
          image: "",
          name: playlistName,
          meta: "0 tracks",
          ownerId: userId,
        })
      );
    } catch (e) {
      console.error(e);
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function uploadCoverImage(playlistId, imageData) {
  return async dispatch => {
    const success = makeActionCreator(UPLOAD_PLAYLIST_COVER, "payload");
    try {
      await spotifyQuery(
        "uploadCustomPlaylistCoverImage",
        [playlistId, imageData]
      );
      dispatch(
        success({playlistId, image: imageData})
      );
    } catch (e) {
      console.error(e);
      alert.show(MESSAGES.ERROR);
    }
  };
}

export function changePlaylistDetails(playlistId, data) {
  return async dispatch => {
    const success = makeActionCreator(CHANGE_PLAYLIST_DETAILS, "payload");
    try {
      const key = Object.keys(data)[0];
      await spotifyQuery(
        "changePlaylistDetails",
        [playlistId, data]
      );
      dispatch(
        success({playlistId, key, value: data[key]})
      );
    } catch (e) {
      console.error(e);
      alert.show(MESSAGES.ERROR);
    }
  };
}
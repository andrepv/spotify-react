import { combineReducers } from "redux";

import {
  categoryPlaylists,
  featuredPlaylists,
  userPlaylists,
  listUserPlaylists,
  playlist,
} from "./PlaylistReducer";

import {
  newReleases,
  album,
  artistAlbums,
  artistSingles,
} from "./AlbumReducer";

import {
  followedArtists,
  artist,
  relatedArtists,
} from "./ArtistReducer";

import categories from "./CategoriesReducer";
import charts from "./ChartsReducer";
import searchResults from "./SearchReducer";

import {
  player,
  progressBar,
} from "./PlayerReducer";

import {
  artistTopTracks,
  topTracks,
  savedTracks,
} from "./TrackReducer";

export const rootReducer = combineReducers({
  userPlaylists,
  featuredPlaylists,
  categoryPlaylists,
  playlist,
  listUserPlaylists,

  newReleases,
  album,
  artistAlbums,
  artistSingles,

  relatedArtists,
  followedArtists,
  artist,

  topTracks,
  savedTracks,
  artistTopTracks,

  categories,
  player,
  progressBar,
  charts,
  searchResults,
});
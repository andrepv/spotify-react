import Spotify from "spotify-web-api-js";

export const CLIENT_ID = "<CLIENT_ID>";
export const REDIRECT_URL = "<REDIRECT_URL>";
export const SCOPE = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "streaming",
  "ugc-image-upload",
  "user-follow-modify",
  "user-follow-read",
  "user-library-read",
  "user-library-modify",
  "user-read-private",
  "user-read-birthdate",
  "user-read-email",
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
].join(" ");
export const TOKEN_NAME = "spotify_access_token";
export const EXPIRATION_TIME = "spotify_expires_in";
export const USER_ID = "spotify_user_id";
export const SPOTIFY_API = new Spotify();

export const NEW_RELEASES_LIMIT = 20;
export const USER_PLAYLISTS_LIMIT = 19;
export const CATEGORY_PLAYLISTS_LIMIT = 20;
export const CATEGORIES_LIMIT = 20;
export const FOLLOWED_ARTISTS_LIMIT = 20;
export const SAVED_TRACKS_LIMIT = 20;
export const PLAYLIST_TRACKS_LIMIT = 20;
export const ALBUM_TRACKS_LIMIT = 50;
export const ARTIST_ALBUMS_LIMIT = 20;
export const ARTIST_SINGLES_LIMIT = 20;
export const TOP_TRACKS_LIMIT = 25;

export const MESSAGES = {
  SAVED_TO_LIBRARY:        "Saved to Your Library",
  REMOVED_FROM_LIBRARY:    "Removed from Your Library",
  ADDED_TO_PLAYLIST:       "New Track Added to Playlist",
  ADDED_TO_FAV_TRACKS:     "Added to Favorite Tracks",
  REMOVED_FROM_FAV_TRACKS: "Removed from Favorite Tracks",
  ERROR:                   "Something Went Wrong. Try Again Later",
  TOKEN_HAS_EXPIRED:       "Token has expired",
};
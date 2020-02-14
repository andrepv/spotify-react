import {
  TOKEN_NAME,
  EXPIRATION_TIME,
  CLIENT_ID,
  REDIRECT_URL,
  USER_ID,
  SCOPE,
} from "constants/AppConstants";
import { SPOTIFY_API } from "constants/AppConstants";
import hasTokenExpired from "./hasTokenExpired";

export default class Auth {
  static _getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  static _generateRandomString(length) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  static _createLoginUrl() {
    var state = this._generateRandomString(16),
    AUTH_URL = "https://accounts.spotify.com/authorize";
    AUTH_URL += "?client_id=" + encodeURIComponent(CLIENT_ID);
    AUTH_URL += "&redirect_uri=" + encodeURIComponent(REDIRECT_URL);
    AUTH_URL += "&scope=" + encodeURIComponent(SCOPE);
    AUTH_URL += "&response_type=" + encodeURIComponent("token");
    AUTH_URL += "&state=" + encodeURIComponent(state);
    localStorage.setItem("spotify_auth_state", state);
    return AUTH_URL;
  }

  static setToken(token, expiration_time) {
    localStorage.setItem(TOKEN_NAME, token);
    localStorage.setItem(EXPIRATION_TIME, expiration_time);
  }

  static setTokenToSpotify() {
    if (!hasTokenExpired()) {
      SPOTIFY_API.setAccessToken(this._getToken());
    }
  }

  static setUserId() {
    SPOTIFY_API.getMe().then(
      response => localStorage.setItem(USER_ID, response.id),
      error => console.error(error)
    );
  }

  static redirectToLoginPage() {
    const loginUrl = this._createLoginUrl();
    window.location.href = loginUrl;
  }
}
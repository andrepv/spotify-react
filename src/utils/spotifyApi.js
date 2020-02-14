import { SPOTIFY_API, MESSAGES } from "constants/AppConstants";
import hasTokenExpired from "./hasTokenExpired";
import Auth from "./auth";

export default function spotifyQuery(queryName, queryParams = []) {
  if (hasTokenExpired()) {
    Auth.redirectToLoginPage();
    return new Promise((resolve, reject) => {
      reject(MESSAGES.TOKEN_HAS_EXPIRED);
    });
  }
  return SPOTIFY_API[queryName](...queryParams);
}
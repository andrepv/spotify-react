import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Auth from "utils/auth";

export default class LoginCallback extends Component {
  getHashParams = () => {
    const {location} = this.props,
    hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render() {
    const params = this.getHashParams(),
    access_token = params.access_token,
    state = params.state,
    storedState = localStorage.getItem("spotify_auth_state");

    if ( access_token && ( state == null || state !== storedState ) ) {
      console.error("There was an error during the authentication");
    } else {
      const tokenExpirationSec = ( new Date().getTime() / 1000 ) + 3600,
      tokenExpirationTime = new Date(tokenExpirationSec * 1000);
      Auth.setToken(access_token, tokenExpirationTime);
      localStorage.removeItem("spotify_auth_state");
      Auth.setTokenToSpotify();
      Auth.setUserId();
    }
    return <Redirect to='/' />;
  }
}
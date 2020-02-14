import React, { Component } from "react";
import { Route } from "react-router-dom";

import * as RouteConstant from "constants/RouteConstants";
import LoginCallback from "components/LoginCallback";
import Navbar from "components/Navbar";
import Player from "components/Player/Player";
import Search from "components/Search/Search";
import Main from "components/Main";
import Auth from "utils/auth";
import "./App.scss";

export default class App extends Component {
  constructor() {
    super();
    Auth.setTokenToSpotify();
  }

  render() {
    return (
      <div className="app">
        <div className="app__container">
          <Navbar />
          <div className="app__content">
            <Search />
            <Main />
            <Route
              path={RouteConstant.LOGIN_CALLBACK}
              component={LoginCallback}
            />
          </div>
          <Player />
        </div>
      </div>
    );
  }
}
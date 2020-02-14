import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { ALBUMS, SINGLES, ARTIST } from "constants/RouteConstants";
import ArtistHeader from "./ArtistHeader";
import ArtistTopTracks from "./ArtistTopTracks";
import ArtistAlbums from "./ArtistAlbums";
import ArtistSingles from "./ArtistSingles";
import RelatedArtists from "./RelatedArtists";
import Albums from "../ArtistAlbums";
import Singles from "../ArtistSingles";
import "styles/Artist.scss";

export default class Artist extends Component {
  componentDidUpdate(prevProps) {
    if (!this.props.history.location.state) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const {id} = this.props.match.params;
    return (
      <Switch location={this.props.location}>
        <Route exact path={`${ARTIST}/${id}`}>
          <section className="section-separators">
            <ArtistHeader id={id} />
            <ArtistTopTracks id={id} />
            <ArtistAlbums id={id} />
            <ArtistSingles id={id} />
            <RelatedArtists id={id} />
          </section>
        </Route>
        <Route
          path={`${ARTIST}/${id}${ALBUMS}`}
          render={() => {
            return <Albums id={id} />;
          }}
        />
        <Route
          path={`${ARTIST}/${id}${SINGLES}`}
          render={() => {
            return <Singles id={id} />;
          }}
        />
      </Switch>
    );
  }
}
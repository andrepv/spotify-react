import React, { Component } from "react";

import TopTracks from "./TopTracks";
import RelatedArtists from "./RelatedArtists";
import UserPlaylists from "./UserPlaylists";
import CategoryPlaylists from "./CategoryPlaylists";
import Categories from "./Categories";
import FeaturedPlaylists from "./FeaturedPlaylists";
import NewReleases from "./NewReleases";

export default class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <section className="section-separators">
        <NewReleases/>
        <section className="row">
          <TopTracks />
          <Categories />
        </section>
        <FeaturedPlaylists />
        <RelatedArtists />
        <CategoryPlaylists />
        <UserPlaylists />
      </section>
    );
  }
}
import React, { Component } from "react";
import PropTypes from "prop-types";

import Tracks from "components/Common/Tracks";
import Artist from "components/Common/Artist";
import Block from "components/Common/Block";

export default class SearchResults extends Component {
  componentDidMount() {
    document.body.classList.add("disable-scroll");
  }

   componentWillUnmount() {
    document.body.classList.remove("disable-scroll");
  }

  renderNotFoundMsg = () => {
    return (
      <div className="search__not-found">
        <h2>{`No results found for "${this.props.value}"`}</h2>
        <p>Please make sure your words are spelled correctly
        or use less or different keywords</p>
      </div>
    );
  }

  renderTabs() {
    const {type, switchTab} = this.props;
    const options = ["track", "album", "playlist", "artist"];
    return options.map((option, index) => {
      return (
        <li
          key={index}
          onClick={() => switchTab(option)}
          className={`search__tab ${option === type
            ? "search__tab_active": ""
          }`}
        >
          {`${option}s`}
        </li>
      );
    });
  }

  renderTracks() {
    const {items} = this.props;
    return (
      <div className="tracks tracks_col-3">
        <Tracks
          columns={3}
          trackList={items}
          source={{name: "SearchResults"}}
        />
      </div>
    );
  }

  renderArtists() {
    const {items, close} = this.props;
    return (
      <div className="artists artists_cols-6">
        {items.map(item => {
          return (
            <Artist
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              handler={close}
            />
          );
        })}
      </div>
    );
  }

  renderBlocks() {
    const {items, type, close} = this.props;
    return (
      <div className="blocks-container blocks_cols-5">
        {items.map(item => {
          return (
            <Block
              key={item.id}
              id={item.id}
              meta={item.meta}
              type={type}
              name={item.name}
              image={item.image}
              handler={close}
            />
          );
        })}
      </div>
    );
  }

  render() {
    const {items, pending, type} = this.props;
    const content = {
      track: () => {
        return this.renderTracks();
      },
      artist: () => {
        return this.renderArtists();
      },
      album: () => {
        return this.renderBlocks();
      },
      playlist: () => {
        return this.renderBlocks();
      },
    };
    return (
      <div className="search__results custom-scrollbar">
        <ul className="search__tabs">
          {this.renderTabs()}
        </ul>
        {pending
          ? null
          : !items.length
            ? this.renderNotFoundMsg()
            : content[type]()
        }
      </div>
    );
  }
}

SearchResults.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  close: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
};
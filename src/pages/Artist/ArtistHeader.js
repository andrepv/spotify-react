import React, { Component } from "react";
import PropTypes from "prop-types";
import { connectArtistHeader } from "containers/Artist/ArtistHeaderContainer";

export class ArtistHeader extends Component {
  componentDidMount() {
    this.props.loadArtist(this.props.id);
  }

  componentDidUpdate(prevProps) {
    const {id, loadArtist} = this.props;
    if (id !== prevProps.id) {
      loadArtist(id);
    }
  }

  follow = () => {
    this.props.followArtist(this.props.artist);
  }

  unfollow = () => {
    this.props.unfollowArtist(this.props.id);
  }

  render() {
    const {image, name, followers, isFollower} = this.props.artist;
    return (
      <header
        className="artist-header bg-center flex-center"
        style={{backgroundImage: `url(${image})`}}
      >
        <div className="artist-header__info">
          <p className="artist-header__followers">{followers}</p>
          <h1 className="artist-header__name">{name}</h1>
          <button
            className="artist-header__btn btn"
            onClick={isFollower ? this.unfollow : this.follow}
          >
            {isFollower ? "Unfollow" : "Follow"}
          </button>
        </div>
      </header>
    );
  }
}

ArtistHeader.propTypes = {
  id: PropTypes.string.isRequired,
  artist: PropTypes.object.isRequired,
  loadArtist: PropTypes.func.isRequired,
  followArtist: PropTypes.func.isRequired,
  unfollowArtist: PropTypes.func.isRequired,
};

export default connectArtistHeader(ArtistHeader);